package com.example.full_connection;

import com.example.full_connection.Service.SessionService2;
import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Entity.Questions;
import com.example.full_connection.Repository.*;
import com.example.full_connection.DTO.ConfidenceDTO;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Optional;
import java.util.UUID;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SessionService2Test {

    @InjectMocks
    private SessionService2 sessionService;

    @Mock
    private StatisticsRepository statisticsRepository;
    @Mock
    private QuestionsRepository questionsRepository;
    @Mock
    private StatisticsMetadataRepository statisticsMetadataRepository;
    @Mock
    private StudentRepository studentRepository;

    private final UUID userId = UUID.randomUUID();

    @Test
    void testGetStreak() {
        Statistics mockStats = new Statistics();
        mockStats.setStreak(5);
        when(statisticsRepository.findByStudentId(userId)).thenReturn(Optional.of(mockStats));

        assertEquals(5, sessionService.getStreak(userId));
        verify(statisticsRepository).findByStudentId(userId);
    }

    @Test
    void testZloCalculation() {
        float result = sessionService.zloCalculation(5, 30.0f, 0.8f, 0.9f, 10);
        assertTrue(result > 0 && result <= 1);
    }

    @Test
    void testSubmitConfidenceSuccess() {
        Statistics mockStats = createMockStats();
        when(statisticsRepository.findByStudentId(userId)).thenReturn(Optional.of(mockStats));

        ResponseEntity<ConfidenceDTO> response = sessionService.submitConfidence(userId, 0.85f);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Confidence successfully updated.", response.getBody().getResponse());
        verify(statisticsRepository).save(mockStats);
    }

    @Test
    void testSubmitConfidenceFailure() {
        when(statisticsRepository.findByStudentId(userId)).thenReturn(Optional.empty());

        ResponseEntity<ConfidenceDTO> response = sessionService.submitConfidence(userId, 0.85f);

        assertEquals(400, response.getStatusCodeValue());
        assertTrue(response.getBody().getResponse().contains("not found"));
    }

    @Test
    void testGetQuestionNoStats() {
        when(statisticsRepository.findByStudentId(userId)).thenReturn(Optional.empty());
        assertNull(sessionService.getQuestion(userId));
    }

    private Statistics createMockStats() {
        Statistics stats = new Statistics();
        stats.setStreak(5);
        stats.setAvgTimePerQuestion(30.0f);
        stats.setSessionScore(0.9f);
        stats.setSessionsCompleted(10);
        stats.setConfidence(0.8f);
        return stats;
    }
}