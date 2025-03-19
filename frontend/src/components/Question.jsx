import React, { useState, useEffect } from "react";
import "../styles/Question.css";

const Question = ({ q, items, pickAns, pickedAns, submitted, correctAnswer }) =>
{
    const clickItem = (item) =>
    {
        pickAns(item);
    };

    return (
        <div className="qCont">
            <h2 className="qHead">{q}</h2>
            <div className="aCont">
                {items.map((item, index) =>
                {
                    const isSelected = pickedAns=== item;
                    const isCorrect = item ===correctAnswer;
                    let ClickA = 'aItem';

                    if (submitted)
                    {
                if (isSelected)
                        {
                            if (isCorrect)
                            {
                                ClickA += ' correct';
                            }
                            else
                            {
                                ClickA += ' incorrect';
                            }
                        }
                        else if (isCorrect)
                        {
                            ClickA += ' correct';
                        }
                    }
                    else if (isSelected)
                    {
                        ClickA +=' selected';
                    }

                    return (
                        <button
                            className={ClickA}
                            onClick={() => clickItem(item)}
                            disabled={submitted}>
                            {item}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};export default Question;

