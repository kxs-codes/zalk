import { useState, useEffect } from "react";

const useStudentSessionLogic = () => {
    const [qIndex, setQIndex] = useState(0);
    const [selAnswer, setSelAnswer] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(10.00);
    const [sessionConcluded, setSessionConcluded] = useState(false);

     const fetchNextQuestion = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/sessions/generate-question", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        studentforSession: "studentName",
                    }),
                });
                setCurrentQuestion(response.data);
            } catch (error) {
                console.error("Question Fetch Error");
            }
        };
    useEffect(() => {
        fetchNextQuestion();
    }, []);

    const prePer = ((correctCount / sampleQuestions.length) * 100.00);
    const sessionPercent = prePer.toFixed(2);

    const nextQ = () => {
        if (!submitted) {
            if (selAnswer[qIndex] === undefined || !selAnswer[qIndex].pick) {
                setWrongCount(wrongCount + 1);
            }
        }
        if (qIndex < sampleQuestions.length - 1) {
            setQIndex(qIndex + 1);
            setSubmitted(false);
            fetchNextQuestion();
        } else {
            setSessionConcluded(true);
        }
    };

    const answerChoice = (choose) => {
        setSelAnswer((x) => {
            const y = [...x];
            y[qIndex] = { q: sampleQuestions[qIndex].q, pick: choose };
            return y;
        });
    };

    const submitAnswer = () => {
        setSubmitted(true);
        const chosenAnswer = selAnswer[qIndex]?.pick;
        const isCorrect = chosenAnswer === sampleQuestions[qIndex].rightChoice;
        if (isCorrect) {
            setCorrectCount(correctCount + 1);
        } else {
            setWrongCount(wrongCount + 1);
        }
    };

    useEffect(() => {
        if (timeRemaining <= 0) {
            if (!selAnswer[qIndex] || !selAnswer[qIndex].pick) {
                setWrongCount(wrongCount + 1);
            } else {
                const chosenAnswer = selAnswer[qIndex]?.pick;
                const isCorrect = chosenAnswer === sampleQuestions[qIndex].rightChoice;
                if (isCorrect) {
                    setCorrectCount(correctCount + 1);
                } else {
                    setWrongCount(wrongCount + 1);
                }
            }
            setSessionConcluded(true);
            return;
        }

        const timeFunction = setInterval(() => {
            setTimeRemaining((secZ) => {
                if (secZ <= 0) {
                    clearInterval(timeFunction);
                    setSessionConcluded(true);
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
    if (secCore < 10.00) {
        seconds = `0${secCore}`;
    } else {
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