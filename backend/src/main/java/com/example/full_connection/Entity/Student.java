package com.example.full_connection.Entity;


// JPA annotations like @Id, @Column, @GeneratedValue, etc.
import jakarta.persistence.*;

import java.util.UUID;
import java.util.List;

@Entity
public class Student {
    @Id
    @GeneratedValue
    @Column(name = "student_id")

    
    private UUID studentId;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(name = "hashed_password", nullable = false)
    private String hashedPassword;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "zlo_rating", nullable = false)
    private int zloRating;

    @Column(name = "badges_earned", nullable = false)
    private int badgesEarned;

    // Use cascade to make sure no orphan rows
    @ManyToMany(mappedBy = "students", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Classrooms> classrooms;

    @ManyToOne
    @JoinColumn(name = "guardian_id", nullable = false, foreignKey = @ForeignKey(name = "fk_guardian" ))
    private Guardian guardian;

    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Statistics statistics;

    // Getters
    public UUID getId() {
        return studentId;
    }    
    public String getUsername() {
        return username;
    }
    public String getHashedPassword() {
        return hashedPassword;
    }
    public int getZloRating() {
        return zloRating;
    }
    public int getBadgesEarned() {
        return badgesEarned;
    }
    public List<Classrooms> getClassrooms() {
        return classrooms;
    }
    public Guardian getGuardian() {
        return guardian;
    }
    public Statistics getStatistics() {
        return statistics;
    }

    // Setters
    public void setId(UUID id) {
        this.studentId = id;
    }    
    public void setUsername(String username) {
        this.username = username;
    }
    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }
    public void setZloRating(int zloRating) {
        this.zloRating = zloRating;
    }
    public void setBadgesEarned(int badgesEarned) {
        this.badgesEarned = badgesEarned;
    }
    public void setClassrooms(List<Classrooms> classrooms) {
        this.classrooms = classrooms;
    }
    public void setGuardian(Guardian guardian) {
        this.guardian = guardian;
    }

    public void setStatistics(Statistics statistics){
        this.statistics = statistics;
    }
}
