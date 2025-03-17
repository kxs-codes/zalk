import React, { useState } from "react";
import PortalLogoBar from '../components/PortalLogoBar';

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
        <div className="flex items-center justify-center bg-grey-secondary-lighter-1 min-h-screen w-screen p-4">
            <PortalLogoBar />

            {/*Main container for the class information*/}
            <div className="flex flex-col items-center mt-20 lg:mx-15 w-full max-w-5xl shadow-2xl bg-white p-6 rounded-lg h-[80vh] overflow-hidden">
                {/*Dropdown to select a class*/}
                <div className="mb-6">
                    <label className="font-medium text-lg mr-2">Select Class:</label>
                    <select
                        className="border rounded-md p-2"
                        style = {{
                            borderColor: "var(--color-text-secondary-grey-1)",
                            backgroundColor: "var(--color-grey-secondary-lighter-1)",
                            color: "black"
                        }}
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
                <h1 className="font-bold text-2xl mb-4 text-center">
                    Classroom: {selectedClass.subject} - {selectedClass.grade}
                </h1>
                <h2 className="font-semibold text-xl mb-6 text-center">
                    Educator: {selectedClass.educatorName}
                </h2>

                {/*List of students in the classroom utilizing cards*/}
                <div className="w-full flex flex-col items-center max-h-[60vh] overflow-y-auto">
                    <h3 className="font-medium text-lg mb-4 text-center">Current Students in Class:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full justify-items-center">
                        {selectedClass.students.map(student => (
                            <div
                                key={student.studentId}
                                className="bg-[var(--color-grey-secondary-lighter-1)] text-center p-4 rounded-xl shadow-lg
                                w-32 h-32 flex items-center justify-center text-lg font-semibold transition-transform
                                transform hover:scale-110 hover:shadow-2xl hover:bg[var(--color-grey-secondary-lighter-1) cursor-pointer">
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