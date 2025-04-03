package com.example.full_connection.Repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.full_connection.Entity.Moderator;

public interface ModeratorRepository extends JpaRepository<Moderator, UUID> {
    Optional<Moderator> findByUsername(String username);
}
