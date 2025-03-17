import { useState, useEffect } from "react";
import Question from '../components/Question.jsx';

const StudentSessionAndResults = () =>
{
    const [qIndex, setQIndex] =useState(0);
    const [selAnswer, setSelAnswer] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [correctCount, setCorrectCount] =  useState(0);
    const [wrongCount, setWrongCount] =  useState(0);
    const [timeRemaining, setTimeRemaining] = useState(10);
    const [sessionConcluded, setSessionConcluded] = useState(false);

    const sampleQuestions=[
        {
            q: "2+2?",
            choose: ["2", "3","4","5"],
            rightChoice: "4"
        },
        {
            q: "3+5?",
            choose: ["5", "6","7", "8"],
            rightChoice: "8"
        },
        {
            q: "6-3?",
            choose: ["3", "4", "2", "1"],
            rightChoice: "3"
        },
        {
            q: "8-5?",
            choose: ["3", "2", "1", "4"],
            rightChoice: "3"
        },
        {
            q: "7+9?",
            choose: ["16", "14","13", "15"],
            rightChoice: "16"
        },
        {
            q: "10-6?",
            choose: ["5", "4", "3", "2"],
            rightChoice: "4"
        },
        {
            q: "5x3?",
            choose: ["15", "12", "10", "13"],
            rightChoice: "15"
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
    const sessionPercent=((correctCount/sampleQuestions.length)*100).toFixed(2);
    
    const nextQ = () =>
    {
        if (!submitted && !selAnswer[qIndex].pick)
        {
               setWrongCount(wrongCount+1);
        }
        if (qIndex <sampleQuestions.length-1)
        {
            setQIndex(qIndex+1);
            setSubmitted(false);
        }
        else
        {
            setSessionConcluded(true);
        }
    };


    const answerChoice =(choose) =>
    {
        setSelAnswer((x) =>
        {
            const y =[];

            for (let i = 0; i <x.length; i++)
            {
                y[i] = x[i];
            }

            y[qIndex]=
            {
                q: sampleQuestions[qIndex].q,
                pick: choose
            };
            return y;
        });
    };

    const submitAnswer = () =>
    {
        setSubmitted(true);
        const chosenAnswer = selAnswer[qIndex].pick;
        const isCorrect = chosenAnswer === sampleQuestions[qIndex].rightChoice;
        if (isCorrect)
        {
            setCorrectCount(correctCount+1);
        } else
        {
            setWrongCount(wrongCount +1);
        }
    };

    useEffect(() =>
    {
        if (timeRemaining <= 0)
        {
           if (!selAnswer[qIndex]?.pick)
           {
                setWrongCount(wrongCount + 1);
           }
           else
           {
                const chosenAnswer = selAnswer[qIndex].pick;
                const isCorrect = chosenAnswer === sampleQuestions[qIndex].rightChoice;
                if (isCorrect)
                {
                    setCorrectCount(correctCount+1);
                }
                else
                {
                        setWrongCount(wrongCount+1);
                }
            }


            setSessionConcluded(true);
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
                    return 0;
                }
                return secZ - 1;
            });
        }, 1000.0);

        return () => clearInterval(timeFunction);
    }, [timeRemaining]);

    const minutes = Math.floor(timeRemaining / 60);
    const secCore = timeRemaining % 60;
    let seconds;
    if (secCore < 10) {
        seconds = `0${secCore}`;
    } else {
        seconds = secCore;
    }

return (
        <div className="max-w-4xl mx-auto p-6">
            {sessionConcluded && (
                <div className="flex flex-col space-y-6">
                    <div className="flex justify-between items-center p-6 bg-[#AD1905] text-white rounded-lg shadow-lg">
                        <div className="flex flex-col items-center">
                            <p className="text-xl">Correct Answers</p>
                            <p className="text-2xl font-bold">{correctCount}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-xl">Wrong Answers</p>
                            <p className="text-2xl font-bold">{wrongCount}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-xl">Session Percent</p>
                            <p className="text-2xl font-bold">{sessionPercent}%</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-4xl mb-4">Review</h2>
                        {sampleQuestions.map((question, index) => {
                            const val = selAnswer[index]?.pick;
                            const isCorrect =val === question.rightChoice;

                            return (
                                <div
                                    className={`p-4 my-3 ${isCorrect
                                        ?"text-green-500 font-bold animate-pulse"
                                        :"text-red-500 font-bold animate-pulse"}`}>
                                    <p>{question.q}</p>
                                    <p>Submitted Answer: {val}</p>
                                    <p>Correct Answer: {question.rightChoice}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

      {!sessionConcluded && (
        <div className="div4">
          <h1>Question {qIndex + 1}</h1>
          <Question
            q={sampleQuestions[qIndex].q}
            items={sampleQuestions[qIndex].choose}
            pickAns={answerChoice}
            pickedAns={selAnswer[qIndex]?.pick}
            submitted={submitted}
            correctAnswer={sampleQuestions[qIndex].rightChoice}
          />
          <p>Time Remaining: {minutes}:{seconds}</p>

          <button
            onClick={submitAnswer}
            disabled={submitted || !selAnswer[qIndex]?.pick}
            className="w-full p-3 text-white rounded-lg bg-[#AD1905] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>

          <button
            onClick={nextQ}
            disabled={!submitted}
            className={`w-full p-3 text-white rounded-lg bg-[#AD1905] ${
              !submitted && 'opacity-50 cursor-not-allowed'
            }`}
          >
            Continue to Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentSessionAndResults;
