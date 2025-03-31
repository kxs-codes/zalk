// SessionConfig.jsx
import React from 'react';
import '../../styles/Educator/pages/SessionConfig.css';
import useSessionConfig from './SessionConfigLogic';

const SessionConfig = () => {
  const {
    sessions,
    classrooms,
    difficulties,
    subjects,
    formats,
    selectedClass,
    sessionTime,
    difficulty,
    subject,
    format,
    editingSession,
    setSelectedClass,
    setSessionTime,
    setDifficulty,
    setSubject,
    setFormat,
    handleSave,
    handleEdit,
    handleDelete,
  } = useSessionConfig();

  return (
    <div className="session-config-page">
      <div className="session-config-content">
        <h2 className="title">Session Configuration</h2>

        <div className="current-sessions">
          <h3 className="subtitle">Current Sessions</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Class Name</th>
                  <th>Time (Min)</th>
                  <th>Difficulty</th>
                  <th>Subject</th>
                  <th>Format</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions.length > 0 ? (
                  sessions.map((session) => (
                    <tr key={session.id}>
                      <td>{session.className}</td>
                      <td>{session.time}</td>
                      <td>{session.difficulty}</td>
                      <td>{session.subject}</td>
                      <td>{session.format}</td>
                      <td>
                        <button className="edit-button" onClick={() => handleEdit(session)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDelete(session.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="empty-row">No sessions configured yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* <div className="form-section">
          <h3 className="subtitle">{editingSession ? 'Edit Session' : 'Configure New Session'}</h3>

          <label>Select a Class:</label>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="">-- Choose a Class --</option>
            {classrooms.map((c, index) => <option key={index} value={c}>{c}</option>)}
          </select>

          <label>Session Time (Minutes):</label>
          <input
            type="number"
            placeholder="Enter session duration"
            value={sessionTime}
            onChange={(e) => setSessionTime(e.target.value)}
            min="5"
            max="120"
          />

          <label>Difficulty:</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">-- Choose a Difficulty --</option>
            {difficulties.map((d, i) => <option key={i} value={d}>{d}</option>)}
          </select>

          <label>Subject:</label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">-- Choose a Subject --</option>
            {subjects.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>

          <label>Format:</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="">-- Choose a Format --</option>
            {formats.map((f, i) => <option key={i} value={f}>{f}</option>)}
          </select>

          <button className="save-button" onClick={handleSave}>
            {editingSession ? 'Update Configuration' : 'Add Session'}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default SessionConfig;
