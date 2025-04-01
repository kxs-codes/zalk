package com.example.full_connection.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.full_connection.Entity.Educator;
import com.example.full_connection.Entity.Student;
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

    @GetMapping("/students-and-educators")
    public Map<String, List<?>> getStudentsAndEducators() {
        // Grab all students, save in list
        List<Student> students = studentService.getAllStudents();

        // Grab all educators, save in list
        List<Educator> educators = educatorService.getAllEducators();

        // Store in a hashmap
        Map<String, List<?>> users = new HashMap<>();
        users.put("students", students);
        users.put("educators", educators);

        // Return
        return users;
    }

    @PostMapping("/generate-classroom")
    public void generateClassroom() {
        // TODO - add return type, implementation in ClassroomsService.java
    }
}
