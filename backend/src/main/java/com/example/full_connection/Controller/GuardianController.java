package com.example.full_connection.Controller;

import com.example.full_connection.Service.GuardianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.UUID;

/**
 * Controller for managing guardian-related operations.
 * This class provides endpoints for guardians to interact with the system.
 *
 * Endpoints:
 * - Add, update, and delete guardian information.
 * - Retrieve guardian details and associated data.
 *
 * Dependencies:
 * - GuardianService for business logic.
 * - ModelMapper for DTO to entity conversions.
 */
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/guardian")
public class GuardianController {

    @Autowired
    private GuardianService guardianService;

    // Endpoint for guardian to fetch student ID
    @GetMapping("/student-id/{guardianId}")
    public Map<String, Object> getStudentIdByGuardian(@PathVariable UUID guardianId) {
        return guardianService.getStudentIdByGuardian(guardianId);
    }
}