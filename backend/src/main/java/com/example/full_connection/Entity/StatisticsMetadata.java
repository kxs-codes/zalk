package com.example.full_connection.Entity;

import java.sql.Date;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "statistics_metadata")
public class StatisticsMetadata {
    // Columns
    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "last_row_count")
    private int lastRowCount;

    @Column(name = "number_of_updates")
    private int numberOfUpdates;

    @Column(name = "last_trained")
    private Date lastTrained;
    
    // Getters
    public UUID getId() {
        return id;
    }
    public int getLastRowCount() {
        return lastRowCount;
    }
    public int getNumberOfUpdates() {
        return numberOfUpdates;
    }
    public Date getLastTrained() {
        return lastTrained;
    }

    // Setters
    public void setId(UUID id) {
        this.id = id;
    }
    public void setLastRowCount(int lastRowCount) {
        this.lastRowCount = lastRowCount;
    }
    public void setNumberOfUpdates(int numberOfUpdates) {
        this.numberOfUpdates = numberOfUpdates;
    }
    public void setLastTrained(Date lastTrained) {
        this.lastTrained = lastTrained;
    }
}
