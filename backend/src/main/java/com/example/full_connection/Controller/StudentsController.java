package com.example.full_connection.Controller;

import com.example.full_connection.Entity.Students;
import com.example.full_connection.Service.StudentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/students")
public class StudentsController {
    // Step 1: Make the service to interact with students entity
    @Autowired
    private StudentsService studentsService;

    // Step 2: Create GET Mapping
    @GetMapping
    public List<Students> getAllStudents() {
        return studentsService.getAllStudents();
    }

    // Step 3: Create POST mapping
    @PostMapping
    public Students createStudent(@RequestBody Students student) {
        // Save student
        return studentsService.addStudent(student);
    }
}
