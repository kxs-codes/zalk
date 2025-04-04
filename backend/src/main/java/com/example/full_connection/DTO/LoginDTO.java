package com.example.full_connection.DTO;

public class LoginDTO {
    private String username;
    private String password;
    private String accountType;

    // Constructor
    public LoginDTO(String username, String password, String accountType) {
        this.username = username;
        this.password = password;
        this.accountType = accountType;
    }

    // Getters
    public String getUsername() {
        return username;
    }
    public String getPassword() {
        return password;
    }
    public String getAccountType() {
        return accountType;
    }
    
    // Setters
    public void setUsername(String username) {
        this.username = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }
}
