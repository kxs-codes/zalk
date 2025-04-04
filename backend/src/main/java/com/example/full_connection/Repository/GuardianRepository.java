package com.example.full_connection.Repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.full_connection.Entity.Guardian;

public interface GuardianRepository extends JpaRepository<Guardian, UUID> {
    Optional<Guardian> findByUsername(String username);
}
