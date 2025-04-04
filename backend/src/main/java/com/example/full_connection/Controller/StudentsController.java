package com.example.full_connection.Controller;

import com.example.full_connection.Entity.Student;
import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Service.SessionService;
import com.example.full_connection.Repository.StudentRepository;
import com.example.full_connection.Repository.StatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/students")
public class StudentsController
{
    //Gets ZLO score for student ratins
    private final SessionService sessionService;
    private final StudentRepository studentRepository;
    private final StatisticsRepository statisticsRepository;

    @Autowired
    public StudentsController(SessionService sessionService,
                              StudentRepository studentRepository,
                              StatisticsRepository statisticsRepository)
    {
        this.sessionService = sessionService;
        this.studentRepository = studentRepository;
        this.statisticsRepository = statisticsRepository;
    }
    //Post for ZLO rating; saves to student data
    @PostMapping("/{usernameId}/updateZlo")
    public ResponseEntity<Double> updateZLO(
            @PathVariable UUID usernameId,
            @RequestBody Statistics statistics
    )
    {
        Student student = studentRepository.findById(usernameId).orElse(null);

        double updatedZLO = sessionService.updateZLO(
                statistics.getTotalQuestionsRight(),
                statistics.getTotalQuestions(),
                statistics.getStreak(),
                statistics.getAvgTimeSpentInSession(),
                statistics.getAvgTimePerQuestion(),
                statistics.getSuccessRate(),
                student
        );

        statistics.setStudent(student);
        statisticsRepository.save(statistics);

        //Return updated elo
        return ResponseEntity.ok(updatedZLO);
    }
    //Get students
    @GetMapping
    public List<Student> getAllStudents()
    {
        return studentRepository.findAll();
    }
    //Get ZLO for user
    @GetMapping("{usernameId}/zlo")
    public Double getZloRating(@PathVariable UUID usernameId)
    {
        Student student = studentRepository.findById(usernameId).orElse(null);

        if (student == null)
        {
            return null;
        }

        return student.getZloRating();
    }
    //Student handling
    @PostMapping
    public Student createStudent(@RequestBody Student student)
    {
        return studentRepository.save(student);
    }
}
