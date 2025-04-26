package com.example.full_connection.Controller.Student;

import com.example.full_connection.Service.BadgesService;
import com.example.full_connection.DTO.EarnedBadgesDTO;
import com.example.full_connection.Entity.Badges;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/badges")
public class BadgesController {
    @Autowired
    private BadgesService badgesService;

    // Map Get request
    @GetMapping("/student/{id}/all-badges")
    public ResponseEntity<Map<String, Object>> getAllBadgesWithEarned(@PathVariable UUID id) {
        // Calls service to fetch badges with the progress data and earned badges
        Map<String, Object> badgesData = badgesService.getAllBadgesWithEarned(id);
        // Return badges data wrapped in OK response
        return ResponseEntity.ok(badgesData);
    }
}