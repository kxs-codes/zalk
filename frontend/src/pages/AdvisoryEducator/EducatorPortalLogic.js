import { useEffect, useState } from 'react';
import {useAuth} from '../../components/AuthProvider'

 const useEducationPortal = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [activeClassroom, setActiveClassroom] = useState('');
  const [classroomStat, setClassroomStat] = useState({});
  const [loading, setLoading] = useState(true);

  // Authentication Token
  const {token} =  useAuth();
  const educatorId = token.jti;

  const fetchClassroomStats = async () => {
    // if (!educatorId) return;

    

    try {
      const response = await fetch(`http://localhost:8080/api/educator/${educatorId}`);
      const data = await response.json();

      console.log("Raw data from API:", data);

      const statsByClass = {};
      data.forEach(c => {
        const total = c.totalRight + c.totalWrong;
        statsByClass[c.classroomId] = {
          students: 1,
          avgScore: total > 0 ? (c.totalRight / total) * 100 : 0,
          engagement: c.totalTimeInSession + c.daysLoggedIn + c.sessionsCompleted,
        };
        console.log("Mapped classroomStat:", statsByClass);

      });
      


      setClassroomStat(statsByClass);
      setClassrooms(data);
      if (data.length > 0) setActiveClassroom(data[0].classroomId);
    } catch (error) {
      console.error("Error fetching classroom data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassroomStats();
    console.log("useEffect call")
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

export default useEducationPortal