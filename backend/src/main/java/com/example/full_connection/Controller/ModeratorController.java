package com.example.full_connection.Controller;

import java.util.ArrayList;
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
import com.example.full_connection.Entity.Educator;
import com.example.full_connection.Entity.Student;
import com.example.full_connection.Repository.EducatorRepository;
import com.example.full_connection.Repository.StudentRepository;
import com.example.full_connection.Service.ClassroomsService;
import com.example.full_connection.Service.EducatorService;
import com.example.full_connection.Service.StudentService;

// On create classroom page you grab the following information (HTTP GET)
//  - All Educators
//  - All Students
//  - On frontend, have preapproved subject names

//

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

    @Autowired
    private EducatorRepository educatorRepository;

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/students-and-educators")
    public ResponseEntity<Map<String, List<Object>>> getStudentsAndEducators() {
        // Grab all students, save in list
        List<Student> students = studentService.getAllStudents();

        // Grab all educators, save in list
        List<Educator> educators = educatorService.getAllEducators();

        // TODO, just grab names of students and educators instead of objects

        // Store in a hashmap
        Map<String, List<Object>> users = new HashMap<>();
        users.put("students", new ArrayList<>(students));
        users.put("educators", new ArrayList<>(educators));

        // Return
        return ResponseEntity.ok(users);
    }

    @PostMapping("/generate-classroom")
    public ResponseEntity<String> generateClassroom(@RequestBody FormDataModerator formDataModerator) {
        Educator educator = educatorRepository.findByUsername(formDataModerator.getEducatorName())
            .orElseThrow(() -> new RuntimeException("Educator not found"));

        List<Student> students = studentRepository.findByUsernameIn(formDataModerator.getStudents());

        Classrooms classroom = new Classrooms();
        classroom.setSubject(formDataModerator.getSubjectName());
        classroom.setSubjectLevel(formDataModerator.getSubjectLevel());
        classroom.setStudents(students);
        classroom.setEducator(educator);

        classroomsService.addClassroom(classroom);

        return ResponseEntity.ok("Classroom created successfully");
    }
}
