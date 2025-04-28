import React from 'react';
import useProgressLogic from './ProgressLogic';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts';
import '../../styles/Educator/pages/Progress.css';

const Progress = () => {
  const {
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
    isLoading,
  } = useProgressLogic();

  return (
      <div className="progress-container">
        <div className="progress-inner">
          <div className="title-container">
            <h2 className="progress-title">Class Progress</h2>
            {selectedClass && (
                <div className="spreadsheet-container">
                  <button className="spreadsheet-button" onClick={handleSpreadsheetClick}>
                    Spreadsheet
                  </button>
                  {showSpreadsheetDropdown && (
                      <div className="spreadsheet-dropdown">
                        <div onClick={() => handleDownload('class')}>Entire Class</div>
                        <div onClick={() => handleDownload('student')} disabled={!selectedStudent}>
                          Selected Student
                        </div>
                      </div>
                  )}
                </div>
            )}
          </div>

          {/* Class/Student Select */}
          <div className="select-section">
            <div className="select-group">
              <label htmlFor="classroom">Select a Class:</label>
              <select
                  id="classroom"
                  value={selectedClass}
                  onChange={handleClassChange}
                  className="select-dropdown"
              >
                <option value="">-- Choose a Class --</option>
                {classrooms.map((c) => (
                    <option key={c.classId} value={c.classId}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="select-group">
              <label htmlFor="student">Select a Student:</label>
              <select
                  id="student"
                  value={selectedStudent}
                  onChange={handleStudentChange}
                  disabled={!selectedClass}
                  className="select-dropdown"
              >
                <option value="">-- Choose a Student --</option>
                {selectedClass &&
                    students[selectedClass]?.map((s) => (
                        <option key={s.studentId} value={s.studentId}>{s.studentUsername}</option>
                    ))}
              </select>
            </div>
          </div>

          {/* Chart */}
          <div className="chart-container">
            <h3 className="chart-title">Performance Comparison</h3>
            {isLoading ? (
                <p className="chart-loading">Loading data...</p>
            ) : selectedClass && selectedStudent ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getChartData()}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score">
                      {getChartData().map((entry, index) => (
                          <Cell
                              key={`cell-${index}`}
                              fill={entry.name === 'Selected Student' ? '#911B0C' : '#808080'}
                          />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
            ) : (
                <p className="chart-empty">Select a class and student to view data.</p>
            )}
          </div>
        </div>
      </div>
  );
};

export default Progress;
