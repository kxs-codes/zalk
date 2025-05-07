package com.example.full_connection.Service;

import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Entity.StatisticsMetadata;
import com.example.full_connection.Entity.Student;
import com.example.full_connection.Model.ModelSaveAndLoad;
import com.example.full_connection.Model.RandomForestRegressor;
import com.example.full_connection.DTO.ConfidenceDTO;
import com.example.full_connection.Entity.Questions;
import com.example.full_connection.Repository.StatisticsRepository;
import com.example.full_connection.Repository.QuestionsRepository;
import com.example.full_connection.Repository.StatisticsMetadataRepository;
import com.example.full_connection.Repository.StudentRepository;

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

import javax.management.RuntimeErrorException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class SessionService2 {

    private static final Logger logger = Logger.getLogger(SessionService2.class.getName());

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

            if (!optionalUserStats.isPresent()) {
                throw new IllegalArgumentException("Statistics not found for userId: " + userId);
            }

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
            ModelSaveAndLoad modelSaveAndLoad = new ModelSaveAndLoad();
            RandomForestRegressor model = modelSaveAndLoad.loadModel("./src/main/java/com/example/full_connection/Model/RandomForestRegressor.model");

            if (model == null) {
                throw new IllegalStateException("Model could not be loaded.");
            }

            // Check the metadata table for retrain of model
            StatisticsMetadata statisticsMetadata = statisticsMetadataRepository.findAll().get(0);
            int lastRowCount = statisticsMetadata.getLastRowCount();
            int currentRowCount = (int) statisticsRepository.count();
            int numberOfUpdates = statisticsMetadata.getNumberOfUpdates();

            if (currentRowCount > 500 && (currentRowCount / lastRowCount >= 1.25 || numberOfUpdates >= 1000)) {
                // TODO: Retrain model
                logger.info("Model retraining condition met.");
            }

            float predictedScore = model.predict(userRow);
            String difficulty;

            logger.info("Predicted score: " + predictedScore);

            if (predictedScore > 0.60f) {
                difficulty = "hard";
            } else if (predictedScore > 0.40f) {
                difficulty = "medium";
            } else {
                difficulty = "easy";
            }

            // Grab a question based on the students current rating and gradelevel
            Optional<Student> studentOptional = studentRepository.findById(userId);
            if (!studentOptional.isPresent()) {
                throw new IllegalArgumentException("Student not found for userId: " + userId);
            }
            Student student = studentOptional.get();
            int gradeLevel = student.getGradeLevel();
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
            return userStats.map(Statistics::getStreak).orElse(-1);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error in getStreak: " + e.getMessage(), e);
            return -1;
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

    public Statistics updateStatistics(
        UUID userId,
        int streak,
        int totalQuestions,
        int totalQuestionsRight,
        int totalQuestionsWrong,
        float avgTimeSpentInSession,
        float successRate,
        float avgTimePerQuestion
    ) {
        try {
            // Calculate sessionScore
            float sessionScore = totalQuestions > 0 ? totalQuestionsRight / (float) totalQuestions : 0.0f;

            // Grab user stats based on userId
            Optional<Statistics> optionalUserStats = statisticsRepository.findByStudentId(userId);

            if (!optionalUserStats.isPresent()) {
                throw new IllegalArgumentException("User statistics don't exist for user: " + userId);
            }

            Statistics userStats = optionalUserStats.get();

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
            statisticsRepository.save(userStats);

            // Update metadata table
            StatisticsMetadata statisticsMetadata = statisticsMetadataRepository.findAll().get(0);
            statisticsMetadata.setNumberOfUpdates(statisticsMetadata.getNumberOfUpdates() + 1);
            statisticsMetadataRepository.save(statisticsMetadata);

            // Make a new student object just specifying the userId
            Student student = new Student();
            student.setId(userId);
            userStats.setStudent(student);

            // Return the updated user statistics
            return userStats;
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error in updateStatistics: " + e.getMessage(), e);
            return null;
        }
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
