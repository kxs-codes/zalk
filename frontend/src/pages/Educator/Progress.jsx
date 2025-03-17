import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  
    // State for class & student selection
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
  
    // Handle Class Selection
    const handleClassChange = (event) => {
      setSelectedClass(event.target.value);
      setSelectedStudent(''); // Reset student selection on class change
    };
  
    // Handle Student Selection
    const handleStudentChange = (event) => {
      setSelectedStudent(event.target.value);
    };
  
    // Get Data for Chart
    const getChartData = () => {
      if (!selectedClass || !selectedStudent) return [];
      const selectedStudentData = students[selectedClass].find(s => s.id === selectedStudent);
      return students[selectedClass].map(student => ({
        name: student.name,
        Score: student.score,
        Selected: student.id === selectedStudent ? student.score : null, // Show Active or null
      }));
    };
  
    return (
      <div className='flex flex-col items-center bg-grey-secondary-lighter-1 w-screen h-screen p-6'>
        <div className='w-full max-w-4xl lg:mt-20 bg-white shadow-lg rounded-lg p-6'>
  
          <h2 className="text-2xl font-bold mb-4 text-center">Class Progress</h2>
  
          {/* Dropdowns */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Select Classroom */}
            <div className="w-full">
              <label htmlFor="classroom" className="block mb-1 font-medium">Select a Class:</label>
              <select
                id="classroom"
                className="w-full px-2 py-2 border rounded-lg"
                value={selectedClass}
                onChange={handleClassChange}
              >
                <option value="">-- Choose a Class --</option>
                {classrooms.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
  
            {/* Select Student */}
            <div className="w-full">
              <label htmlFor="student" className="block mb-1 font-medium">Select a Student:</label>
              <select
                id="student"
                className="w-full px-2 py-2 border rounded-lg"
                value={selectedStudent}
                onChange={handleStudentChange}
                disabled={!selectedClass} // Disable until class is selected
              >
                <option value="">-- Choose a Student --</option>
                {selectedClass && students[selectedClass]?.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>
  
          {/* Bar Chart: Individual vs Classmates */}
          <div className="w-full h-72 bg-gray-50 rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold text-center mb-2">Performance Comparison</h3>
            {selectedClass && selectedStudent ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getChartData()} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Score" fill="#8884d8" />
                  <Bar dataKey="Selected" fill="#ff7300" /> {/* Highlight Selected Student */}
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500 mt-10">Select a class and student to view data.</p>
            )}
          </div>
  
        </div>
      </div>
    );
  };

export default Progress