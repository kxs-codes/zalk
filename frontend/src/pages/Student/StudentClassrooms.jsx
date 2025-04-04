import React from "react";
import '../../styles/Student/pages/StudentClassrooms.css';
import StudentClassroomsLogic from './StudentClassroomsLogic';

const { classes, useSelectedClass } = StudentClassroomsLogic;

const StudentClassrooms = () => {
    const { selectedClass, setSelectedClass } = useSelectedClass();

    return (
        <div className="container">
            <div className="class-container">
                <div className="select-class-container">
                    <label className="select-class-label">Select Class:</label>
                    <select
                        className="select-class"
                        value={selectedClass.educatorId}
                        onChange={(e) => setSelectedClass(classes.find(c => c.educatorId === parseInt(e.target.value)))}>
                        {classes.map((cls) => (
                            <option key={cls.educatorId} value={cls.educatorId}>
                                {cls.subject} - {cls.grade} ({cls.educatorName})
                            </option>
                        ))}
                    </select>
                </div>
                <h1 className="class-title">
                    Classroom: {selectedClass.subject} - {selectedClass.grade}
                </h1>
                <h2 className="educator-name">
                    Educator: {selectedClass.educatorName}
                </h2>
                <div className="students-container">
                    <h3 className="students-title">Current Students in Class:</h3>
                    <div className="students-grid">
                        {selectedClass.students.map(student => (
                            <div key={student.studentId} className="student-card">
                                {student.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentClassrooms;