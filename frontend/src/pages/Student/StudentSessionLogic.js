import { useState, useEffect } from "react";

const useStudentSessionLogic = () =>
{
    const [qIndex, setQIndex] = useState(0);
    const [selAnswer, setSelAnswer] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(10.00);
    const [sessionConcluded, setSessionConcluded] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState([]);
    const [streak, setStreak] = useState(0);
    const [totalTimeInSessions, setTotalTimeInSessions] = useState(0);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);
    const [daysLoggedIn, setDaysLoggedIn] = useState(0);
    const [subjectMasteryValue, setSubjectMasteryValue] = useState(0);
    const [guessRate, setGuessRate] = useState(0);
    const [avgTimeSpentInSession, setAvgTimeSpentInSession] = useState(0);
    const [successRate, setSuccessRate] = useState(0);
    const [avgTimePerQuestion, setAvgTimePerQuestion] = useState(0);

    const createDummyStudent = async () =>
    {
        const studentData = {
            username: "studentName",
            fullName: "John Doe",
            email: "john.doe@example.com",
            password: "password123"
        };

        try
        {
            const response = await fetch("http://localhost:5173/api/students",
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentData),
            });

            if (response.ok)
            {
                const result = await response.json();
                console.log("Created Student:", result);
            }
            else
            {
                console.error("Failed to create student. Status:", response.status);
            }
        }
        catch (error)
        {
            console.error("Error creating student:", error);
        }
    };

    const fetchNextQuestion = async () =>
    {
        try
        {
            const response = await fetch("http://localhost:5173/api/sessions/generate-question",
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    studentforSession: "studentName",
                }),
            });
            const data = await response.json();
            console.log("Fetched Question:", data);
            setCurrentQuestion(data);
        }
        catch (error)
        {
            console.error("Question Fetch Error");
        }
    };

    useEffect(() =>
    {
        fetchNextQuestion();
    }, []);

    const prePer = currentQuestion ? ((correctCount / currentQuestion.length) * 100.00) : 0;
    const sessionPercent = prePer.toFixed(2);

    const nextQ = () =>
    {
        if (!submitted)
        {
            if (selAnswer[qIndex] === undefined || !selAnswer[qIndex].pick)
            {
                setWrongCount(wrongCount + 1);
            }
        }
        if (qIndex < currentQuestion.length - 1)
        {
            setQIndex(qIndex + 1);
            setSubmitted(false);
            fetchNextQuestion();
        }
        else
        {
            setSessionConcluded(true);
            updateSessionData();
        }
    };

    const answerChoice = (choose) =>
    {
        setSelAnswer((x) =>
        {
            const y = [...x];
            y[qIndex] = { q: currentQuestion[qIndex].q, pick: choose };
            return y;
        });
    };

    const submitAnswer = () =>
    {
        setSubmitted(true);
        const chosenAnswer = selAnswer[qIndex]?.pick;
        const isCorrect = chosenAnswer === currentQuestion[qIndex].rightChoice;
        if (isCorrect)
        {
            setCorrectCount(correctCount + 1);
            setStreak(streak + 1);
        }
        else
        {
            setWrongCount(wrongCount + 1);
            setStreak(0);
        }
    };

    const updateSessionData = async () =>
    {
        const sessionData = {
            studentforSession: ["studentName"],
            totalTimeInSessions: totalTimeInSessions,
            streak: streak,
            totalQuestions: currentQuestion.length,
            totalQuestionsRight: correctCount,
            totalQuestionsWrong: wrongCount,
            sessionsCompleted: sessionsCompleted,
            daysLoggedIn: daysLoggedIn,
            subjectMasteryValue: subjectMasteryValue,
            guessRate: guessRate,
            avgTimeSpentInSession: avgTimeSpentInSession,
            successRate: successRate,
            avgTimePerQuestion: avgTimePerQuestion
        };

        try
        {
            const response = await fetch("http://localhost:5173/api/sessions/create",
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sessionData)
            });
            const result = await response.json();
            console.log("Session updated:", result);
        }
        catch (error)
        {
            console.error("Error updating session:", error);
        }
    };

    useEffect(() =>
    {
        if (timeRemaining <= 0)
        {
            if (!selAnswer[qIndex] || !selAnswer[qIndex].pick)
            {
                setWrongCount(wrongCount + 1);
            }
            else
            {
                const chosenAnswer = selAnswer[qIndex]?.pick;
                const isCorrect = chosenAnswer === currentQuestion[qIndex].rightChoice;
                if (isCorrect)
                {
                    setCorrectCount(correctCount + 1);
                }
                else
                {
                    setWrongCount(wrongCount + 1);
                }
            }
            setSessionConcluded(true);
            updateSessionData();
            return;
        }

        const timeFunction = setInterval(() =>
        {
            setTimeRemaining((secZ) =>
            {
                if (secZ <= 0)
                {
                    clearInterval(timeFunction);
                    setSessionConcluded(true);
                    updateSessionData();
                    return 0;
                }
                return secZ - 1;
            });
        }, 1000.00);

        return () => clearInterval(timeFunction);
    }, [timeRemaining]);

    const minutes = timeRemaining - (timeRemaining % 60);
    const secCore = timeRemaining % 60.00;
    let seconds;
    if (secCore < 10.00)
    {
        seconds = `0${secCore}`;
    }
    else
    {
        seconds = secCore;
    }

    return {
        qIndex,
        selAnswer,
        submitted,
        correctCount,
        wrongCount,
        sessionConcluded,
        currentQuestion,
        nextQ,
        submitAnswer,
        answerChoice
    };
};

export default useStudentSessionLogic;
