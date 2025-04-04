package com.example.full_connection.Service;

import com.example.full_connection.Entity.Student;
import com.example.full_connection.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService
{
    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents()
    {
        return studentRepository.findAll();
    }

    public List<String> getAllStudentNames()
    {
        return studentRepository.findAllStudents();
    }

    public Student addStudent(Student student)
    {
        return studentRepository.save(student);
    }

    public boolean existsByUsernames(List<String> students)
    {
        return studentRepository.existsAllByUsernames(students);
    }
}
