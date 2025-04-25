import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../components/AuthProvider.jsx';

// Hook to fetch and a student's progress data
const useStudentProgress = () => {
    const { token } = useAuth(); // Access token from context
    const studentId = token.jti; // Grab studentId from token

    const [studentData, setStudentData] = useState(null); // holds the fetched progress data
    const [loading, setLoading] = useState(true); //loading state
    const [error, setError] = useState(null); // stores error messages

    useEffect(() => {
        const fetchStudentProgress = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/student-progress/progress/${studentId}`);
                // if the response is not successful, set an error message
                if (!response.ok) {
                    setError(`Failed to fetch student progress: ${response.status} ${response.statusText}`);
                    return;
                }
                const data = await response.json();
                setStudentData(data); // save the student progress data
            } catch (error) {
                console.error("Error fetching student progress:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStudentProgress();
    }, [studentId]);
    return { studentData, loading, error };
};
// function that encapsulates navigation object to student progress
const useStudentProgressNavigation = () => {
    const navigate = useNavigate();
    // redirects user to badges view
    const handleNavigateToBadges = () => {
        navigate('/progress/badges');
    };
    return { handleNavigateToBadges };
};
//Exports hooks in one singular object to organize the logic
const StudentProgressLogic = {
    useStudentProgress,
    useStudentProgressNavigation
};

export default StudentProgressLogic;