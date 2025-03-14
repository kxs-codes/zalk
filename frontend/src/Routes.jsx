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
        }
        // {
        //     path: "/portal",
        //     element: <Portal/>
        // },
        // {
        //     path: "/student/results",
        //     element: <StudentResults/>
        // },
        // {
        //     path: "/student/improvements",
        //     element: <StudentImprovements/>
        // },
        // {
        //     path: "/student/session",
        //     element: <StudentSession/>
        // },
        // {
        //     path: "/student/progress",
        //     element: <StudentProgress/>
        // },
        // {
        //     path: "/student/progress/badges",
        //     element: <StudentBadges/>
        // },
        // {
        //     path: "/advisory-board/issues",
        //     element: <AdvisoryBoardIssues/>
        // },
        // {
        //     path: "teacher/classrooms/:classroom-id/",
        //     element: <TeacherClassroom/>
        // },
        // {
        //     path: "teacher/classrooms/:classroom-id/spreadsheet",
        //     element: <TeacherClassroomSpreadsheet/>
        // },
        // {
        //     path: "teacher/classrooms/:classroom-id/configure-sessions",
        //     element: <TeacherClassroomSession/>
        // },
        // {
        //     path: "teacher/classrooms/:classroom-id/manage",
        //     element: <TeacherClassroomManage/>
        // },
        // {
        //     path: "/moderator/reports",
        //     element: <ModeratorReports/>
        // },
        // {
        //     path: "/moderator/classroom-reviews",
        //     element: <ModeratorClassroomReviews/>
        // },
        // {
        //     path: "/moderator/logs",
        //     element: <ModeratorLogs/>
        // },   
        // {
        //     path: "/moderator/create-classroom",
        //     element: <ModeratorCreateClassroom/>
        // }
    ]);
}

export default AppRoutes;
