package com.example.full_connection.Repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Entity.Student;
import java.util.Optional;

public interface StatisticsRepository extends JpaRepository<Statistics, UUID> {
    Optional<Statistics> findByStudent(Student student);  // Find statistics by student entity
}
