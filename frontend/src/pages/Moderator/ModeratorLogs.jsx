import '../../styles/Moderator/ModeratorLogs.css';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useModeratorLogs } from "./ModeratorLogsLogic";

const ModeratorLogs = () => {
    const { search, filteredLogs, handleChange } = useModeratorLogs();

    return (
        <div className="logs-container">
            <div className="log-viewer">
                <section className="search-section">
                    <MagnifyingGlassIcon className="magnifying-icon" />
                    <input
                        type="text"
                        name="search"
                        placeholder="Search logs by details..."
                        className="search-input"
                        value={search}
                        onChange={handleChange}
                    />
                </section>
                <section className="log-list-container">
                    <h2 className="log-heading">📜 View Logs</h2>
                    <ul className="log-list">
                        {filteredLogs.map((log) => (
                            <li key={log.id} className="log-item">
                                <p className="log-action">{log.actionType}</p>
                                <p className="log-timestamp">Timestamp: {log.logDate}</p>
                                <p className="log-user">User: {log.username}</p>
                                <p className="log-details">Details: {log.details}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default ModeratorLogs;