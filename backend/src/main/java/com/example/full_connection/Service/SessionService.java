package com.example.full_connection.Service;

import com.example.full_connection.DTO.SessionDTO;
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

    private static final double zloHard = 0.8; // For "hard" difficulty
    private static final double zloMed = 0.5; // For "medium" difficulty
    private static final double zloEasy = 0.3; // For "easy" difficulty

    public double calculateZLO(SessionDTO sessionDTO) {
        double knowledgeProbabilitySession = calculateKnowledgeProbability(sessionDTO.getTotalQuestionsRight(), sessionDTO.getTotalQuestions());
        double knowledgeProbabilityAvg = calculateKnowledgeProbability(sessionDTO.getTotalQuestionsRight(), sessionDTO.getTotalQuestions());
        double studentStreak = sessionDTO.getStreak();
        double avgTimeSpentInSession = sessionDTO.getAvgTimeSpentInSession();
        double avgTimePerQuestion = sessionDTO.getAvgTimePerQuestion();
        double successRate = sessionDTO.getSuccessRate();
        double avgSuccessRate = sessionDTO.getSuccessRate();

        double zlo =
                (weightPKSession * knowledgeProbabilitySession) +
                        (weightPKAvg * knowledgeProbabilityAvg) +
                        (weightSStreak1 * studentStreak * (1 - knowledgeProbabilitySession)) +
                        (weightSStreak2 * studentStreak * knowledgeProbabilitySession) +
                        (weightTq * (1 - avgTimeSpentInSession)) +
                        (weightTqAvg * (1 - avgTimePerQuestion)) +
                        (weightPCorr1 * successRate * knowledgeProbabilitySession) +
                        (weightPCorrAvg * avgSuccessRate * knowledgeProbabilityAvg);
        return zlo;
    }

    private double calculateKnowledgeProbability(int totalCorrect, int totalQuestions) {
        if (totalQuestions == 0) {
            return 0;
        }
        return (double) totalCorrect / totalQuestions;
    }

    public Statistics createSession(SessionDTO sessionDTO) {
        List<Student> students = studentRepository.findByUsernameIn(sessionDTO.getStudentforSession());

        if (students.isEmpty()) {
            throw new RuntimeException("Student not found!");
        }

        Student student = students.get(0);
        double zloRating = calculateZLO(sessionDTO);


        String questionDifficulty = getQuestionDifficulty(zloRating);


        Question nextQuestion = getNextQuestionBasedOnDifficulty(questionDifficulty);
        
        Statistics statistics = new Statistics();
        statistics.setStudent(student);
        statistics.setTotalTimeInSessions(sessionDTO.getTotalTimeInSessions());
        statistics.setStreak(sessionDTO.getStreak());
        statistics.setTotalQuestions(sessionDTO.getTotalQuestions());
        statistics.setTotalQuestionsRight(sessionDTO.getTotalQuestionsRight());
        statistics.setTotalQuestionsWrong(sessionDTO.getTotalQuestionsWrong());
        statistics.setSessionsCompleted(sessionDTO.getSessionsCompleted());
        statistics.setDaysLoggedIn(sessionDTO.getDaysLoggedIn());
        statistics.setSubjectMasteryValue(sessionDTO.getSubjectMasteryValue());
        statistics.setGuessRate(sessionDTO.getGuessRate());
        statistics.setAvgTimeSpentInSession(sessionDTO.getAvgTimeSpentInSession());
        statistics.setSuccessRate(sessionDTO.getSuccessRate());
        statistics.setAvgTimePerQuestion(sessionDTO.getAvgTimePerQuestion());
        student.setZloRating(zloRating);

        student.setStatistics(statistics);
        studentRepository.save(student);
        statisticsRepository.save(statistics);

        return statistics;
    }

    private String getQuestionDifficulty(double zloRating) {
        if (zloRating >= zloHard) {
            return "hard";
        } else if (zloRating >= zloMed) {
            return "medium";
        } else {
            return "easy";
        }
    }

    private Question getNextQuestionBasedOnDifficulty(String difficulty) {
        List<Question> questions = questionsRepository.findByDifficulty(difficulty);

        if (!questions.isEmpty())
        {
            return questions.get(0);
        }

        return questionsRepository.findByDifficulty("medium").get(0); // fallback
    }
    public Question getNextQuestion(SessionDTO sessionDTO) {
        double zloRating = calculateZLO(sessionDTO);
        String questionDifficulty = getQuestionDifficulty(zloRating);
        return getNextQuestionBasedOnDifficulty(questionDifficulty);
    }
}
