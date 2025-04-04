package com.example.full_connection.Controller;

import com.example.full_connection.Entity.Student;
import com.example.full_connection.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/students")
public class StudentsController {

    // Step 1: Make the service to interact with students entity
    @Autowired
    private StudentService studentService;

    // Step 2: Create GET Mapping
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("{usernameId}/zlo")
    public Double getZloRating(@PathVariable UUID usernameId) {
        return studentService.getZloRating(usernameId);
    }

    // Step 3: Create POST mapping
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }


}
