package com.example.full_connection.Service;

import com.example.full_connection.Entity.Classrooms;
import com.example.full_connection.Repository.ClassroomsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassroomsService {
    @Autowired // Wired the service to the correct repository
    private ClassroomsRepository classroomsRepository;

    public List<Classrooms> getAllClassrooms() {
        return classroomsRepository.findAll();
    }

    public Classrooms addClassroom(Classrooms classroom) {
        return classroomsRepository.save(classroom);
    }
}
