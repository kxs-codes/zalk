package com.example.full_connection.Controller;

import com.example.full_connection.Entity.Student;
import com.example.full_connection.Entity.Classrooms;
import com.example.full_connection.Service.SpreadsheetService;
import com.example.full_connection.Repository.StudentRepository;
import com.example.full_connection.Repository.ClassroomsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

/**
 * Controller for managing spreadsheet generation.
 * This class provides endpoints for creating Excel reports for students and classrooms.
 *
 * Endpoints:
 * - Generate student-specific Excel reports.
 * - Generate classroom-specific Excel reports.
 *
 * Dependencies:
 * - SpreadsheetService for Excel file creation logic.
 */

@RestController
@RequestMapping("/api/spreadsheet")
@CrossOrigin(origins = "http://localhost:5173")
public class SpreadsheetController {

    @Autowired
    private SpreadsheetService spreadsheetService;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ClassroomsRepository classroomRepository;

    @GetMapping("/student/{studentId}")
    public ResponseEntity<Resource> downloadStudentSpreadsheet(@PathVariable UUID studentId) throws IOException {

    Optional<Student> studentOpt = studentRepository.findById(studentId);
        if (studentOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        String path = spreadsheetService.generateStudentReport(studentOpt.get());
        return serveFile(path);
    }

    @GetMapping("/classroom/{classroomId}")
    public ResponseEntity<Resource> downloadClassroomSpreadsheet(@PathVariable UUID classroomId) throws IOException {
        Optional<Classrooms> classroomOpt = classroomRepository.findById(classroomId);
        if (classroomOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        String path = spreadsheetService.generateClassroomReport(classroomOpt.get());
        return serveFile(path);
    }

    private ResponseEntity<Resource> serveFile(String path) throws IOException {
        File file = new File(path);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .contentLength(file.length())
                .body(resource);
    }
}
