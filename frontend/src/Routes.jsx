import { useRoutes } from 'react-router-dom';


// Importing components from /pages
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import StudentList from "./pages/StudentList";
import SignUp from './pages/SignUp'
// import Portal from "./pages/Portal";

// import StudentResults from "./pages/StudentResults";
// import StudentImprovements from "./pages/StudentImprovements";
// import StudentSession from "./pages/StudentSession";
// import StudentProgress from "./pages/StudentProgress";
// import StudentBadges from "./pages/StudentBadges";

// import AdvisoryBoardIssues from "./pages/AdvisoryBoardIssues";

// import EducatorClassroom from "./pages/EducatorClassroom";
// import EducatorClassroomSpreadsheet from "./pages/EducatorClassroomSpreadsheet";
// import EducatorClassroomSession from "./pages/EducatorClassroomSession";
// import EducatorClassroomManage from "./pages/EducatorClassroomManage";

// import ModeratorReports from "./pages/ModeratorReports";
// import ModeratorClassroomReviews from "./pages/ModeratorClassroomReviews";
// import ModeratorLogs from "./pages/ModeratorLogs";
// import ModeratorCreateClassroom from "./pages/ModeratorCreateClassroom";

const AppRoutes = () => {
    return useRoutes([
        {
            path: "/",
            element: <Login/>
        },
        {
            path: "/student-list",
            element: <StudentList/>
        },
        {
            path: "/settings",
            element: <Settings/>
        },
        {
            path: "/signup",
            element: <SignUp/>
        }
        // {
        //     path: "/portal",
        //     element: <Portal/>
        // },
        // {
        //     path: "/results",
        //     element: <StudentResults/>
        // },
        // {
        //     path: "/classrooms",
        //     element: <StudentClassrooms/>
        // },
        // {
        //     path: "/improvements",
        //     element: <StudentImprovements/>
        // },
        // {
        //     path: "/session",
        //     element: <StudentSession/>
        // },
        // {
        //     path: "/progress",
        //     element: <StudentProgress/>
        // },
        // {
        //     path: "/progress/badges",
        //     element: <StudentBadges/>
        // },
        // {
        //     path: "/child-progress",
        //     element: <GuardianStudentProgress/>
        // },
        // }
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
        //     path: "/classroom-reviews",
        //     element: <ModeratorClassroomReviews/>
        // },
        // {
        //     path: "/create-classroom",
        //     element: <ModeratorCreateClassroom/>
        // },   
        // {
        //     path: "/create-account",
        //     element: <ModeratorCreateAccount/>
        // },
        // {
        //     path: "/access-logs",
        //     element: <ModeratorLogs/>
        // },   
        // {
        //     path: "/access-reports",
        //     element: <Reports/>
        // },
        // {
        //     path: "/report-issues",
        //     element: <ReportIssues/>
        // },
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
