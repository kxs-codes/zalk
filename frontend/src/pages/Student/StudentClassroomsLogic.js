import { useState } from "react";

const classes = [
    {
        educatorId: 1,
        educatorName: "Mr. Misterman",
        subject: "Mathematics",
        grade: "6th",
        students: [
            { studentId: 1, name: "Becky Beckinson" },
            { studentId: 2, name: "Jane Doe" },
            { studentId: 3, name: "John Smith" },
            { studentId: 4, name: "Henry Crabbington" },
            { studentId: 5, name: "James Jamison" },
            { studentId: 6, name: "James Doe" },
            { studentId: 7, name: "Milton Millers" },
            { studentId: 8, name: "Bobby Bobbington" },
            { studentId: 9, name: "Zac Humes" },
            { studentId: 10, name: "Doctor Phil" },
            { studentId: 11, name: "Bill Cypher" },
            { studentId: 12, name: "Johnny Cage" },
        ],
    },
    {
        educatorId: 2,
        educatorName: "Mrs. Misses",
        subject: "Mathematics",
        grade: "4th",
        students: [
            { studentId: 13, name: "Dan Danny" },
            { studentId: 14, name: "Daniel Dannielson" },
            { studentId: 15, name: "Billy Billyson" },
            { studentId: 16, name: "Larry Larrer" },
            { studentId: 17, name: "Ben Tennyson" },
        ],
    },
    {
        educatorId: 3,
        educatorName: "Dr. Millianmurphy",
        subject: "Mathematics",
        grade: "2nd",
        students: [
            { studentId: 18, name: "Dan Danny" },
            { studentId: 19, name: "Johnny Appleseed" },
            { studentId: 20, name: "Bill Clinton" },
            { studentId: 21, name: "William Wallace" },
            { studentId: 22, name: "Steven Rodgers" },
        ],
    },
];

//Custom hook to manage selected class state
const useSelectedClass = () => {
    const [selectedClass, setSelectedClass] = useState(classes[0]);
    return { selectedClass, setSelectedClass };
};

const StudentClassroomsLogic = {
    classes,
    useSelectedClass
};

export default StudentClassroomsLogic;