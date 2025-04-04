package com.example.full_connection.Controller;

import com.example.full_connection.DTO.ReportsDTO;
import com.example.full_connection.Service.ReportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/reports")
public class ReportsController {
    @Autowired
    private ReportsService reportsService;

    // Get all reports
    @GetMapping
    public ResponseEntity<List<ReportsDTO>> getAllReports() {
        List<ReportsDTO> reports = reportsService.getAllReports();
        return ResponseEntity.ok(reports);
    }

    // get a report by id
    @GetMapping("/{id}")
    public ResponseEntity<ReportsDTO> getReportById(@PathVariable UUID id) {
        ReportsDTO report = reportsService.getReportById(id);
        return ResponseEntity.ok(report);
    }

    @PutMapping("/{id}/update-status")
    public ResponseEntity<ReportsDTO> updateReportStatus(
            @PathVariable UUID id,
            @RequestBody ReportsDTO updatedReport) {
        ReportsDTO updated = reportsService.updateReportStatus(id, updatedReport.getStatus(), updatedReport.getReportDescription());
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/create")
    public ResponseEntity<ReportsDTO> createReport(@RequestBody ReportsDTO reportDTO) {
        ReportsDTO createdReport = reportsService.createReport(reportDTO);
        return ResponseEntity.ok(createdReport);
    }
}