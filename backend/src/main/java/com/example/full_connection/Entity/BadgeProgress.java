package com.example.full_connection.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import jakarta.persistence.IdClass;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

/**
 * Entity class representing the progress of a student on a badge.
 * Maps the relationship between students and badges with progress details.
 */
@Entity
@Table(name = "badge_progress")
@IdClass(BadgeProgressId.class)
public class BadgeProgress {
    @Id
    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "student_id")
    private Student student;
    
    @Id
    @ManyToOne
    @JoinColumn(name = "badge_id", referencedColumnName = "badge_id")
    private Badges badge;
    
    @Column(nullable = false)
    private int progress;

    // Getters
    public Student getStudent() {
        return student;
    }
    public Badges getBadge() {
        return badge;
    }
    public int getProgress() {
        return progress;
    }

    // Setters
    public void setStudent(Student student) {
        this.student = student;
    }
    public void setBadge(Badges badge) {
        this.badge = badge;
    }
    public void setProgress(int progress) {
        this.progress = progress;
    }
}
