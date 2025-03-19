import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link for navigation
import '../../styles/Guardian/GuardianPortal.css'; // Importing the CSS file for styling

const GuardianPortal = () => {
    const studentName = "John Doe"; // Mock student name

    return (
        <div className="container">
            <div className="class-container">
                <h1 className="welcome-message">
                    Welcome Guardian of {studentName}, Your student has been working hard!
                </h1>
                <div className="image-container">
                    <img src="/transparent-zebra-sitting-forward.png" alt="Zebra" className="zebra-image" />
                </div>

                {/* New Progress Section */}
                <div className="progress-section">
                    <p className="progress-text">
                        Take a look at their progress here!
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