package com.example.full_connection.Entity;

import jakarta.persistence.*;
import java.util.UUID;
import java.util.List;

/**
 * Represents a student entity in the system.
 * This entity is mapped to a database table using JPA annotations.
 */
@Entity
public class Student {

    /**
     * Unique identifier for the student.
     */
    @Id
    @GeneratedValue
    @Column(name = "student_id")
    private UUID studentId;

    /**
     * The username of the student. Must be unique and not null.
     */
    @Column(nullable = false, unique = true)
    private String username;

    /**
     * The hashed password of the student. Must not be null.
     */
    @Column(name = "hashed_password", nullable = false)
    private String hashedPassword;

    /**
     * The email address of the student. Must be unique and not null.
     */
    @Column(nullable = false, unique = true)
    private String email;

    /**
     * The ZLO rating of the student. Must not be null.
     */
    @Column(name = "zlo_rating", nullable = false)
    private double zloRating;

    /**
     * The grade level of the student. Must not be null.
     */
    @Column(name = "grade_level", nullable = false)
    private int gradeLevel;

    /**
     * The number of badges earned by the student. Must not be null.
     */
    @Column(name = "badges_earned", nullable = false)
    private int badgesEarned;

    /**
     * The list of classrooms the student is enrolled in.
     */
    @ManyToMany(mappedBy = "students", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Classrooms> classrooms;

    /**
     * The guardian of the student. Can be null.
     */
    @ManyToOne
    @JoinColumn(name = "guardian_id", foreignKey = @ForeignKey(name = "fk_guardian" ), nullable = true)
    private Guardian guardian;

    /**
     * The statistics of the student.
     */
    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Statistics statistics;

    /**
     * The list of badge progress records for the student.
     */
    @OneToMany(mappedBy = "student", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<BadgeProgress> badgeProgress;

    public UUID getId()
    {
        return studentId;
    }

    public String getUsername()
    {
        return username;
    }

    public String getHashedPassword()
    {
        return hashedPassword;
    }

    public String getEmail() { return email; }

    public double getZloRating()
    {
        return zloRating;
    }

    public int getBadgesEarned()
    {
        return badgesEarned;
    }

    public int getGradeLevel() {return gradeLevel;}

    public List<Classrooms> getClassrooms()
    {
        return classrooms;
    }

    public Guardian getGuardian()
    {
        return guardian;
    }
    public Statistics getStatistics() {
        return statistics;
    }

    public void setId(UUID id)
    {
        this.studentId = id;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public void setHashedPassword(String hashedPassword)
    {
        this.hashedPassword = hashedPassword;
    }

    public void setEmail(String email) {this.email = email;}

    public void setZloRating(double zloRating)
    {
        this.zloRating = zloRating;
    }

    public void setBadgesEarned(int badgesEarned)
    {
        this.badgesEarned = badgesEarned;
    }

    public void setClassrooms(List<Classrooms> classrooms)
    {
        this.classrooms = classrooms;
    }

    public void setGuardian(Guardian guardian)
    {
        this.guardian = guardian;
    }

    public int setGradeLevel() {return gradeLevel;}

    public void setStatistics(Statistics statistics){
        this.statistics = statistics;
    }
}
