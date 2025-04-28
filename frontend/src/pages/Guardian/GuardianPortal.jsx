import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Guardian/GuardianPortal.css';
import useGuardianPortal from './GuardianPortalLogic';



const GuardianPortal = () => {
    const { studentName } = useGuardianPortal();

    return (
        <div className="container">
            <div className="class-container">
                <h1 className="welcome-message">
                    Welcome Guardian, Your student has been working hard!
                </h1>
                <div className="image-container">
                    <img src="/transparent-zebra-sitting-forward.png" alt="Zebra" className="zebra-image" />
                </div>

                <div className="progress-section">
                    <p className="progress-text">
                        Take a look at their progress and badges here!
                    </p>
                    <Link to="/progress" className="progress-button">
                        View Progress
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GuardianPortal;



