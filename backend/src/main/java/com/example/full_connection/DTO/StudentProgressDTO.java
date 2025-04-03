package com.example.full_connection.DTO;

public class StudentProgressDTO {
    private int currentHoursCompleted;
    private int totalQuestionsAnswered;
    private int questionsRight;
    private int sessionsCompleted;
    private int daysLoggedOn;

    // Constructor
    public StudentProgressDTO(int currentHoursCompleted, int totalQuestionsAnswered, int questionsRight, int sessionsCompleted, int daysLoggedOn) {
        this.currentHoursCompleted = currentHoursCompleted;
        this.totalQuestionsAnswered = totalQuestionsAnswered;
        this.questionsRight = questionsRight;
        this.sessionsCompleted = sessionsCompleted;
        this.daysLoggedOn = daysLoggedOn;
    }

    // Getters and Setters
    public int getCurrentHoursCompleted() {
        return currentHoursCompleted;
    }

    public void setCurrentHoursCompleted(int currentHoursCompleted) {
        this.currentHoursCompleted = currentHoursCompleted;
    }

    public int getTotalQuestionsAnswered() {
        return totalQuestionsAnswered;
    }

    public void setTotalQuestionsAnswered(int totalQuestionsAnswered) {
        this.totalQuestionsAnswered = totalQuestionsAnswered;
    }

    public int getQuestionsRight() {
        return questionsRight;
    }

    public void setQuestionsRight(int questionsRight) {
        this.questionsRight = questionsRight;
    }

    public int getSessionsCompleted() {
        return sessionsCompleted;
    }

    public void setSessionsCompleted(int sessionsCompleted) {
        this.sessionsCompleted = sessionsCompleted;
    }

    public int getDaysLoggedOn() {
        return daysLoggedOn;
    }

    public void setDaysLoggedOn(int daysLoggedOn) {
        this.daysLoggedOn = daysLoggedOn;
    }
}