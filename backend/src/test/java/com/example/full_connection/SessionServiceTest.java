package com.example.full_connection;

import com.example.full_connection.Entity.Questions;
import com.example.full_connection.Entity.Student;
import com.example.full_connection.Repository.QuestionsRepository;
import com.example.full_connection.Repository.StatisticsRepository;
import com.example.full_connection.Repository.StudentRepository;
import com.example.full_connection.Service.SessionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class SessionServiceTest {

    @Mock
    private StatisticsRepository statisticsRepository;

    @Mock
    private QuestionsRepository questionsRepository;

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private SessionService sessionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetNextQuestion_ReturnsQuestion() {
        // Arrange
        Questions mockQuestion = new Questions();
        mockQuestion.setDifficulty("easy");
        when(questionsRepository.findByDifficulty("easy")).thenReturn(Collections.singletonList(mockQuestion));

        // Act
        Questions result = sessionService.getNextQuestion(5, 10, 3, 2.5f, 1.5f, 0.8f, 5);

        // Assert
        assertNotNull(result);
        assertEquals("easy", result.getDifficulty());
        verify(questionsRepository, times(1)).findByDifficulty("easy");
    }

    @Test
    void testGetNextQuestion_NoQuestionsFound_ReturnsMediumDifficulty() {
        // Arrange
        when(questionsRepository.findByDifficulty("easy")).thenReturn(Collections.emptyList());
        Questions mockMediumQuestion = new Questions();
        mockMediumQuestion.setDifficulty("medium");
        when(questionsRepository.findByDifficulty("medium")).thenReturn(Collections.singletonList(mockMediumQuestion));

        // Act
        Questions result = sessionService.getNextQuestion(5, 10, 3, 2.5f, 1.5f, 0.8f, 5);

        // Assert
        assertNotNull(result);
        assertEquals("medium", result.getDifficulty());
        verify(questionsRepository, times(1)).findByDifficulty("easy");
        verify(questionsRepository, times(1)).findByDifficulty("medium");
    }

    @Test
    void testCalculateZLO_ReturnsCorrectValue() {
        // Act
        double zlo = sessionService.calculateZLO(5, 10, 3, 2.5f, 1.5f, 0.8f);

        // Assert
        assertTrue(zlo > 0, "ZLO should be a positive value");
    }

    @Test
    void testCreateSession_ThrowsExceptionForMissingStudent() {
        // Arrange
        when(studentRepository.findByUsernameIn(anyList())).thenReturn(Collections.emptyList());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            sessionService.createSession(
                List.of("student1"),
                100,
                3,
                10,
                5,
                5,
                2,
                10,
                80,
                0.2f,
                2.5f,
                0.8f,
                1.5f
            );
        });
        assertEquals("Failed to create session: Student not found!", exception.getMessage());
    }
}
