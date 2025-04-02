import { useState, useEffect } from 'react';

// Placeholder student ID for testing
const studentIdTemp = 'c64663b5-b686-4f5f-b901-8a1575b13aae';

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

    // Fetch badges and progress from backend
    useEffect(() => {
        const fetchBadgesData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/badges/student/${studentIdTemp}/all-badges`);
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