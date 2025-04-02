package com.example.full_connection.DTO;

import java.util.UUID;

public class EarnedBadgesDTO {
    private UUID badgeId;
    private String badgeName;
    private String badgeDescription;
    private int progress;

    public EarnedBadgesDTO(UUID badgeId, String badgeName, String badgeDescription, int progress) {
        this.badgeId = badgeId;
        this.badgeName = badgeName;
        this.badgeDescription = badgeDescription;
        this.progress = progress;
    }

    //Getters and Setters
    public UUID getBadgeId() {
        return badgeId;
    }

    public void setBadgeId(UUID badgeId) {
        this.badgeId = badgeId;
    }

    public String getBadgeName() {
        return badgeName;
    }

    public void setBadgeName(String badgeName) {
        this.badgeName = badgeName;
    }

    public String getBadgeDescription() {
        return badgeDescription;
    }

    public void setBadgeDescription(String badgeDescription) {
        this.badgeDescription = badgeDescription;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }
}