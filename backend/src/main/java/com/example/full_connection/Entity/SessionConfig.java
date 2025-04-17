package com.example.full_connection.Entity;

import java.util.UUID;
import jakarta.persistence.*;

@Entity
@Table(name = "session_config")
public class SessionConfig {
    @Id
    @GeneratedValue
    @Column(name = "session_config_id")
    private UUID sessionConfigId;

    @Column(nullable = false)
    private String difficulty;

    @Column(nullable = false)
    private int duration;

    @Column(name = "subject_config", nullable = false)
    private String subjectConfig;

    @Column(name = "grade_level", nullable = false)
    private int gradeLevel;

    @Column(name = "question_format", nullable = false)
    private String questionFormat;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "class_id", referencedColumnName = "class_id")
    private Classroom classroom;

    // Getters
    public UUID getSessionConfigId() {
        return sessionConfigId;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public int getDuration() {
        return duration;
    }

    public String getSubjectConfig() {
        return subjectConfig;
    }

    public int getGradeLevel() {
        return gradeLevel;
    }

    public String getQuestionFormat() {
        return questionFormat;
    }

    public Classroom getClassroom() {
        return classroom;
    }

    // Setters
    public void setSessionConfigId(UUID sessionConfigId) {
        this.sessionConfigId = sessionConfigId;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public void setSubjectConfig(String subjectConfig) {
        this.subjectConfig = subjectConfig;
    }

    public void setGradeLevel(int gradeLevel) {
        this.gradeLevel = gradeLevel;
    }

    public void setQuestionFormat(String questionFormat) {
        this.questionFormat = questionFormat;
    }

    public void setClassroom(Classroom classroom) {
        this.classroom = classroom;
    }
}