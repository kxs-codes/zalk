package com.example.full_connection.Test;

import com.example.full_connection.Service.SessionService2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@SpringBootTest
public class SessionService2Test {

    @Autowired
    private SessionService2 sessionService;

    @Test
    public void testGetQuestion_validUser() {
        UUID testUserId = UUID.fromString("00000000-0000-0000-0000-000000000001"); 
        assertDoesNotThrow(() -> sessionService.getQuestion(testUserId));
    }
}
