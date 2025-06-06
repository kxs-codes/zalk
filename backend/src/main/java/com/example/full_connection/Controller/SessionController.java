package com.example.full_connection.Controller;

import com.example.full_connection.DTO.ConfidenceDTO;
import com.example.full_connection.DTO.QuestionAndStreakResponse;
import com.example.full_connection.DTO.UpdateStatisticsDTO;
import com.example.full_connection.Entity.Questions;
import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Repository.StatisticsRepository;
import com.example.full_connection.Service.SessionService;
import com.example.full_connection.Service.SessionService2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Controller for managing session-related operations.
 * This class provides endpoints for handling user sessions and related data.
 *
 * Endpoints:
 * - Start, update, and end user sessions.
 * - Retrieve session statistics and details.
 *
 * Dependencies:
 * - SessionService for session management logic.
 */
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/sessions")
public class SessionController
{
    private final SessionService sessionService;

    @Autowired
    private SessionService2 sessionService2;

    @Autowired
    private StatisticsRepository statisticsRepository;

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
        System.out.println("All question grabbed: " + allQuestions.size());

        List<Questions> filteredQuestions = allQuestions.stream()
                .filter(question -> question.getDifficulty().equals(questionDifficulty))
                .collect(Collectors.toList());

        System.out.println("Filtered questions grabbed: " + filteredQuestions.size());
        System.out.println("Question object: " + filteredQuestions.get(1));
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

    @GetMapping("/get-question-and-streak")
    public ResponseEntity<QuestionAndStreakResponse> getFirstQuestion(@RequestParam UUID userId) {
        // Grab the question from service
        Questions firstQuestion = sessionService2.getQuestion(userId);

        System.out.println("first question grabbed: " + firstQuestion.getQuestion());

        // Grab the streak from service
        int streak = sessionService2.getStreak(userId);

        // Set the DTO
        QuestionAndStreakResponse questionAndStreakResponse = new QuestionAndStreakResponse(firstQuestion, streak);

        // Return the DTO
        return ResponseEntity.ok(questionAndStreakResponse);
    }

    // Get next question function, taking in the updated stats from the frontend (userId, avtimerperq, streak)
    @PostMapping("get-next-question")
    public Questions getNextQuestion(@RequestParam UUID userId, @RequestParam float avgTimePerQuestion, @RequestParam int streak) {
        Questions nextQuestion = sessionService2.getNextQuestion(userId, avgTimePerQuestion, streak);
        return nextQuestion;
    }
    
    // If session is over, update the statistics of the user
    @PostMapping("update-statistics")
    public UpdateStatisticsDTO updateStatistics(
        @RequestParam UUID userId,
        @RequestParam int streak,
        @RequestParam int totalQuestions,
        @RequestParam int totalQuestionsRight,
        @RequestParam int totalQuestionsWrong,
        @RequestParam float avgTimeSpentInSession,
        @RequestParam float successRate,
        @RequestParam float avgTimePerQuestion
    ) {
        // Check first if user is a new student
        Optional<Statistics> stats = statisticsRepository.findByStudentId(userId);

        UpdateStatisticsDTO updateStatisticsDTO = null;

        if (!stats.isPresent()) {
            updateStatisticsDTO = sessionService2.addNewStatistics(
                userId, 
                streak, 
                totalQuestions, 
                totalQuestionsRight, 
                totalQuestionsWrong, 
                avgTimeSpentInSession, 
                successRate, 
                avgTimePerQuestion,
                new Statistics()
            );
        } else {
            updateStatisticsDTO = sessionService2.updateStatistics(
                userId, 
                streak, 
                totalQuestions, 
                totalQuestionsRight, 
                totalQuestionsWrong, 
                avgTimeSpentInSession, 
                successRate, 
                avgTimePerQuestion,
                stats.get()
            );
        }
        
        return updateStatisticsDTO;
    }

    @PostMapping("submit-confidence")
    public ResponseEntity<ConfidenceDTO> submitConfidence(@RequestParam UUID userId, @RequestParam float confidence) {
        // 1. Check confidence value between 0.00-1.00
        if (confidence > 1.00f && confidence < 0.00f) {
            return ResponseEntity.badRequest().body(new ConfidenceDTO("Confidence out of range. Please try again.", 0.0f));
        }

        // 2. Send to service layer to update confidence
        ResponseEntity<ConfidenceDTO> response = sessionService2.submitConfidence(userId, confidence);

        // 3. Return response from the service layer
        return response;
    }
}
