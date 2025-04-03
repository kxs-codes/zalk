package com.example.full_connection.DTO;

import java.util.UUID;

import com.example.full_connection.Entity.AdvisoryBoard;
import com.example.full_connection.Entity.Educator;
import com.example.full_connection.Entity.Guardian;
import com.example.full_connection.Entity.Student;

public class AccountDTO {
    private UUID id;
    private String username;
    private String message;

    public AccountDTO(UUID id, String username, String message) {
        this.id = id;
        this.username = username;
        this.message = message;
    }
    public AccountDTO(String message) {
        this.message = message;
    }
    public AccountDTO(Student student) {
        this.id = student.getId();
        this.username = student.getUsername();
    }
    public AccountDTO(Educator educator) {
        this.id = educator.getId();
        this.username = educator.getUsername();
    }
    public AccountDTO(Guardian guardian) {
        this.id = guardian.getId();
        this.username = guardian.getUsername();
    }
    public AccountDTO(AdvisoryBoard advisoryBoard) {
        this.id = advisoryBoard.getId();
        this.username = advisoryBoard.getUsername();
    }


    public UUID getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }
    public String getMessage() {
        return message;
    }

    public void setId(UUID id) {
        this.id = id;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}
