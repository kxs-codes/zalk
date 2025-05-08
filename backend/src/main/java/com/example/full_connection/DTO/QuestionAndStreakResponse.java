package com.example.full_connection.DTO;

import com.example.full_connection.Entity.Questions;

/**
 * Data Transfer Object for Question and Streak Response.
 * Represents a question and the associated streak count.
 */
public class QuestionAndStreakResponse {
    // Attributes
    private Questions question;
    private int streak;

    // Constructor
    public QuestionAndStreakResponse(Questions question, int streak) {
        this.question = question;
        this.streak = streak;
    }

    // Getters
    public Questions getQuestion() {
        return question;
    }
    public int getStreak() {
        return streak;
    }

    // Setters
    public void setQuestion(Questions question) {
        this.question = question;
    }
    public void setStreak(int streak) {
        this.streak = streak;
    }
}
