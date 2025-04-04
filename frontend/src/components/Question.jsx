import React from "react";
import "../styles/Question.css";
import { useQuestionLogic } from "./QuestionLogic";
//Creates questions with options for values
const Question = ({ q, options, pickAns, pickedAns, submitted, correctAnswer }) =>
{   //Button uses question values
    const { getButtonClass } = useQuestionLogic({ items: options, pickedAns, submitted, correctAnswer });

    if (!Array.isArray(options))
    {
        return <div>Invalid</div>;
    }

    const clickItem=(item) =>
    {
        pickAns(item);
    };
    //Return the actual page content
    return (
        <div className="qCont">
            <h2 className="qHead">{q}</h2>
            <div className="aCont">
                {options.map((item, index) => (
                    <button key={index} className={getButtonClass(item)} onClick={() => clickItem(item)} disabled={submitted}>{item}</button>
                ))}
            </div>
        </div>
    );
};

export default Question;
