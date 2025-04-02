package com.example.full_connection.Controller;

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

    // POST request to update badge progress
    @PostMapping("/updateProgress")
    public void updateBadgeProgress(
            @RequestParam UUID studentId,
            @RequestParam UUID badgeId,
            @RequestParam double newProgress
    )
    {
        badgesService.updateBadgeProgress(studentId, badgeId, newProgress);
    }

    @GetMapping("/student/{id}/all-badges")
    public ResponseEntity<Map<String, Object>> getAllBadgesWithEarned(@PathVariable UUID id) {
        Map<String, Object> badgesData = badgesService.getAllBadgesWithEarned(id);
        return ResponseEntity.ok(badgesData);
    }
}