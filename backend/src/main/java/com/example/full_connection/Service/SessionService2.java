package com.example.full_connection.Service;

import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Entity.Student;
import com.example.full_connection.Model.ModelSaveAndLoad;
import com.example.full_connection.Model.RandomForestRegressor;
import com.example.full_connection.Entity.Questions;
import com.example.full_connection.Repository.StatisticsRepository;
import com.example.full_connection.Repository.QuestionsRepository;
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

@Service
public class SessionService2 {
    @Autowired
    private StatisticsRepository statisticsRepository;

    @Autowired
    private QuestionsRepository questionsRepository;

    public Questions getQuestion(UUID userId) {
        // Get current stats of a user
        Optional<Statistics> optioinalUserStats = statisticsRepository.findByStudentId(userId);

        Statistics userStats = null;
        if (optioinalUserStats.isPresent()) {
            userStats = optioinalUserStats.get();
        }

        // Define the schema for the row
        List<StructField> fields = new java.util.ArrayList<>();
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

        DataFrame df = DataFrame.of(userSchema, java.util.Collections.singletonList(userTuple));
        Row userRow = new Row(df, 0);


        // Predict a score from the model based on current stats
        ModelSaveAndLoad modelSaveAndLoad = new ModelSaveAndLoad();
        RandomForestRegressor model = modelSaveAndLoad.loadModel("./src/main/java/com/example/full_connection/Model/RandomForestRegressor.model");
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
}
