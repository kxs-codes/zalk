import { useState, useEffect } from "react";

const useEducationPortal = () => {
    const [activeClassroom, setActiveClassroom] = useState(null);
    const [classrooms, setClassrooms] = useState([]);
    const [classroomStat, setClassroomStat] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch classrooms and statistics
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/classrooms");
                const data = await response.json();
                setClassrooms(data.classrooms);
                setClassroomStat(data.statistics);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return {
        activeClassroom,
        setActiveClassroom,
        classrooms,
        classroomStat,
        loading,
    };
};

export default useEducationPortal;
