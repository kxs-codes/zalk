import {
    useState,
    useEffect
} from "react";

const useStudentSessionLogic = () =>
{

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

    const fetchZLO = async () => {
        const username = localStorage.getItem("username");

        if (!username) {
            console.error("Username is not available");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/students/{username}/zlo`);
            if (!response.ok) {
                throw new Error("Failed to fetch ZLO");
            }
            const data = await response.json();
            setZloRating(data);
        } catch (err) {
            console.error("Error fetching ZLO:", err);
        }
    };


    const fetchNextQuestion = async () =>
    {
        try
        {
            const response = await fetch(
                "http://localhost:8080/api/sessions/questions",
                {
                    method: "GET",
                    headers:
                    {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok)
            {
                console.error("Failed to fetch question:", response.status);
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
                console.log("Fetched question:", newQuestion);

                if (typeof newQuestion.options === "string")
                {
                    const regex = /([○])\.\s*([^○]+)/g;
                    const parsedOptions = [];
                    let match;

                    while ((match = regex.exec(newQuestion.options)) !== null)
                    {
                        parsedOptions.push(match[0].trim(1));
                    }

                    if (
                        newQuestion.options.toLowerCase().includes('true') ||
                        newQuestion.options.toLowerCase().includes('false')
                    )
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
                else
                {
                    console.error("Invalid options format:", newQuestion.options);
                }
            }
        }
        catch (error)
        {
            console.error("Question Fetch Error:", error);
        }
    };

    useEffect(() =>
    {
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
            newAnswers.set(
                questionId,
                {
                    q: currentQuestion.question,
                    pick: choose,
                    correct: currentQuestion.answer
                }
            );
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
    };

    const nextQ = async () =>
    {
        if (!submitted)
        {
            if (!selAnswer.get(questionId)?.pick)
            {
                setWrongCount((prev) => prev + 1);
            }
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
