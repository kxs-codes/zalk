import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../components/AuthProvider.jsx';

// Hook to fetch and manage a student's progress data
const useStudentProgress = () => {
    const { token } = useAuth(); // Access token from context
    const [studentData, setStudentData] = useState(null); // Holds the fetched progress data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Stores error messages
    const [studentId, setStudentId] = useState(null); // Actual student ID to fetch progress

    useEffect(() => {
        const determineStudentId = async () => {
            // If user is a guardian, fetch associated student ID
            if (token.role === "guardian") {
                try {
                    const response = await fetch(`http://localhost:8080/api/guardian/student-id/${token.jti}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch student ID: ${response.status} ${response.statusText}`);
                    }
                    const data = await response.json();
                    if (data.studentId) {
                        setStudentId(data.studentId);
                    } else {
                        throw new Error(data.message || "No associated student found.");
                    }
                } catch (error) {
                    console.error("Error fetching student ID:", error);
                    setError(error.message);
                    setLoading(false);
                }
            } else {
                // If user is a student, directly use their ID
                setStudentId(token.jti);
            }
        };

        determineStudentId();
    }, [token]);

    useEffect(() => {
        const fetchStudentProgress = async () => {
            if (!studentId) return; // Don't fetch if studentId isn't set yet

            try {
                const response = await fetch(`http://localhost:8080/api/student-progress/progress/${studentId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch student progress: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setStudentData(data); // Save the student progress data
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

// Function that encapsulates navigation object to student progress
const useStudentProgressNavigation = () => {
    const navigate = useNavigate();
    // Redirects user to badges view
    const handleNavigateToBadges = () => {
        navigate('/progress/badges');
    };
    return { handleNavigateToBadges };
};

// Exports hooks in one singular object to organize the logic
const StudentProgressLogic = {
    useStudentProgress,
    useStudentProgressNavigation
};

export default StudentProgressLogic;
