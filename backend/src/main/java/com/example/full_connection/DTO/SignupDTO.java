package com.example.full_connection.DTO;

public class SignupDTO {
    private String accountType;
    private String email;
    private String username;
    private String password;
    private String confirmPassword;

    // Constructor
    public SignupDTO(String username, String password, String accountType, String email, String confirmPassword) {
        this.username = username;
        this.password = password;
        this.accountType = accountType;
        this.email = email;
        this.confirmPassword = confirmPassword;
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
    public String getEmail() {
        return email;
    }
    public String getConfirmPassword() {
        return confirmPassword;
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
    public void setEmail(String email) {
        this.email = email;
    }
    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
