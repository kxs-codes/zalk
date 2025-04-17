package com.example.full_connection.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.full_connection.DTO.AccountDTO;
import com.example.full_connection.Entity.AdvisoryBoard;
import com.example.full_connection.Entity.Classroom;
import com.example.full_connection.Entity.Educator;
import com.example.full_connection.Entity.Guardian;
import com.example.full_connection.Entity.Logs;
import com.example.full_connection.Entity.Reports;
import com.example.full_connection.Entity.SessionConfig;
import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Entity.Student;
import com.example.full_connection.Repository.AdvisoryBoardRepository;
import com.example.full_connection.Repository.ClassroomRepository;
import com.example.full_connection.Repository.EducatorRepository;
import com.example.full_connection.Repository.GuardianRepository;
import com.example.full_connection.Repository.LogsRepository;
import com.example.full_connection.Repository.ReportsRepository;
import com.example.full_connection.Repository.SessionConfigRepository;
import com.example.full_connection.Repository.StatisticsRepository;
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

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private StatisticsRepository statisticsRepository; 

    @Autowired
    private SessionConfigRepository sessionConfigRepository;

    @Autowired
    private ReportsRepository reportsRepository;

    @Autowired
    private LogsRepository logsRepository;

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
                Optional<Student> studentOpt = studentRepository.findById(id);

                if (studentOpt.isPresent()) {
                    Student student = studentOpt.get();

                    // Remove student from all classrooms first
                    for(Classroom classroom : student.getClassrooms()) {
                        // Grab list of students in current classroom, remove student from it
                        classroom.getStudents().remove(student);
                    }
                    classroomRepository.saveAll(student.getClassrooms());

                    // Remove student from statistics table
                    Optional<Statistics> statisticsOpt = statisticsRepository.findByStudent(student);
                    statisticsOpt.ifPresent(statisticsRepository::delete);

                    // Delete student
                    studentRepository.delete(student);
                } else {
                    return "No student found with that id.";
                }
                break;
            case "educator":
                Optional<Educator> educatorOpt = educatorRepository.findById(id);

                if (educatorOpt.isPresent()) {
                    Educator educator = educatorOpt.get();

                    for (Classroom classroom : educator.getClassrooms()) {
                        // Delete session_config of every class educator teaches
                        Optional<SessionConfig> sessionConfigOpt = sessionConfigRepository.findByClassroom(classroom);
                        sessionConfigOpt.ifPresent(sessionConfigRepository::delete);

                        // Then, delete the classroom
                        classroomRepository.delete(classroom);
                    }
                    
                    // Delete the educator
                    educatorRepository.delete(educator);
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

    public Map<String, Integer> fetchSummaryStatistics() {
        // 1. Grab count of all users
        long users = studentRepository.count() + educatorRepository.count() + guardianRepository.count() + advisoryBoardRepository.count();
        
        // 2. Query classrooms, all users, and reports to grab counts of each. Add to map
        Map<String, Integer> statsMap = Map.of(
            "classrooms", (int)classroomRepository.count(), 
            "users", (int)users,
            "reports", (int)reportsRepository.count());

        // 3. Return map
        return statsMap;
    }

    public List<Logs> fetchRecentLogs() {
        // 1. Define limit of recent logs to fetch being 3
        Pageable limit = PageRequest.of(0, 3);
        
        // 2. Query logs and return results
        return logsRepository.findAll(limit).getContent();
    }

    public List<Reports> fetchRecentReports() {
        // 1. Define limit of recent reports to fetch being 3
        Pageable limit = PageRequest.of(0, 3);
        
        // 2. Query logs and return results
        return reportsRepository.findAll(limit).getContent();
    }
}
