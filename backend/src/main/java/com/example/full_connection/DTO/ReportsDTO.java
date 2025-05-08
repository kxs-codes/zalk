package com.example.full_connection.DTO;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Data Transfer Object for Reports.
 * Contains report details such as name, description, and status.
 */
public class ReportsDTO {
    private UUID reportId;
    private String reportName;
    private String reportDescription;
    private LocalDateTime timeOccurred;
    private String category;
    private String status;
    private String submitterEmail;
    private String response;

    public ReportsDTO(UUID reportId, String reportName, String reportDescription, LocalDateTime timeOccurred, String category, String status, String submitterEmail, String response) {
        this.reportId = reportId;
        this.reportName = reportName;
        this.reportDescription = reportDescription;
        this.timeOccurred = timeOccurred;
        this.category = category;
        this.status = status;
        this.submitterEmail = submitterEmail;
        this.response = response;
    }

    //Getters and Setters
    public UUID getReportId() { return reportId; }
    public String getReportName() { return reportName; }
    public String getReportDescription() { return reportDescription; }
    public LocalDateTime getTimeOccurred() { return timeOccurred; }
    public String getCategory() { return category; }
    public String getStatus() { return status; }
    public String getSubmitterEmail() { return submitterEmail; }
    public String getResponse() { return response; }

    public void setReportId(UUID reportId) { this.reportId = reportId; }
    public void setReportName(String reportName) { this.reportName = reportName; }
    public void setReportDescription(String reportDescription) { this.reportDescription = reportDescription; }
    public void setTimeOccurred(LocalDateTime timeOccurred) { this.timeOccurred = timeOccurred; }
    public void setCategory(String category) { this.category = category; }
    public void setStatus(String status) { this.status = status; }
    public void setSubmitterEmail(String submitterEmail) { this.submitterEmail = submitterEmail; }
    public void setResponse(String response) {this.response = response; }
}