package com.example.full_connection.Controller;

import com.example.full_connection.Entity.Users;
import com.example.full_connection.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<Users> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public Users createUser(@RequestBody String username) {
        Users user = new Users();
        user.setUsername(username);
        return userService.addUser(user);
    }
}
