package com.example.full_connection.Repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.full_connection.Entity.BadgeProgress;
import com.example.full_connection.Entity.Badges;
import com.example.full_connection.Entity.Student;

import java.util.Optional;

public interface BadgeProgressRepository extends JpaRepository<BadgeProgress, UUID> {
    Optional<BadgeProgress> findByStudentAndBadge(Student student, Badges badge);
}
