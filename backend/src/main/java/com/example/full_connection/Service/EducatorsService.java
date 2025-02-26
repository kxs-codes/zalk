package com.example.full_connection.Service;

import com.example.full_connection.Entity.Educators;
import com.example.full_connection.Repository.EducatorsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducatorsService {
    @Autowired // Wired the service to the correct repository
    private EducatorsRepository educatorsRepository;

    public List<Educators> getAllEducators() {
        return educatorsRepository.findAll();
    }

    public Educators addEducator(Educators educator) {
        return educatorsRepository.save(educator);
    }
}
