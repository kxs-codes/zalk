package com.example.full_connection.Entity;

import com.example.full_connection.Entity.Classrooms;

// JPA annotations like @Id, @Column, @GeneratedValue, etc.
import jakarta.persistence.*;

import java.util.UUID;
import java.util.List;
import java.util.ArrayList;

@Entity
public class Students {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(name = "hashed_password", nullable = false)
    private String hashedPassword;

    @Column(name = "relative_rating")
    private int relativeRating;

    @Column(name = "grade_level")
    private int gradeLevel;

    // Use cascade to make sure no orphan rows
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Classrooms> classroom = new ArrayList<>();


    // Getters
    public UUID getId() {
        return id;
    }    
    public String getUsername() {
        return username;
    }
    public String getHashedPassword() {
        return hashedPassword;
    }
    public int getRelativeRating() {
        return relativeRating;
    }
    public int getGradeLevel() {
        return gradeLevel;
    }
    public void getClassrooms() {
        // TODO
    }

    // Setters
    public void setId(UUID id) {
        this.id = id;
    }    
    public void setUsername(String username) {
        this.username = username;
    }
    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }
    public void setRelativeRating(int relativeRating) {
        this.relativeRating = relativeRating;
    }
    public void setGradeLevel(int gradeLevel) {
        this.gradeLevel = gradeLevel;
    }
}
