package com.example.full_connection.Repository;

import com.example.full_connection.Entity.Statistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface StatisticsRepository extends JpaRepository<Statistics, UUID> {

    @Query("SELECT s FROM Statistics s WHERE s.student.username IN :usernames")
    List<Statistics> findByStudentUsernames(@Param("usernames") List<String> usernames);

    @Query("SELECT COUNT(s) FROM Statistics s WHERE s.student.username IN :usernames")
    int countByStudentUsernames(@Param("usernames") List<String> usernames);

    default boolean existsAllByUsernames(List<String> usernames) {
        return countByStudentUsernames(usernames) == usernames.size();
    }
}