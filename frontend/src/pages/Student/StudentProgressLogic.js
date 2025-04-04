import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../components/AuthProvider.jsx';

const useStudentProgress = () => {
    const { token } = useAuth(); // Access token from context
    const studentId = token.jti; // Grab studentId from token

    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentProgress = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/student-progress/progress/${studentId}`);

                if (!response.ok) {
                    setError(`Failed to fetch student progress: ${response.status} ${response.statusText}`);
                    return;
                }

                const data = await response.json();
                setStudentData(data);
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

const useStudentProgressNavigation = () => {
    const navigate = useNavigate();
    const handleNavigateToBadges = () => {
        navigate('/progress/badges');
    };
    return { handleNavigateToBadges };
};

const StudentProgressLogic = {
    useStudentProgress,
    useStudentProgressNavigation
};

export default StudentProgressLogic;