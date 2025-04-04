package com.example.full_connection.DTO;

import java.time.LocalDateTime;
import java.util.UUID;

public class ReportsDTO {
    private UUID reportId;
    private String reportName;
    private String reportDescription;
    private LocalDateTime timeOccurred;
    private String category;
    private String status;
    private String submitterEmail;

    public ReportsDTO(UUID reportId, String reportName, String reportDescription, LocalDateTime timeOccurred, String category, String status, String submitterEmail) {
        this.reportId = reportId;
        this.reportName = reportName;
        this.reportDescription = reportDescription;
        this.timeOccurred = timeOccurred;
        this.category = category;
        this.status = status;
        this.submitterEmail = submitterEmail;
    }

    //Getters and Setters
    public UUID getReportId() { return reportId; }
    public String getReportName() { return reportName; }
    public String getReportDescription() { return reportDescription; }
    public LocalDateTime getTimeOccurred() { return timeOccurred; }
    public String getCategory() { return category; }
    public String getStatus() { return status; }
    public String getSubmitterEmail() { return submitterEmail; }

    public void setReportId(UUID reportId) { this.reportId = reportId; }
    public void setReportName(String reportName) { this.reportName = reportName; }
    public void setReportDescription(String reportDescription) { this.reportDescription = reportDescription; }
    public void setTimeOccurred(LocalDateTime timeOccurred) { this.timeOccurred = timeOccurred; }
    public void setCategory(String category) { this.category = category; }
    public void setStatus(String status) { this.status = status; }
    public void setSubmitterEmail(String submitterEmail) { this.submitterEmail = submitterEmail; }
}