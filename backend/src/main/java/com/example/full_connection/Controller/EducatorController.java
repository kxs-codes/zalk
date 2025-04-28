package com.example.full_connection.Controller;

import java.util.List;
import java.util.UUID;
import java.util.ArrayList;

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
import com.example.full_connection.Entity.Educator;
import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.DTO.Educator.ClassProgressDTO;
import com.example.full_connection.Repository.EducatorRepository;
import com.example.full_connection.Service.EducatorService;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/educator")
public class EducatorController {


    private final EducatorRepository educatorRepository;
    private final EducatorService educatorService;

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

  @GetMapping("/progress")
    public ResponseEntity<List<ClassProgressDTO>> getProgress(
            @RequestParam(required = false) UUID educatorId,
            @RequestParam(required = false) UUID classId,
            @RequestParam(required = false) UUID studentId) {

        if (educatorId == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Educator educator = educatorRepository.findById(educatorId)
                .orElseThrow(() -> new IllegalArgumentException("Educator not found"));

        List<ClassProgressDTO> progressList = new ArrayList<>();

        educator.getClassrooms().forEach(classroom -> {
            UUID currentClassId = classroom.getClassId();
            String className = classroom.getSubject();

            if (classId != null && !currentClassId.equals(classId)) return; // Filter specific class if provided

            classroom.getStudents().forEach(student -> {
                if (studentId != null && !student.getId().equals(studentId)) return; // Filter specific student

                Statistics stats = student.getStatistics();
                if (stats != null) {
                    ClassProgressDTO dto = new ClassProgressDTO();
                    dto.setClassId(currentClassId.toString());
                    dto.setName(className);
                    dto.setUsername(student.getUsername());
                    dto.setStudentId(student.getId());
                    int total = stats.getTotalQuestionsRight() + stats.getTotalQuestionsWrong();
                    int score = total > 0 ? (stats.getTotalQuestionsRight() * 100 / total) : 0;
                    dto.setScore(score);
                    progressList.add(dto);
                }
            });
        });

        return ResponseEntity.ok(progressList);
    }

}
