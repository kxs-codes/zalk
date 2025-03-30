import { useState } from 'react';

const useEducationPortal = () => {
    const [activeClassroom, setActiveClassroom] = useState('');

    const classrooms = ["Classroom A", "Classroom B", "Classroom C"];

    const classroomStat = {
        "Classroom A": { students: 25, avgScore: 85, engagement: 100 },
        "Classroom B": { students: 30, avgScore: 75, engagement: 80 },
        "Classroom C": { students: 35, avgScore: 65, engagement: 70 }
    };

    return {
        activeClassroom,
        setActiveClassroom,
        classrooms,
        classroomStat
    };
};

export default useEducationPortal;
