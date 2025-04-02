package com.example.full_connection.Controller;


import com.example.full_connection.Entity.Educator;
import com.example.full_connection.Repository.EducatorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/educator")
public class EducatorController {

    private final EducatorRepository educatorRepository;

    public EducatorController(EducatorRepository educatorRepository) {
        this.educatorRepository = educatorRepository;
    }

    // First need to make the service instance
    @GetMapping("/portal")
    public ResponseEntity<String> getEducatorPortal() {
        return ResponseEntity.ok("Educator Portal");
    }

    // Second need to make the receiving end for the request
    // GET mapping
    @GetMapping("/list")
    public ResponseEntity<String> getEducatorList() {
        List<String> all = educatorRepository.findAllEducators();
        return ResponseEntity.ok(all.toString());
    }



    // Third, we will need to make the exchanging part to where it will give the request
    // POST mapping

    // Return the Results (can be a json or status code)


}
