import { useNavigate } from "react-router-dom";

const studentData = {
    currentHoursCompleted: 45,
    totalQuestionsAnswered: 224,
    questionsRight: 150,
    sessionsCompleted: 10,
    daysLoggedOn: 30,
};

const useStudentProgressNavigation = () => {
    const navigate = useNavigate();
    const handleNavigateToBadges = () => {
        navigate('/progress/badges');
    };
    return { handleNavigateToBadges };
};

const StudentProgressLogic = {
    studentData,
    useStudentProgressNavigation
};

export default StudentProgressLogic;