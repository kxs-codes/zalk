package com.example.full_connection.Controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.full_connection.DTO.FormDataModerator;
import com.example.full_connection.Entity.Classrooms;
import com.example.full_connection.Service.ClassroomsService;
import com.example.full_connection.Service.EducatorService;
import com.example.full_connection.Service.StudentService;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/moderator")
public class ModeratorController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private EducatorService educatorService;

    @Autowired
    private ClassroomsService classroomsService;

    @GetMapping("/students-and-educators")
    public ResponseEntity<Map<String, List<String>>> getStudentsAndEducators() {        
        // Grab all students
        List<String> students = studentService.getAllStudentNames();

        // Grab all educators
        List<String> educators = educatorService.getAllEducatorNames();

        // Store in a hashmap
        Map<String, List<String>> users = new HashMap<>();
        users.put("students", new ArrayList<>(students));
        users.put("educators", new ArrayList<>(educators));

        // Return
        return ResponseEntity.ok(users);
    }

    @PostMapping("/generate-classroom")
    public ResponseEntity<String> generateClassroom(@RequestBody FormDataModerator formDataModerator) {
        // 1. Validate input
        if (!educatorService.existsByUsername(formDataModerator.getEducatorName())) {
            return ResponseEntity.badRequest().body("Educator not found");
        }
        if (!studentService.existsByUsernames(formDataModerator.getStudents())) {
            return ResponseEntity.badRequest().body("Students not found");
        }
        if (!"Math".equals(formDataModerator.getSubjectName())) {
            return ResponseEntity.badRequest().body("Subject not valid");
        }
        List<String> validLevels = new ArrayList<>(Arrays.asList("K", "1", "2", "3", "4", "5", "6"));
        if (!validLevels.contains(formDataModerator.getSubjectLevel())) {
            return ResponseEntity.badRequest().body("Subject level not valid");
        }

        // 2. Call the service layer
        Classrooms savedClassroom = classroomsService.createClassroom(formDataModerator);

        // 3. Return response
        return ResponseEntity.ok("Classroom created successfully: " + savedClassroom.getClassId().toString());
    }
}
