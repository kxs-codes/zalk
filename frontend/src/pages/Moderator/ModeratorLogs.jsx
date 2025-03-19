import { useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const ModeratorLogs = () => {
    const mockLogs = [
        {
            id: 1,
            timestamp: "2025-03-18T10:15:30Z",
            action: "Created Classroom",
            user: "Alice Johnson",
            details: "Created 'Math 101' for High School students.",
        },
        {
            id: 2,
            timestamp: "2025-03-18T10:45:12Z",
            action: "Added Student",
            user: "Bob Smith",
            details: "Added 'Charlie Brown' to 'Science 202'.",
        },
        {
            id: 3,
            timestamp: "2025-03-18T11:02:45Z",
            action: "Updated Subject Name",
            user: "David Lee",
            details: "Changed 'History 300' to 'World History'.",
        },
        {
            id: 4,
            timestamp: "2025-03-18T11:30:22Z",
            action: "Removed Student",
            user: "Emma Wilson",
            details: "Removed 'Ian Scott' from 'Physics 101'.",
        },
        {
            id: 5,
            timestamp: "2025-03-18T12:00:05Z",
            action: "Deleted Classroom",
            user: "Fiona Davis",
            details: "Deleted 'Algebra 2' class.",
        },
        {
            id: 6,
            timestamp: "2025-03-18T12:20:50Z",
            action: "Changed Educator",
            user: "George Miller",
            details: "Updated educator for 'Chemistry 101' to 'Dr. Hannah White'.",
        },
        {
            id: 7,
            timestamp: "2025-03-18T13:10:30Z",
            action: "Created Classroom",
            user: "Hannah White",
            details: "Created 'English Literature' for College students.",
        },
        {
            id: 8,
            timestamp: "2025-03-18T13:45:15Z",
            action: "Added Student",
            user: "Ian Scott",
            details: "Added 'Julia Roberts' to 'Computer Science 101'.",
        },
        {
            id: 9,
            timestamp: "2025-03-18T14:05:48Z",
            action: "Updated Subject Level",
            user: "Julia Roberts",
            details: "Changed 'Biology 101' from Middle School to High School.",
        },
        {
            id: 10,
            timestamp: "2025-03-18T14:30:22Z",
            action: "Removed Student",
            user: "Alice Johnson",
            details: "Removed 'Fiona Davis' from 'Calculus 101'.",
        },
    ];

    const [search, setSearch] = useState('');
    const [filteredLogs, setFilteredLogs] = useState(mockLogs);

    const handleChange = (e) => {
        const term = e.target.value.toLowerCase();
        setSearch(term);
        setFilteredLogs(mockLogs.filter((log) => log.details.toLowerCase().includes(term)));
    }

    return (
        <div className="flex items-center justify-center bg-grey-secondary-lighter-1 w-full h-screen">
            <div className="flex flex-col items-center mt-20 h-4/5 w-9/10 shadow-lg bg-white overflow-y-auto rounded-lg">
                <section className="w-10/12 mt-10 border flex items-center justify-center bg-gray-100 border-3 border-dark-red-primary-1 rounded-full">
                    <label htmlFor="search"><MagnifyingGlassIcon className="size-6 ml-3"/></label>
                    <input 
                        type="text" 
                        name='search' 
                        placeholder="Search logs by details..." 
                        className="w-full p-2 outline-none border-none" 
                        value={search}
                        onChange={handleChange}
                    />
                </section>
                <section className="w-full flex flex-col items-center justify-center mt-10 mb-10">
                    <h2 className="font-medium text-2xl mb-2">📜 View Logs</h2>
                    <ul className="space-y-5">
                    {filteredLogs.map((log) => (
                        <li key={log.id} className="p-3 bg-gray-100 rounded-lg shadow-sm">
                            <p className="font-bold">{log.action}</p>
                            <p className="text-sm text-gray-500">Timestamp: {log.timestamp}</p>
                            <p className="text-gray-700">User: {log.user}</p>
                            <p className="text-gray-700">Details: {log.details}</p>
                        </li>
                    ))}
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default ModeratorLogs;