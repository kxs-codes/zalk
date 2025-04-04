import React, { useState, useEffect } from 'react';
import '../../styles/Student/pages/StudentBadges.css';
import StudentBadgesLogic from './StudentBadgesLogic';

const StudentBadges = () => {
    const { EMOJIS, badges, progressMap, loading, capitalizeWords } = StudentBadgesLogic();
    const [earnedBadges, setEarnedBadges] = useState([]);

    useEffect(() => {
        // Logic to determine earned badges, for example
        const earned = badges.filter(badge => progressMap[badge.badgeName] >= badge.badgeRequirement);
        setEarnedBadges(earned);
    }, [badges, progressMap]);

    return (
        <div className="badges-container">
            <div className="badges-content">
                <h2 className="title">Student Badges</h2>

                {/*Badges Grid*/}
                <div className="badges-grid">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        badges.map((badge, index) => {
                            const badgeKey = badge.badgeName
                                .toLowerCase()
                                .replace(/\s+(.)/g, (match, group1) => group1.toUpperCase())
                                .replace(/\s+/g, '');

                            return (
                                <div key={index} className={`badge-card ${badgeKey}`}>
                                    <div className="emoji-large">
                                        {EMOJIS[badgeKey] || '❓'}
                                    </div>
                                    <h3 className="badge-title">{capitalizeWords(badge.badgeName)}</h3>
                                    <p className="badge-description">{badge.badgeDescription}.</p>
                                </div>
                            );
                        })
                    )}
                </div>

                {/*Progress Section*/}
                <div className="progress-section">
                    <h3 className="section-title">Current Badge Progress</h3>
                    {badges.map((badge, index) => {
                        const progress = (progressMap[badge.badgeName] / badge.badgeRequirement) * 100 || 0;
                        const badgeKey = badge.badgeName
                            .toLowerCase()
                            .replace(/\s+(.)/g, (match, group1) => group1.toUpperCase())
                            .replace(/\s+/g, '');

                        return (
                            <div key={index} className="badge-progress">
                                <h4 className="progress-label">{capitalizeWords(badge.badgeName)}</h4>
                                <div className="progress-bar-container">
                                    <div
                                        className="progress-bar"
                                        style={{ width: `${Math.min(progress, 100)}%` }}  // Cap the progress at 100%
                                    >
                                        {Math.min(progress, 100).toFixed(0)}%  {/*Display the progress*/}
                                    </div>
                                </div>
                                <span className="progress-emoji">{EMOJIS[badgeKey] || '❓'}</span>
                            </div>
                        );
                    })}
                </div>

                {/*Earned Badges Section*/}
                <div className="earned-section">
                    <h3 className="section-title">Current Badges Earned</h3>
                    {earnedBadges.length === 0 ? (
                        <p>No badges earned yet. Keep going!</p>
                    ) : (
                        earnedBadges.map((badge, index) => {
                            const badgeKey = badge.badgeName
                                .toLowerCase()
                                .replace(/\s+(.)/g, (match, group1) => group1.toUpperCase())
                                .replace(/\s+/g, '');

                            return (
                                <div key={index} className="earned-badge">
                                    {capitalizeWords(badge.badgeName)} {EMOJIS[badgeKey] || '❓'} {/*Fallback emoji*/}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentBadges;