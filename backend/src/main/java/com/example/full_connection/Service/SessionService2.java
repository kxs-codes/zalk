package com.example.full_connection.Service;

import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Entity.StatisticsMetadata;
import com.example.full_connection.Entity.Student;
import com.example.full_connection.Model.ModelService;
import com.example.full_connection.Model.RandomForestRegressor;
import com.example.full_connection.DTO.ConfidenceDTO;
import com.example.full_connection.DTO.UpdateStatisticsDTO;
import com.example.full_connection.Entity.Questions;
import com.example.full_connection.Repository.StatisticsRepository;
import com.example.full_connection.Repository.QuestionsRepository;
import com.example.full_connection.Repository.StatisticsMetadataRepository;
import com.example.full_connection.Repository.StudentRepository;

import jakarta.persistence.EntityNotFoundException;
import smile.data.DataFrame;
import smile.data.Row;
import smile.data.Tuple;
import smile.data.type.DataType;
import smile.data.type.StructField;
import smile.data.type.StructType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import java.util.ArrayList;
import java.util.Collections;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class SessionService2 {

    private static final Logger logger = Logger.getLogger(SessionService2.class.getName());

    @Autowired
    private ModelService modelService;

    @Autowired
    private StatisticsRepository statisticsRepository;

    @Autowired
    private StatisticsMetadataRepository statisticsMetadataRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private QuestionsRepository questionsRepository;

    public Questions getQuestion(UUID userId) {
        try {
            // Get current stats of a user
            Optional<Statistics> optionalUserStats = statisticsRepository.findByStudentId(userId);

            // Start with an uninitialized predicted score
            float predictedScore;        
            
            // Send to model prediction
            if (optionalUserStats.isPresent()) {
                Statistics userStats = optionalUserStats.get();
                
                // Define the schema for the row
                List<StructField> fields = new ArrayList<>();
                fields.add(new StructField("streak", DataType.of("int")));
                fields.add(new StructField("avgTime", DataType.of("float")));
                fields.add(new StructField("confidence", DataType.of("float")));
                fields.add(new StructField("sessions", DataType.of("int")));
                fields.add(new StructField("quizScore", DataType.of("float")));
                StructType userSchema = new StructType(fields);

                // Convert userStats to a Tuple
                Tuple userTuple = Tuple.of(
                    userSchema,
                    new Object[]{
                        userStats.getStreak(),
                        userStats.getAvgTimePerQuestion(),
                        userStats.getConfidence(),
                        userStats.getSessionsCompleted(),
                        userStats.getSessionScore()
                    }
                );

                DataFrame df = DataFrame.of(userSchema, Collections.singletonList(userTuple));
                Row userRow = new Row(df, 0);

                // Predict a score from the model based on current stats
                RandomForestRegressor model = modelService.getModelReference();
                if (model == null) {
                    throw new IllegalStateException("Model could not be loaded.");
                }

                predictedScore = modelService.predict(userRow);
            } 
            // Calculate a global average zloRating
            else {
                logger.info("Student does not have any stats. Using global averages.");

                // Grab grade level of student
                Optional<Student> student = studentRepository.findById(userId);
                int gradeLevel = student.get().getGradeLevel();

                // Find all rows in statistics that match the gradeLevel of the current student
                List<Optional<Statistics>> statsWithSameGradeLevel = statisticsRepository.findByStudentGradeLevel(gradeLevel);
                
                // Find the avaerage
                predictedScore = (float) statsWithSameGradeLevel.stream()
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .mapToDouble(Statistics::getZloRating)
                    .average()
                    .orElse(0.0);

                logger.info("Global average predicted score: " + predictedScore);
            }

            // Check the metadata table for retrain of model
            StatisticsMetadata statisticsMetadata = statisticsMetadataRepository.findAll().get(0);
            int lastRowCount = statisticsMetadata.getLastRowCount();
            int currentRowCount = (int) statisticsRepository.count();
            int numberOfUpdates = statisticsMetadata.getNumberOfUpdates();

            // Retrain when conditions met
            if (currentRowCount > 500 && (currentRowCount / lastRowCount >= 1.25 || numberOfUpdates >= 1000)) {
                logger.info("Model retraining condition met.");
                modelService.retrainAndSwapModel();
            }
            
            logger.info("Predicted score: " + predictedScore);

            String difficulty;
            if (predictedScore > 0.60f) {
                difficulty = "hard";
            } else if (predictedScore > 0.40f) {
                difficulty = "medium";
            } else {
                difficulty = "easy";
            }

            // Grab grade level of student
            Optional<Student> student = studentRepository.findById(userId);
            int gradeLevel = student.get().getGradeLevel();

            List<Questions> questions = questionsRepository.findByDifficultyAndGradeLevel(difficulty, gradeLevel);

            // Select a random question from the list
            if (questions != null && !questions.isEmpty()) {
                int randomIndex = (int) (Math.random() * questions.size());
                return questions.get(randomIndex);
            } else {
                logger.warning("No questions found for difficulty: " + difficulty);
                return null;
            }
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error in getQuestion: " + e.getMessage(), e);
            return null;
        }
    }

    public int getStreak(UUID userId) {
        try {
            // Query the stats repo for streak
            Optional<Statistics> userStats = statisticsRepository.findByStudentId(userId);

            // Return
            return userStats.map(Statistics::getStreak).orElse(0);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error in getStreak: " + e.getMessage(), e);
            return 0;
        }
    }

    public float zloCalculation(int streak, float avgTime, float confidence, float sessionScore, int sessionsCompleted) {
        return (0.3f * sessionScore) +
               (0.2f * Math.min(1.0f, streak / 8.0f)) +
               (0.1f * (1.0f - Math.min(1.0f, avgTime / 60.0f))) +
               (0.2f * confidence) +
               (0.2f * Math.min(1.0f, sessionsCompleted / 20.0f));
    }

    public Questions getNextQuestion(UUID userId, float avgTime, int streak) {
        try {
            // 1. Grab the user's statistics
            Optional<Statistics> optionalUserStats = statisticsRepository.findByStudentId(userId);

            if (!optionalUserStats.isPresent()) {
                throw new IllegalArgumentException("Statistics not found for userId: " + userId);
            }

            Statistics userStats = optionalUserStats.get();

            // 2. Recalculate the zloRating based on the new stats from the frontend
            float zloRating = zloCalculation(streak, avgTime, userStats.getConfidence(), userStats.getSessionScore(), userStats.getSessionsCompleted());

            // 3. Update the statistics of the user and save to persist the changes
            userStats.setAvgTimePerQuestion(avgTime);
            userStats.setStreak(streak);
            userStats.setZloRating(zloRating);
            statisticsRepository.save(userStats);

            // 4. Update metadata of the statistics table
            StatisticsMetadata statisticsMetadata = statisticsMetadataRepository.findAll().get(0);
            statisticsMetadata.setNumberOfUpdates(statisticsMetadata.getNumberOfUpdates() + 1);
            statisticsMetadataRepository.save(statisticsMetadata);

            // 5. Grab a question from the updated statistics of the user
            return getQuestion(userId);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error in getNextQuestion: " + e.getMessage(), e);
            return null;
        }
    }

    public UpdateStatisticsDTO addNewStatistics(
        UUID userId,
        int streak,
        int totalQuestions,
        int totalQuestionsRight,
        int totalQuestionsWrong,
        float avgTimeSpentInSession,
        float successRate,
        float avgTimePerQuestion,
        Statistics newStats
    ) {
        float sessionScore = totalQuestions > 0 ? totalQuestionsRight / (float) totalQuestions : 0.0f;
        
        // Find the student first and handle the case where student doesn't exist
        Student student = studentRepository.findById(userId)
            .orElseThrow(() -> new EntityNotFoundException("Student not found with ID: " + userId));

        // Set initial values for the new row
        newStats.setStudent(student);
        newStats.setStreak(streak);
        newStats.setTotalQuestions(totalQuestions);
        newStats.setTotalQuestionsRight(totalQuestionsRight);
        newStats.setTotalQuestionsWrong(totalQuestionsWrong);
        newStats.setAvgTimeSpentInSession(avgTimeSpentInSession);
        newStats.setSuccessRate(successRate);
        newStats.setAvgTimePerQuestion(avgTimePerQuestion);
        newStats.setSessionScore(sessionScore);
        newStats.setSuccessRate(0f);
        newStats.setGuessRate(0f);
        newStats.setSubjectMasteryValue(0);
        newStats.setSessionsCompleted(1);
        newStats.setDaysLoggedIn(0);
        newStats.setConfidence(0.5f); // default confidence
        newStats.setZloRating(zloCalculation(streak, avgTimePerQuestion, 0.5f, sessionScore, 1));

        statisticsRepository.save(newStats);

        // For a new student, add a row to the last count
        StatisticsMetadata statisticsMetadata = statisticsMetadataRepository.findAll().get(0);
        statisticsMetadata.setLastRowCount(statisticsMetadata.getLastRowCount() + 1);
        statisticsMetadataRepository.save(statisticsMetadata);

        System.out.println("\n\nAFTER METADATA SAVING\n\n");
        
        logger.info("Created new statistics record with ID: " + newStats.getStatId());

        // Initialize and return the DTO object
        return mapToDTO(newStats);
    }

    public UpdateStatisticsDTO updateStatistics(
        UUID userId,
        int streak,
        int totalQuestions,
        int totalQuestionsRight,
        int totalQuestionsWrong,
        float avgTimeSpentInSession,
        float successRate,
        float avgTimePerQuestion,
        Statistics userStats
    ) {

        // Calculate sessionScore
        float sessionScore = totalQuestions > 0 ? totalQuestionsRight / (float) totalQuestions : 0.0f;

        // Grab the metadata table first
        List<StatisticsMetadata> metadataList = statisticsMetadataRepository.findAll();
        if (metadataList.isEmpty()) {
            logger.severe("Statistics metadata not found");
            throw new EntityNotFoundException("Statistics metadata not found");
        }
        StatisticsMetadata statisticsMetadata = metadataList.get(0);

        // Update the user's stats based on the parameters
        userStats.setTotalQuestions(totalQuestions);
        userStats.setTotalQuestionsRight(totalQuestionsRight);
        userStats.setTotalQuestionsWrong(totalQuestionsWrong);
        userStats.setAvgTimeSpentInSession(avgTimeSpentInSession);
        userStats.setSuccessRate(successRate);
        userStats.setAvgTimePerQuestion(avgTimePerQuestion);
        userStats.setSessionScore(sessionScore);
        userStats.setStreak(streak);
        userStats.setSessionsCompleted(userStats.getSessionsCompleted() + 1);

        // Recalculate ZLO rating if needed
        userStats.setZloRating(zloCalculation(
            streak, 
            avgTimePerQuestion, 
            userStats.getConfidence(), 
            sessionScore, 
            userStats.getSessionsCompleted()
        ));

        Statistics updatedStats = statisticsRepository.save(userStats);

        // Update metadata table
        statisticsMetadata.setNumberOfUpdates(statisticsMetadata.getNumberOfUpdates() + 1);
        statisticsMetadataRepository.save(statisticsMetadata);
        
        logger.info("Successfully updated statistics for user: " + userId);

        // Return the updated user statistics
        return mapToDTO(updatedStats);
    }

    // Helper method to map Statistics entity to DTO
    private UpdateStatisticsDTO mapToDTO(Statistics stats) {
        return new UpdateStatisticsDTO(
            stats.getStatId(),
            stats.getTotalTimeInSessions(),
            stats.getStreak(),
            stats.getTotalQuestions(),
            stats.getTotalQuestionsRight(),
            stats.getTotalQuestionsWrong(),
            stats.getSessionsCompleted(),
            stats.getDaysLoggedIn(),
            stats.getSubjectMasteryValue(),
            stats.getGuessRate(),
            stats.getAvgTimeSpentInSession(),
            stats.getSuccessRate(),
            stats.getAvgTimePerQuestion(),
            stats.getZloRating(),
            stats.getConfidence(),
            stats.getSessionScore(),
            stats.getStudent().getId()
        );
    }

    public ResponseEntity<ConfidenceDTO> submitConfidence(UUID userId, float confidence) {
        Optional<Statistics> optionalUserStats = statisticsRepository.findByStudentId(userId);
        if (optionalUserStats.isPresent()) {
            // 1. Fetch the users stats
            Statistics userStats = optionalUserStats.get();
            
            // 2. Use settter to update confidence
            userStats.setConfidence(confidence);

            // 3. Update zloRating
            float zloRating = zloCalculation(userStats.getStreak(), userStats.getAvgTimePerQuestion(), confidence, userStats.getSessionScore(), userStats.getSessionsCompleted());
            userStats.setZloRating(zloRating);

            // 4. Persist changes to the repository
            statisticsRepository.save(userStats);

            // 5. Return success response
            ConfidenceDTO confidenceDTO = new ConfidenceDTO("Confidence successfully updated.", zloRating);
            return ResponseEntity.ok(confidenceDTO);
        } else {
            // 5. Return error response
            ConfidenceDTO errorDTO = new ConfidenceDTO("Statistics not found on user id: " + userId, 0.0f);
            return ResponseEntity.badRequest().body(errorDTO);
        }        
    }
}
