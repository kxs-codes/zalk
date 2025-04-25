package com.example.full_connection.Controller.Student;

import com.example.full_connection.DTO.StudentProgressDTO;
import com.example.full_connection.Service.StudentProgressService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/student-progress")
public class StudentProgressController {

    @Autowired
    private StudentProgressService studentProgressService;

    // Mapping get request
    @GetMapping("/progress/{id}")
    public ResponseEntity<StudentProgressDTO> getStudentProgress(@PathVariable UUID id) {
        // Calling the service file to get the student's progress
        StudentProgressDTO progress = studentProgressService.getStudentProgress(id);
        // Return the data in an OK response
        return ResponseEntity.ok(progress);
    }
}