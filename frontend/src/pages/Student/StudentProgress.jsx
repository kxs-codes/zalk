import React from "react";
import "../../styles/Student/pages/StudentProgress.css";
import StudentProgressLogic from "./StudentProgressLogic";

const { studentData, useStudentProgressNavigation } = StudentProgressLogic;

const StudentProgress = () => {
    const { handleNavigateToBadges } = useStudentProgressNavigation();

    return (
        <div className="student-progress-container">
            <div className="content-container">
                <h2 className="title">Student Progress</h2>
                {/*Progress Stats*/}
                <div className="stats-container">
                    <div className="stat-card stat-card-1">
                        <h3 className="stat-title">Current Hours Completed</h3>
                        <p className="stat-value">{studentData.currentHoursCompleted} Hours</p>
                    </div>
                    <div className="stat-card stat-card-2">
                        <h3 className="stat-title">Number of Questions Answered</h3>
                        <p className="stat-value">{studentData.totalQuestionsAnswered} Questions</p>
                    </div>
                    <div className="stat-card stat-card-3">
                        <h3 className="stat-title">Number of Right Questions Answered</h3>
                        <p className="stat-value">{studentData.questionsRight} Right Answers</p>
                    </div>
                    <div className="stat-card stat-card-4">
                        <h3 className="stat-title">Number of Sessions Completed</h3>
                        <p className="stat-value">{studentData.sessionsCompleted} Sessions</p>
                    </div>
                    <div className="stat-card stat-card-5">
                        <h3 className="stat-title">Number of Days Logged On</h3>
                        <p className="stat-value">{studentData.daysLoggedOn} Days</p>
                    </div>
                </div>
                {/*Button Container*/}
                <div className="button-container">
                    <button onClick={handleNavigateToBadges} className="go-to-badges-btn">
                        Go to Badges
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentProgress;