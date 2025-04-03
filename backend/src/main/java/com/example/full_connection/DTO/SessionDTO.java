package com.example.full_connection.DTO;

import java.util.List;

public class SessionDTO {
    private List<String> studentforSession; // List of usernames
    private int totalTimeInSessions;
    private int streak;
    private int totalQuestions;
    private int totalQuestionsRight;
    private int totalQuestionsWrong;
    private int sessionsCompleted;
    private int daysLoggedIn;
    private int subjectMasteryValue;
    private float guessRate;
    private float avgTimeSpentInSession;
    private float successRate;
    private float avgTimePerQuestion;

    // Getters
    public List<String> getStudentforSession() {
        return studentforSession;
    }

    public int getTotalTimeInSessions() {
        return totalTimeInSessions;
    }

    public int getStreak() {
        return streak;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public int getTotalQuestionsRight() {
        return totalQuestionsRight;
    }

    public int getTotalQuestionsWrong() {
        return totalQuestionsWrong;
    }

    public int getSessionsCompleted() {
        return sessionsCompleted;
    }

    public int getDaysLoggedIn() {
        return daysLoggedIn;
    }

    public int getSubjectMasteryValue() {
        return subjectMasteryValue;
    }

    public float getGuessRate() {
        return guessRate;
    }

    public float getAvgTimeSpentInSession() {
        return avgTimeSpentInSession;
    }

    public float getSuccessRate() {
        return successRate;
    }

    public float getAvgTimePerQuestion() {
        return avgTimePerQuestion;
    }

    // Setters - now matching your Statistics entity
    public void setTotalTimeInSessions(int totalTimeInSessions) {
        this.totalTimeInSessions = totalTimeInSessions;
    }

    public void setStreak(int streak) {
        this.streak = streak;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public void setTotalQuestionsRight(int totalQuestionsRight) {
        this.totalQuestionsRight = totalQuestionsRight;
    }

    public void setTotalQuestionsWrong(int totalQuestionsWrong) {
        this.totalQuestionsWrong = totalQuestionsWrong;
    }

    public void setSessionsCompleted(int sessionsCompleted) {
        this.sessionsCompleted = sessionsCompleted;
    }

    public void setDaysLoggedIn(int daysLoggedIn) {
        this.daysLoggedIn = daysLoggedIn;
    }

    public void setSubjectMasteryValue(int subjectMasteryValue) {
        this.subjectMasteryValue = subjectMasteryValue;
    }

    public void setGuessRate(float guessRate) {
        this.guessRate = guessRate;
    }

    public void setAvgTimeSpentInSession(float avgTimeSpentInSession) {
        this.avgTimeSpentInSession = avgTimeSpentInSession;
    }

    public void setSuccessRate(float successRate) {
        this.successRate = successRate;
    }

    public void setAvgTimePerQuestion(float avgTimePerQuestion) {
        this.avgTimePerQuestion = avgTimePerQuestion;
    }

    public void setStudentforSession(List<String> studentforSession) {
        this.studentforSession = studentforSession;
    }
}
