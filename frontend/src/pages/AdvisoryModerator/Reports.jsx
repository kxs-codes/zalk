import React, { useState } from "react";
import PortalLogoBar from "../../components/PortalLogoBar.jsx"; //Import the logo bar
import "../../styles/AdvisoryModerator/pages/Reports.css"; //Import the custom CSS

//Mock Data for the issues
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

const AccessIssues = () => {
    //State variables
    const [issues, setIssues] = useState(mockIssues);
    const [sortBy, setSortBy] = useState("date");
    const [filter, setFilter] = useState("");
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [resolution, setResolution] = useState("");

    //Sorting issues based on the date
    const sortedIssues = [...issues].sort((a, b) =>
        sortBy === "date"
            ? new Date(b.dateOccurred) - new Date(a.dateOccurred)
            : a.category.localeCompare(b.category)
    );

    //Filtering issues based on category
    const filteredIssues = filter
        ? sortedIssues.filter((issue) => issue.category === filter)
        : sortedIssues;

    //Marks that an issue is completed
    const handleComplete = (id) => {
        setIssues(
            issues.map((issue) =>
                issue.id === id ? { ...issue, status: "Completed", resolution } : issue
            )
        );
        setSelectedIssue(null);
        setResolution("");
    };

    return (
        <div className="container">
            <PortalLogoBar />
            <div className="card">
                <h2 className="title">Access Issue Reports</h2>
                {/*Filters for sorting and filtering the issues*/}
                <div className="filters">
                    <select onChange={(e) => setSortBy(e.target.value)} className="select">
                        <option value="date">Sort by Date</option>
                        <option value="category">Sort by Category</option>
                    </select>
                    <select onChange={(e) => setFilter(e.target.value)} className="select">
                        <option value="">Filter by Issue</option>
                        <option value="Bug">Bug</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="UI/UX Issue">UI/UX Issue</option>
                        <option value="Performance Issue">Performance Issue</option>
                    </select>
                </div>

                {/*List of filtered and sorted issues*/}
                <div className="issue-list">
                    {filteredIssues.map((issue) => (
                        <div
                            key={issue.id}
                            className="issue-item"
                            onClick={() => setSelectedIssue(issue)}
                        >
                            <h3 className="issue-title">{issue.title}</h3>
                            <p className="issue-details">
                                {issue.dateOccurred} at {issue.timeOccurred}
                            </p>
                            <p className="category">Category: {issue.category}</p>
                            <p className={`status ${issue.status === "Completed" ? "completed" : "open"}`}>
                                Status: {issue.status}
                            </p>
                        </div>
                    ))}
                </div>

                {/*If an issue is selected, display its details*/}
                {selectedIssue && (
                    <div className="issue-detail">
                        <h3 className="issue-detail-title">{selectedIssue.title}</h3>
                        <p className="description">{selectedIssue.description}</p>
                        <p className="issue-details">
                            Occurred on {selectedIssue.dateOccurred} at {selectedIssue.timeOccurred}
                        </p>
                        <p className="category">Category: {selectedIssue.category}</p>
                        <p className={`status ${selectedIssue.status === "Completed" ? "completed" : "open"}`}>
                            Status: {selectedIssue.status}
                        </p>

                        {/*Show resolution section if the issue is still open*/}
                        {selectedIssue.status === "Open" && (
                            <div className="resolution-section">
                                <textarea
                                    className="resolution-input"
                                    rows="3"
                                    placeholder="Describe resolution..."
                                    value={resolution}
                                    onChange={(e) => setResolution(e.target.value)}
                                ></textarea>
                                <button
                                    className="complete-button"
                                    onClick={() => handleComplete(selectedIssue.id)}
                                >
                                    Mark as Completed
                                </button>
                            </div>
                        )}
                        <button className="close-button" onClick={() => setSelectedIssue(null)}>
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccessIssues;