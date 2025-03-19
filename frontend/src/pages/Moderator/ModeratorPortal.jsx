import { useNavigate } from "react-router-dom";
import { PaintBrushIcon, UserPlusIcon, DocumentTextIcon, DocumentDuplicateIcon } from "@heroicons/react/24/solid";

const ModeratorPortal = () => {
    const cardItems = [
        {name: 'Design Classroom', icon: <PaintBrushIcon className="size-8 mb-2"/>}, 
        {name: 'Create Account', icon: <UserPlusIcon className="size-8 mb-2"/>}, 
        {name: 'Access Reports', icon: <DocumentTextIcon className="size-8 mb-2"/>}, 
        {name: 'Access Logs', icon: <DocumentDuplicateIcon className="size-8 mb-2"/>}
    ];

    const navigate = useNavigate();

    const handleClick = (route) => {
        navigate(route);
    }

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
        <div className="flex items-center justify-center bg-grey-secondary-lighter-1 w-full h-screen">
            <div className="flex flex-col items-center mt-20 h-4/5 w-9/10 shadow-lg bg-white overflow-y-auto rounded-lg p-6">
            <div className="w-full">
                <h1 className="text-3xl font-bold mb-6">Moderator Dashboard</h1>
                
                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {Object.entries(stats).map(([key, value]) => (
                        <div key={key} className={`p-4 rounded-lg shadow-md text-center transition-transform duration-200 hover:scale-105 ${key === 'classrooms' ? 'bg-purple-200 text-purple-800' : key === 'users' ? 'bg-sky-200 text-sky-800' : 'bg-zinc-200 text-zinc-800'}`}>
                            <h2 className="text-xl font-semibold capitalize">{key}</h2>
                            <p>{value}</p>
                        </div>
                    ))}
                </div>

                { /* Recent Logs & Reports */ }
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    { /* Recent Logs */ }
                    <div className="bg-amber-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Recent Logs</h2>
                        <ul>
                            {recentLogs.map((log) => (
                                <li key={log.id} className="border-b py-2">
                                    <p className="font-semibold">{log.action}</p>
                                    <div className="flex items-center justify-center gap-1">
                                        <p className="text-sm text-gray-600">{log.details}</p>
                                        <p className="text-sm text-gray-600">| {log.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    { /* Recent Reports */ }
                    <div className="bg-slate-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
                        <ul>
                            {recentReports.map((report) => (
                                <li key={report.id} className="border-b py-2 flex justify-between">
                                    <span>{report.issue}</span>
                                    <span
                                        className={`px-2 py-1 rounded-lg text-sm font-semibold ${
                                            report.status === "Pending" ? "bg-yellow-200 text-yellow-800" :
                                            report.status === "Resolved" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                                        }`}    
                                    >
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