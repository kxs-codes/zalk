import React from 'react';
import '../../styles/Student/pages/StudentBadges.css';
import StudentBadgesLogic from './StudentBadgesLogic';

const { EMOJIS, maxValues, getRequirementText, progressValues, earnedBadges, capitalizeWords } = StudentBadgesLogic;

const StudentBadges = () => {
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
                    ):
                        (
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