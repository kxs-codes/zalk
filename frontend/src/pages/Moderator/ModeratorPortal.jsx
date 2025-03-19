import '../../styles/Moderator/ModeratorPortal.css';

const ModeratorPortal = () => {
    // Mock Data
    const stats = {
        classrooms: 12,
        users: 56,
        reports: 3,
    };

    const recentLogs = [
        { id: 1, action: "User Created", details: "John Doe added", time: "2h ago" },
        { id: 2, action: "Classroom Created", details: "Math 101 added", time: "5h ago" },
        { id: 3, action: "Report Filed", details: "Spam detected", time: "1d ago" },
    ];

    const recentReports = [
        { id: 1, issue: "Inappropriate content", status: "Pending" },
        { id: 2, issue: "Spam messages", status: "Resolved" },
        { id: 3, issue: "Harassment", status: "Under Review" },
    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <div className="inner-div">
                    <h1 className="dashboard-header">Moderator Dashboard</h1>
                    
                    {/* Stats Section */}
                    <div className="stats-section">
                        {Object.entries(stats).map(([key, value]) => (
                            <div key={key} className={`stat-card ${key}`}>
                                <h2>{key}</h2>
                                <p>{value}</p>
                            </div>
                        ))}
                    </div>

                    { /* Recent Logs & Reports */ }
                    <div className="logs-reports">
                        { /* Recent Logs */ }
                        <div className="recent-logs">
                            <h2>Recent Logs</h2>
                            <ul>
                                {recentLogs.map((log) => (
                                    <li key={log.id} className="log-item">
                                        <p>{log.action}</p>
                                        <div className="log-details-time">
                                            <p className="log-details">{log.details}</p>
                                            <p className="log-time">| {log.time}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        { /* Recent Reports */ }
                        <div className="recent-reports">
                            <h2>Recent Reports</h2>
                            <ul>
                                {recentReports.map((report) => (
                                    <li key={report.id} className="report-item">
                                        <span>{report.issue}</span>
                                        <span className={`report-status ${report.status.toLowerCase()}`}>
                                            {report.status}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModeratorPortal;