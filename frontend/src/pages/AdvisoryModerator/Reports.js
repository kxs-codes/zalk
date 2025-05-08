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

// Custom hook for accessing and managing the list of issue reports
const useAccessIssues = () => {
    // State for storing all fetched issues
    const [issues, setIssues] = useState([]);

    // State to control sorting behavior: "date" or "category"
    const [sortBy, setSortBy] = useState("date");

    // State to store the selected filter (e.g., category name)
    const [filter, setFilter] = useState("");

    // State to store the currently selected issue for detail view
    const [selectedIssue, setSelectedIssue] = useState(null);

    // State for inputting a resolution message to an issue
    const [resolution, setResolution] = useState("");

    // useEffect runs once when the component mounts to fetch all issues
    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/reports");
                if (response.ok) {
                    const data = await response.json();
                    setIssues(data); // Populate the issues state with fetched data
                } else {
                    console.error("Failed to fetch issues:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching issues:", error);
            }
        };
        fetchIssues();
    }, []);
    //Sort the issues array based on date or category
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

    // Function that sends a PUT request to update the status and resolution of an issue
    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:8080/api/reports/${id}/update-status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus, response: resolution }),
            });

            if (response.ok) {
                const updatedIssue = await response.json();
                // Update the issue list with the modified issue
                setIssues((prevIssues) =>
                    prevIssues.map((issue) =>
                        issue.reportId === id ? { ...issue, ...updatedIssue } : issue
                    )
                );
                // updating the state of the issue
                setSelectedIssue((prev) =>
                    prev && prev.reportId === id ? { ...prev, ...updatedIssue } : prev
                );
                //Clear resolution field
                setResolution("");
            }
        } catch (error) {
            console.error("Error updating issue:", error);
        }
    };
    //Return all necessary values and functions for the component
    return { setSortBy, setFilter, selectedIssue, setSelectedIssue, resolution, setResolution, filteredIssues, handleUpdateStatus, formatDateAndTime, handleStatusChange };
};

export default useAccessIssues;