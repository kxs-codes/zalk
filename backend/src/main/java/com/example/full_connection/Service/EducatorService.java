package com.example.full_connection.Service;

import com.example.full_connection.Entity.Educator;
import com.example.full_connection.Repository.EducatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducatorService {
    @Autowired // Wired the service to the correct repository
    private EducatorRepository educatorRepository;

    public List<Educator> getAllEducators() {
        return educatorRepository.findAll();
    }

    public Educator addEducator(Educator educator) {
        return educatorRepository.save(educator);
    }
}
