package com.example.full_connection.Repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.full_connection.Entity.Classroom;
import com.example.full_connection.Entity.SessionConfig;

public interface SessionConfigRepository extends JpaRepository<SessionConfig, UUID> {
    Optional<SessionConfig> findByClassroom(Classroom classroom);
}
