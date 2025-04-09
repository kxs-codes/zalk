package com.example.full_connection.Service;

import com.example.full_connection.Entity.Student;
import com.example.full_connection.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
//Service for the students
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
    //Used to get current ZLO value
    public Double getZloRating(UUID usernameId) {
        Optional<Student> student = studentRepository.findById(usernameId);
        return student.map(Student::getZloRating).orElseThrow(() -> new RuntimeException("Student not found"));
    }
    public Integer getGradeLevel(UUID usernameId) {
        Optional<Student> student = studentRepository.findById(usernameId);
        return student.map(Student::getGradeLevel).orElseThrow(() -> new RuntimeException("Student not found"));
    }


}
