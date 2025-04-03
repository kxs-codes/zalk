package com.example.full_connection.Repository;

import com.example.full_connection.DTO.Educator.ClassroomSummaryDTO;
import com.example.full_connection.Entity.Classrooms;
import com.example.full_connection.Entity.Educator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EducatorRepository extends JpaRepository<Educator, UUID> {
    Optional<Educator> findByUsername(String username);

    @Query("SELECT username FROM Educator")
    List<String> findAllEducators();

 

}
