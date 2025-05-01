package com.example.full_connection.Entity;

import jakarta.persistence.*;
import java.util.UUID;
import java.util.List;

@Entity
public class Student
{
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
    private double zloRating;

    @Column(name = "grade_level", nullable = false)
    private int gradeLevel;

    @Column(name = "badges_earned", nullable = false)
    private int badgesEarned;

    @ManyToMany(mappedBy = "students", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Classrooms> classrooms;

    @ManyToOne
    @JoinColumn(name = "guardian_id", foreignKey = @ForeignKey(name = "fk_guardian" ))
    private Guardian guardian;

    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Statistics statistics;

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
