package com.example.full_connection.Repository;

import com.example.full_connection.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface UserRepository extends JpaRepository<Users, UUID> {}
