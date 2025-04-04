import { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthProvider';

const useProgressLogic = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [students, setStudents] = useState({});
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = 'http://localhost:8080';

   // Authentication Token
   const {token} =  useAuth();
   const educatorId = token.jti;

  useEffect(() => {

   


    if (!educatorId) {
      console.error('educatorId is not defined');
      return;
    }

    

    // Fetch classrooms and students on component mount
    fetch(`${BASE_URL}/api/educator/progress?educatorId=${educatorId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch classrooms');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched progress data:', data); // Debug log

        const classMap = {};
        const studentMap = {};

        data.forEach((item) => {
          if (!classMap[item.classId]) {
            classMap[item.classId] = { classId: item.classId, name: item.name };
            studentMap[item.classId] = [];
          }
          studentMap[item.classId].push({
            studentId: item.classId + '-' + item.username, // Unique ID
            studentUsername: item.username,
            score: item.score,
          });
        });

        console.log('Mapped classrooms:', classMap); // Debug log
        console.log('Mapped students:', studentMap); // Debug log

        setClassrooms(Object.values(classMap));
        setStudents(studentMap);
      })
      .catch((error) => console.error('Error fetching classrooms:', error));
  }, [educatorId]);

  useEffect(() => {
    if (selectedClass && selectedStudent) {
      // Prepare chart data for the selected student and class
      const classStudents = students[selectedClass];
      const selectedStudentData = classStudents.find((s) => s.studentId === selectedStudent);

      const classAverage = {
        name: 'Class Average',
        score: classStudents.reduce((sum, s) => sum + s.score,   0) / classStudents.length,
      };

      const individualStudent = {
        name: 'Selected Student',
        score: selectedStudentData.score,
      };

      setChartData([classAverage, individualStudent]);
    }
  }, [selectedClass, selectedStudent, students]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedStudent(''); // Reset selected student when class changes
    setChartData([]); // Clear chart data
  };

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const getChartData = () => chartData;

  return {
    classrooms,
    students,
    selectedClass,
    selectedStudent,
    handleClassChange,
    handleStudentChange,
    getChartData,
    isLoading,
  };
};

export default useProgressLogic;
