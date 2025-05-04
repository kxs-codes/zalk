package com.example.full_connection.Repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Entity.Student;

public interface StatisticsRepository extends JpaRepository<Statistics, UUID> {
    // Finds statistics by student
    Optional<Statistics> findByStudent(Student student);

    @Query("SELECT s FROM Statistics s WHERE s.student.id = :studentId")
    Optional<Statistics> findByStudentId(@Param("studentId") UUID studentId);
}
