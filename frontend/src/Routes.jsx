import { useRoutes } from 'react-router-dom';


// Importing components from /pages
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import StudentList from "./pages/Student/StudentList.jsx";
import SignUp from './pages/SignUp'
import Portal from "./pages/Portal";
import ForgotPassword from './pages/ForgotPassword.jsx';
import NotFound from './pages/NotFound';

 import StudentSession from "./pages/StudentSession";
 import StudentProgress from "./pages/Student/StudentProgress.jsx";
 import StudentBadges from "./pages/Student/StudentBadges.jsx";
import StudentClassrooms from "./pages/Student/StudentClassrooms.jsx";

import ReportIssues from "./pages/AdvisoryModerator/ReportIssues.jsx";
import Reports from "./pages/AdvisoryModerator/Reports.jsx"
import AdvisoryProgress from './pages/AdvisoryBoard/AdvisoryProgress.jsx'

    // Educator Routes 
import Manage from './pages/Educator/Manage';
import SessionConfig from './pages/Educator/SessionConfig';
import Progress from './pages/Educator/Progress';

import ModeratorCreateAccount from "./pages/Moderator/ModeratorCreateAccount";
import ModeratorLogs from "./pages/Moderator/ModeratorLogs.jsx";
import ModeratorCreateClassroom from "./pages/Moderator/ModeratorCreateClassroom";
import ModeratorManageAccounts from './pages/Moderator/ModeratorManageAccounts';


const AppRoutes = ({role, setRole}) => {
    return useRoutes([
        {
            path: "/",
            element: <Login role={role} setRole={setRole}/>
        },
        {
            path: "/student-list",
            element: <StudentList/>
        },
        {
            path: "/signup",
            element: <SignUp/>
        },
        {
            path: "/forgot-password",
            element: <ForgotPassword /> 
        },
        {
            path: "/settings",
            element: <Settings/>
        },
         {
             path: "/session",
             element: <StudentSession/>
         },
         {
             path: "/progress",
             element: <StudentProgress/>
         },
         {
             path: "/progress/badges",
             element: <StudentBadges/>
         },
        {
            path: "/signup",
            element: <SignUp/>
        },
        {
            path: "/portal",
            element: <Portal role={role}/>
        },
        {
            path: '*',
            element: <NotFound/>
        },
        // {
        //     path: "/results",
        //     element: <StudentResults/>
        // },
        {
            path: "/classrooms",
            element: <StudentClassrooms/>
        },
        // {
        //     path: "/classrooms/:classroom-id/",
        //     element: <EducatorClassroom/>
        // },
        {
            path: "/classroom-progress",
            element: <Progress/>
        },
        {
            path: "/session-configuration",
            element: <SessionConfig/>
        },
        {
            path: "/classrooms-management",
            element: <Manage/>
        },
        {
            path: "/create-classroom",
            element: <ModeratorCreateClassroom/>
        },   
        {
            path: "/create-account",
            element: <ModeratorCreateAccount/>
        },
        {
            path: "/access-logs",
            element: <ModeratorLogs/>
        },   
        {
            path: '/manage-accounts',
            element: <ModeratorManageAccounts/>
        },
        {
            path: "/access-reports",
            element: <Reports/>
        },
        {
            path: "/report-issues",
            element: <ReportIssues/>
        },
        {
            path: "/view-progress",
            element: <AdvisoryProgress/>
        },
        // {
        //     path: "/access-spreadsheet",
        //     element: <AdvisorySpreadsheet/>
        // }
    ]);
}

export default AppRoutes;