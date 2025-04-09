package com.example.full_connection.Service;

import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Entity.Student;
import com.example.full_connection.Entity.Questions;
import com.example.full_connection.Repository.StatisticsRepository;
import com.example.full_connection.Repository.QuestionsRepository;
import com.example.full_connection.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
//Handles session generation with ZLO algorithm employed
@Service
public class SessionService
{
    private final StatisticsRepository statisticsRepository;
    private final QuestionsRepository questionsRepository;
    private final StudentRepository studentRepository;

    @Autowired
    public SessionService(StatisticsRepository statisticsRepository, QuestionsRepository questionsRepository, StudentRepository studentRepository)
    {
        this.statisticsRepository = statisticsRepository;
        this.questionsRepository = questionsRepository;
        this.studentRepository = studentRepository;
    }
    //Predictive Weighting
    private static final double weightPKSession = 0.2;
    private static final double weightPKAvg = 0.3;
    private static final double weightSStreak1 = 0.1;
    private static final double weightSStreak2 = 0.1;
    private static final double weightTq = 0.1;
    private static final double weightTqAvg = 0.1;
    private static final double weightPCorr1 = 0.1;
    private static final double weightPCorrAvg = 0.1;
    //Difficulty values
    private static final double zloHard = 100;
    private static final double zloMed = 100;
    private static final double zloEasy = 0.9;
    //Get questions
    public List<Questions> getQuestions()
    {
        return questionsRepository.findAll();
    }
    //Calculate ZLO algoritm
    public double calculateZLO(int totalQuestionsRight, int totalQuestions, int streak, float avgTimeSpentInSession, float avgTimePerQuestion, float successRate)
    {
        double knowledgeProbabilitySession = calculateKnowledgeProbability(totalQuestionsRight, totalQuestions);
        double knowledgeProbabilityAvg = calculateKnowledgeProbability(totalQuestionsRight, totalQuestions);

        double zloRating =
                (weightPKSession* knowledgeProbabilitySession)+
                        (weightPKAvg * knowledgeProbabilityAvg) +
                        (weightSStreak1 * streak * (1 -knowledgeProbabilitySession)) +
                        (weightSStreak2 * streak * knowledgeProbabilitySession) +
                        (weightTq * (1 -avgTimeSpentInSession)) +
                        (weightTqAvg * (1 -avgTimePerQuestion)) +
                        (weightPCorr1* successRate * knowledgeProbabilitySession)+
                        (weightPCorrAvg * successRate * knowledgeProbabilityAvg);

        return zloRating;
    }
    //Calculate knowledge mastery based on success rates
    private double calculateKnowledgeProbability(int totalCorrect, int totalQuestions)
    {
        if (totalQuestions == 0)
        {
            return -1;
        }
        return (double) totalCorrect / totalQuestions;
    }
    //Session generation
    public Statistics createSession(
            List<String> studentUsernames,
            int totalTimeInSessions,
            int streak,
            int totalQuestions,
            int totalQuestionsRight,
            int totalQuestionsWrong,
            int sessionsCompleted,
            int daysLoggedIn,
            int subjectMasteryValue,
            float guessRate,
            float avgTimeSpentInSession,
            float successRate,
            float avgTimePerQuestion
    )
    {
        List<Student> students = studentRepository.findByUsernameIn(studentUsernames);

        if (students.isEmpty())
        {
            throw new RuntimeException("Student not found!");
        }

        Student student = students.get(0);

        double zloRating = calculateZLO(totalQuestionsRight, totalQuestions, streak, avgTimeSpentInSession, avgTimePerQuestion, successRate);

        String questionDifficulty = getQuestionDifficulty(zloRating);
        Questions nextQuestion = getNextQuestionBasedOnDifficulty(questionDifficulty);
        //Question modification
        Statistics statistics = new Statistics();
        statistics.setStudent(student);
        statistics.setTotalTimeInSessions(totalTimeInSessions);
        statistics.setStreak(streak);
        statistics.setTotalQuestions(totalQuestions);
        statistics.setTotalQuestionsRight(totalQuestionsRight);
        statistics.setTotalQuestionsWrong(totalQuestionsWrong);
        statistics.setSessionsCompleted(sessionsCompleted);
        statistics.setDaysLoggedIn(daysLoggedIn);
        statistics.setSubjectMasteryValue(subjectMasteryValue);
        statistics.setGuessRate(guessRate);
        statistics.setAvgTimeSpentInSession(avgTimeSpentInSession);
        statistics.setSuccessRate(successRate);
        statistics.setAvgTimePerQuestion(avgTimePerQuestion);
        //Set ZLO value
        student.setZloRating(zloRating);
        studentRepository.save(student);

        statisticsRepository.save(statistics);

        return statistics;
    }
    //Difficulty logic
    public String getQuestionDifficulty(double zloRating)
    {
        /*if (zloRating >= zloHard)
        {
            return "hard";
        }
        else if (zloRating >= zloMed)
        {
            return "medium";
        }
        else
        {
            return "easy";
        }*/
        return "easy";
    }

    public Questions getNextQuestionBasedOnDifficulty(String difficulty)
    {
        List<Questions> questions = questionsRepository.findByDifficulty(difficulty);

        if (!questions.isEmpty())
        {
            return questions.get(0);
        }
        //default
        return questionsRepository.findByDifficulty("medium").get(0);
    }
    //Picks next question based on values
    public Questions getNextQuestion(int totalQuestionsRight, int totalQuestions, int streak, float avgTimeSpentInSession, float avgTimePerQuestion, float successRate, int gradeLevel)
    {
        double zloRating = calculateZLO(totalQuestionsRight, totalQuestions, streak, avgTimeSpentInSession, avgTimePerQuestion, successRate);
        String questionDifficulty = getQuestionDifficulty(zloRating);
        return getNextQuestionBasedOnDifficulty(questionDifficulty);
    }
    //Updates ZLO
    public double updateZLO(int totalQuestionsRight, int totalQuestions, int streak, float avgTimeSpentInSession, float avgTimePerQuestion, float successRate, Student student)
    {
        double zloRating = calculateZLO(totalQuestionsRight, totalQuestions, streak, avgTimeSpentInSession, avgTimePerQuestion, successRate);
        student.setZloRating(zloRating);
        studentRepository.save(student);

        return zloRating;
    }
}
