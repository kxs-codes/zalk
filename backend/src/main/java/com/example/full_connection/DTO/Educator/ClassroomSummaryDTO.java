package com.example.full_connection.DTO.Educator;

public class ClassroomSummaryDTO {
    

    private String subject;
    // Constructors for Filtering based on Class ID 
    private String classroom_id;
    private String classroom_student;

    // Constructor for Performance Average of entire classroom
    private int totalQuestionRight;
    private int totalQuestionWrong;

    // Constructor for Engagement Average of entire classroom
    private int totalTimeInSessions;
    private int sessionsCompleted;
    private int daysLoggedIn;
    private int avgTimeSpentInSession;

    public ClassroomSummaryDTO() {
        // Default constructor
    }
    public ClassroomSummaryDTO(String classroom_id, String classroom_subject, String classroom_student, int totalQuestionRight, int totalQuestionWrong,
                                int totalTimeInSessions, int sessionsCompleted, int daysLoggedIn, int avgTimeSpentInSession) {
        this.classroom_id = classroom_id;
        this.subject = classroom_subject;
        this.classroom_student = classroom_student;
        this.totalQuestionRight = totalQuestionRight;
        this.totalQuestionWrong = totalQuestionWrong;
        this.totalTimeInSessions = totalTimeInSessions;
        this.sessionsCompleted = sessionsCompleted;
        this.daysLoggedIn = daysLoggedIn;
        this.avgTimeSpentInSession = avgTimeSpentInSession;
    }

    // Section: Getters and Setters


    //  Getters for Filtering based on Class ID
    public String getClassroom_id() {
        return classroom_id;
    }
    public String getClassroom_student() {
        return classroom_student;
    }

    public String getSubject() {
        return subject;
    }

    // Getters for Performance Average of entire classroom
    public int getTotalQuestionRight() {
        return totalQuestionRight;
    }
    public int getTotalQuestionWrong() {
        return totalQuestionWrong;
    }
    // Getters for Engagement Average of entire classroom
    public int getTotalTimeInSessions() {
        return totalTimeInSessions;
    }
    public int getSessionsCompleted() {
        return sessionsCompleted;
    }
    public int getDaysLoggedIn() {
        return daysLoggedIn;
    }
    public int getAvgTimeSpentInSession() {
        return avgTimeSpentInSession;
    }

    // Setters for Filtering based on Class ID
    public void setClassroom_id(String classroom_id) {
        this.classroom_id = classroom_id;
    }
    public void setClassroom_student(String classroom_student) {
        this.classroom_student = classroom_student;
    }
    // Setters for Performance Average of entire classroom
    public void setTotalQuestionRight(int totalQuestionRight) {
        this.totalQuestionRight = totalQuestionRight;
    }

    public void setTotalQuestionWrong(int totalQuestionWrong) {
        this.totalQuestionWrong = totalQuestionWrong;
    }
    // Setters for Engagement Average of entire classroom
    public void setTotalTimeInSessions(int totalTimeInSessions) {
        this.totalTimeInSessions = totalTimeInSessions;
    }
    public void setSessionsCompleted(int sessionsCompleted) {
        this.sessionsCompleted = sessionsCompleted;
    }
    public void setDaysLoggedIn(int daysLoggedIn) {
        this.daysLoggedIn = daysLoggedIn;
    }
    public void setAvgTimeSpentInSession(int avgTimeSpentInSession) {
        this.avgTimeSpentInSession = avgTimeSpentInSession;
    }
    
    public void setSubject(String subject) {
        this.subject = subject;
    }

}
