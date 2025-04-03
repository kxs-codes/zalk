package com.example.full_connection.Service;

import com.example.full_connection.DTO.Educator.ClassroomSummaryDTO;
import com.example.full_connection.Entity.Classrooms;
import com.example.full_connection.Entity.Educator;
import com.example.full_connection.Entity.Statistics;
import com.example.full_connection.Repository.EducatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EducatorService {
    @Autowired // Wired the service to the correct repository
    private EducatorRepository educatorRepository;
    
    @Autowired 
    private ClassroomsService classroomsService;


    public List<Educator> getAllEducators() {
        return educatorRepository.findAll();
    }

    public List<String> getAllEducatorNames() {
        return educatorRepository.findAllEducators();
    }

     

    public Educator addEducator(Educator educator) {
        return educatorRepository.save(educator);
    }

    public boolean existsByUsername(String name) {
        return educatorRepository.findByUsername(name).isPresent();
    }

    // Method to gather based on Educator ID for portal dashboard
public List<ClassroomSummaryDTO> getClassroomsByEducatorID(UUID educatorId) {
    Educator educator = educatorRepository.findById(educatorId).orElseThrow();

    return educator.getClassrooms().stream().map(classroom -> {
        String classroomId = classroom.getClassId().toString();
        String classroomSubject = classroom.getSubject().toString();

        // Defaults
        String studentUsername = "none";
        int totalRight = 0;
        int totalWrong = 0;
        int totalTimeInSession = 0;
        int sessionsCompleted = 0;
        int daysLoggedIn = 0;
        int avgTime = 0;

        if (!classroom.getStudents().isEmpty()) {
            var student = classroom.getStudents().get(0);
            Statistics stats = student.getStatistics();

            studentUsername = student.getUsername();

            if (stats != null) {
                totalRight = stats.getTotalQuestionsRight();
                totalWrong = stats.getTotalQuestionsWrong();
                totalTimeInSession = stats.getTotalTimeInSessions();
                sessionsCompleted = stats.getSessionsCompleted();
                daysLoggedIn = stats.getDaysLoggedIn();
                avgTime = (int) stats.getAvgTimePerQuestion();
            }
        }

        return new ClassroomSummaryDTO(
            classroomId,
            classroomSubject,
            studentUsername,
            totalRight,
            totalWrong,
            totalTimeInSession,
            sessionsCompleted,
            daysLoggedIn,
            avgTime
        );
    }).collect(Collectors.toList());
}

    

}
