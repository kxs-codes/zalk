import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import '../../styles/Educator/pages/Progress.css';

const Progress = () => {
  // Dummy Data: Classroom & Students
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

  // State for class & student selection and spreadsheet dropdown toggle
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [showSpreadsheetDropdown, setShowSpreadsheetDropdown] = useState(false);

  // Handle Class Selection
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setSelectedStudent(''); // Reset student selection on class change
  };

  // Handle Student Selection
  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  // Get Chart Data: returns data for the selected student's score and class average.
  const getChartData = () => {
    if (!selectedClass || !selectedStudent) return [];
    const classData = students[selectedClass];
    const selected = classData.find((s) => s.id === selectedStudent);
    const totalScore = classData.reduce((acc, s) => acc + s.score, 0);
    const classAverage = totalScore / classData.length;
    return [
      { name: 'Selected Student', score: selected.score },
      { name: 'Class Average', score: classAverage },
    ];
  };

  // Toggle Spreadsheet Dropdown visibility
  const handleSpreadsheetClick = () => {
    setShowSpreadsheetDropdown(!showSpreadsheetDropdown);
  };

  // Handle Spreadsheet Download Option (stubbed functionality)
  const handleDownload = (option) => {
    if (option === 'class') {
      console.log('Downloading spreadsheet for Entire Class');
    } else if (option === 'student') {
      console.log('Downloading spreadsheet for Selected Student');
    }
    setShowSpreadsheetDropdown(false);
  };

  return (
    <div className="progress-container">
      <div className="progress-inner">
        <div className="title-container">
          <h2 className="progress-title">Class Progress</h2>
          {selectedClass && selectedStudent && (
            <div className="spreadsheet-container">
              <button
                className="spreadsheet-button"
                onClick={handleSpreadsheetClick}
              >
                Spreadsheet
              </button>
              {showSpreadsheetDropdown && (
                <div className="spreadsheet-dropdown">
                  <div onClick={() => handleDownload('class')}>
                    Entire Class
                  </div>
                  <div onClick={() => handleDownload('student')}>
                    Selected Student
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dropdown Section */}
        <div className="select-section">
          <div className="select-group">
            <label htmlFor="classroom" className="select-label">
              Select a Class:
            </label>
            <select
              id="classroom"
              className="select-dropdown"
              value={selectedClass}
              onChange={handleClassChange}
            >
              <option value="">-- Choose a Class --</option>
              {classrooms.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="select-group">
            <label htmlFor="student" className="select-label">
              Select a Student:
            </label>
            <select
              id="student"
              className="select-dropdown"
              value={selectedStudent}
              onChange={handleStudentChange}
              disabled={!selectedClass}
            >
              <option value="">-- Choose a Student --</option>
              {selectedClass &&
                students[selectedClass]?.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Bar Chart: Comparing Selected Student vs Class Average */}
        <div className="chart-container">
          <h3 className="chart-title">Performance Comparison</h3>
          {selectedClass && selectedStudent ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={getChartData()}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score">
                  {getChartData().map((entry, index) => {
                    let fillColor;
                    if (entry.name === 'Selected Student') fillColor = '#911B0C';
                    else if (entry.name === 'Class Average') fillColor = '#808080';
                    return <Cell key={`cell-${index}`} fill={fillColor} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="chart-empty">
              Select a class and student to view data.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Progress;
