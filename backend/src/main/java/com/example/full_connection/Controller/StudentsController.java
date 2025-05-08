package com.example.full_connection.Controller;

import com.example.full_connection.Entity.Student;
import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Service.SessionService;
import com.example.full_connection.Repository.StudentRepository;
import com.example.full_connection.Repository.StatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Controller for managing student-related operations.
 * This class provides endpoints for students to interact with the system.
 *
 * Endpoints:
 * - Retrieve and update student-specific data.
 * - Manage student progress and statistics.
 *
 * Dependencies:
 * - StudentService for business logic.
 * - ModelMapper for DTO to entity conversions.
 */
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/students")
public class StudentsController {

    private final SessionService sessionService;
    private final StudentRepository studentRepository;
    private final StatisticsRepository statisticsRepository;

    @Autowired
    public StudentsController(SessionService sessionService,
                              StudentRepository studentRepository,
                              StatisticsRepository statisticsRepository) {
        this.sessionService = sessionService;
        this.studentRepository = studentRepository;
        this.statisticsRepository = statisticsRepository;
    }

    // Update or create ZLO statistics
    @PostMapping("/{usernameId}/updateZlo")
    public ResponseEntity<Double> updateZLO(
            @PathVariable UUID usernameId,
            @RequestBody Statistics statistics
    ) {
        System.out.println("Received ZLO data: " + statistics);

        Student student = studentRepository.findById(usernameId).orElse(null);
        if (student == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        double updatedZLO = sessionService.updateZLO(
                statistics.getTotalQuestionsRight(),
                statistics.getTotalQuestions(),
                statistics.getStreak(),
                statistics.getAvgTimeSpentInSession(),
                statistics.getAvgTimePerQuestion(),
                statistics.getSuccessRate(),
                student
        );

        Optional<Statistics> optionalStats = statisticsRepository.findByStudent(student);

        if (optionalStats.isPresent()) {
            Statistics existingStats = optionalStats.get();
            existingStats.setAvgTimePerQuestion(statistics.getAvgTimePerQuestion());
            existingStats.setGuessRate(statistics.getGuessRate());
            existingStats.setStreak(statistics.getStreak());
            existingStats.setSubjectMasteryValue(statistics.getSubjectMasteryValue());
            existingStats.setSuccessRate(statistics.getSuccessRate());
            existingStats.setAvgTimeSpentInSession(statistics.getAvgTimeSpentInSession());
            existingStats.setTotalQuestions(statistics.getTotalQuestions());
            existingStats.setTotalQuestionsRight(statistics.getTotalQuestionsRight());

            statisticsRepository.save(existingStats);
        } else {
            statistics.setStudent(student);
            statisticsRepository.save(statistics);
        }

        return ResponseEntity.ok(updatedZLO);
    }




    @GetMapping("{usernameId}/streak")
    public ResponseEntity<Integer> getStreak(@PathVariable UUID usernameId) {
        // look up the stats row
        Optional<Statistics> stats = statisticsRepository.findByStudent(
                studentRepository.findById(usernameId).orElse(null)
        );
        int streak = stats.map(Statistics::getStreak).orElse(0);
        return ResponseEntity.ok(streak);
    }
    // Get all students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get ZLO for a specific user
    @GetMapping("{usernameId}/zlo")
    public Float getZloRating(@PathVariable UUID usernameId) {
        Optional<Statistics> stats = statisticsRepository.findByStudentId(usernameId);
        return stats.get().getZloRating();
    }
    @GetMapping("{usernameId}/gradelevel")
    public Integer getGradeLevel(@PathVariable UUID usernameId) {
        Student student = studentRepository.findById(usernameId).orElse(null);
        if (student == null) {
            return null;
        }
        return student.getGradeLevel();
    }

    // Create a new student
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }
}
