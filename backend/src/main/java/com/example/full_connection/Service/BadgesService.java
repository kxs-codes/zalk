package com.example.full_connection.Service;

import com.example.full_connection.Entity.BadgeProgress;
import com.example.full_connection.Entity.Badges;
import com.example.full_connection.Entity.Student;
import com.example.full_connection.Repository.BadgeProgressRepository;
import com.example.full_connection.Repository.BadgesRepository;
import com.example.full_connection.Repository.StudentRepository;
import com.example.full_connection.DTO.EarnedBadgesDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BadgesService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private BadgesRepository badgesRepository;

    @Autowired
    private BadgeProgressRepository badgeProgressRepository;

    public Map<String, Object> getAllBadgesWithEarned(UUID studentId) {
        List<Badges> allBadges = badgesRepository.findAll();
        List<EarnedBadgesDTO> earnedBadges = new ArrayList<>();
        List<Map<String, Object>> allBadgesWithProgress = new ArrayList<>();

        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();

            for (Badges badge : allBadges) {
                Optional<BadgeProgress> badgeProgressOptional = badgeProgressRepository.findByStudentAndBadge(student, badge);

                // Get progress
                int progress = badgeProgressOptional.map(BadgeProgress::getProgress).orElse(0); // Default to 0 if no progress found

                int badgeRequirement = badge.getBadgeRequirement();

                // Constructing a badge object containin a badge's id, name, description, requirement and progress
                Map<String, Object> badgeData = new HashMap<>();
                badgeData.put("id", badge.getId());
                badgeData.put("badgeName", badge.getBadgeName());
                badgeData.put("badgeDescription", badge.getBadgeDescription());
                badgeData.put("badgeRequirement", badgeRequirement);
                badgeData.put("progress", progress);

                allBadgesWithProgress.add(badgeData);

                // Checking if the badge is earned based on student's progress and student's requirement
                if (progress >= badgeRequirement) {
                    earnedBadges.add(new EarnedBadgesDTO(
                            badge.getId(),
                            badge.getBadgeName(),
                            badge.getBadgeDescription(),
                            progress
                    ));
                }
            }
        }
        // Response object to be sent to controller
        Map<String, Object> response = new HashMap<>();
        response.put("allBadges", allBadgesWithProgress);
        response.put("earnedBadges", earnedBadges);

        return response;
    }
}