package com.example.full_connection.Service;

import com.example.full_connection.DTO.ReportsDTO;
import com.example.full_connection.Entity.Reports;
import com.example.full_connection.Repository.ReportsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ReportsService {

    @Autowired
    private ReportsRepository reportsRepository;

    // fetch all the reports
    public List<ReportsDTO> getAllReports() {
        List<Reports> reports = reportsRepository.findAll();
        return reports.stream()
                .map(report -> new ReportsDTO(
                        report.getReportId(),
                        report.getReportName(),
                        report.getReportDescription(),
                        report.getTimeOccurred(),
                        report.getCategory(),
                        report.getStatus(),
                        report.getSubmitterEmail()
                ))
                .collect(Collectors.toList());
    }

    // fetch a specific report by an Id
    public ReportsDTO getReportById(UUID reportId) {
        Reports report = reportsRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found with ID: " + reportId));

        return new ReportsDTO(
                report.getReportId(),
                report.getReportName(),
                report.getReportDescription(),
                report.getTimeOccurred(),
                report.getCategory(),
                report.getStatus(),
                report.getSubmitterEmail()
        );
    }

    // update the report status in the database
    public ReportsDTO updateReportStatus(UUID reportId, String status, String resolution) {
        Reports report = reportsRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found with ID: " + reportId));

        report.setStatus(status);
        if (resolution != null && !resolution.isEmpty()) {
            report.setReportDescription(resolution);
        }

        reportsRepository.save(report);

        return new ReportsDTO(
                report.getReportId(),
                report.getReportName(),
                report.getReportDescription(),
                report.getTimeOccurred(),
                report.getCategory(),
                report.getStatus(),
                report.getSubmitterEmail()
        );
    }
}