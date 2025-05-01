package com.example.full_connection.Entity;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "guardian")
public class Guardian {
    @Id
    @GeneratedValue
    @Column(name = "guardian_id")
    private UUID guardianId;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(name = "hashed_password", nullable = false)
    private String hashedPassword;

    @Column(nullable = false, unique = true)
    private String email;

    @OneToMany(mappedBy = "guardian", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Student> students;


    // Getters
    public UUID getId() {
        return guardianId;
    }    
    public String getUsername() {
        return username;
    }
    public String getHashedPassword() {
        return hashedPassword;
    }
    public List<Student> getStudents() {
        return students;
    }

    // Setters
    public void setId(UUID guardianId) {
        this.guardianId = guardianId;
    }    
    public void setUsername(String username) {
        this.username = username;
    }
    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }
    public void setStudents(List<Student> students) {
        this.students = students;
    }
    public void setEmail(String email) { this.email = email; }
}
