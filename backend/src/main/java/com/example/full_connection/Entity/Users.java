package com.example.full_connection.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.UUID;

@Entity // Classify the class as an entity
public class Users {
    @Id // Specifies that id is the primary key
    @GeneratedValue // Generate automatically based on the id value
    private UUID id;

    @Column(nullable = false) // Specify attributes of a column
    String username;

    // Setters
    public void setId(UUID id) {
        this.id = id;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    //Getters
    public UUID getId() {
        return id;
    }
    public String getDescription() {
        return username;
    }
}
