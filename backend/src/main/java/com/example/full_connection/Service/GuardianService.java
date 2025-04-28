package com.example.full_connection.Service;

import com.example.full_connection.Entity.Guardian;
import com.example.full_connection.Repository.GuardianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class GuardianService {

    @Autowired
    private GuardianRepository guardianRepository;

    // Service method to fetch the associated student ID
    public Map<String, Object> getStudentIdByGuardian(UUID guardianId) {
        Map<String, Object> response = new HashMap<>();

        // Find the guardian by ID (UUID type)
        Guardian guardian = guardianRepository.findById(guardianId).orElse(null);

        if (guardian != null && guardian.getStudents() != null && !guardian.getStudents().isEmpty()) {
            // Get the first student from the guardian's list
            UUID studentId = guardian.getStudents().get(0).getId();
            response.put("studentId", studentId);
        } else {
            // Guardian not found or no students associated
            response.put("message", "Guardian or associated student not found.");
        }

        return response;
    }
}