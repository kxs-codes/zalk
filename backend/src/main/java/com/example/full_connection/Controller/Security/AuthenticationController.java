package com.example.full_connection.Controller.Security;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.full_connection.DTO.LoginDTO;
import com.example.full_connection.DTO.SignupDTO;
import com.example.full_connection.Security.JWTClass;
import com.example.full_connection.Service.AuthenticationService;
import com.example.full_connection.Service.ModeratorService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    ModeratorService moderatorService;

    @PostMapping("/login")
    ResponseEntity<Map<String,String>> login(@RequestBody LoginDTO loginDTO) {
        // 1. Grab account information
        Map<String, String> authResponse = authenticationService.authenticateAccount(loginDTO);

        // 2. Initalize a return response
        Map<String, String> returnResponse = new HashMap<>();
        JWTClass jwtClass = new JWTClass();

        // 3. Return a ResponseEntity, contains message about account verification and user account details such as account type and UUID if account exists
        if (authResponse.get("message").contains("Incorrect Password.")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(authResponse);
        } else if (authResponse.get("message").contains("No account found of type")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(authResponse);
        } else {
            // Log the Login Info
            String username = loginDTO.getUsername();
            String accountType = loginDTO.getAccountType();
            moderatorService.logLogin(username, accountType);

            // Generate JSON Web Token
            String jwtToken = jwtClass.createJWT(UUID.fromString(authResponse.get("id")), authResponse.get("role"), authResponse.get("message"));

            // Add to response
            returnResponse.put("token", jwtToken);
            System.out.println("JWT TOKEN:  " + jwtToken);

            // Return it in the response
            return ResponseEntity.ok(returnResponse);
        }

    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody SignupDTO signupDTO) {
        String message = authenticationService.createAccount(signupDTO);

        // Prepare response payload
        Map<String, String> response = new HashMap<>();
        response.put("message", message);

        // Return 200 OK if success, else 400 Bad Request
        if (message.contains("successfully")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

}
