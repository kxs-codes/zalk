import "react";
import "../../styles/AdvisoryModerator/pages/Reports.css";
import PortalLogoBar from "../../components/PortalLogoBar.jsx";
import useAccessIssues from "./Report.js";

const AccessIssues = () => {
    const {
        setSortBy,
        setFilter,
        selectedIssue,
        setSelectedIssue,
        resolution,
        setResolution,
        filteredIssues,
        handleComplete
    } = useAccessIssues();

    return (
        <div className="container">
            <PortalLogoBar />
            <div className="card">
                <h2 className="title">Access Issue Reports</h2>

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

                        {selectedIssue.status === "Open" && (
                            <div className="resolution-section">
                <textarea
                    className="resolution-input"
                    rows="3"
                    placeholder="Describe resolution..."
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                />
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
