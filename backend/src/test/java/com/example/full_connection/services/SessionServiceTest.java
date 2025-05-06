package com.example.full_connection.Test;

import com.example.full_connection.Service.SessionService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class SessionServiceTest {

    private final SessionService sessionService = new SessionService(null, null, null);

    @Test
    public void testGetQuestionDifficulty_returnsEasy() {
        double zloRating = 0.5;
        String difficulty = sessionService.getQuestionDifficulty(zloRating);
        assertEquals("easy", difficulty);
    }
}
