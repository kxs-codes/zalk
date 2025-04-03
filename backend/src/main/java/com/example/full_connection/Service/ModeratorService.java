package com.example.full_connection.Service;

import java.security.Guard;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.full_connection.DTO.AccountDTO;
import com.example.full_connection.Entity.AdvisoryBoard;
import com.example.full_connection.Entity.Educator;
import com.example.full_connection.Entity.Guardian;
import com.example.full_connection.Entity.Student;
import com.example.full_connection.Repository.AdvisoryBoardRepository;
import com.example.full_connection.Repository.EducatorRepository;
import com.example.full_connection.Repository.GuardianRepository;
import com.example.full_connection.Repository.StudentRepository;

@Service
public class ModeratorService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private EducatorRepository educatorRepository;

    @Autowired
    private GuardianRepository guardianRepository;

    @Autowired
    private AdvisoryBoardRepository advisoryBoardRepository;

    public List<AccountDTO> grabListAccounts(String accountType) {
        // 1. Create generic accounts List
        List<?> accounts = new ArrayList<>();

        // 2. Make a query to the right repository of the accountType for all accounts, returns account objects
        switch(accountType.toLowerCase()) {
            case "student":
                accounts = studentRepository.findAll();
                break;
            case "educator":
                accounts = educatorRepository.findAll();
                break;
            case "guardian":
                accounts = guardianRepository.findAll();
                break;
            case "advisory_board":
                accounts = advisoryBoardRepository.findAll();
                break;
            default:
                return List.of(new AccountDTO("Invalid account type: " + accountType));
        }

        // 3. Convert each item in a list to a DTO object usint stream()
        //      allowing to process collections of elements with things like filtering/mapping
        //      typecast account to prevent generic constructor error
        return accounts.stream()
            .map(account -> {
                if (account instanceof Student) return new AccountDTO((Student) account);
                if (account instanceof Educator) return new AccountDTO((Educator) account);
                if (account instanceof Guardian) return new AccountDTO((Guardian) account);
                if (account instanceof AdvisoryBoard) return new AccountDTO((AdvisoryBoard) account);
                return new AccountDTO("Unknown account type encountered.");
            })
            .collect(Collectors.toList());
    }

    public String removeAccount(UUID id, String accountType) {
        switch(accountType.toLowerCase()) {
            case "student":
                Optional<Student> student = studentRepository.findById(id);

                if (student.isPresent()) {
                    studentRepository.delete(student.get());
                } else {
                    return "No student found with that id.";
                }
                break;
            case "educator":
                Optional<Educator> educator = educatorRepository.findById(id);

                if (educator.isPresent()) {
                    educatorRepository.delete(educator.get());
                } else {
                    return "No educator found with that id.";
                }
                break;
            case "guardian":
                Optional<Guardian> guardian = guardianRepository.findById(id);
                
                if (guardian.isPresent()) {
                    guardianRepository.delete(guardian.get());
                } else {
                    return "No guardian found with that id.";
                }
                break;
            case "advisory_board":
                Optional<AdvisoryBoard> advisoryBoard = advisoryBoardRepository.findById(id);

                if (advisoryBoard.isPresent()) {
                    advisoryBoardRepository.delete(advisoryBoard.get());
                } else {
                    return "No advisory_board found with that id.";
                }
                break;
            default:
                return "No account type matching that deletion";
        }

        return "Deleted Successfully Account with id: " + id;
    }

}
