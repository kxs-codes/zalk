import React from 'react';
import PortalLogoBar from "../components/PortalLogoBar.jsx";

const StudentBadges = () => {
    //Emoji constants
    const EMOJIS = {
        hardLearner: '🏅', quizConqueror: '🏆', timeTraveler: '⏳', loyalLearner: '💎',
        quizWiz: '📚', superAchiever: '🎯', sessionMaster: '🎮', sessionSuperstar: '✨'
    };

    //Sample data, you can replace this with actual dynamic data
    const studentData = {
        totalQuestionsAnswered: 224, questionsRight: 95, timeSpent: 15,
        daysLoggedOn: 45, sessionsCompleted: 10,
    };

    //Max values for each badge
    const maxValues = {
        hardLearner: 200, quizConqueror: 300, timeTraveler: 60, loyalLearner: 30, quizWiz: 200,
        superAchiever: 250, sessionMaster: 30, sessionSuperstar: 15,
    };

    //Progress calculations for each badge
    const hardLearnerProgress = Math.min((studentData.totalQuestionsAnswered / maxValues.hardLearner) * 100, 100);
    const quizConquerorProgress = Math.min((studentData.questionsRight / maxValues.quizConqueror) * 100, 100);
    const timeTravelerProgress = Math.min((studentData.timeSpent / maxValues.timeTraveler) * 100, 100);
    const loyalLearnerProgress = Math.min((studentData.daysLoggedOn / maxValues.loyalLearner) * 100, 100);
    const quizWizProgress = Math.min((studentData.totalQuestionsAnswered / maxValues.quizWiz) * 100, 100);
    const superAchieverProgress = Math.min((studentData.totalQuestionsAnswered / maxValues.superAchiever) * 100, 100);
    const sessionMasterProgress = Math.min((studentData.sessionsCompleted / maxValues.sessionMaster) * 100, 100);
    const sessionSuperstarProgress = Math.min((studentData.sessionsCompleted / maxValues.sessionSuperstar) * 100, 100);

    //Current badges based on progress
    const earnedBadges = [];
    if (hardLearnerProgress >= 100) earnedBadges.push(`Hard-Learner ${EMOJIS.hardLearner}`);
    if (quizConquerorProgress >= 100) earnedBadges.push(`Quiz Conqueror ${EMOJIS.quizConqueror}`);
    if (timeTravelerProgress >= 100) earnedBadges.push(`Time Traveler ${EMOJIS.timeTraveler}`);
    if (loyalLearnerProgress >= 100) earnedBadges.push(`Loyal Learner ${EMOJIS.loyalLearner}`);
    if (quizWizProgress >= 100) earnedBadges.push(`Quiz Wiz ${EMOJIS.quizWiz}`);
    if (superAchieverProgress >= 100) earnedBadges.push(`Super Achiever ${EMOJIS.superAchiever}`);
    if (sessionMasterProgress >= 100) earnedBadges.push(`Session Master ${EMOJIS.sessionMaster}`);
    if (sessionSuperstarProgress >= 100) earnedBadges.push(`Session Superstar ${EMOJIS.sessionSuperstar}`);

    //Component for Badge Progress to reduce repetition
    const BadgeProgress = ({ label, progress, emoji }) => (
        <div className="flex items-center">
            <h4 className="font-semibold text-lg">{label}</h4>
            <div className="w-full bg-gray-300 rounded-full ml-4">
                <div className="bg-[var(--color-light-red-primary-2)] text-xs font-medium text-center p-1 leading-none rounded-full" style={{ width: `${progress}%` }}>
                    {progress.toFixed(0)}%
                </div>
            </div>
            <div className="ml-2">{emoji}</div>
        </div>
    );

    return (
        <div className="flex items-center justify-center bg-gray-100 w-full h-screen">
            <PortalLogoBar />
            {/*Main div for containers*/}
            <div className="flex flex-col items-center mt-20 lg:mx-15 justify-start h-8/10 w-9/10 shadow-2xl bg-white overflow-y-auto p-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">Student Badges</h2>

                {/*Badges Container*/}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-[var(--color-dark-red-primary-1)] text-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-2">{EMOJIS.hardLearner}</div>
                        <h3 className="text-xl font-semibold">Hard Learner</h3>
                        <p className="text-sm mt-2">Earned after answering 200 questions.</p>
                    </div>
                    <div className="bg-[var(--color-light-red-primary-2)] text-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-2">{EMOJIS.quizConqueror}</div>
                        <h3 className="text-xl font-semibold">Quiz Conqueror</h3>
                        <p className="text-sm mt-2">Earned after getting 300+ questions correct.</p>
                    </div>
                    <div className="bg-[var(--color-red-primary-3)] text-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-2">{EMOJIS.timeTraveler}</div>
                        <h3 className="text-xl font-semibold">Time Traveler</h3>
                        <p className="text-sm mt-2">Earned after spending 60+ hours in sessions.</p>
                    </div>
                    <div className="bg-[var(--color-red-primary-3)] text-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-2">{EMOJIS.loyalLearner}</div>
                        <h3 className="text-xl font-semibold">Loyal Learner</h3>
                        <p className="text-sm mt-2">Earned after logging in for 30+ days.</p>
                    </div>
                    <div className="bg-[var(--color-light-red-primary-2)] text-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-2">{EMOJIS.quizWiz}</div>
                        <h3 className="text-xl font-semibold">Quiz Wiz</h3>
                        <p className="text-sm mt-2">Earned after answering 200+ questions correctly.</p>
                    </div>
                    <div className="bg-[var(--color-red-primary-3)] text-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-2">{EMOJIS.superAchiever}</div>
                        <h3 className="text-xl font-semibold">Super Achiever</h3>
                        <p className="text-sm mt-2">Earned after answering 250+ questions.</p>
                    </div>
                    <div className="bg-[var(--color-light-red-primary-2)] text-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-2">{EMOJIS.sessionSuperstar}</div>
                        <h3 className="text-xl font-semibold">Session Superstar</h3>
                        <p className="text-sm mt-2">Earned after completing 15 sessions.</p>
                    </div>
                    <div className="bg-[var(--color-dark-red-primary-1)] text-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-2">{EMOJIS.sessionMaster}</div>
                        <h3 className="text-xl font-semibold">Session Master</h3>
                        <p className="text-sm mt-2">Earned after completing 30+ sessions.</p>
                    </div>
                </div>

                {/*Current Badge Progress*/}
                <div className="mt-10 w-full">
                    <h3 className="text-xl font-semibold mb-4">Current Badge Progress</h3>
                    <div className="space-y-6">
                        {/*Progress for each badge remains unchanged*/}
                        <BadgeProgress label="Hard Learner" progress={hardLearnerProgress} emoji={EMOJIS.hardLearner} />
                        <BadgeProgress label="Quiz Conqueror" progress={quizConquerorProgress} emoji={EMOJIS.quizConqueror} />
                        <BadgeProgress label="Time Traveler" progress={timeTravelerProgress} emoji={EMOJIS.timeTraveler} />
                        <BadgeProgress label="Loyal Learner" progress={loyalLearnerProgress} emoji={EMOJIS.loyalLearner} />
                        <BadgeProgress label="Quiz Wiz" progress={quizWizProgress} emoji={EMOJIS.quizWiz} />
                        <BadgeProgress label="Super Achiever" progress={superAchieverProgress} emoji={EMOJIS.superAchiever} />
                        <BadgeProgress label="Session Master" progress={sessionMasterProgress} emoji={EMOJIS.sessionMaster} />
                        <BadgeProgress label="Session Superstar" progress={sessionSuperstarProgress} emoji={EMOJIS.sessionSuperstar} />
                    </div>
                </div>

                {/*Current Badges Earned Section*/}
                <div className="mt-10 w-full">
                    <h3 className="text-xl font-semibold mb-4">Current Badges Earned</h3>
                    <div className="space-y-4">
                        {earnedBadges.length === 0 ? (
                            <p>No badges earned yet. Keep going!</p>
                        ) : (
                            earnedBadges.map((badge, index) => (
                                <div key={index} className="bg-gray-300 text-center p-4 rounded-lg shadow-md">
                                    <p className="text-lg font-semibold">{badge}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentBadges;