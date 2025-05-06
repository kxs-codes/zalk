package com.example.full_connection.Model;

import java.util.Random;
import java.util.concurrent.atomic.AtomicReference;

import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import smile.data.Row;

@Service
public class ModelService {
    // Attribute (atomically referenced model)
    private final AtomicReference<RandomForestRegressor> modelReference = new AtomicReference<>();
    private String filePath = "./src/main/java/com/example/full_connection/Model/RandomForestRegressor.model";
    private ModelSaveAndLoad modelSaveAndLoad = new ModelSaveAndLoad();

    // Load model on startup
    @PostConstruct
    public void init() {
        modelReference.set(modelSaveAndLoad.loadModel(filePath));
    }

    public float predict(Row row) {
        return modelReference.get().predict(row);
    }

    public void retrainAndSwapModel(Row row) {
        new Thread(() -> {
            // Train a new model and save in a new model object
            RandomForestRegressor newModel = modelSaveAndLoad.retrainModel();

            // Overwrite the old model file
            modelSaveAndLoad.saveModel(newModel, filePath);

            // Swap the old model with the new one
            modelReference.set(newModel);
        })
    }
}
