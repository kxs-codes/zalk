import React from "react";
import "../styles/Question.css";
import { useQuestionLogic } from "./QuestionLogic";

const Question = ({ q, options, pickAns, pickedAns, submitted, correctAnswer }) =>
{
    const { getButtonClass } = useQuestionLogic({ items: options, pickedAns, submitted, correctAnswer });

    if (!Array.isArray(options))
    {
        return <div>Invalid</div>;
    }

    const clickItem = (item) =>
    {
        pickAns(item);
    };

    return (
        <div className="qCont">
            <h2 className="qHead">{q}</h2>
            <div className="aCont">
                {options.map((item, index) =>
                (
                    <button
                        key={index}
                        className={getButtonClass(item)}
                        onClick={() => clickItem(item)}
                        disabled={submitted}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;
