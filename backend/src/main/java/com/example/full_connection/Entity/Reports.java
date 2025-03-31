package com.example.full_connection.Entity;

import java.time.LocalDateTime;
import java.util.UUID;
import jakarta.persistence.*;

@Entity
@Table(name = "reports")
public class Reports {
    @Id
    @GeneratedValue
    @Column(name = "report_id")
    private UUID reportId;

    @Column(name = "report_name", nullable = false)
    private String reportName;

    @Column(name = "report_description", nullable = false)
    private String reportDescription;

    @Column(name = "time_occurred", nullable = false)
    private LocalDateTime timeOccurred = LocalDateTime.now();
    
    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String status;

    @Column(name = "submitter_email", nullable = false)
    private String submitterEmail;


    // Getters
    public UUID getReportId() {
        return reportId;
    }

    public String getReportName() {
        return reportName;
    }

    public String getReportDescription() {
        return reportDescription;
    }

    public LocalDateTime getTimeOccurred() {
        return timeOccurred;
    }

    public String getCategory() {
        return category;
    }

    public String getStatus() {
        return status;
    }

    public String getSubmitterEmail() {
        return submitterEmail;
    }

    // Setters
    public void setReportId(UUID reportId) {
        this.reportId = reportId;
    }

    public void setReportName(String reportName) {
        this.reportName = reportName;
    }

    public void setReportDescription(String reportDescription) {
        this.reportDescription = reportDescription;
    }

    public void setTimeOccurred(LocalDateTime timeOccurred) {
        this.timeOccurred = timeOccurred;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setSubmitterEmail(String submitterEmail) {
        this.submitterEmail = submitterEmail;
    }
}
