package com.example.full_connection.Repository;

import com.example.full_connection.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface StudentRepository extends JpaRepository<Student, UUID> {
    List<Student> findByUsernameIn(List<String> usernames);

    @Query("SELECT username FROM Student")
    List<String> findAllStudents();

    @Query("SELECT COUNT(username) FROM Student WHERE username IN :usernames")
    int countByNames(@Param("usernames") List<String> usernames);

    default boolean existsAllByUsernames(List<String> usernames) {
        return countByNames(usernames) == usernames.size();
    }
}
