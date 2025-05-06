package com.example.full_connection.Model;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Model.RandomForestRegressor;
import com.example.full_connection.Repository.StatisticsRepository;

import smile.data.DataFrame;
import smile.data.Tuple;
import smile.data.type.DataType;
import smile.data.type.StructField;
import smile.data.type.StructType;

public class ModelSaveAndLoad {
    @Autowired
    StatisticsRepository statisticsRepository;

    public void saveModel(RandomForestRegressor model, String filePath) {
        try {
            // 1. Write the forest to a file
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filePath));
            oos.writeObject(model);

            // 2. Close the output stream and return the message
            oos.close();
        } 
        catch(IOException e) {
            System.out.println("Error: " + e);
        }
    }

    public RandomForestRegressor loadModel(String filePath) {
        // 1. Grab the file
        File f = new File(filePath);

        try {
            // 2. Create an input stream
            ObjectInputStream ois = new ObjectInputStream(new FileInputStream(f));

            // 3. Deserialize the model and cast to the correct type
            RandomForestRegressor model = (RandomForestRegressor) ois.readObject();

            // 4. Close the input stream and return the model
            ois.close();
            return model;
        } 
        catch (IOException | ClassNotFoundException e) {
            System.out.println("Error: " + e);
            return null;
        }
    }

    // TODO: Retrain function (make it thread-safe)
    public RandomForestRegressor retrainModel() {
        // 1. Grab all student statistics (all rows in the table)
        List<Statistics> allStats = statisticsRepository.findAll();

        // 2. Convert to a DataFrame (might be able to skip step 2 and convert directly)
            // Make schema
            // Make empty List of Tuples
            // Loop over all stats, making a tuple and adding to tuple list
            // Create DataFrame passing in the schema and List<Tuple>
        List<StructField> fields = new ArrayList<>();
        fields.add(new StructField("streak", DataType.of("int")));
        fields.add(new StructField("avgTime", DataType.of("float")));
        fields.add(new StructField("confidence", DataType.of("float")));
        fields.add(new StructField("sessions", DataType.of("int")));
        fields.add(new StructField("quizScore", DataType.of("float")));
        fields.add(new StructField("readinessScore", DataType.of("float")));
        StructType schema = new StructType(fields);

        List<Tuple> data = new ArrayList<>();
        for (Statistics userStats: allStats) {
            Tuple statRow = Tuple.of(
                schema,
                new Object[]{
                    userStats.getStreak(),
                    userStats.getAvgTimePerQuestion(),
                    userStats.getConfidence(),
                    userStats.getSessionsCompleted(),
                    userStats.getSessionScore(),
                    userStats.getZloRating()
                }
            );
            data.add(statRow);
        }
        DataFrame df = DataFrame.of(schema, data);

        // 3. Instantiate a new model of class RandomForestRegressor
        RandomForestRegressor model = new RandomForestRegressor(200, 5, 10);

        // 4. Train the model using the fit() function, passing in the DataFrame of stats
        model.fit(df);

        // 5. Return the model
        return model;
    }
}
