package com.example.full_connection.Entity;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entity class representing a log entry.
 * Contains details about the log such as action type, user type, and severity.
 */
@Entity
@Table(name = "logs")
public class Logs {
    @Id
    @GeneratedValue
    @Column(name = "log_id")
    private UUID logId;

    @Column(name = "action_type", nullable = false)
    private String actionType;

    @Column(name = "log_date", nullable = false)
    private LocalDateTime logDate = LocalDateTime.now();

    @Column(name = "user_type", nullable = false)
    private String userType;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String details;

    @Column(nullable = false)
    private String severity;

    // Getters
    public UUID getID() {
        return logId;
    }
    public String getActionType() {
        return actionType;
    }
    public LocalDateTime getLogDate() {
        return logDate;
    }
    public String getUserType() {
        return userType;
    }
    public String getUsername() {
        return username;
    }
    public String getDetails() {
        return details;
    }
    public String getSeverity() {
        return severity;
    }

    // Setters
    public void setID(UUID logId) {
        this.logId = logId;
    }
    public void setActionType(String actionType) {
        this.actionType = actionType;
    }
    public void setLogDate(LocalDateTime logDate) {
        this.logDate = logDate;
    }
    public void setUserType(String userType) {
        this.userType = userType;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setDetails(String details) {
        this.details = details;
    }
    public void setSeverity(String severity) {
        this.severity = severity;
    }
}
