import { useState } from "react";

const useAccessIssues = () => {
    const mockIssues = [
        {
            id: 1,
            title: "Login not working",
            description: "Users are unable to log in with correct credentials.",
            category: "Bug",
            dateOccurred: "2025-03-15",
            timeOccurred: "10:30",
            status: "Open",
            resolution: ""
        },
        {
            id: 2,
            title: "Slow page loading",
            description: "Dashboard takes too long to load.",
            category: "Performance Issue",
            dateOccurred: "2025-03-14",
            timeOccurred: "14:00",
            status: "Open",
            resolution: ""
        }
    ];

    const [issues, setIssues] = useState(mockIssues);
    const [sortBy, setSortBy] = useState("date");
    const [filter, setFilter] = useState("");
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [resolution, setResolution] = useState("");

    const sortedIssues = [...issues].sort((a, b) =>
        sortBy === "date"
            ? new Date(b.dateOccurred) - new Date(a.dateOccurred)
            : a.category.localeCompare(b.category)
    );

    const filteredIssues = filter
        ? sortedIssues.filter((issue) => issue.category === filter)
        : sortedIssues;

    const handleComplete = (id) => {
        setIssues(
            issues.map((issue) =>
                issue.id === id
                    ? { ...issue, status: "Completed", resolution }
                    : issue
            )
        );
        setSelectedIssue(null);
        setResolution("");
    };

    return {
        issues,
        sortBy,
        setSortBy,
        filter,
        setFilter,
        selectedIssue,
        setSelectedIssue,
        resolution,
        setResolution,
        filteredIssues,
        handleComplete
    };
};

export default useAccessIssues;
