import { useState, useEffect } from "react";
import { useAuth } from '../../components/AuthProvider';

const useStudentSessionLogic2 = () =>
{
    const { token } = useAuth();
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [sessionQuestionNumber, setSessionQuestionNumber] = useState(1);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [totalTimeRemaining, setTotalTimeRemaining] = useState(100);
    const [streak, setStreak] = useState(0);

    // On first render, fetch a question and current streak
    useEffect(() => {
        fetchFirstQuestion(token.jti);
    }, [])

    // UseEffect hook dependent on time left, if at 0, submit the session

    // Grabs the first question of the session along with setting the streak
    const fetchFirstQuestion = async (user_id) => {
        const response = await fetch(`http://localhost:8080/api/sessions/get-question-and-streak?userId=${user_id}`);
        const json = await response.json();
        console.log("get first question: ", json);
        setStreak(json.streak);
        setCurrentQuestion(json.question);
    }

    // Grabs subsequent questions containg just a single question
    const fetchNextQuestion = async (user_id, avgTimePerQuestion, streak) => {
        const query = `?userId=${user_id}&avgTimePerQuestion=${avgTimePerQuestion}&streak=${streak}`;
        const response = await fetch(`http://localhost:8080/api/sessions/get-next-question${query}`);
        const json = await response.json();
        console.log("get first question: ", json);
        setCurrentQuestion(json);
    }

    const submitSession = async (
        userId,
        streak,
        totalQuestions,
        totalQuestionsRight,
        totalQuestionsWrong,
        avgTimeSpentInSession,
        successRate,
        avgTimePerQuestion
    ) => {
        const query = `userId=${userId}&streak=${streak}&totalQuestions=${totalQuestions}&totalQuestionsRight=${totalQuestionsRight}&totalQuestionsWrong=${totalQuestionsWrong}&avgTimeSpentInSession=${avgTimeSpentInSession}&successRate=${successRate}&avgTimePerQuestion=${avgTimePerQuestion}`;
        const response = await fetch(`http://localhost:8080/api/sessions/update-statistics?${query}`);
        return response;
    }
};

export default useStudentSessionLogic2;
