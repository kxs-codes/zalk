import { useState } from "react";

export const useModeratorPortal = () => {
    const [summaryStatistics, setSummaryStatistics] = useState({});
    const [recentLogs, setRecentLogs] = useState([]);
    const [recentReports, setRecentReports] = useState([]);

    // Helper function to format date
    const formatLogDates = (data) => {
        for (var i = 0; i < data.length; i++) {
            data[i].logDate = calculateTimePassed(data[i].logDate);
        }
    }

    // Helper function to calculate time differential from current to log date
    const calculateTimePassed = (targetDate) => {
        const now = new Date();
        const loggedDate = new Date(targetDate);
        const timePassed = now - loggedDate;

        // Calculate time in multiple units
        const seconds = Math.floor(timePassed / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        let result = "";

        if (days > 0) {
            result = days > 1 ? `${days.toString()} days ago` : `${days.toString()} day ago`;
        } else if (hours > 0) {
            result = hours > 1 ? `${hours.toString()} hours ago` : `${hours.toString()} hour ago`;
        } else if (minutes > 0) {
            result = minutes > 1 ? `${minutes.toString()} minutes ago` : `${minutes.toString()} minute ago`;
        } else {
            result = seconds > 1 ? `${seconds.toString()} seconds ago` : `${seconds.toString()} second ago`;
        }

        return result;
    }

    // 1. Fetch request to grab summary stats of: classroom count, student count, and reports count
    const getSummaryStatistics = async () => {
        const response = await fetch("http://localhost:8080/api/moderator/summary-statistics");
        const data = await response.json();
        setSummaryStatistics(data);
    }

    // 2. Fetch request to grab list of recent logs (logs page not done, come back)
    const getRecentLogs = async () => {
        const response = await fetch("http://localhost:8080/api/moderator/recent-logs");
        const data = await response.json();

        // Call helper function to change data[i].logDate to time difference
        formatLogDates(data);

        setRecentLogs(data);
    }

    // 3. Fetch request to grab list of recent reports, limit 3
    const getRecentReports = async () => {
        const response = await fetch("http://localhost:8080/api/moderator/recent-reports");
        const data = await response.json();
        setRecentReports(data);
    }

    // 4. Return variables and functions
    return {
        summaryStatistics, recentLogs, recentReports, getSummaryStatistics, getRecentLogs, getRecentReports
    }
};