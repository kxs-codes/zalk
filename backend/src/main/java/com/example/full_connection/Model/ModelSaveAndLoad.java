package com.example.full_connection.Model;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import com.example.full_connection.Model.RandomForestRegressor;

public class ModelSaveAndLoad {
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

        // 2. Convert into a csv file

        // 3. Convert to a DataFrame (might be able to skip step 2 and convert directly)

        // 4. Instantiate a new model of class RandomForestRegressor

        // 5. Train the model using the fit() function, passing in the DataFrame of stats

        // 6. Return the model
    }
}
