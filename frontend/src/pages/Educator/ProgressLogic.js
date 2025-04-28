import { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { toast } from 'react-toastify';
import useSpreadsheetLogic from '../../components/Educator/SpreadsheetLogic.js'; // assume correct path

const useProgressLogic = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [students, setStudents] = useState({});
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [chartData, setChartData] = useState([]);
  const [isLoading] = useState(false);
  const [showSpreadsheetDropdown, setShowSpreadsheetDropdown] = useState(false);

  const BASE_URL = 'http://localhost:8080';
  const { token } = useAuth();
  const educatorId = token?.jti;
  const {  loading: downloading } = useSpreadsheetLogic();

  useEffect(() => {
    if (!educatorId) {
      console.error('educatorId is not defined');
      return;
    }

    fetch(`${BASE_URL}/api/educator/progress?educatorId=${educatorId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch classrooms');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Fetched Progress Data:', data);

          const classMap = {};
          const studentMap = {};

          data.forEach((item) => {
            if (!classMap[item.classId]) {
              classMap[item.classId] = { classId: item.classId, name: item.name };
              studentMap[item.classId] = [];
            }
            studentMap[item.classId].push({
              studentId: item.studentId, // MUST be UUID
              studentUsername: item.username,
              score: item.score,
            });
          });

          setClassrooms(Object.values(classMap));
          setStudents(studentMap);
        })
        .catch((error) => console.error('Error fetching progress:', error));
  }, [educatorId]);

  useEffect(() => {
    if (selectedClass && selectedStudent) {
      const classStudents = students[selectedClass];
      const selectedStudentData = classStudents.find((s) => s.studentId === selectedStudent);

      const classAverage = {
        name: 'Class Average',
        score: classStudents.reduce((sum, s) => sum + s.score, 0) / classStudents.length,
      };

      const individualStudent = {
        name: 'Selected Student',
        score: selectedStudentData?.score || 0,
      };

      setChartData([classAverage, individualStudent]);
    }
  }, [selectedClass, selectedStudent, students]);

  const handleClassChange = (e) => {
    console.log('Class selected:', e.target.value);
    setSelectedClass(e.target.value);
    setSelectedStudent('');
    setChartData([]);
    setShowSpreadsheetDropdown(false);
  };

  const handleStudentChange = (e) => {
    console.log('Student selected:', e.target.value);
    setSelectedStudent(e.target.value);
    setShowSpreadsheetDropdown(false);
  };

  const handleSpreadsheetClick = () => {
    setShowSpreadsheetDropdown((prev) => !prev);
  };

  const handleDownload = async (type) => {
    try {
      console.log('Download Requested:', { type, selectedClass, selectedStudent });

      let url = '';

      if (type === 'class') {
        if (!selectedClass) {
          toast.error('Please select a class first.');
          return;
        }
        url = `${BASE_URL}/api/spreadsheet/classroom/${selectedClass}`;
      } else if (type === 'student') {
        if (!selectedStudent) {
          toast.error('Please select a student first.');
          return;
        }
        url = `${BASE_URL}/api/spreadsheet/student/${selectedStudent}`;
      } else {
        toast.error('Invalid download type.');
        return;
      }

      console.log('Fetching URL:', url);

      toast.info('Downloading spreadsheet...');

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to download spreadsheet');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `${type}_spreadsheet.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('Spreadsheet downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download spreadsheet.');
    }
  };


  const getChartData = () => chartData;

  return {
    classrooms,
    students,
    selectedClass,
    selectedStudent,
    handleClassChange,
    handleStudentChange,
    handleSpreadsheetClick,
    handleDownload,
    getChartData,
    showSpreadsheetDropdown,
    isLoading: isLoading || downloading,
  };
};

export default useProgressLogic;
