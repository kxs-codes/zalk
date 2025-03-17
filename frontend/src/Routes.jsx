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
import StudentClassrooms from "./pages/StudentClassrooms.jsx";

// import AdvisoryBoardIssues from "./pages/AdvisoryBoardIssues";

// import TeacherClassroom from "./pages/TeacherClassroom";
// import TeacherClassroomSpreadsheet from "./pages/TeacherClassroomSpreadsheet";
// import TeacherClassroomSession from "./pages/TeacherClassroomSession";
// import TeacherClassroomManage from "./pages/TeacherClassroomManage";

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
        },
        // {
        //     path: "/portal",
        //     element: <Portal/>
        // },
        // {
        //     path: "/results",
        //     element: <StudentResults/>
        // },
        {
            path: "/classrooms",
            element: <StudentClassrooms/>
        }
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
        //     element: <StudentProgress/>
        // },
        // {
        //     path: "/classrooms/:classroom-id/",
        //     element: <TeacherClassroom/>
        // },
        // {
        //     path: "/classrooms/:classroom-id/spreadsheet",
        //     element: <TeacherClassroomSpreadsheet/>
        // },
        // {
        //     path: "/classrooms/:classroom-id/configure-sessions",
        //     element: <TeacherClassroomSession/>
        // },
        // {
        //     path: "/classrooms/:classroom-id/manage",
        //     element: <TeacherClassroomManage/>
        // },
        // {
        //     path: "/access-reports",
        //     element: <Reports/>
        // },
        // {
        //     path: "/classroom-reviews",
        //     element: <ModeratorClassroomReviews/>
        // },
        // {
        //     path: "/access-logs",
        //     element: <ModeratorLogs/>
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
        //     path: "/report-issues",
        //     element: <ReportIssues/>
        // },
        // {
        //     path: "/view-progress",
        //     element: <AdvisoryProgress/>
        // },
    ]);
}

export default AppRoutes;
