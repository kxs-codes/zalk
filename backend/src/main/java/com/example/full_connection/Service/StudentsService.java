package com.example.full_connection.Service;

import com.example.full_connection.Entity.Students;
import com.example.full_connection.Repository.StudentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentsService {
    @Autowired // Wired the service to the correct repository
    private StudentsRepository studentsRepository;

    public List<Students> getAllStudents() {

        return studentsRepository.findAll();
    }

    public Students addStudent(Students student) {
        return studentsRepository.save(student);
    }
}
