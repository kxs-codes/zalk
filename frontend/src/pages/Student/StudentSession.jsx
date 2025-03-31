import useStudentSessionLogic from "./StudentSessionLogic";
import Question from "../../components/Question.jsx";
import PortalLogoBar from "../../components/PortalLogoBar";
import "../../styles/Student/pages/StudentSession.css";

const StudentSession = () => {
    const {
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
    } = useStudentSessionLogic();

    return (
        <div className="boxBorder">
            <div className="sessionLayout">
                <PortalLogoBar />
                {sessionConcluded && (
                    <div className="sessSumm">
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
                                <p>{sessionPercent}%</p>
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
                                    {sampleQuestions.map((question, index) => {
                                        const val = selAnswer[index]?.pick;
                                        const isCorrect = val === question.rightChoice;
                                        return (
                                            <tr key={index} className={isCorrect ? 'correct' : 'incorrect'}>
                                                <td>{question.q}</td>
                                                <td>{val || 'Answer Not Submitted in Time'}</td>
                                                <td>{question.rightChoice}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {!sessionConcluded && (
                    <div className="qSec">
                        <h1>Question {qIndex + 1}</h1>
                        <Question
                            q={sampleQuestions[qIndex].q}
                            items={sampleQuestions[qIndex].choose}
                            pickAns={answerChoice}
                            pickedAns={selAnswer[qIndex]?.pick}
                            submitted={submitted}
                            correctAnswer={sampleQuestions[qIndex].rightChoice}/>
                        <p>Session Time Remaining: {minutes}:{seconds}</p>
                        <button
                            onClick={submitAnswer}
                            disabled={!selAnswer[qIndex] || submitted || !selAnswer[qIndex]?.pick}
                            className="Submitter">
                            Check Answer
                        </button>
                        <button
                            onClick={nextQ}
                            disabled={!submitted}
                            className={`NEXT ${!submitted && 'disabled'}`}>
                            Next Question
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentSession;