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

@Service
public class SessionService {
    private final StatisticsRepository statisticsRepository;
    private final QuestionsRepository questionsRepository;
    private final StudentRepository studentRepository;

    @Autowired
    public SessionService(StatisticsRepository statisticsRepository, QuestionsRepository questionsRepository, StudentRepository studentRepository) {
        this.statisticsRepository = statisticsRepository;
        this.questionsRepository = questionsRepository;
        this.studentRepository = studentRepository;
    }

    private static final double weightPKSession = 0.2;
    private static final double weightPKAvg = 0.3;
    private static final double weightSStreak1 = 0.1;
    private static final double weightSStreak2 = 0.1;
    private static final double weightTq = 0.1;
    private static final double weightTqAvg = 0.1;
    private static final double weightPCorr1 = 0.1;
    private static final double weightPCorrAvg = 0.1;

    private static final double zloHard = 100;
    private static final double zloMed = 100;
    private static final double zloEasy = 0.9;

    public List<Questions> getQuestions() {
        try {
            return questionsRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch questions: " + e.getMessage(), e);
        }
    }

    public double calculateZLO(int totalQuestionsRight, int totalQuestions, int streak, float avgTimeSpentInSession, float avgTimePerQuestion, float successRate) {
        double knowledgeProbabilitySession = calculateKnowledgeProbability(totalQuestionsRight, totalQuestions);
        double knowledgeProbabilityAvg = calculateKnowledgeProbability(totalQuestionsRight, totalQuestions);

        return (weightPKSession * knowledgeProbabilitySession) +
               (weightPKAvg * knowledgeProbabilityAvg) +
               (weightSStreak1 * streak * (1 - knowledgeProbabilitySession)) +
               (weightSStreak2 * streak * knowledgeProbabilitySession) +
               (weightTq * (1 - avgTimeSpentInSession)) +
               (weightTqAvg * (1 - avgTimePerQuestion)) +
               (weightPCorr1 * successRate * knowledgeProbabilitySession) +
               (weightPCorrAvg * successRate * knowledgeProbabilityAvg);
    }

    private double calculateKnowledgeProbability(int totalCorrect, int totalQuestions) {
        if (totalQuestions == 0) {
            return -1;
        }
        return (double) totalCorrect / totalQuestions;
    }

    /**
     * Creates a new session for a student.
     *
     * @param studentUsernames The list of student usernames.
     * @param totalTimeInSessions The total time spent in sessions.
     * @param streak The user's current streak.
     * @param totalQuestions The total number of questions answered.
     * @param totalQuestionsRight The total number of questions answered correctly.
     * @param totalQuestionsWrong The total number of questions answered incorrectly.
     * @param sessionsCompleted The total number of sessions completed.
     * @param daysLoggedIn The total number of days the user has logged in.
     * @param subjectMasteryValue The user's subject mastery value.
     * @param guessRate The user's guess rate.
     * @param avgTimeSpentInSession The average time spent in a session.
     * @param successRate The user's success rate.
     * @param avgTimePerQuestion The average time spent per question.
     * @return The created session statistics.
     */
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
    ) {
        try {
            List<Student> students = studentRepository.findByUsernameIn(studentUsernames);
            if (students.isEmpty()) {
                throw new RuntimeException("Student not found!");
            }

            Student student = students.get(0);

            double zloRating = calculateZLO(totalQuestionsRight, totalQuestions, streak, avgTimeSpentInSession, avgTimePerQuestion, successRate);
            String questionDifficulty = getQuestionDifficulty(zloRating);
            Questions nextQuestion = getNextQuestionBasedOnDifficulty(questionDifficulty);

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

            student.setZloRating(zloRating);
            studentRepository.save(student);
            statisticsRepository.save(statistics);

            return statistics;
        } catch (Exception e) {
            throw new RuntimeException("Failed to create session: " + e.getMessage(), e);
        }
    }

    public String getQuestionDifficulty(double zloRating) {
        // For now, always return "easy"
        return "easy";
    }

    public Questions getNextQuestionBasedOnDifficulty(String difficulty) {
        try {
            List<Questions> questions = questionsRepository.findByDifficulty(difficulty);
            if (!questions.isEmpty()) {
                return questions.get(0);
            }
            return questionsRepository.findByDifficulty("medium").get(0);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch question by difficulty: " + e.getMessage(), e);
        }
    }

    public Questions getNextQuestion(int totalQuestionsRight, int totalQuestions, int streak, float avgTimeSpentInSession, float avgTimePerQuestion, float successRate, int gradeLevel) {
        try {
            double zloRating = calculateZLO(totalQuestionsRight, totalQuestions, streak, avgTimeSpentInSession, avgTimePerQuestion, successRate);
            String questionDifficulty = getQuestionDifficulty(zloRating);
            return getNextQuestionBasedOnDifficulty(questionDifficulty);
        } catch (Exception e) {
            throw new RuntimeException("Failed to get next question: " + e.getMessage(), e);
        }
    }

    public double updateZLO(int totalQuestionsRight, int totalQuestions, int streak, float avgTimeSpentInSession, float avgTimePerQuestion, float successRate, Student student) {
        try {
            double zloRating = calculateZLO(totalQuestionsRight, totalQuestions, streak, avgTimeSpentInSession, avgTimePerQuestion, successRate);
            student.setZloRating(zloRating);
            studentRepository.save(student);
            return zloRating;
        } catch (Exception e) {
            throw new RuntimeException("Failed to update ZLO: " + e.getMessage(), e);
        }
    }
}
