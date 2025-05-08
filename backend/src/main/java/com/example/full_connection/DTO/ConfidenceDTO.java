package com.example.full_connection.DTO;

/**
 * Data Transfer Object for Confidence-related information.
 * Contains response and ZLO rating details.
 */
public class ConfidenceDTO {
    // Attributes
    String response;
    float zloRating;

    // Constructor
    public ConfidenceDTO(String response, float zloRating) {
        this.response = response;
        this.zloRating = zloRating;
    }

    // Getters
    public String getResponse() {
        return response;
    }
    public float getZloRating() {
        return zloRating;
    }

    // Setters
    public void setResponse(String response) {
        this.response = response;
    }
    public void setZloRating(float zloRating) {
        this.zloRating = zloRating;
    }
}
