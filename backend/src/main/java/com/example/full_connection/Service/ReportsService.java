package com.example.full_connection.Service;

import com.example.full_connection.DTO.ReportsDTO;
import com.example.full_connection.Entity.Reports;
import com.example.full_connection.Repository.ReportsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

@Service
public class ReportsService {

    @Autowired
    private ReportsRepository reportsRepository;

    //Fetching all the reports and mapping them to the DTO
    public List<ReportsDTO> getAllReports() {
        List<Reports> reports = reportsRepository.findAll();
        //Converting the list of entity objects to DTO
        return reports.stream()
                .map(report -> new ReportsDTO(
                        report.getReportId(),
                        report.getReportName(),
                        report.getReportDescription(),
                        report.getTimeOccurred(),
                        report.getCategory(),
                        report.getStatus(),
                        report.getSubmitterEmail(),
                        report.getResponse()
                ))
                .collect(Collectors.toList());
    }
    //Creating a fresh report from the DTO sent to backend
    public ReportsDTO createReport(ReportsDTO reportDTO) {
        Reports newReport = new Reports();
        newReport.setReportName(reportDTO.getReportName());
        newReport.setReportDescription(reportDTO.getReportDescription());
        newReport.setTimeOccurred(reportDTO.getTimeOccurred() != null ? reportDTO.getTimeOccurred() : LocalDateTime.now());
        newReport.setCategory(reportDTO.getCategory());
        newReport.setStatus(reportDTO.getStatus() != null ? reportDTO.getStatus() : "Open");
        newReport.setSubmitterEmail(reportDTO.getSubmitterEmail());

        Reports savedReport = reportsRepository.save(newReport);

        //Returning saved report as a DTO
        return new ReportsDTO(
                savedReport.getReportId(),
                savedReport.getReportName(),
                savedReport.getReportDescription(),
                savedReport.getTimeOccurred(),
                savedReport.getCategory(),
                savedReport.getStatus(),
                savedReport.getSubmitterEmail(),
                savedReport.getResponse()
        );
    }

    //Fetching a specific report by an Id
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
                report.getSubmitterEmail(),
                report.getResponse()
        );
    }

    //Updating the reports status in the database, while also adding a response
    public ReportsDTO updateReportStatus(UUID reportId, String status, String resolution) {
        Reports report = reportsRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found with ID: " + reportId));

        report.setStatus(status);
        if (resolution != null && !resolution.isEmpty()) {
            report.setResponse(resolution);
        }

        reportsRepository.save(report);

        return new ReportsDTO(
                report.getReportId(),
                report.getReportName(),
                report.getReportDescription(),
                report.getTimeOccurred(),
                report.getCategory(),
                report.getStatus(),
                report.getSubmitterEmail(),
                report.getResponse()
        );
    }
}