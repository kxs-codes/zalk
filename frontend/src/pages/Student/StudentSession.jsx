import useStudentSessionLogic from "./StudentSessionLogic";
import Question from "../../components/Question.jsx";
import PortalLogoBar from "../../components/PortalLogoBar";
import StudentSessionConfidence from "../../components/StudentSessionConfidence.jsx";
import "../../styles/Student/pages/StudentSession.css";
//Handles question session for students handling question and timing for the frontend
const StudentSession = () =>
{
    const {
        questionId,
        sessionQuestionNumber,
        selAnswer,
        submitted,
        correctCount,
        wrongCount,
        sessionConcluded,
        currentQuestion,
        formatTimeRemaining,
        totalTimeRemaining,
        nextQ,
        answerChoice,
        studentZLO,
        setStudentZLO,
        submitAnswer,
        userId,
        setUserId
    } = useStudentSessionLogic();
    //Results Screen
    const renderResults = () =>
    {
        return (
            <div className="sessSumm">
                <StudentSessionConfidence userId={userId} setStudentZLO={setStudentZLO}/>
                <div className="summationStat">
                    <div className="stat1">
                        <p>Correct Answers</p>
                        <p>{correctCount}</p>
                    </div>
                    <div className="stat2">
                        <p>Wrong Answers</p>
                        <p>{wrongCount}</p>
                    </div>
                    <div className="stat3">
                        <p>Session Percent</p>
                        <p>{((correctCount/(correctCount + wrongCount))*100.00).toFixed(2)}%</p>
                    </div>
                    <div className="stat4">
                        <p>Current ZLO</p>
                        <p>{studentZLO!==null?studentZLO.toFixed(2):"Loading..."}</p>
                    </div>
                </div>

                <div className="secRev">
                    <h2>Review</h2>
                    <div className="tableContainer">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Your Answer</th>
                                    <th>Right Answer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from(selAnswer.entries()).map(([id, answer]) =>
                                {
                                    const isCorrect = answer.pick === answer.correct;
                                    return (
                                        <tr key={id} className={isCorrect ? "correct" : "incorrect"}>
                                            <td>{answer.q}</td>
                                            <td>{answer.pick || "Answer Not Submitted in Time"}</td>
                                            <td>{answer.correct}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };
    //Handles session space for active questions
    return (
        <div className="boxBorder">
            <div className="sessionLayout">
                <PortalLogoBar />
                {sessionConcluded && renderResults()}
                {!sessionConcluded && currentQuestion && (
                    <div className="qSec">
                        <h1>Question {sessionQuestionNumber}</h1>
                        <Question
                            q={currentQuestion?.question}
                            options={currentQuestion?.options || []}
                            pickAns={answerChoice}
                            pickedAns={selAnswer.get(questionId)?.pick}
                            submitted={submitted}
                            correctAnswer={currentQuestion?.answer} />
                        <p>Time Remaining: {formatTimeRemaining(totalTimeRemaining)}</p>
                        <button
                            onClick={submitAnswer}
                            disabled={!selAnswer.get(questionId)?.pick || submitted}
                            className="Submitter">
                            Check Answer
                        </button>
                        <button
                            onClick={nextQ}
                            disabled={!submitted}
                            className={`NEXT ${!submitted && "disabled"}`}>
                            Next Question
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentSession;
