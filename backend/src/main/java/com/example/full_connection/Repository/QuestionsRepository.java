package com.example.full_connection.Repository;

import com.example.full_connection.Entity.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface QuestionsRepository extends JpaRepository<Questions, UUID> {}
