package com.example.full_connection.DTO.Educator;

public class ClassroomSummaryDTO {
    private String classroomId;
    private String subject;
    private String subjectLevel;
    private String studentUsername;
    private int totalRight;
    private int totalWrong;
    private int totalTimeInSession;
    private int sessionsCompleted;
    private int daysLoggedIn;
    private int avgTime;

    public ClassroomSummaryDTO() {}

    public ClassroomSummaryDTO(String classroomId, String subject, String subjectLevel, String studentUsername,
                                int totalRight, int totalWrong, int totalTimeInSession, int sessionsCompleted,
                                int daysLoggedIn, int avgTime) {
        this.classroomId = classroomId;
        this.subject = subject;
        this.subjectLevel = subjectLevel;
        this.studentUsername = studentUsername;
        this.totalRight = totalRight;
        this.totalWrong = totalWrong;
        this.totalTimeInSession = totalTimeInSession;
        this.sessionsCompleted = sessionsCompleted;
        this.daysLoggedIn = daysLoggedIn;
        this.avgTime = avgTime;
    }

    // Getters and Setters
    public String getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(String classroomId) {
        this.classroomId = classroomId;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getSubjectLevel() {
        return subjectLevel;
    }

    public void setSubjectLevel(String subjectLevel) {
        this.subjectLevel = subjectLevel;
    }

    public String getStudentUsername() {
        return studentUsername;
    }

    public void setStudentUsername(String studentUsername) {
        this.studentUsername = studentUsername;
    }

    public int getTotalRight() {
        return totalRight;
    }

    public void setTotalRight(int totalRight) {
        this.totalRight = totalRight;
    }

    public int getTotalWrong() {
        return totalWrong;
    }

    public void setTotalWrong(int totalWrong) {
        this.totalWrong = totalWrong;
    }

    public int getTotalTimeInSession() {
        return totalTimeInSession;
    }

    public void setTotalTimeInSession(int totalTimeInSession) {
        this.totalTimeInSession = totalTimeInSession;
    }

    public int getSessionsCompleted() {
        return sessionsCompleted;
    }

    public void setSessionsCompleted(int sessionsCompleted) {
        this.sessionsCompleted = sessionsCompleted;
    }

    public int getDaysLoggedIn() {
        return daysLoggedIn;
    }

    public void setDaysLoggedIn(int daysLoggedIn) {
        this.daysLoggedIn = daysLoggedIn;
    }

    public int getAvgTime() {
        return avgTime;
    }

    public void setAvgTime(int avgTime) {
        this.avgTime = avgTime;
    }
}
