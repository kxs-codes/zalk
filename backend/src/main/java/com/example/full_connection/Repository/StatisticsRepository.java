package com.example.full_connection.Repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.full_connection.Entity.Statistics;

public interface StatisticsRepository extends JpaRepository<Statistics, UUID> {
    
}
