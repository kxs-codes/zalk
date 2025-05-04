package com.example.full_connection.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.full_connection.DTO.LoginDTO;
import com.example.full_connection.DTO.SignupDTO;
import com.example.full_connection.Entity.AdvisoryBoard;
import com.example.full_connection.Entity.Educator;
import com.example.full_connection.Entity.Guardian;
import com.example.full_connection.Entity.Moderator;
import com.example.full_connection.Entity.Student;
import com.example.full_connection.Repository.AdvisoryBoardRepository;
import com.example.full_connection.Repository.EducatorRepository;
import com.example.full_connection.Repository.GuardianRepository;
import com.example.full_connection.Repository.ModeratorRepository;
import com.example.full_connection.Repository.StudentRepository;

@Service
public class AuthenticationService {
    @Autowired
    StudentRepository studentRepository;

    @Autowired
    EducatorRepository educatorRepository;

    @Autowired
    GuardianRepository guardianRepository;

    @Autowired
    AdvisoryBoardRepository advisoryBoardRepository;

    @Autowired
    ModeratorRepository moderatorRepository;

    public Map<String, String> authenticateAccount(LoginDTO loginDTO) {
        // 1. Create and initialize the return type
        Map<String, String> map = new HashMap<>();

        // 2.. Look up account based on loginDTO.getAccountType(). username and hashedPassword have to match with the database
        switch (loginDTO.getAccountType()) {
            case "student":
                System.out.println("Account student");
                Optional<Student> studentOpt = studentRepository.findByUsername(loginDTO.getUsername());

                if (studentOpt.isPresent()) {
                    Student student = studentOpt.get();
                    if (!student.getHashedPassword().equals(loginDTO.getPassword())) {
                        map.put("message", "Incorrect Password.");
                        return map;
                    } else {
                        map.put("id", student.getId().toString());
                        map.put("role", "student");
                    }
                } else {
                    map.put("message", "No account found of type Student.");
                    return map;
                }
                break;
            case "guardian":
                Optional<Guardian> guardianOpt = guardianRepository.findByUsername(loginDTO.getUsername());

                if (guardianOpt.isPresent()) {
                    Guardian guardian = guardianOpt.get();
                    if (!guardian.getHashedPassword().equals(loginDTO.getPassword())) {
                        map.put("message", "Incorrect Password.");
                        return map;
                    } else {
                        map.put("id", guardian.getId().toString());
                        map.put("role", "guardian");
                    }
                } else {
                    map.put("message", "No account found of type Guardian.");
                    return map;
                }
                break;
            case "educator":
                Optional<Educator> educatorOpt = educatorRepository.findByUsername(loginDTO.getUsername());

                if (educatorOpt.isPresent()) {
                    Educator educator = educatorOpt.get();
                    if (!educator.getHashedPassword().equals(loginDTO.getPassword())) {
                        map.put("message", "Incorrect Password.");
                        return map;
                    } else {
                        map.put("id", educator.getId().toString());
                        map.put("role", "educator");
                    }
                } else {
                    map.put("message", "No account found of type Educator.");
                    return map;
                }
                break;
            case "advisory_board":
                Optional<AdvisoryBoard> advisoryBoardOpt = advisoryBoardRepository.findByUsername(loginDTO.getUsername());

                if (advisoryBoardOpt.isPresent()) {
                    AdvisoryBoard advisoryBoard = advisoryBoardOpt.get();
                    if (!advisoryBoard.getHashedPassword().equals(loginDTO.getPassword())) {
                        map.put("message", "Incorrect Password.");
                        return map;
                    } else {
                        map.put("id", advisoryBoard.getId().toString());
                        map.put("role", "advisory_board");
                    }
                } else {
                    map.put("message", "No account found of type AdvisoryBoard.");
                    return map;
                }
                break;
            case "moderator":
                Optional<Moderator> moderatorOpt = moderatorRepository.findByUsername(loginDTO.getUsername());

                if (moderatorOpt.isPresent()) {
                    Moderator moderator = moderatorOpt.get();
                    if (!moderator.getHashedPassword().equals(loginDTO.getPassword())) {
                        map.put("message", "Incorrect Password.");
                        return map;
                    } else {
                        map.put("id", moderator.getId().toString());
                        map.put("role", "moderator");
                    }
                } else {
                    map.put("message", "No account found of type Moderator.");
                    return map;
                }
                break;
        }

        // Account exists, and password matches with the one stored in the database
        // Return User information to the Controller
        map.put("message", "Found Account.");
        map.put("username", loginDTO.getUsername());
        return map;
    }

    public String createAccount(SignupDTO signupDTO) {
        // Validate that password and confirmation match
        if (!signupDTO.getPassword().equals(signupDTO.getConfirmPassword())) {
            return "Passwords do not match.";
        }

        // Check which account type is being created
        switch (signupDTO.getAccountType()) {
            case "student":
                // Prevent duplicate student usernames
                if (studentRepository.findByUsername(signupDTO.getUsername()).isPresent()) {
                    return "Student username already exists.";
                }

                // Create and save a new Student
                Student student = new Student();
                student.setUsername(signupDTO.getUsername());
                student.setHashedPassword(signupDTO.getPassword()); // Hash later!
                student.setEmail(signupDTO.getEmail());
                studentRepository.save(student);
                return "Student account created successfully.";

            case "guardian":
                if (guardianRepository.findByUsername(signupDTO.getUsername()).isPresent()) {
                    return "Guardian username already exists.";
                }

                Guardian guardian = new Guardian();
                guardian.setUsername(signupDTO.getUsername());
                guardian.setHashedPassword(signupDTO.getPassword());
                guardian.setEmail(signupDTO.getEmail());
                guardianRepository.save(guardian);
                return "Guardian account created successfully.";

            case "educator":
                if (educatorRepository.findByUsername(signupDTO.getUsername()).isPresent()) {
                    return "Educator username already exists.";
                }

                Educator educator = new Educator();
                educator.setUsername(signupDTO.getUsername());
                educator.setHashedPassword(signupDTO.getPassword());
                educator.setEmail(signupDTO.getEmail());
                educatorRepository.save(educator);
                return "Educator account created successfully.";

            case "advisory_board":
                if (advisoryBoardRepository.findByUsername(signupDTO.getUsername()).isPresent()) {
                    return "Advisory Board username already exists.";
                }

                AdvisoryBoard advisory = new AdvisoryBoard();
                advisory.setUsername(signupDTO.getUsername());
                advisory.setHashedPassword(signupDTO.getPassword());
                advisory.setEmail(signupDTO.getEmail());
                advisoryBoardRepository.save(advisory);
                return "Advisory Board account created successfully.";

            default:
                return "Invalid account type."; // Fallback in case of typos or unsupported roles
        }
    }
}