package com.example.full_connection.DTO;

import java.util.List;

public class FormDataModerator {
    private String subjectName;
    private String subjectLevel;
    private String educatorName;
    private List<String> students;

    public FormDataModerator() {}

    public FormDataModerator(String subjectName, String subjectLevel, String educatorName, List<String> students) {
        this.subjectName = subjectName;
        this.subjectLevel = subjectLevel;
        this.educatorName = educatorName;
        this.students = students;
    }


    // Getters
    public String getSubjectName() {
        return subjectName;
    }

    public String getSubjectLevel() {
        return subjectLevel;
    }

    public String getEducatorName() {
        return educatorName;
    }

    public List<String> getStudents() {
        return students;
    }

    // Setters
    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public void setSubjectLevel(String subjectLevel) {
        this.subjectLevel = subjectLevel;
    }

    public void setEducatorName(String educatorName) {
        this.educatorName = educatorName;
    }

    public void setStudents(List<String> students) {
        this.students = students;
    }
}
