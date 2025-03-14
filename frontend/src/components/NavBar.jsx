import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [role, setRole] = useState('student');

    return (
        <div className="flex">
            <nav className="flex border-2 border-red-500">
                {/* Student Navigation */}
                {role == "student" && 
                    <ul className="flex flex-col gap-2">
                        <li>Begin Session</li>
                        <li>Progress Report</li>
                        <li>Classrooms</li>
                        <li>Badges</li>
                    </ul>
                }

                {/* Educator Navigation */}
                {role == "educator" && (
                    <ul className="flex flex-col gap-2">
                        <li>Current Sessions</li>
                        <li>Class Progress</li>
                        <li>Classroom Management</li>
                        <li>Session Configuration</li>
                    </ul>
                )}

                {/* Guardian Navigation */}
                {role == "guardian" && (
                    <ul className="flex flex-col gap-2">
                        <li>Child Progress</li>
                        <li>Report Issues</li>
                    </ul>
                )}

                {/* Advisory Board Navigation */}
                {role == "advisory" && (
                    <ul className="flex flex-col gap-2">
                        <li>View Progress</li>
                        <li>Access Spreadsheet</li>
                        <li>Access Reports</li>
                        <li>Report Issues</li>
                    </ul>
                )}

                {/* Moderator Navigation */}
                {role == "moderator" && (
                    <ul className="flex flex-col gap-2">
                        <li>Design Classroom</li>
                        <li>Create Account</li>
                        <li>Access Logs</li>
                        <li>Access Reports</li>
                        <li>Report Issues</li>
                    </ul>
                )}

            </nav>
        </div>
    )
}

export default NavBar;