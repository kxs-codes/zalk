package com.example.full_connection.Controller;

import com.example.full_connection.DTO.ReportsDTO;
import com.example.full_connection.Service.ReportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Controller for handling report generation and retrieval.
 * This class provides endpoints for generating and accessing various reports.
 *
 * Endpoints:
 * - Generate reports for students and classrooms.
 * - Retrieve previously generated reports.
 *
 * Dependencies:
 * - ReportService for report generation logic.
 */
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/reports")
public class ReportsController {
    @Autowired
    private ReportsService reportsService;

    //Getting all reports from the database
    @GetMapping
    public ResponseEntity<List<ReportsDTO>> getAllReports() {
        List<ReportsDTO> reports = reportsService.getAllReports();
        return ResponseEntity.ok(reports);
    }

    //Getting a report by a specific id
    @GetMapping("/{id}")
    public ResponseEntity<ReportsDTO> getReportById(@PathVariable UUID id) {
        ReportsDTO report = reportsService.getReportById(id);
        return ResponseEntity.ok(report);
    }

    //Updating a reports status and its response
    @PutMapping("/{id}/update-status")
    public ResponseEntity<ReportsDTO> updateReportStatus(
            @PathVariable UUID id,
            @RequestBody ReportsDTO updatedReport) {
        ReportsDTO updated = reportsService.updateReportStatus(id, updatedReport.getStatus(), updatedReport.getResponse());
        return ResponseEntity.ok(updated);
    }

    //Creating a new report
    @PostMapping("/create")
    public ResponseEntity<ReportsDTO> createReport(@RequestBody ReportsDTO reportDTO) {
        ReportsDTO createdReport = reportsService.createReport(reportDTO);
        return ResponseEntity.ok(createdReport);
    }
}