import 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import '../../styles/AdvisoryModerator/pages/AdvisoryProgress.css';
import useAdvisoryProgress from "./AdvisoryProgressLogic.js";
const ViewProgressBoard = () => {
  const {
    showSpreadsheetDropdown,
    handleSpreadsheetClick,
    dummyOverallData,
    dummySessionBreakdownData,
    COLORS,
    hasStudents,
    hasSessionData
  } = useAdvisoryProgress();

  if (!hasStudents) {
    return (
        <div className="view-progress-board">
          <h2 className="error-message">No students in the classroom yet.</h2>
        </div>
    );
  }

  if (!hasSessionData) {
    return (
        <div className="view-progress-board">
          <h2 className="error-message">No session data available yet.</h2>
        </div>
    );
  }

  return (
      <div className="outer-container">
        <div className="white-container">
          <div className="view-progress-board">
            <div className="header">
              <h2 className="title">View Progress</h2>
              <div className="spreadsheet-container">
                <button className="spreadsheet-button" onClick={handleSpreadsheetClick}>
                  Spreadsheet
                </button>
                {showSpreadsheetDropdown && (
                    <div className="spreadsheet-dropdown">
                      <div className="dropdown-item" onClick={() => console.log("Download Entire Class Spreadsheet")}>
                        Entire Class
                      </div>
                      <div className="dropdown-item" onClick={() => console.log("Download Selected Student Spreadsheet")}>
                        Selected Student
                      </div>
                    </div>
                )}
              </div>
            </div>

            <div className="charts-container">
              {dummyOverallData?.length > 0 && (
                  <div className="chart-card">
                    <h3 className="chart-title">Overall Performance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={dummyOverallData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                          {dummyOverallData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
              )}

              {dummySessionBreakdownData?.length > 0 && (
                  <div className="chart-card">
                    <h3 className="chart-title">Session Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={dummySessionBreakdownData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                          {dummySessionBreakdownData.map((entry, index) => (
                              <Cell key={`cell-session-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ViewProgressBoard;
