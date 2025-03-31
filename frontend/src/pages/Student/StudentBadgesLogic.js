const EMOJIS = {
    hardLearner: '🏅', quizConqueror: '🏆', timeTraveler: '⏳', loyalLearner: '💎',
    quizWiz: '📚', superAchiever: '🎯', sessionMaster: '🎮', sessionSuperstar: '✨'
};

//Sample data
const studentData = {
    totalQuestionsAnswered: 224, questionsRight: 95, timeSpent: 15,
    daysLoggedOn: 45, sessionsCompleted: 10,
};

//Max values for each badge
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

//Progress calculations for each badge
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

//Earned badges
const earnedBadges = Object.entries(progressValues)
    .filter(([_, progress]) => progress >= 100)
    .map(([key]) => `${key.replace(/([A-Z])/g, ' $1').trim()} ${EMOJIS[key]}`);

const capitalizeWords = (str) => {
    return str.replace(/([A-Z])/g, ' $1').trim().replace(/\b\w/g, (char) => char.toUpperCase());
};

const StudentBadgesLogic = {
    EMOJIS,
    maxValues,
    getRequirementText,
    progressValues,
    earnedBadges,
    capitalizeWords
};

export default StudentBadgesLogic;