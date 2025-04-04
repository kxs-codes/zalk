package com.example.full_connection.Entity;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity
@Table(name = "classrooms")
public class Classrooms {
    @Id
    @GeneratedValue
    @Column(name = "class_id")
    private UUID classId;

    @ManyToMany
    @JoinTable(
        name = "classroom_student", 
        joinColumns = @JoinColumn(name = "classroom_id"),
        inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    
    private List<Student> students;


    @ManyToOne
    @JoinColumn(name = "educator_id", referencedColumnName = "educator_id", nullable = false)
    private Educator educator;

    @Column(nullable = false)
    private String subject;

    @Column(name = "subject_level", nullable = false)
    private String subjectLevel;

    // Getters
    public UUID getClassId() {
        return classId;
    }
    public String getSubject() {
        return subject;
    }
    public List<Student> getStudents() {
        return students;
    }
    public Educator getEducator() {
        return educator;
    }
    // public List<Educator> getEducators() {
    //     return educators;
    // }
    
    public String getSubjectLevel() {
        return subjectLevel;
    }

    // Setters
    public void setClassId(UUID classId) {
        this.classId = classId;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }
    public void setStudents(List<Student> students) {
        this.students = students;
    }
    public void setEducator(Educator educator) {
        this.educator = educator;
    }
    public void setSubjectLevel(String subjectLevel) {
        this.subjectLevel = subjectLevel;
    }
    // public void setEducators(List<Educator> educators) {
    //     this.educators = educators;
    // }
}
