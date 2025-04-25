import "react";
import "../../styles/AdvisoryModerator/pages/Reports.css";
import PortalLogoBar from "../../components/PortalLogoBar.jsx";
import useAccessIssues from "./Reports.js";

const AccessIssues = () => {
    const {
        setSortBy,
        setFilter,
        selectedIssue,
        setSelectedIssue,
        resolution,
        setResolution,
        filteredIssues,
        handleUpdateStatus,
        formatDateAndTime,
    } = useAccessIssues();

    return (
        <div className="container">
            <PortalLogoBar />
            <div className="card">
                <h2 className="title">Access Issue Reports</h2>

                {/*Filters for sorting and issue type*/}
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

                {/*Issue list*/}
                <div className="issue-list">
                    {filteredIssues.map((issue) => (
                        <div
                            key={issue.reportId}
                            className="issue-item"
                            onClick={() => setSelectedIssue(issue)}>
                            <h3 className="issue-title">{issue.reportName || 'Untitled Report'}</h3>
                            <p className="issue-details">
                                {formatDateAndTime(issue.timeOccurred)}
                            </p>
                            <p className="category">Category: {issue.category}</p>
                            <p className={`status ${issue.status === "Completed" ? "completed" : "open"}`} >
                                Status: {issue.status}
                            </p>
                        </div>
                    ))}
                </div>

                {/*Display selected issue details*/}
                {selectedIssue && (
                    <div className="issue-detail">
                        <h3 className="issue-detail-title">{selectedIssue.reportName || 'Untitled Report'}</h3>
                        <p className="description">{selectedIssue.reportDescription}</p>
                        <p className="issue-details">
                            Occurred on {formatDateAndTime(selectedIssue.timeOccurred)}
                        </p>
                        <p className="category">Category: {selectedIssue.category}</p>
                        <p className={`status ${selectedIssue.status === "Completed" ? "completed" : "open"}`} >
                            Status: {selectedIssue.status}
                        </p>

                        {/* Add response here */}
                        <p className="response">
                            <strong>Response:</strong> {selectedIssue.response || "No response provided."}
                        </p>

                        {/*Dropdown for changing the status*/}
                        {selectedIssue.status !== "Completed" && (
                            <div className="status-change">
                                <select
                                    value={selectedIssue.status}
                                    onChange={(e) => handleUpdateStatus(selectedIssue.reportId, e.target.value)}
                                    className="select">
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        )}

                        {/* Input field for resolution if the issue is Open */}
                        {selectedIssue.status === "Open" && (
                            <div className="resolution-section">
                                <textarea
                                    className="resolution-input"
                                    rows="3"
                                    placeholder="Describe resolution..."
                                    value={resolution}
                                    onChange={(e) => setResolution(e.target.value)}/>
                                <button
                                    className="complete-button"
                                    onClick={() => handleUpdateStatus(selectedIssue.reportId, "Completed")}>
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