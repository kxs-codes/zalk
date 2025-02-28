package com.example.full_connection.Repository;

import com.example.full_connection.Entity.Educators;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface EducatorsRepository extends JpaRepository<Educators, UUID> {}
