package com.example.full_connection.Service;

import com.example.full_connection.Entity.Users;
import com.example.full_connection.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired // Wired the service to the correct repository
    private UserRepository userRepository;

    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    public Users addUser(Users user) {
        return userRepository.save(user);
    }
}
