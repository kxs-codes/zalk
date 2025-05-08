package com.example.full_connection.Entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entity class representing a Moderator.
 * Contains details about the moderator such as username, email, and hashed password.
 */
@Entity
@Table(name = "moderator")
public class Moderator {
    @Id
    @GeneratedValue
    @Column(name = "moderator_id")
    private UUID moderatorId;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(name = "hashed_password", nullable = false)
    private String hashedPassword;

    @Column(nullable = false, unique = true)
    private String email;


    // Getters
    public UUID getId() {
        return moderatorId;
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
    public void setModeratorId(UUID moderatorId) {
        this.moderatorId = moderatorId;
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


