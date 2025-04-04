package com.example.full_connection.Entity;
import java.util.UUID;
import jakarta.persistence.*;

@Entity
@Table(name = "statistics")
public class Statistics
{
    @Id
    @GeneratedValue
    @Column(name = "stat_id")
    private UUID statId;

    @Column(name = "total_time_in_sessions", nullable = false)
    private int totalTimeInSessions;

    @Column(nullable = false)
    private int streak;

    @Column(name = "total_questions", nullable = false)
    private int totalQuestions;

    @Column(name = "total_questions_right", nullable = false)
    private int totalQuestionsRight;

    @Column(name = "total_questions_wrong", nullable = false)
    private int totalQuestionsWrong;

    @Column(name = "sessions_completed", nullable = false)
    private int sessionsCompleted;

    @Column(name = "days_logged_in", nullable = false)
    private int daysLoggedIn;

    @Column(name = "subject_mastery_value", nullable = false)
    private int subjectMasteryValue;

    @Column(name = "guess_rate", nullable = false)
    private float guessRate;

    @Column(name = "avg_time_spent_in_session", nullable = false)
    private float avgTimeSpentInSession;

    @Column(name = "success_rate", nullable = false)
    private float successRate;

    @Column(name = "avg_time_per_question", nullable = false)
    private float avgTimePerQuestion;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "student_id", referencedColumnName = "student_id")
    private Student student;

    public UUID getStatId()
    {
        return statId;
    }

    public Student getStudent()
    {
        return student;
    }

    public int getTotalTimeInSessions()
    {
        return totalTimeInSessions;
    }

    public int getStreak()
    {
        return streak;
    }

    public int getTotalQuestions()
    {
        return totalQuestions;
    }

    public int getTotalQuestionsRight()
    {
        return totalQuestionsRight;
    }

    public int getTotalQuestionsWrong()
    {
        return totalQuestionsWrong;
    }

    public int getSessionsCompleted()
    {
        return sessionsCompleted;
    }

    public int getDaysLoggedIn()
    {
        return daysLoggedIn;
    }

    public int getSubjectMasteryValue()
    {
        return subjectMasteryValue;
    }

    public float getGuessRate()
    {
        return guessRate;
    }

    public float getAvgTimeSpentInSession()
    {
        return avgTimeSpentInSession;
    }

    public float getSuccessRate()
    {
        return successRate;
    }

    public float getAvgTimePerQuestion()
    {
        return avgTimePerQuestion;
    }

    public void setStatId(UUID statId)
    {
        this.statId = statId;
    }

    public void setStudent(Student student)
    {
        this.student = student;
    }

    public void setTotalTimeInSessions(int totalTimeInSessions)
    {
        this.totalTimeInSessions = totalTimeInSessions;
    }

    public void setStreak(int streak)
    {
        this.streak = streak;
    }

    public void setTotalQuestions(int totalQuestions)
    {
        this.totalQuestions = totalQuestions;
    }

    public void setTotalQuestionsRight(int totalQuestionsRight)
    {
        this.totalQuestionsRight = totalQuestionsRight;
    }

    public void setTotalQuestionsWrong(int totalQuestionsWrong)
    {
        this.totalQuestionsWrong = totalQuestionsWrong;
    }

    public void setSessionsCompleted(int sessionsCompleted)
    {
        this.sessionsCompleted = sessionsCompleted;
    }

    public void setDaysLoggedIn(int daysLoggedIn)
    {
        this.daysLoggedIn = daysLoggedIn;
    }

    public void setSubjectMasteryValue(int subjectMasteryValue)
    {
        this.subjectMasteryValue = subjectMasteryValue;
    }

    public void setGuessRate(float guessRate)
    {
        this.guessRate = guessRate;
    }

    public void setAvgTimeSpentInSession(float avgTimeSpentInSession)
    {
        this.avgTimeSpentInSession = avgTimeSpentInSession;
    }

    public void setSuccessRate(float successRate)
    {
        this.successRate = successRate;
    }

    public void setAvgTimePerQuestion(float avgTimePerQuestion)
    {
        this.avgTimePerQuestion = avgTimePerQuestion;
    }
}
