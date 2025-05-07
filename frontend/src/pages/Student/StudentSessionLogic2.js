import { useState, useEffect } from "react";
import { useAuth } from '../../components/AuthProvider';

const useStudentSessionLogic2 = () => {
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
    const [studentZLO, setStudentZLO] = useState(null);
    const [gradeLevel, setGradeLevel] = useState(null);
    const [streak, setStreak] = useState(null);
    const [userId, setUserId] = useState("");
    const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

    const formatTimeRemaining = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    const fetchStudentInfo = async () => {
        const usernameId = token?.jti;
        if (!usernameId) return;

        setUserId(usernameId);

        try {
            const zloRes = await fetch(`http://localhost:8080/api/students/${usernameId}/zlo`);
            const gradeRes = await fetch(`http://localhost:8080/api/students/${usernameId}/gradelevel`);
                    const streakRes = await fetch(`http://localhost:8080/api/students/${usernameId}/streak`);
            if (zloRes.ok) {
                const zloData = await zloRes.json();
                setStudentZLO(zloData);
            }
                    if (streakRes.ok) {
                        const streakData = await streakRes.json();
                        setStreak(streakData);  // Set the streak in the state
                    }
            if (gradeRes.ok) {
                const gradeData = await gradeRes.json();
                setGradeLevel(gradeData);
            }
        } catch (error) {
            console.error("Error fetching student info:", error);
        }
    };

    const fetchNextQuestion = async () => {
        const totalQuestions = correctCount + wrongCount;
        const successRate = totalQuestions > 0 ? correctCount / totalQuestions : 0;
        const avgTimeSpentInSession = totalTimeRemaining / 60;
        const avgTimePerQuestion = totalTimeRemaining / sessionQuestionNumber;

        try {
            const params = new URLSearchParams({
                userId,
                totalQuestionsRight: correctCount,
                totalQuestions,
                avgTimeSpentInSession,
                avgTimePerQuestion,
                successRate,
                streak
            });

            const response = await fetch(`http://localhost:8080/api/sessions/get-next-question?${params.toString()}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                console.error("Failed to fetch question from SessionService2");
                return;
            }

            const question = await response.json();

            if (typeof question.options === "string") {
                const regex = /([>])\.\s*([^>]+)/g;
                const parsedOptions = [];
                let match;

                while ((match = regex.exec(question.options)) !== null) {
                    parsedOptions.push(match[0].trim());
                }

                if (question.options.toLowerCase().includes("true") || question.options.toLowerCase().includes("false")) {
                    parsedOptions.push("True", "False");
                }

                question.options = parsedOptions;
            }

            if (Array.isArray(question.options) && !answeredQuestions.has(question.questionId)) {
                setAnsweredQuestions(prev => new Set(prev).add(question.questionId));
                setCurrentQuestion(question);
                setQuestionId(question.questionId);
            } else {
                fetchNextQuestion(); // avoid repeat
            }
        } catch (error) {
            console.error("Error fetching next question:", error);
        }
    };

    const updateZLO = async (payload) => {
        try {
            const response = await fetch(`http://localhost:8080/api/students/${userId}/updateZlo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const updatedZLO = await response.json();
                setStudentZLO(updatedZLO);
            }
        } catch (e) {
            console.error("Error updating ZLO", e);
        }
    };

    useEffect(() => {
        fetchStudentInfo();
    }, []);

    useEffect(() => {
        if (gradeLevel !== null) {
            fetchNextQuestion();
        }
    }, [gradeLevel]);

    useEffect(() => {
        if (sessionConcluded || !currentQuestion) return;

        const timer = setInterval(() => {
            setTotalTimeRemaining((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    setSessionConcluded(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestion, sessionConcluded]);

    useEffect(() => {
        if (totalTimeRemaining <= 0 && !submitted && currentQuestion) {
            setSubmitted(true);
        }
    }, [totalTimeRemaining]);

    const answerChoice = (choice) => {
        setSelAnswer((prev) => {
            const updated = new Map(prev);
            updated.set(questionId, {
                q: currentQuestion.question,
                pick: choice,
                correct: currentQuestion.answer
            });
            return updated;
        });
    };

    const submitAnswer = () => {
        if (!currentQuestion) return;

        const picked = selAnswer.get(questionId)?.pick;
        const isCorrect = picked === currentQuestion.answer;

        let updatedCorrect = correctCount;
        let updatedWrong = wrongCount;
        let updatedStreak = streak;

        if (isCorrect) {
            updatedCorrect += 1;
            updatedStreak += 1;
            setCorrectCount(updatedCorrect);
            setStreak(updatedStreak);
        } else {
            updatedWrong += 1;
            updatedStreak = 0;
            setWrongCount(updatedWrong);
            setStreak(0);
        }

        setSubmitted(true);

        const totalQ = updatedCorrect + updatedWrong;
        const payload = {
            totalQuestionsRight: updatedCorrect,
            totalQuestions: totalQ,
            streak: updatedStreak,
            avgTimeSpentInSession: totalTimeRemaining / 60,
            avgTimePerQuestion: totalTimeRemaining / sessionQuestionNumber,
            successRate: totalQ > 0 ? updatedCorrect / totalQ : 0
        };

        updateZLO(payload);
    };

    const nextQ = async () => {
        if (!submitted && !selAnswer.get(questionId)?.pick) {
            setWrongCount((prev) => prev + 1);
        }

        setSubmitted(false);
        await fetchNextQuestion();
        setSessionQuestionNumber((prev) => prev + 1);
    };

    useEffect(() => {
    console.log(`Streak updated: ${streak}`);
    }, [streak]);

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
        studentZLO,
        setStudentZLO,
        gradeLevel,
        streak,
        userId
    };
};

export default useStudentSessionLogic2;
