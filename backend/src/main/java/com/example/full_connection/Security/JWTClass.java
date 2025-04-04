package com.example.full_connection.Security;

import java.security.Key;
import java.util.Date;
import java.util.UUID;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.MacAlgorithm;

public class JWTClass {
    // 1. Specify JWT signature algorithm and SECRET_KEY
    MacAlgorithm MAC_ALG = Jwts.SIG.HS256;
    Key SECRET_KEY = Jwts.SIG.HS256.key().build();

    public String createJWT(UUID id, String role, String message) {

        // 2. Set issued at and expiration time. Expires 30 days from now
        // Date constructor expects long milliseconds
        // getTime() gives numbers in ms
        Date issuedAt = new Date();
        Date expiresAt = new Date(issuedAt.getTime() + (30L * 24 * 60 * 60 * 1000)); // set to expire 30 days from now

        // 3. Build JWT
        return Jwts.builder()
            .id(id.toString())
            .claim("role", role)
            .claim("message", message)
            .issuedAt(issuedAt)
            .expiration(expiresAt)
            .signWith(SECRET_KEY)
            .compact();
    }
}
