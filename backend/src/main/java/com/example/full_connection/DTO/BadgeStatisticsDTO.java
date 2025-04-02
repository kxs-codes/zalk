package com.example.full_connection.DTO;

public class BadgeStatisticsDTO {
    private int totalQuestions;
    private int totalTimeInSessions;
    private int totalQuestionsRight;
    private int sessionsCompleted;
    private int daysLoggedIn;

    public BadgeStatisticsDTO(int totalQuestions, int totalTimeInSessions, int totalQuestionsRight, int sessionsCompleted, int daysLoggedIn) {
        this.totalQuestions = totalQuestions;
        this.totalTimeInSessions = totalTimeInSessions;
        this.totalQuestionsRight = totalQuestionsRight;
        this.sessionsCompleted = sessionsCompleted;
        this.daysLoggedIn = daysLoggedIn;
    }

    // Getters
    public int getTotalQuestions() {
        return totalQuestions;
    }

    public int getTotalTimeInSessions() {
        return totalTimeInSessions;
    }

    public int getTotalQuestionsRight() {
        return totalQuestionsRight;
    }

    public int getSessionsCompleted() {
        return sessionsCompleted;
    }

    public int getDaysLoggedIn() {
        return daysLoggedIn;
    }
}