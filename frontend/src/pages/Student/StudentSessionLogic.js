import { useState, useEffect } from "react";

const useStudentSessionLogic = () => {
    const [qIndex, setQIndex] = useState(0);
    const [selAnswer, setSelAnswer] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(10.00);
    const [sessionConcluded, setSessionConcluded] = useState(false);

    const sampleQuestions = [
        {
            q: "2+2?",
            choose: ["2","3","4","5"],
            rightChoice: "4"
        },
        {
            q: "3+5?",
            choose: ["5", "6","7", "8"],
            rightChoice: "8"
        },
        {
            q: "6-3?",
            choose: ["3","4","2","1"],
            rightChoice: "3"
        },
        {
            q: "8-5?" ,
            choose: ["3","2","1", "4"],
            rightChoice: "3"
        },
        {
            q: "7+9?",
            choose: ["16", "14", "13", "15"],
            rightChoice: "16"
        },
        {
            q: "10-6?",
            choose: ["5", "4", "3", "2"],
            rightChoice: "4"
        },
        {
            q: "5x3?",
            choose: ["15", "12","10", "13"],
            rightChoice:"15"
        },
        {
            q: "6x4?",
            choose: ["24", "20", "30", "18"],
            rightChoice: "24"
        },
        {
            q: "9/3?",
            choose: ["3", "2", "1", "4"],
            rightChoice: "3"
        },
        {
            q: "12/4?",
            choose: ["4", "3", "5", "6"],
            rightChoice: "3"
        }
    ];

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
        sampleQuestions,
        sessionPercent,
        minutes,
        seconds,
        nextQ,
        answerChoice,
        submitAnswer
    };
};

export default useStudentSessionLogic;