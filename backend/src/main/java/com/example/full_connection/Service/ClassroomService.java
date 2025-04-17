package com.example.full_connection.Service;

import com.example.full_connection.DTO.FormDataModerator;
import com.example.full_connection.Entity.Classroom;
import com.example.full_connection.Entity.Educator;
import com.example.full_connection.Entity.Student;
import com.example.full_connection.Repository.ClassroomRepository;
import com.example.full_connection.Repository.EducatorRepository;
import com.example.full_connection.Repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClassroomService {
    @Autowired // Wired the service to the correct repository
    private ClassroomRepository classroomsRepository;

    @Autowired
    private EducatorRepository educatorRepository;

    @Autowired
    private StudentRepository studentRepository;

    public List<Classroom> getAllClassrooms() {
        return classroomsRepository.findAll();
    }

    public Classroom createClassroom(FormDataModerator formDataModerator) {
        // 1. Create classroom object
        Classroom classroom = new Classroom();

        // 2. Create educator and student objects
        Optional<Educator> educator = educatorRepository.findByUsername(formDataModerator.getEducatorName());
        List<Student> students = studentRepository.findByUsernameIn(formDataModerator.getStudents());

        // 3. Set the attributes
        classroom.setEducator(educator.get());
        classroom.setStudents(students);
        classroom.setSubject(formDataModerator.getSubjectName());
        classroom.setSubjectLevel(formDataModerator.getSubjectLevel()); 

        // 4. Save classroom object in the database
        return classroomsRepository.save(classroom);
    }
}
