package com.example.full_connection.Controller.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.full_connection.DTO.LoginDTO;
import com.example.full_connection.Service.AuthenticationService;

@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("/login")
    void login(@RequestBody LoginDTO loginDTO) {
        // 1. Grab account information
        String message = authenticationService.getAccount(loginDTO);

        // 2. Return a ResponseEntity, contains message about account verification and user account details such as account type and UUID if account exists
    }

    @PostMapping("/signup")
    void signup() {
        // 1. Make an account by calling the auth service

        // 2. Return ResponseEntity, contains message about the success of the account creation, and user account details if successful

    }
}
