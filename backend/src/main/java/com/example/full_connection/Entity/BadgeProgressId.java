package com.example.full_connection.Entity;

import java.io.Serializable;

public class BadgeProgressId implements Serializable {
    private Student student;
    private Badges badge;

    public BadgeProgressId() {}

    public BadgeProgressId(Student student, Badges badge) {
        this.student = student;
        this.badge = badge;
    }

    // Getters
    public Student getstudent() {
        return student;
    }
    public Badges getbadge() {
        return badge;
    }

    // Setters
    public void setstudent(Student student) {
        this.student = student;
    }
    public void setbadge(Badges badge) {
        this.badge = badge;
    }

    // hashCode and equals (important for composite keys)
    @Override
    public int hashCode() {
        return student.hashCode() + badge.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        BadgeProgressId other = (BadgeProgressId) obj;
        return student.equals(other.student) && badge.equals(other.badge);
    }
}
