package com.example.full_connection.Controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.full_connection.DTO.Educator.ClassroomSummaryDTO;
import com.example.full_connection.DTO.Educator.ManageClassroomDTO;
import com.example.full_connection.Repository.EducatorRepository;
import com.example.full_connection.Service.EducatorService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/educator")
public class EducatorController {

    private EducatorRepository educatorRepository;
    private EducatorService educatorService;

    public EducatorController(EducatorService educatorService, EducatorRepository educatorRepository) {
        this.educatorService = educatorService;
        this.educatorRepository = educatorRepository;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.badRequest()
            .header("Content-Type", "application/json")
            .body("{\"error\": \"" + ex.getMessage() + "\"}");
    }

    @GetMapping("/{educatorId}")
    public ResponseEntity<List<ClassroomSummaryDTO>> getClassroomsByEducatorId(@PathVariable UUID educatorId) {
        System.out.println("this is educator it -> " + educatorId);
        List<ClassroomSummaryDTO> summary = educatorService.getClassroomsByEducatorID(educatorId);
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/list")
    public ResponseEntity<String> getEducatorList() {
        List<String> all = educatorRepository.findAllEducators();
        return ResponseEntity.ok(all.toString());
    }

    @GetMapping("/classrooms")
    public ResponseEntity<List<ManageClassroomDTO>> getClassrooms(@RequestParam UUID educatorId) {
        System.out.println("Received educatorId: " + educatorId); // Debug log
        if (educatorId == null) {
            throw new IllegalArgumentException("educatorId is required");
        }
        List<ManageClassroomDTO> classrooms = educatorService.getManageClassroomsByEducatorId(educatorId);
        return ResponseEntity.ok()
            .header("Content-Type", "application/json") // Explicitly set Content-Type
            .body(classrooms);
    }
}
