import React from "react";
import "../../styles/Student/pages/StudentPortal.css";
import StudentPortalLogic from "./StudentPortalLogic.js";

const { usePortalNavigation } = StudentPortalLogic;

const Portal = () => {
    const { startSession } = usePortalNavigation();

    return (
        <div className="studentPorCont">
            <div className="porBox">
                <div className="zalkCont">
                    <img src="transparent-reading-zebra.png" className="smartZebra"/>
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