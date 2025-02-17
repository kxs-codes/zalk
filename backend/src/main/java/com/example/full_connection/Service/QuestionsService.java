package com.example.full_connection.Service;

import com.example.full_connection.Entity.Questions;
import com.example.full_connection.Repository.QuestionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionsService {
    @Autowired // Wired the service to the correct repository
    private QuestionsRepository questionsRepository;

    public List<Questions> getAllQuestions() {
        return questionsRepository.findAll();
    }

    public Questions addQuestion(Questions question) {
        return questionsRepository.save(question);
    }
}
