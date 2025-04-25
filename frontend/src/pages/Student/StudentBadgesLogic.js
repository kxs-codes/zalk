import { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthProvider.jsx';

// Define the emojis for each badge
const EMOJIS = {
    hardLearner: '🏅',
    quizConquerer: '🏆',
    timeTraveler: '⏳',
    loyalLearner: '💎',
    quizWizard: '📚',
    superAchiever: '🎯',
    sessionMaster: '🎮',
    sessionSuperstar: '✨'
};

// Custom hook to manage badge data and progress for a student
const StudentBadgesLogic = () => {
    const [badges, setBadges] = useState([]); // List of all badges (earned and unearned)
    const [progressMap, setProgressMap] = useState({}); // Map of badgeName -> progress percentage
    const [loading, setLoading] = useState(true); // Loading state while fetching data
    const { token } = useAuth(); // Retrieve authentication token from context
    const studentId = token.jti; // Extract student ID from the token (JWT ID)

    // Fetch badge data when component mounts
    useEffect(() => {
        const fetchBadgesData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/badges/student/${studentId}/all-badges`);
                const data = await response.json();

                const allBadges = data.allBadges || []; // Fallback to empty array if no badges
                const progressMapping = {};

                // Store progress for each badge (default to 0 if not earned)
                allBadges.forEach(badge => {
                    progressMapping[badge.badgeName] = badge.progress || 0;
                });

                setBadges(allBadges);
                setProgressMap(progressMapping);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching badge data:", error);
                setLoading(false); // Ensure loading stops on failure too
            }
        };
        fetchBadgesData();
    }, []);
    // Formats the strings to a set format
    const capitalizeWords = (str) => {
        return str.replace(/([A-Z])/g, ' $1').trim().replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return {
        EMOJIS,
        badges,
        progressMap,
        loading,
        capitalizeWords,
    };
};

export default StudentBadgesLogic;