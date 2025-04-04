package com.example.full_connection.Entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "questions")
public class Questions
{
    @Id
    @GeneratedValue
    @Column(name = "questionId")
    private UUID questionId;

    @Column(nullable = false)
    private String question;

    @Column(nullable = false)
    private String answer;

    @Column(name = "question_type", nullable = false)
    private String questionType;

    @Column(name = "options", nullable = false)
    private String options;

    @Column(name = "grade_level", nullable = false)
    private int gradeLevel;

    @Column(nullable = false)
    private String difficulty;

    public UUID getQuestionId()
    {
        return questionId;
    }

    public String getQuestion()
    {
        return question;
    }

    public String getAnswer()
    {
        return answer;
    }

    public String getQuestionType()
    {
        return questionType;
    }

    public int getGradeLevel()
    {
        return gradeLevel;
    }

    public String getDifficulty()
    {
        return difficulty;
    }

    public String getOptions()
    {
        return options;
    }

    public void setQuestionId(UUID questionId)
    {
        this.questionId = questionId;
    }

    public void setQuestion(String question)
    {
        this.question = question;
    }

    public void setAnswer(String answer)
    {
        this.answer = answer;
    }

    public void setQuestionType(String questionType)
    {
        this.questionType = questionType;
    }

    public void setGradeLevel(int gradeLevel)
    {
        this.gradeLevel = gradeLevel;
    }

    public void setDifficulty(String difficulty)
    {
        this.difficulty = difficulty;
    }

    public void setOptions(String options)
    {
        this.options = options;
    }
}
