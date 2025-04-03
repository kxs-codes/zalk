package com.example.full_connection.Service;

import com.example.full_connection.DTO.SessionDTO;
import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Entity.Questions;
import com.example.full_connection.Entity.Student;
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
    public SessionService(
            StatisticsRepository statisticsRepository,
            QuestionsRepository questionsRepository,
            StudentRepository studentRepository) {
        this.statisticsRepository = statisticsRepository;
        this.questionsRepository = questionsRepository;
        this.studentRepository = studentRepository;
    }

    public List<Questions> getQuestions() {
        return questionsRepository.findAll();
    }

    public Questions questionGenerator(SessionDTO sessionDTO) {
        List<Questions> questions = questionsRepository.findAll();
        if (!questions.isEmpty()) {
            return questions.get(0);
        }
        else {
            throw new RuntimeException("Questions not loading from the database currently");
        }
    }

    public Statistics createSession(SessionDTO sessionDTO) {
        List<Student> students = studentRepository.findByUsernameIn(sessionDTO.getStudentforSession());

        if (students.isEmpty()) {
            throw new RuntimeException("Student not found!");
        }

        Student student = students.get(0);

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

        student.setStatistics(statistics);

        return statisticsRepository.save(statistics);
    }
