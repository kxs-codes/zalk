import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Student/pages/StudentPortal.css";

const Portal = () =>
{
    const navigate = useNavigate();

    const startSession = () =>
    {
        navigate("/session");
    };

    return (
        <div className="studentPorCont">
            <div className="porBox">
                <div className="zalkCont">
                    <img src="transparent-reading-zebra.png" className="smartZebra" />
                </div>
                <h1 className="headPortal">
                    Ready to Show Off Your Skills?
                </h1>
                <button className="sessionButton" onClick={startSession}>
                    Start Session
                </button>
            </div>
        </div>
    );
};

export default Portal;
