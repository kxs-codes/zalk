package com.example.full_connection.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.full_connection.Repository.ModeratorRepository;

@Service
public class ModeratorService {
    @Autowired
    private ModeratorRepository moderatorRepository;


}
