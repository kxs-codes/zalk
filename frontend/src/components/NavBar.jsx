import { useState } from "react";
import { Link } from "react-router-dom";
import { PlayIcon, ChartBarIcon, AcademicCapIcon, CheckBadgeIcon, ClockIcon, ClipboardDocumentListIcon, AdjustmentsHorizontalIcon, UserGroupIcon, ExclamationTriangleIcon, EyeIcon, TableCellsIcon, DocumentTextIcon, PaintBrushIcon, UserPlusIcon, DocumentDuplicateIcon, Cog8ToothIcon} from '@heroicons/react/24/solid';

const NavBar = () => {
    const [role, setRole] = useState('advisory');
    
    return (
            <nav className="flex flex-col bg-dark-red-primary-1 h-screen text-white items-center justify-between w-52">
                <ul className="flex flex-col gap-5 mt-5">
                    <li className="flex items-center justify-center"><Link to='/portal' className="flex items-center justify-center"><img src="/zebra.jpg" alt="zebra-logo" className="max-w-3/7 h-auto rounded-full" /></Link></li>
                    {/* Student Navigation */}
                    {role === "student" && 
                        <>
                            <li><Link to='/session' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><PlayIcon className="size-6"/>Begin Session</Link></li>
                            <li><Link to='/progress' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><ChartBarIcon className="size-6"/>Progress Report</Link></li>
                            <li><Link to='/classrooms' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><AcademicCapIcon className="size-6"/>Classrooms</Link></li>
                            <li><Link to='/progress/badges' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><CheckBadgeIcon className="size-6"/>Badges</Link></li>
                        </>
                    }

                    {/* Educator Navigation */}
                    {role === "educator" && (
                        <>
                            <li><Link to='/current-sessions' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><ClockIcon className="size-6"/>Current Sessions</Link></li>
                            <li><Link to='/class-progress' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><ChartBarIcon className="size-6"/>Class Progress</Link></li>
                            <li><Link to='/classroom-management' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><ClipboardDocumentListIcon className="size-6"/>Classroom Management</Link></li>
                            <li><Link to='/session-configuration' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><AdjustmentsHorizontalIcon className="size-6"/>Session Configuration</Link></li>
                        </>
                    )}

                    {/* Guardian Navigation */}
                    {role === "guardian" && (
                        <>
                            <li><Link to='/child-progress' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><UserGroupIcon className="size-6"/>Child Progress</Link></li>
                            <li><Link to='/report-issues' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><ExclamationTriangleIcon className="size-6"/>Report Issues</Link></li>
                        </>
                    )}

                    {/* Advisory Board Navigation */}
                    {role === "advisory" && (
                        <>
                            <li><Link to='/view-progress' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><EyeIcon className="size-6"/>View Progress</Link></li>
                            <li><Link to='/access-spreadsheet' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><TableCellsIcon className="size-6"/>Access Spreadsheet</Link></li>
                            <li><Link to='/access-reports' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><DocumentTextIcon className="size-6"/>Access Reports</Link></li>
                            <li><Link to='/report-issues' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><ExclamationTriangleIcon className="size-6"/>Report Issues</Link></li>
                        </>
                    )}

                    {/* Moderator Navigation */}
                    {role === "moderator" && (
                        <>
                            <li><Link to='/create-classroom' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><PaintBrushIcon className="size-6"/>Create Classroom</Link></li>
                            <li><Link to='/create-account' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><UserPlusIcon className="size-6"/>Create Account</Link></li>
                            <li><Link to='/access-logs' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><DocumentDuplicateIcon className="size-6"/>Access Logs</Link></li>
                            <li><Link to='/access-reports' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><DocumentTextIcon className="size-6"/>Access Reports</Link></li>
                            <li><Link to='/report-issues' className="flex items-center justify-center gap-1 py-2 hover:bg-grey-secondary-darker-1"><ExclamationTriangleIcon className="size-6"/>Report Issues</Link></li>
                        </>
                    )}
                </ul>
                <ul className="flex flex-col w-full"><li><Link to='/settings' className="flex items-center justify-center gap-1 py-4 hover:bg-grey-secondary-darker-1"><Cog8ToothIcon className="size-6"/>Settings</Link></li></ul>
            </nav>
    );
};

export default NavBar;