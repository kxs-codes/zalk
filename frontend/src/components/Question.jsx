import React from "react";
import "../styles/Question.css";
import { useQuestionLogic } from "./QuestionLogic";

const Question = ({ q, items, pickAns, pickedAns, submitted, correctAnswer }) => {
    const { getButtonClass } = useQuestionLogic({ items, pickedAns, submitted, correctAnswer });

    const clickItem = (item) => {
        pickAns(item);
    };

    return (
        <div className="qCont">
            <h2 className="qHead">{q}</h2>
            <div className="aCont">
                {items.map((item) => (
                    <button
                        key={item}
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

