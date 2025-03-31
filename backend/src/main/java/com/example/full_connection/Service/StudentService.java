package com.example.full_connection.Service;

import com.example.full_connection.Entity.Student;
import com.example.full_connection.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired // Wired the service to the correct repository
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {

        return studentRepository.findAll();
    }

    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }
}
