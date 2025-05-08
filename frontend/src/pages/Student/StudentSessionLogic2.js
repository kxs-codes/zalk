import { useState, useEffect } from "react";
import { useAuth } from '../../components/AuthProvider';

const useStudentSessionLogic2 = () => {
    const { token } = useAuth();
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [nextQuestion, setNextQuestion] = useState(null);
    const [questionId, setQuestionId] = useState(null);
    const [sessionQuestionNumber, setSessionQuestionNumber] = useState(1);
    const [selAnswer, setSelAnswer] = useState(new Map());
    const [submitted, setSubmitted] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [totalTimeRemaining, setTotalTimeRemaining] = useState(15);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [sessionConcluded, setSessionConcluded] = useState(false);
    const [studentZLO, setStudentZLO] = useState(null);
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
    };

    const fetchFirstQuestion = async () => {
        const response = await fetch(`http://localhost:8080/api/sessions/get-question-and-streak?userId=${token?.jti}`);
        const data = await response.json();

        setStreak(data.streak);

        const question = data.question;

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

    }

    const fetchNextQuestion = async () => {
        // For average time per question calculation
            // Dividing time elapsed by question number
        const avgTimePerQuestion = timeElapsed / sessionQuestionNumber;

        try {
            const params = new URLSearchParams({
                userId,
                avgTimePerQuestion,
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
                setNextQuestion(question);
            } else {
                fetchNextQuestion(); // avoid repeat
            }

            // // Print the zlo question
            const zloResponse = await fetch(`http://localhost:8080/api/students/${userId}/zlo`);
            const zloData = await zloResponse.json();
            console.log ("Updated ZLO: " + zloData);
        } catch (error) {
            console.error("Error fetching next question:", error);
        }
    };

    useEffect(() => {
        fetchStudentInfo();

        if (userId !== null) {
            // Don't want to call this function
            fetchFirstQuestion();
        }
    }, []);

    useEffect(() => {
        if (submitted || !currentQuestion || totalTimeRemaining <= 0) return;

        const timer = setInterval(() => {
            setTotalTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
            setTimeElapsed(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [submitted, currentQuestion, totalTimeRemaining]);

    useEffect(() => {
        if (totalTimeRemaining <= 0 && !submitted && currentQuestion) {
            console.log("checking if ending session");
            setSubmitted(true);
    
            submitSession();

            setSessionConcluded(true);
        }
    }, [totalTimeRemaining, submitted, currentQuestion]);

    const submitSession = async () => {
        // Create the query string for sending to backend
        const queryString = `?userId=${userId}&streak=${streak}&totalQuestions=${correctCount + wrongCount}&totalQuestionsRight=${correctCount}&totalQuestionsWrong=${wrongCount}&avgTimeSpentInSession=${timeElapsed}&successRate=${correctCount/ (correctCount + wrongCount)}&avgTimePerQuestion=${timeElapsed / sessionQuestionNumber}`;
        const url = `http://localhost:8080/api/sessions/update-statistics${queryString}`;

        // Make fetch command to submit to backend
        const response = await fetch(url, {
            method: "POST"
        })

        // Check response
        const data = await response.json();
        console.log("print end of session: " + data);

        setStudentZLO(data.zloRating);
    }

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

        // Call the function to get next question
        fetchNextQuestion();
    };

    const nextQ = async () => {
        // Whenever get next question is clicked, render the next question
        setAnsweredQuestions(prev => new Set(prev).add(nextQuestion.questionId));
        setCurrentQuestion(nextQuestion);
        setQuestionId(nextQuestion.questionId);

        // Increment question number
        // Set submitted to false
        setSubmitted(false);
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
        streak,
        userId
    };
};

export default useStudentSessionLogic2;
