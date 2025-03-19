import React, { useState } from "react";
import '../../styles/Student/pages/StudentClassrooms.css'; //Import the CSS file

const StudentClassrooms = () => {
    const classes = [
        {
            educatorId: 1,
            educatorName: "Mr. Misterman",
            subject: "Mathematics",
            grade: "6th",
            students: [
                {studentId: 1, name: "Becky Beckinson"},
                {studentId: 2, name: "Jane Doe"},
                {studentId: 3, name: "John Smith"},
                {studentId: 4, name: "Henry Crabbington"},
                {studentId: 5, name: "James Jamison"},
                {studentId: 6, name: "James Doe"},
                {studentId: 7, name: "Milton Millers"},
                {studentId: 8, name: "Bobby Bobbington"},
                {studentId: 9, name: "Zac Humes"},
                {studentId: 10, name: "Doctor Phil"},
                {studentId: 11, name: "Bill Cypher"},
                {studentId: 12, name: "Johnny Cage"},
            ],
        },
        {
            educatorId: 2,
            educatorName: "Mrs. Misses",
            subject: "Mathematics",
            grade: "4th",
            students: [
                {studentId: 13, name: "Dan Danny"},
                {studentId: 14, name: "Daniel Dannielson"},
                {studentId: 15, name: "Billy Billyson"},
                {studentId: 16, name: "Larry Larrer"},
                {studentId: 17, name: "Ben Tennyson"},
            ],
        },
        {
            educatorId: 3,
            educatorName: "Dr. Millianmurphy",
            subject: "Mathematics",
            grade: "2nd",
            students: [
                {studentId: 18, name: "Dan Danny"},
                {studentId: 19, name: "Johnny Appleseed"},
                {studentId: 20, name: "Bill Clinton"},
                {studentId: 21, name: "William Wallace"},
                {studentId: 22, name: "Steven Rodgers"},
            ],
        },
    ];

    //State for selecting a class
    const [selectedClass, setSelectedClass] = useState(classes[0]);

    return (
        <div className="container">
            {/*Main container for the class information*/}
            <div className="class-container">
                {/*Dropdown to select a class*/}
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
                {/*Class details and educator's name*/}
                <h1 className="class-title">
                    Classroom: {selectedClass.subject} - {selectedClass.grade}
                </h1>
                <h2 className="educator-name">
                    Educator: {selectedClass.educatorName}
                </h2>

                {/*List of students in the classroom utilizing cards*/}
                <div className="students-container">
                    <h3 className="students-title">Current Students in Class:</h3>
                    <div className="students-grid">
                        {selectedClass.students.map(student => (
                            <div
                                key={student.studentId}
                                className="student-card">
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