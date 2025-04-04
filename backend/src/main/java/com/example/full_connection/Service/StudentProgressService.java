package com.example.full_connection.Service;

import com.example.full_connection.DTO.StudentProgressDTO;
import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Entity.Student;
import com.example.full_connection.Repository.StatisticsRepository;
import com.example.full_connection.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class StudentProgressService {

    @Autowired
    private StatisticsRepository statisticsRepository;

    @Autowired
    private StudentRepository studentRepository;  // Add StudentRepository

    public StudentProgressDTO getStudentProgress(UUID studentId) {
        Optional<Student> student = studentRepository.findById(studentId);

        if (student.isPresent()) {
            Optional<Statistics> statsOpt = statisticsRepository.findByStudent(student.get());

            if (statsOpt.isPresent()) {
                Statistics stats = statsOpt.get();
                return new StudentProgressDTO(
                        stats.getTotalTimeInSessions(),
                        stats.getTotalQuestions(),
                        stats.getTotalQuestionsRight(),
                        stats.getSessionsCompleted(),
                        stats.getDaysLoggedIn()
                );
            }
        }
        return null;
    }
}
