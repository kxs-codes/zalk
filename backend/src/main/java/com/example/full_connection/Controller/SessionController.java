package com.example.full_connection.Controller;

import com.example.full_connection.DTO.SessionDTO;
import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionService sessionService;

    @Autowired
    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("/create")
    public ResponseEntity<Statistics> createSession(@RequestBody SessionDTO sessionDTO) {
        Statistics statistics = sessionService.createSession(sessionDTO);
        return ResponseEntity.ok(statistics);
    }

    @GetMapping("/questions")
    public ResponseEntity<List<?>> getAllQuestions() {
        return ResponseEntity.ok(sessionService.getQuestions());
    }

    @PostMapping("/generate-question")
    public ResponseEntity<Question> generateNextQuestion(@RequestBody SessionDTO sessionDTO) {
        Question nextQuestion = sessionService.getNextQuestion(sessionDTO);
        return ResponseEntity.ok(nextQuestion);
    }
}