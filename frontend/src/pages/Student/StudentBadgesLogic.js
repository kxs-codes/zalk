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

const StudentBadgesLogic = () => {
    const [badges, setBadges] = useState([]);
    const [progressMap, setProgressMap] = useState({});
    const [loading, setLoading] = useState(true);
    const { token } = useAuth(); // Access token from context
    const studentId = token.jti; // Grab studentId from token

    // Fetch badges and progress from backend
    useEffect(() => {
        const fetchBadgesData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/badges/student/${studentId}/all-badges`);
                const data = await response.json();

                const allBadges = data.allBadges || [];
                const progressMapping = {};

                // Assign progress for all badges, even if not earned
                allBadges.forEach(badge => {
                    progressMapping[badge.badgeName] = badge.progress || 0;
                });

                setBadges(allBadges);
                setProgressMap(progressMapping);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching badge data:", error);
                setLoading(false);
            }
        };
        fetchBadgesData();
    }, []);

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