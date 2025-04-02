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

        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();

            for (Badges badge : allBadges) {
                Optional<BadgeProgress> badgeProgressOptional = badgeProgressRepository
                        .findByStudentAndBadge(student, badge);
                if (badgeProgressOptional.isPresent()) {
                    BadgeProgress badgeProgress = badgeProgressOptional.get();
                    if (badgeProgress.getProgress() >= badge.getBadgeRequirement()) {
                        earnedBadges.add(new EarnedBadgesDTO(
                                badge.getId(),
                                badge.getBadgeName(),
                                badge.getBadgeDescription(),
                                badgeProgress.getProgress()
                        ));
                    }
                }
            }
        }

        // Create a response object with all badges and earned badges
        Map<String, Object> response = new HashMap<>();
        response.put("allBadges", allBadges);
        response.put("earnedBadges", earnedBadges);

        return response;
    }
}