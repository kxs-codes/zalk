import React, { useState, useEffect } from "react";

const Question = ({ q, items, pickAns, pickedAns, submitted, correctAnswer }) => {
    const customRed = "#AD1905";

    const clickItem = (item) =>
    {
        pickAns(item);
    };

return (
    <div className="p-7 mb-4 bg-white shadow-lg rounded-lg w-full max-w-2xl">
        <h2 style={{ color:customRed }} className="text-xl font-semibold mb-4">{q}</h2>
        <div className="space-y-2">

                {items.map((item, index) =>
                {
                    const isSelected =pickedAns ===item;
                    return (
                        <button
                            className=
                            {
                                `w-full p-3 text-center border rounded-lg ${isSelected
                                ? 'bg-gray-400'
                                : 'bg-gray-100'}`}

                            onClick={() => clickItem(item)}
                            disabled={submitted}>
                            {item}
                        </button>
                   );
                })}
        </div>
        {submitted && (
            <div className="mt-4 text-lg">
                {pickedAns === correctAnswer
                ? (
                    <p className="text-green-500">Correct</p>
                )
                :(
                    <p className="text-red-500">Incorrect; the correct answer is: {correctAnswer}</p>
                )}
            </div>
        )}
        </div>
    );
};


export default Question;
