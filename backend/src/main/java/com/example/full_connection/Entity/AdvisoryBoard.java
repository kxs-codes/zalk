package com.example.full_connection.Entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "advisory_board")
public class AdvisoryBoard {
    @Id
    @GeneratedValue
    @Column(name = "advisory_id")
    private UUID advisoryId;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(name = "hashed_password", nullable = false)
    private String hashedPassword;

    @Column(nullable = false, unique = true)
    private String email;

    // Getters
    public UUID getId() {
        return advisoryId;
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

    // Setters
    public void setAdvisoryId(UUID advisoryId) {
        this.advisoryId = advisoryId;
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
}


