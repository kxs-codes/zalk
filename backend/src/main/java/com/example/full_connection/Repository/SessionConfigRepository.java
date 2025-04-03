package com.example.full_connection.Repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.full_connection.Entity.Classrooms;
import com.example.full_connection.Entity.SessionConfig;

public interface SessionConfigRepository extends JpaRepository<SessionConfig, UUID> {
    Optional<SessionConfig> findByClassroom(Classrooms classroom);
}
