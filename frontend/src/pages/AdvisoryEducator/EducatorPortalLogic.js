import { useEffect, useState } from 'react';
import { useAuth } from '../../components/AuthProvider';

const useEducationPortal = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [activeClassroom, setActiveClassroom] = useState('');
    const [classroomStat, setClassroomStat] = useState({});
    const [loading, setLoading] = useState(true);

    const { token } = useAuth();
    const educatorId = token.jti;

    const fetchClassroomStats = async () => {
        if (!educatorId) {
            console.warn("[FETCH STATUS] No educatorId found, skipping fetch.");
            return;
        }

        const apiUrl = `http://localhost:8080/api/educator/${educatorId}`;
        console.log(`[FETCH STATUS] Requesting classroom stats for educatorId: ${educatorId}`);

        try {
            const response = await fetch(apiUrl);
            console.log(`[FETCH STATUS] Server responded with status: ${response.status}`);

            if (!response.ok) {
                throw new Error(`Server returned ${response.status}`);
            }

            const data = await response.json();

            const statsByClass = {};
            data.forEach(c => {
                const total = c.totalRight + c.totalWrong;
                statsByClass[c.classroomId] = {
                    students: 1,
                    avgScore: total > 0 ? (c.totalRight / total) * 100 : 0,
                    engagement: c.totalTimeInSession + c.daysLoggedIn + c.sessionsCompleted,
                };
            });

            setClassroomStat(statsByClass);
            setClassrooms(data);
            if (data.length > 0) setActiveClassroom(data[0].classroomId);

            console.log("[FETCH STATUS] Classroom stats fetched and mapped successfully.");
        } catch (error) {
            console.error("[FETCH ERROR]", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClassroomStats();
    }, []);

    return {
        activeClassroom,
        setActiveClassroom,
        classrooms,
        classroomStat,
        loading,
        fetchClassroomStats
    };
};

export default useEducationPortal;
