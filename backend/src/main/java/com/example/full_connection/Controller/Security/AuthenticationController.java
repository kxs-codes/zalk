package com.example.full_connection.Controller.Security;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.full_connection.DTO.LoginDTO;
import com.example.full_connection.Service.AuthenticationService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("/login")
    ResponseEntity<Map<String,String>> login(@RequestBody LoginDTO loginDTO) {
        // 1. Grab account information
        Map<String, String> response = authenticationService.authenticateAccount(loginDTO);

        // 2. Return a ResponseEntity, contains message about account verification and user account details such as account type and UUID if account exists
        if (response.get("message").contains("Incorrect Password.")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } else if (response.get("message").contains("No account found of type")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/signup")
    void signup() {
        // 1. Make an account by calling the auth service

        // 2. Return ResponseEntity, contains message about the success of the account creation, and user account details if successful

    }
}
