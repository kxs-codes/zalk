import { useState } from "react";

const useClassroomLogic = (classrooms, activeClassroom, setActiveClassroom) => {
    const [search, setSearch] = useState("");

    const filteredClassrooms = classrooms.filter(classroom =>
        (`${classroom.subject} ${classroom.subjectLevel || ''}`).toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (classroom) => {
        setActiveClassroom(prev => prev?.classroomId === classroom.classroomId ? null : classroom);
    };

    return {
        search,
        setSearch,
        filteredClassrooms,
        handleSelect,
    };
};

export default useClassroomLogic;
