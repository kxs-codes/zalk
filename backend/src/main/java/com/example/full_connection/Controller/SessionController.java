package com.example.full_connection.Controller;

import com.example.full_connection.Entity.Questions;
import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/sessions")
public class SessionController
{
    private final SessionService sessionService;

    @Autowired
    public SessionController(SessionService sessionService)
    {
        this.sessionService = sessionService;
    }

    @PostMapping("/create")
    public ResponseEntity<Statistics> createSession(
            @RequestParam List<String> studentforSession,
            @RequestParam int totalTimeInSessions,
            @RequestParam int streak,
            @RequestParam int totalQuestions,
            @RequestParam int totalQuestionsRight,
            @RequestParam int totalQuestionsWrong,
            @RequestParam int sessionsCompleted,
            @RequestParam int daysLoggedIn,
            @RequestParam int subjectMasteryValue,
            @RequestParam float guessRate,
            @RequestParam float avgTimeSpentInSession,
            @RequestParam float successRate,
            @RequestParam float avgTimePerQuestion)
    {
        Statistics statistics = sessionService.createSession(
                studentforSession,
                totalTimeInSessions,
                streak,
                totalQuestions,
                totalQuestionsRight,
                totalQuestionsWrong,
                sessionsCompleted,
                daysLoggedIn,
                subjectMasteryValue,
                guessRate,
                avgTimeSpentInSession,
                successRate,
                avgTimePerQuestion
        );

        return ResponseEntity.ok(statistics);
    }

    @GetMapping("/questions")
    public ResponseEntity<List<Questions>> getAllQuestions()
    {
        List<Questions> questions = sessionService.getQuestions();
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/generate-question")
    public ResponseEntity<Questions> generateNextQuestion(
            @RequestParam int totalQuestionsRight,
            @RequestParam int totalQuestions,
            @RequestParam int streak,
            @RequestParam float avgTimeSpentInSession,
            @RequestParam float avgTimePerQuestion,
            @RequestParam float successRate)
    {
        Questions nextQuestion = sessionService.getNextQuestion(
                totalQuestionsRight,
                totalQuestions,
                streak,
                avgTimeSpentInSession,
                avgTimePerQuestion,
                successRate
        );

        if (nextQuestion == null)
        {
            System.out.println("No question found for the session parameters");
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(nextQuestion);
    }
}
