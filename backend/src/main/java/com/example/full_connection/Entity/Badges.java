package com.example.full_connection.Entity;

import java.util.UUID;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "badges")
public class Badges {
    @Id
    @GeneratedValue
    @Column(name = "badge_id")
    private UUID badgeId;

    @Column(name = "badge_name", nullable = false, unique = true)
    private String badgeName;

    @Column(name = "badge_description", nullable = false)
    private String badgeDescription;

    @Column(name = "badge_requirement", nullable = false)
    private int badgeRequirement;

    // Getters
    public UUID getId() {
        return badgeId;
    }
    public String getBadgeName() {
        return badgeName;
    }
    public String getBadgeDescription() {
        return badgeDescription;
    } 
    public int getBadgeRequirement() {
        return badgeRequirement;
    }

    // Setters
    public void setId(UUID badgeId) {
        this.badgeId = badgeId;
    }
    public void setBadgeName(String badgeName) {
        this.badgeName = badgeName;
    }
    public void setBadgeDescription(String badgeDescription) {
        this.badgeDescription = badgeDescription;
    } 
    public void setBadgeRequirement(int badgeRequirement) {
        this.badgeRequirement = badgeRequirement;
    }
}
