package com.example.full_connection.Service;

import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Entity.StatisticsMetadata;
import com.example.full_connection.Entity.Student;
import com.example.full_connection.Model.ModelSaveAndLoad;
import com.example.full_connection.Model.RandomForestRegressor;
import com.example.full_connection.Entity.Questions;
import com.example.full_connection.Repository.StatisticsRepository;
import com.example.full_connection.Repository.QuestionsRepository;
import com.example.full_connection.Repository.StatisticsMetadataRepository;
import com.example.full_connection.Repository.StudentRepository;

import smile.data.DataFrame;
import smile.data.Row;
import smile.data.Tuple;
import smile.data.type.DataTypes.*;
import smile.data.type.DataType;
import smile.data.type.StructField;
import smile.data.type.StructType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.ArrayList;
import java.util.Collections;

@Service
public class SessionService2 {
    @Autowired
    private StatisticsRepository statisticsRepository;

    @Autowired
    private StatisticsMetadataRepository statisticsMetadataRepository;

    @Autowired
    private QuestionsRepository questionsRepository;

    public Questions getQuestion(UUID userId) {
        // Get current stats of a user
        Optional<Statistics> optioinalUserStats = statisticsRepository.findByStudentId(userId);

        Statistics userStats = null;
        if (optioinalUserStats.isPresent()) {
            userStats = optioinalUserStats.get();
        } else {
            throw new IllegalArgumentException("Statistics not found for userId: " + userId);
        }

        // Define the schema for the row
        List<StructField> fields = new ArrayList<>();
        try {
            fields.add(new StructField("streak", DataType.of("int")));
            fields.add(new StructField("avgTime", DataType.of("float")));
            fields.add(new StructField("confidence", DataType.of("float")));
            fields.add(new StructField("sessions", DataType.of("int")));
            fields.add(new StructField("quizScore", DataType.of("float")));
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("Failed to create DataType for schema", e);
        }
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
            throw new IllegalAccessError("Model could not be loaded.");
        } 

        // Check the metadata table for retrain of model
        StatisticsMetadata statisticsMetadata = statisticsMetadataRepository.findAll().get(0);
        int lastRowCount = statisticsMetadata.getLastRowCount();
        int currentRowCount = (int) statisticsRepository.count();
        int numberOfUpdates =statisticsMetadata.getNumberOfUpdates();

        if (currentRowCount > 500 && (currentRowCount/lastRowCount >= 1.25 || numberOfUpdates >= 1000)) {
            // TODO: Retrain model
            System.out.println("Do something.");
        }

        float predictedScore = model.predict(userRow);
        String difficulty;

        System.out.println("predicted score: " + predictedScore);
        
        if (predictedScore > 0.60f) {
            difficulty = "hard";
        } else if (predictedScore > 0.40f) {
            difficulty = "medium";
        } else {
            difficulty = "easy";
        }

        // Grab a question based on the students current rating and gradelevel
        List<Questions> questions = questionsRepository.findByDifficulty(difficulty);

        // Select a random question from the list
        Questions question = null;
        if (questions != null && !questions.isEmpty()) {
            int randomIndex = (int) (Math.random() * questions.size());
            question = questions.get(randomIndex);
        }
        // Return the question
        return question;
    }

    public int getStreak(UUID userId) {
        // Query the stats repo for streak
        Optional<Statistics> userStats = statisticsRepository.findByStudentId(userId);

        // Return
        if (userStats.isPresent()) {
            return userStats.get().getStreak();
        } else {
            return -1;
        }
    }

    public float zloCalculation(int streak, float avgTime, float confidence, float sessionScore, int sessionsCompleted) {
        float zloRating = (0.3f * sessionScore) + 
            (0.2f * (float) Math.min(1.0, streak/8)) +
            (0.1f * (float) (1 - Math.min(1.0, avgTime/60))) +
            (0.2f * confidence) +
            (0.2f * (float) Math.min(1.0, sessionsCompleted/20));
        return zloRating;
    }

    public Questions getNextQuestion(UUID userId, float avgTime, int streak) {
        // 1. Grab the users statistics
        Optional<Statistics> optionalUserStats = statisticsRepository.findByStudentId(userId);
        Statistics userStats = null;
        if (optionalUserStats.isPresent()) {
            userStats = optionalUserStats.get();
        } else {
            throw new IllegalArgumentException("Statistics not found for userId: " + userId);
        }

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

        // 5. Grab a question from the updated statistics of the user
        Questions nextQuestion = getQuestion(userId);

        // 6. Return the question
        return nextQuestion;
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
        // Calculate sessionScore
        float sessionScore = totalQuestionsRight / (float) totalQuestions;

        
        // Grab user stats based on userId
        Optional<Statistics> optionalUserStats = statisticsRepository.findByStudentId(userId);
        Statistics userStats = null;
        if (optionalUserStats.isPresent()) {
            userStats = optionalUserStats.get();
        } else {
            throw new RuntimeException("User statistics don't exist for user: " + userId);
        }

        // Update the users stats based on the parameters (assumes confidence page is before this and is updated alread)
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

        // Return the updated user statistics
        return userStats;
    }
}
