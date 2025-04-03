package com.example.full_connection.Service;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.full_connection.DTO.LoginDTO;
import com.example.full_connection.Repository.AdvisoryBoardRepository;
import com.example.full_connection.Repository.EducatorRepository;
import com.example.full_connection.Repository.GuardianRepository;
import com.example.full_connection.Repository.StudentRepository;

public class AuthenticationService {
    @Autowired
    StudentRepository studentRepository;

    @Autowired
    EducatorRepository educatorRepository;

    @Autowired
    GuardianRepository guardianRepository;

    @Autowired
    AdvisoryBoardRepository advisoryBoardRepository;

    public String getAccount(LoginDTO loginDTO) {
        // 1. Look up account based on loginDTO.getAccountType(). username and hashedPassword have to match with the database

        // 2. If it exists and matches, return success string and user details such as accounttype and userid. if no match, return error not matching

        // 3. If doesn't exist, return error message saying no account exists

        // Might need to change return type to be a Map<>, another DTO or something
        return "TODO";
    }
}
