package com.example.full_connection.Entity;

// JPA annotations like @Id, @Column, @GeneratedValue, etc.
import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class Questions {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String question;

    @Column(nullable = false)
    private String answer;

    @Column(name = "question_type", nullable = false)
    private String questionType;

    @Column(name = "grade_level", nullable = false)
    private int gradeLevel;

    @Column(nullable = false)
    private int rating;

    // Getters
    public UUID getId() {
        return id;
    }
    public String getQuestion() {
        return question;
    }
    public String getAnswer() {
        return answer;
    }
    public String getQuestionType() {
        return questionType;
    }
    public int getGradeLevel() {
        return gradeLevel;
    }
    public int getRating() {
        return rating;
    }

    // Setters
    public void setId(UUID id) {
        this.id = id;
    }
    public void setQuestion(String question) {
        this.question = question;
    }
    public void setAnswer(String answer) {
        this.answer = answer;
    }
    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }
    public void setGradeLevel(int gradeLevel) {
        this.gradeLevel = gradeLevel;
    }
    public void setRating(int rating) {
        this.rating = rating;
    }
}
