import { useState, useEffect } from "react";
import { useAuth } from '../../components/AuthProvider';

const useStudentSessionLogic = () =>
{
    const { token } = useAuth();
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questionId, setQuestionId] = useState(null);
    const [sessionQuestionNumber, setSessionQuestionNumber] = useState(1);
    const [selAnswer, setSelAnswer] = useState(new Map());
    const [submitted, setSubmitted] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [totalTimeRemaining, setTotalTimeRemaining] = useState(10);
    const [sessionConcluded, setSessionConcluded] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
    const [studentZLO, setStudentZLO] = useState(null);

    const formatTimeRemaining = (seconds) =>
    {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    const fetchZLO = async () =>
    {
        const usernameId = token?.jti;

        if (!usernameId)
        {
            return;
        }

        try
        {
            const response = await fetch(`http://localhost:8080/api/students/${usernameId}/zlo`);
            const responseText = await response.text();

            if (!response.ok || responseText.trim() === "")
            {
                return;
            }

            const data = JSON.parse(responseText);
            setStudentZLO(data);
        }
        catch (err)
        {
            console.error("Error fetching ZLO:", err);
        }
    };

    const fetchNextQuestion = async () =>
    {
        try
        {
            const response = await fetch("http://localhost:8080/api/sessions/questions", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok)
            {
                return;
            }

            const questionSet = await response.json();

            if (questionSet.length > 0)
            {
                let newQuestion = questionSet[Math.floor(Math.random() * questionSet.length)];

                while (answeredQuestions.has(newQuestion.questionId))
                {
                    newQuestion = questionSet[Math.floor(Math.random() * questionSet.length)];
                }

                setAnsweredQuestions((prev) => new Set(prev).add(newQuestion.questionId));

                if (typeof newQuestion.options === "string")
                {
                    const regex = /([>])\.\s*([^>]+)/g;
                    const parsedOptions = [];
                    let match;

                    while ((match = regex.exec(newQuestion.options)) !== null)
                    {
                        parsedOptions.push(match[0].trim(1));
                    }

                    if (newQuestion.options.toLowerCase().includes('true') || newQuestion.options.toLowerCase().includes('false'))
                    {
                        parsedOptions.push("True", "False");
                    }

                    newQuestion.options = parsedOptions;
                }

                if (Array.isArray(newQuestion.options))
                {
                    setCurrentQuestion(newQuestion);
                    setQuestionId(newQuestion.questionId);
                }
            }
        }
        catch (error)
        {
            console.error("Question Fetch Error:", error);
        }
    };

    const updateZLO = async (correctCount, wrongCount, avgTimeSpentInSession, avgTimePerQuestion, streak, successRate) =>
    {
        const usernameId = token?.jti;

        if (!usernameId)
        {
            return;
        }

        const updatedZLO = {
            correctCount: correctCount,
            wrongCount: wrongCount,
            avgTimeSpentInSession: avgTimeSpentInSession,
            avgTimePerQuestion: avgTimePerQuestion,
            streak: streak,
            successRate: successRate
        };

        try
        {
            const response = await fetch(`http://localhost:8080/api/students/${usernameId}/updateZlo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedZLO)
            });

            if (response.ok)
            {
                const responseText = await response.json();
                setStudentZLO(responseText.zloRating);
            }
        }
        catch (err)
        {
            console.error("Error updating ZLO:", err);
        }
    };

    useEffect(() =>
    {
        fetchZLO();
        fetchNextQuestion();
    }, []);

    useEffect(() =>
    {
        if (sessionConcluded || !currentQuestion)
        {
            return;
        }

        const timer = setInterval(() =>
        {
            setTotalTimeRemaining((prev) =>
            {
                if (prev <= 0)
                {
                    clearInterval(timer);
                    setSessionConcluded(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestion, sessionConcluded]);

    useEffect(() =>
    {
        if (totalTimeRemaining <= 0 && !submitted && currentQuestion)
        {
            setSubmitted(true);
        }
    }, [totalTimeRemaining]);

    const answerChoice = (choose) =>
    {
        setSelAnswer((prev) =>
        {
            const newAnswers = new Map(prev);
            newAnswers.set(questionId, {
                q: currentQuestion.question,
                pick: choose,
                correct: currentQuestion.answer
            });
            return newAnswers;
        });
    };

    const submitAnswer = () =>
    {
        if (!currentQuestion)
        {
            return;
        }

        const chosenAnswer = selAnswer.get(questionId)?.pick;
        const isCorrect = chosenAnswer === currentQuestion.answer;

        if (isCorrect)
        {
            setCorrectCount((prev) => prev + 1);
        }
        else
        {
            setWrongCount((prev) => prev + 1);
        }

        setSubmitted(true);

        const avgTimeSpentInSession = (totalTimeRemaining / 60);
        const avgTimePerQuestion = totalTimeRemaining / sessionQuestionNumber;
        const successRate = correctCount / (correctCount + wrongCount);

        updateZLO(correctCount, wrongCount, avgTimeSpentInSession, avgTimePerQuestion, streak, successRate);
    };

    const nextQ = async () =>
    {
        if (!submitted && !selAnswer.get(questionId)?.pick)
        {
            setWrongCount((prev) => prev + 1);
        }

        setSubmitted(false);
        await fetchNextQuestion();
        setSessionQuestionNumber((prev) => prev + 1);
    };

    return {
        questionId,
        sessionQuestionNumber,
        selAnswer,
        submitted,
        correctCount,
        wrongCount,
        sessionConcluded,
        currentQuestion,
        totalTimeRemaining,
        formatTimeRemaining,
        nextQ,
        submitAnswer,
        answerChoice,
        studentZLO
    };
};

export default useStudentSessionLogic;
