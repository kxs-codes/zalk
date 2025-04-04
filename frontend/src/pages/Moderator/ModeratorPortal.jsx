import { useEffect } from 'react';
import '../../styles/Moderator/ModeratorPortal.css';
import { useModeratorPortal } from './ModeratorPortal';

const ModeratorPortal = () => {
    const { summaryStatistics, recentLogs, recentReports, getSummaryStatistics, getRecentLogs, getRecentReports } = useModeratorPortal();

    useEffect(() => {
        getSummaryStatistics();
        getRecentLogs();
        getRecentReports();
    }, [])

    // const recentLogs = [
    //     { id: 1, action: "User Created", details: "John Doe added", time: "2h ago" },
    //     { id: 2, action: "Classroom Created", details: "Math 101 added", time: "5h ago" },
    //     { id: 3, action: "Report Filed", details: "Spam detected", time: "1d ago" },
    // ];

    // const recentReports = [
    //     { id: 1, issue: "Inappropriate content", status: "Pending" },
    //     { id: 2, issue: "Spam messages", status: "Resolved" },
    //     { id: 3, issue: "Harassment", status: "Under Review" },
    // ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <div className="inner-div">
                    <h1 className="dashboard-header">Moderator Dashboard</h1>
                    
                    {/* Stats Section */}
                    <div className="stats-section">
                        {Object.entries(summaryStatistics).map(([key, value]) => (
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
                                        <p>{log.actionType}</p>
                                        <div className="log-details-time">
                                            <p className="log-details">{log.details}</p>
                                            <p className="log-time">| {log.logDate}</p>
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
                                    <li key={report.reportId} className="report-item">
                                        <span>{report.reportName}</span>
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