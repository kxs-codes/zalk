package com.example.full_connection.Model;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicReference;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Repository.StatisticsRepository;

import jakarta.annotation.PostConstruct;
import smile.data.DataFrame;
import smile.data.Row;
import smile.data.Tuple;
import smile.data.type.DataType;
import smile.data.type.StructField;
import smile.data.type.StructType;

@Service
/**
 * Service class for managing and training machine learning models.
 * Handles operations such as loading, saving, and retraining models.
 */
public class ModelService {
    @Autowired
    StatisticsRepository statisticsRepository;

    Logger logger = LoggerFactory.getLogger(ModelService.class);

    // Attributes
    private final AtomicReference<RandomForestRegressor> modelReference = new AtomicReference<>();
    private String filePath = "./src/main/java/com/example/full_connection/Model/RandomForestRegressor.model";

    // Load model on startup
    @PostConstruct
    public void init() {
        logger.info("Creating a model reference.");
        modelReference.set(loadModel(filePath));
    }

    public float predict(Row row) {
        return modelReference.get().predict(row);
    }
    public void retrainAndSwapModel() {
        new Thread(() -> {
            // Train a new model and save in a new model object
            RandomForestRegressor newModel = retrainModel();

            // Overwrite the old model file
            saveModel(newModel, filePath);

            // Swap the old model with the new one
            modelReference.set(newModel);
        });
    }

    // Insert save and load functions here
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

        try {
            fields.add(new StructField("streak", DataType.of("int")));
            fields.add(new StructField("avgTime", DataType.of("float")));
            fields.add(new StructField("confidence", DataType.of("float")));
            fields.add(new StructField("sessions", DataType.of("int")));
            fields.add(new StructField("quizScore", DataType.of("float")));
            fields.add(new StructField("readinessScore", DataType.of("float")));
        } catch (ClassNotFoundException e) {
            System.out.println(e);
        }

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

    // Getters
    public RandomForestRegressor getModelReference() {
        return modelReference.get();
    }
    public String getFilePath() {
        return filePath;
    }

    // Setter for filePath
    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
}
