package com.example.full_connection.DTO;

import java.util.UUID;

import com.example.full_connection.Entity.Student;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

public class UpdateStatisticsDTO {
    // Attributes
    private UUID statId;
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
    private float zloRating;
    private float confidence;
    private float sessionScore;
    private UUID studentId;

    // Constructor
    public UpdateStatisticsDTO(UUID statId, int totalTimeInSessions, int streak, int totalQuestions, int totalQuestionsRight,
                              int totalQuestionsWrong, int sessionsCompleted, int daysLoggedIn, int subjectMasteryValue,
                              float guessRate, float avgTimeSpentInSession, float successRate, float avgTimePerQuestion,
                              float zloRating, float confidence, float sessionScore, UUID studentId) {
        this.statId = statId;
        this.totalTimeInSessions = totalTimeInSessions;
        this.streak = streak;
        this.totalQuestions = totalQuestions;
        this.totalQuestionsRight = totalQuestionsRight;
        this.totalQuestionsWrong = totalQuestionsWrong;
        this.sessionsCompleted = sessionsCompleted;
        this.daysLoggedIn = daysLoggedIn;
        this.subjectMasteryValue = subjectMasteryValue;
        this.guessRate = guessRate;
        this.avgTimeSpentInSession = avgTimeSpentInSession;
        this.successRate = successRate;
        this.avgTimePerQuestion = avgTimePerQuestion;
        this.zloRating = zloRating;
        this.confidence = confidence;
        this.sessionScore = sessionScore;
        this.studentId = studentId;
    }

    // Getters
    public UUID getStatId() {
        return statId;
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

    public float getZloRating() {
        return zloRating;
    }

    public float getConfidence() {
        return confidence;
    }

    public float getSessionScore() {
        return sessionScore;
    }

    public UUID getStudentId() {
        return studentId;
    }

    // Setters
    public void setStatId(UUID statId) {
        this.statId = statId;
    }

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

    public void setZloRating(float zloRating) {
        this.zloRating = zloRating;
    }

    public void setConfidence(float confidence) {
        this.confidence = confidence;
    }

    public void setSessionScore(float sessionScore) {
        this.sessionScore = sessionScore;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }
}
