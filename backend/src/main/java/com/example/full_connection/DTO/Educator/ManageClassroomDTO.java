package com.example.full_connection.DTO.Educator;

import java.util.List;

public class ManageClassroomDTO {
    private String subject;
    private String subject_level;
    private int students;
    private String classroom_id;
    private List<String> studentUsernames; // Updated to store all student usernames

    public ManageClassroomDTO() {}

    public ManageClassroomDTO(String subject, String subject_level, int students, String classroom_id, List<String> studentUsernames) {
        this.subject = subject;
        this.subject_level = subject_level;
        this.students = students;
        this.classroom_id = classroom_id;
        this.studentUsernames = studentUsernames;
    }

    // Getters
    public String getSubject() {
        return subject;
    }

    public String getSubjectLevel() {
        return subject_level;
    }

    public int getStudents() {
        return students;
    }

    public String getClassroomId() {
        return classroom_id;
    }

    public List<String> getStudentUsernames() {
        return studentUsernames;
    }

    // Setters
    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setSubjectLevel(String subject_level) {
        this.subject_level = subject_level;
    }

    public void setStudents(int students) {
        this.students = students;
    }

    public void setClassroomId(String classroom_id) {
        this.classroom_id = classroom_id;
    }

    public void setStudentUsernames(List<String> studentUsernames) {
        this.studentUsernames = studentUsernames;
    }
}
