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
/**
 * Service class for managing student progress-related operations.
 */
public class StudentProgressService {

    @Autowired
    private StatisticsRepository statisticsRepository;

    @Autowired
    private StudentRepository studentRepository;

    /*Retrieves the progress statistics for a specific student using their UUID.
     This includes session time, questions answered, correct answers, sessions completed,
     and days logged in. */
    public StudentProgressDTO getStudentProgress(UUID studentId) {
        // Find the student by ID
        Optional<Student> student = studentRepository.findById(studentId);

        // Continues if the student exists
        if (student.isPresent()) {
            // Look up the statistics entity associated with the student
            Optional<Statistics> statsOpt = statisticsRepository.findByStudent(student.get());

            // Check if the statistics exist
            if (statsOpt.isPresent()) {
                Statistics stats = statsOpt.get();

                // Map the entity fields to a DTO and return it
                return new StudentProgressDTO(
                        stats.getTotalTimeInSessions(),
                        stats.getTotalQuestions(),
                        stats.getTotalQuestionsRight(),
                        stats.getSessionsCompleted(),
                        stats.getDaysLoggedIn()
                );
            }
        }
        // Return null if either the student or statistics were not found
        return null;
    }
}
