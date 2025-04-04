package com.example.full_connection.Controller;


import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.full_connection.DTO.Educator.ClassroomSummaryDTO;
import com.example.full_connection.Repository.EducatorRepository;
import com.example.full_connection.Service.EducatorService;



@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/educator")
public class EducatorController {


   private EducatorRepository educatorRepository;
   private EducatorService educatorService;

   public EducatorController(EducatorService educatorService, EducatorRepository educatorRepository){
        this.educatorService = educatorService;
        this.educatorRepository = educatorRepository;
   }

    // // Filtering the educator list map 
    // @GetMapping("/{educatorId}")
    // public ResponseEntity<List<Classrooms>> getClassroomsByEducatorId(@PathVariable UUID educatorId) {
    //     List<Classrooms> classrooms = educatorService.getClassroomsByEducatorID(educatorId);
    //     return ResponseEntity.ok(classrooms);
    // }
    
    @GetMapping("/{educatorId}")
    public ResponseEntity<List<ClassroomSummaryDTO>> getClassroomsByEducatorId(@PathVariable UUID educatorId) {
        System.out.println("this is educator it -> "+ educatorId);
        List<ClassroomSummaryDTO> summary = educatorService.getClassroomsByEducatorID(educatorId);
        return ResponseEntity.ok(summary);
}

    
    // Second need to make the receiving end for the request
    // GET mapping
    @GetMapping("/list")
    public ResponseEntity<String> getEducatorList() {
        List<String> all = educatorRepository.findAllEducators();
        return ResponseEntity.ok(all.toString());
    }



    // Third, we will need to make the exchanging part to where it will give the request
    // POST mapping

    // Return the Results (can be a json or status code)


}
