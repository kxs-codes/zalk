package com.example.full_connection.Controller;

import com.example.full_connection.Entity.Questions;
import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

//Controller handles API endpoints for the sessions
//Creates questions; generates with ZLO
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

    //Create updates to student statistics
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
            @RequestParam float avgTimePerQuestion
    )
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

    //Gets from question pool and filters based on ZLO-derived difficulty
    @GetMapping("/questions")
    public ResponseEntity<List<Questions>> getAllQuestions(
            @RequestParam int totalQuestionsRight,
            @RequestParam int totalQuestions,
            @RequestParam int streak,
            @RequestParam float avgTimeSpentInSession,
            @RequestParam float avgTimePerQuestion,
            @RequestParam float successRate,
            @RequestParam int gradeLevel
    )
    {

        double zloRating = sessionService.calculateZLO(totalQuestionsRight, totalQuestions, streak, avgTimeSpentInSession, avgTimePerQuestion, successRate);
        String questionDifficulty = sessionService.getQuestionDifficulty(zloRating);
        List<Questions> allQuestions = sessionService.getQuestions();

        List<Questions> filteredQuestions = allQuestions.stream()
                .filter(question -> question.getDifficulty().equals(questionDifficulty) && question.getGradeLevel() == gradeLevel)
                .collect(Collectors.toList());

        return ResponseEntity.ok(filteredQuestions);
    }

    //Generate new question logic based on ZLO-derived difficulty
    @PostMapping("/generate-question")
    public ResponseEntity<Questions> generateNextQuestion(
            @RequestParam int totalQuestionsRight,
            @RequestParam int totalQuestions,
            @RequestParam int streak,
            @RequestParam float avgTimeSpentInSession,
            @RequestParam float avgTimePerQuestion,
            @RequestParam float successRate
    )
    {
        // Calculate ZLO based on the session data
        double zloRating = sessionService.calculateZLO(totalQuestionsRight, totalQuestions, streak, avgTimeSpentInSession, avgTimePerQuestion, successRate);

        // Determine the question difficulty based on ZLO
        String questionDifficulty = sessionService.getQuestionDifficulty(zloRating);

        // Fetch the next question based on difficulty
        Questions nextQuestion = sessionService.getNextQuestionBasedOnDifficulty(questionDifficulty);

        if (nextQuestion == null)
        {
            System.out.println("No question available.");
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(nextQuestion);
    }
}
