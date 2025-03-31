import { useState } from 'react';

const useProgressLogic = () => {
  const classrooms = [
    { id: 'class1', name: 'Math 101' },
    { id: 'class2', name: 'Science 102' },
  ];

  const students = {
    class1: [
      { id: 'student1', name: 'Alice Johnson', score: 85 },
      { id: 'student2', name: 'Bob Smith', score: 78 },
      { id: 'student3', name: 'Charlie Brown', score: 92 },
    ],
    class2: [
      { id: 'student4', name: 'Diana Prince', score: 88 },
      { id: 'student5', name: 'Eve Adams', score: 74 },
      { id: 'student6', name: 'Frank Castle', score: 81 },
    ],
  };

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [showSpreadsheetDropdown, setShowSpreadsheetDropdown] = useState(false);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedStudent('');
  };

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const handleSpreadsheetClick = () => {
    setShowSpreadsheetDropdown(prev => !prev);
  };

  const handleDownload = (type) => {
    console.log(`Downloading spreadsheet for ${type === 'class' ? 'Entire Class' : 'Selected Student'}`);
    setShowSpreadsheetDropdown(false);
  };

  const getChartData = () => {
    if (!selectedClass || !selectedStudent) return [];
    const classData = students[selectedClass];
    const selected = classData.find(s => s.id === selectedStudent);
    const classAvg = classData.reduce((sum, s) => sum + s.score, 0) / classData.length;
    return [
      { name: 'Selected Student', score: selected.score },
      { name: 'Class Average', score: classAvg },
    ];
  };

  return {
    classrooms,
    students,
    selectedClass,
    selectedStudent,
    showSpreadsheetDropdown,
    handleClassChange,
    handleStudentChange,
    handleSpreadsheetClick,
    handleDownload,
    getChartData,
  };
};

export default useProgressLogic;
