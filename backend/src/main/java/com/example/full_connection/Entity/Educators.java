package com.example.full_connection.Entity;

import com.example.full_connection.Entity.Classrooms;

// JPA annotations like @Id, @Column, @GeneratedValue, etc.
import jakarta.persistence.*;

import java.util.UUID;
import java.util.List;
import java.util.ArrayList;

@Entity
public class Educators {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(name = "hashed_password", nullable = false)
    private String hashedPassword;

    @Column(nullable = false)
    private String email;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    // Use cascade to make sure no orphan rows
    @OneToMany(mappedBy = "educator", cascade = CascadeType.ALL)
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
    public String getEmail() {
        return email;
    }
    public String getPhoneNumber() {
        return phoneNumber;
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
    public void setEmail(String email) {
        this.email = email;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public void setClassrooms() {
        // TODO
    }
}
