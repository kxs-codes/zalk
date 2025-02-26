package com.example.full_connection.Repository;

import com.example.full_connection.Entity.Students;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

// Some usefull operations for JPA repo
    // save(S entity): Save an entity (create or update).
    // findById(ID id): Retrieve an entity by its id.
    // findAll(): Retrieve all entities.
    // deleteById(ID id): Delete an entity by its id.
public interface StudentsRepository extends JpaRepository<Students, UUID> {}
