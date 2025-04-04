import { useState, useEffect } from "react";

// Function to format the date as YYYY-MM-DD at HH:mm
const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date)) {
        console.error("Invalid date:", dateString);
        return "Invalid date";
    }

    const formattedDate = date.toISOString().split('T')[0];
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    return `${formattedDate} at ${formattedTime}`;
};

// Handle status change from dropdown
const handleStatusChange = (selectedIssue, handleUpdateStatus) => {
    return (newStatus) => {
        if (selectedIssue) {
            handleUpdateStatus(selectedIssue.reportId, newStatus);
        }
    };
};

const useAccessIssues = () => {
    const [issues, setIssues] = useState([]);
    const [sortBy, setSortBy] = useState("date");
    const [filter, setFilter] = useState("");
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [resolution, setResolution] = useState("");

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/reports");
                if (response.ok) {
                    const data = await response.json();
                    setIssues(data);
                } else {
                    console.error("Failed to fetch issues:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching issues:", error);
            }
        };
        fetchIssues();
    }, []);

    const sortedIssues = [...issues].sort((a, b) => {
        if (sortBy === "date") {
            return new Date(b.dateOccurred) - new Date(a.dateOccurred);
        } else if (sortBy === "category") {
            return a.category.localeCompare(b.category);
        }
        return 0;
    });

    // Apply filter based on the selected category
    const filteredIssues = filter
        ? sortedIssues.filter((issue) => issue.category === filter)
        : sortedIssues;

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:8080/api/reports/${id}/update-status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus, reportDescription: resolution }),
            });

            if (response.ok) {
                const updatedIssue = await response.json();

                setIssues((prevIssues) =>
                    prevIssues.map((issue) =>
                        issue.reportId === id ? { ...issue, ...updatedIssue } : issue
                    )
                );

                setSelectedIssue((prev) =>
                    prev && prev.reportId === id ? { ...prev, ...updatedIssue } : prev
                );

                setResolution("");
            }
        } catch (error) {
            console.error("Error updating issue:", error);
        }
    };

    return { setSortBy, setFilter, selectedIssue, setSelectedIssue, resolution, setResolution, filteredIssues, handleUpdateStatus, formatDateAndTime, handleStatusChange };
};

export default useAccessIssues;