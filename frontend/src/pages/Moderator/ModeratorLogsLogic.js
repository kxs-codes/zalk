import { useState, useEffect } from "react";

export const useModeratorLogs = () => {
    const [logs, setLogs] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredLogs, setFilteredLogs] = useState([]);

    // Fetch logs from backend
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/moderator/recent-logs');
                const data = await response.json();
                setLogs(data);  // Store the fetched logs
                setFilteredLogs(data); // Initialize filtered logs with all logs
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };
        fetchLogs();
    }, []);

    const handleChange = (e) => {
        const term = e.target.value.toLowerCase();
        setSearch(term);
        setFilteredLogs(logs.filter((log) => log.details.toLowerCase().includes(term)));
    };

    return {
        search,
        filteredLogs,
        handleChange,
    };
};