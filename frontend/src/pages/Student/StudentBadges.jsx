import React from 'react';
import '../../styles/Student/pages/StudentBadges.css';

const StudentBadges = () => {
    // Emoji constants
    const EMOJIS = {
        hardLearner: '🏅', quizConqueror: '🏆', timeTraveler: '⏳', loyalLearner: '💎',
        quizWiz: '📚', superAchiever: '🎯', sessionMaster: '🎮', sessionSuperstar: '✨'
    };

    // Sample data
    const studentData = {
        totalQuestionsAnswered: 224, questionsRight: 95, timeSpent: 15,
        daysLoggedOn: 45, sessionsCompleted: 10,
    };

    // Max values for each badge
    const maxValues = {
        hardLearner: 200, quizConqueror: 300, timeTraveler: 60, loyalLearner: 30, quizWiz: 200,
        superAchiever: 250, sessionMaster: 30, sessionSuperstar: 15,
    };

    const getRequirementText = (badgeKey) => {
        const requirementMap = {
            hardLearner: "questions answered",
            quizConqueror: "questions answered correctly",
            timeTraveler: "minutes spent studying",
            loyalLearner: "days logged in",
            quizWiz: "quiz questions attempted",
            superAchiever: "total points earned",
            sessionMaster: "sessions completed",
            sessionSuperstar: "sessions attended",
        };
        return requirementMap[badgeKey] || "achievements";
    };

    // Progress calculations for each badge
    const progressValues = {
        hardLearner: Math.min((studentData.totalQuestionsAnswered / maxValues.hardLearner) * 100, 100),
        quizConqueror: Math.min((studentData.questionsRight / maxValues.quizConqueror) * 100, 100),
        timeTraveler: Math.min((studentData.timeSpent / maxValues.timeTraveler) * 100, 100),
        loyalLearner: Math.min((studentData.daysLoggedOn / maxValues.loyalLearner) * 100, 100),
        quizWiz: Math.min((studentData.totalQuestionsAnswered / maxValues.quizWiz) * 100, 100),
        superAchiever: Math.min((studentData.totalQuestionsAnswered / maxValues.superAchiever) * 100, 100),
        sessionMaster: Math.min((studentData.sessionsCompleted / maxValues.sessionMaster) * 100, 100),
        sessionSuperstar: Math.min((studentData.sessionsCompleted / maxValues.sessionSuperstar) * 100, 100),
    };

    // Earned badges
    const earnedBadges = Object.entries(progressValues)
        .filter(([_, progress]) => progress >= 100)
        .map(([key]) => `${key.replace(/([A-Z])/g, ' $1').trim()} ${EMOJIS[key]}`);

    const capitalizeWords = (str) => {
        return str.replace(/([A-Z])/g, ' $1').trim().replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <div className="badges-container">
            <div className="badges-content">
                <h2 className="title">Student Badges</h2>

                {/*Badges Grid*/}
                <div className="badges-grid">
                    {Object.keys(EMOJIS).map((badgeKey, index) => (
                        <div key={index} className={`badge-card ${badgeKey}`}>
                            <div className="emoji-large">{EMOJIS[badgeKey]}</div>
                            <h3 className="badge-title">{capitalizeWords(badgeKey)}</h3>
                            <p className="badge-description">
                                Earned after reaching {maxValues[badgeKey]} {getRequirementText(badgeKey)}.
                            </p>
                        </div>
                    ))}
                </div>

                {/*Progress Section*/}
                <div className="progress-section">
                    <h3 className="section-title">Current Badge Progress</h3>
                    {Object.entries(progressValues).map(([key, progress]) => (
                        <div key={key} className="badge-progress">
                            <h4 className="progress-label">{capitalizeWords(key.replace(/([A-Z])/g, ' $1').trim())}</h4>
                            <div className="progress-bar-container">
                                <div className="progress-bar" style={{ width: `${progress}%` }}>
                                    {progress.toFixed(0)}%
                                </div>
                            </div>
                            <span className="progress-emoji">{EMOJIS[key]}</span>
                        </div>
                    ))}
                </div>

                {/*Earned Badges*/}
                <div className="earned-section">
                    <h3 className="section-title">Current Badges Earned</h3>
                    {earnedBadges.length === 0 ? (
                        <p>No badges earned yet. Keep going!</p>
                    ) : (
                        earnedBadges.map((badge, index) => (
                            <div key={index} className="earned-badge">{capitalizeWords(badge)}</div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentBadges;