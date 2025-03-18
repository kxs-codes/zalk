import { useRoutes } from 'react-router-dom';


// Importing components from /pages
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import StudentList from "./pages/Student/StudentList.jsx";
import SignUp from './pages/SignUp'
import Portal from "./pages/Portal";
import NotFound from './pages/NotFound';

 import StudentImprovements from "./pages/Student/StudentImprovements.jsx";
 import StudentSession from "./pages/StudentSession";
 import StudentProgress from "./pages/Student/StudentProgress.jsx";
 import StudentBadges from "./pages/Student/StudentBadges.jsx";
import StudentClassrooms from "./pages/Student/StudentClassrooms.jsx";

// import AdvisoryBoardIssues from "./pages/AdvisoryBoardIssues";
import ReportIssues from "./pages/AdvisoryModerator/ReportIssues.jsx";
import Reports from "./pages/AdvisoryModerator/Reports.jsx"

// import EducatorClassroom from "./pages/EducatorClassroom";
// import EducatorClassroomSpreadsheet from "./pages/EducatorClassroomSpreadsheet";
// import EducatorClassroomSession from "./pages/EducatorClassroomSession";
// import EducatorClassroomManage from "./pages/EducatorClassroomManage";

// import ModeratorReports from "./pages/ModeratorReports";
import ModeratorLogs from "./pages/ModeratorLogs";
// import ModeratorCreateClassroom from "./pages/ModeratorCreateClassroom";

// TODO! Remove dev route after testing
import EducatorPortal from './pages/Educator/Portal';
import Manage from './pages/Educator/Manage';
import SessionConfig from './pages/Educator/SessionConfig';
import Progress from './pages/Educator/Progress';

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
            path: "/settings",
            element: <Settings/>
        },
         {
             path: "/improvements",
             element: <StudentImprovements/>
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
              // Delete after developed 
            path: "/dev-educator-portal",
            element: <EducatorPortal role='educator'/>
        },
        {
            // Delete after developed
            path: '/class-progress',
            element: <Progress />
        },
        {
            // Delete after developed
            path: '/classroom-management',
            element: <Manage />
        },
        {
            // Delete after developed
            path: '/session-configuration',
            element: <SessionConfig />
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
        // {
        //     path: "/classroom-progress",
        //     element: <EducatorClassroomSpreadsheet/>
        // },
        // {
        //     path: "/session-configuration",
        //     element: <EducatorClassroomSessionConfiguration/>
        // },
        // {
        //     path: "/classrooms-management",
        //     element: <EducatorClassroomManagement/>
        // },
        // {
        //     path: "/create-classroom",
        //     element: <ModeratorCreateClassroom/>
        // },   
        // {
        //     path: "/create-account",
        //     element: <ModeratorCreateAccount/>
        // },
        {
            path: "/access-logs",
            element: <ModeratorLogs/>
        },   
        {
            path: "/access-reports",
            element: <Reports/>
        },
        {
            path: "/report-issues",
            element: <ReportIssues/>
        }
        // {
        //     path: "/view-progress",
        //     element: <AdvisoryProgress/>
        // },
        // {
        //     path: "/access-spreadsheet",
        //     element: <AdvisorySpreadsheet/>
        // }
    ]);
}

export default AppRoutes;