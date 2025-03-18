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

    return (
        <section className="w-full flex flex-col items-center justify-center">
            <h2 className="font-medium text-2xl mb-2">View Logs</h2>
            <ul className="space-y-5">
            {mockLogs.map((log) => (
                <li key={log.id} className="p-3 bg-gray-100 rounded-lg shadow-sm">
                    <p className="font-bold">{log.action}</p>
                    <p className="text-sm text-gray-500">Timestamp: {log.timestamp}</p>
                    <p className="text-gray-700">User: {log.user}</p>
                    <p className="text-gray-700">Details: {log.details}</p>
                </li>
            ))}
            </ul>
        </section>
    )
}

export default ModeratorLogs;