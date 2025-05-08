package com.example.full_connection.Entity;

// JPA annotations like @Id, @Column, @GeneratedValue, etc.
import jakarta.persistence.*;

import java.util.UUID;
import java.util.List;
import java.util.ArrayList;

/**
 * Entity class representing an Educator.
 * Contains details such as ID, username, password, email, phone number, and associated classrooms.
 */
@Entity
@Table(name = "educator")
public class Educator {
    @Id
    @GeneratedValue
    @Column(name = "educator_id")
    private UUID educatorId;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(name = "hashed_password", nullable = false)
    private String hashedPassword;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "phone_number", nullable = true)
    private String phoneNumber;

    // Use cascade to make sure no orphan rows
    @OneToMany(mappedBy = "educator", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Classrooms> classrooms = new ArrayList<>();

    // Getters
    public UUID getId() {
        return educatorId;
    }
    public String getUsername() {
        return username;
    }
    public String getHashedPassword() {
        return hashedPassword;
    }
    public String getEmail() {
        return email;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public List<Classrooms> getClassrooms() {
        return classrooms;
    }

    // Setters
    public void setId(UUID educatorId) {
        this.educatorId = educatorId;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public void setClassrooms(List<Classrooms> classrooms) {
        this.classrooms = classrooms;
    }
}
