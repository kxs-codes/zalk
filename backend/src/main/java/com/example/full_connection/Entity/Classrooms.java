package com.example.full_connection.Entity;

import com.example.full_connection.Entity.Educators;
import com.example.full_connection.Entity.Students;

// JPA annotations like @Id, @Column, @GeneratedValue, etc.
import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class Classrooms {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "class_code", nullable = false)
    private int classCode;

    @Column(name = "class_subject", nullable = false)
    private String classSubject;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Students student;

    @ManyToOne
    @JoinColumn(name = "educator_id", nullable = false)
    private Educators educator;
}
