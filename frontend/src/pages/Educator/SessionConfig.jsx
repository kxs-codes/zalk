import React, { useState } from 'react';
import '../../styles/Educator/pages/SessionConfig.css'
const SessionConfig = () => {
  // Dummy Data: Existing Sessions
  const [sessions, setSessions] = useState([
    {
      id: 1,
      className: 'Math 100',
      time: 30,
      difficulty: 'Medium',
      subject: 'Mathematics',
      format: 'Multiple Choice'
    },
    {
      id: 2,
      className: 'Math 102',
      time: 45,
      difficulty: 'Hard',
      subject: 'Science',
      format: 'Short Answer'
    },
    {
      id: 3,
      className: 'Math 201',
      time: 25,
      difficulty: 'Easy',
      subject: 'History',
      format: 'True/False'
    },
    {
      id: 4,
      className: 'Math 301',
      time: 40,
      difficulty: 'Medium',
      subject: 'English',
      format: 'Multiple Choice'
    },
    {
      id: 5,
      className: 'Math 101',
      time: 50,
      difficulty: 'Hard',
      subject: 'Science',
      format: 'Short Answer'
    },
  ]);

  // Dummy Classrooms for selection
  const classrooms = [
    'Math 101',
    'Math 102',
    'Math 201',
    'Math 301',
    'Math 501'
  ];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const subjects = ['Mathematics'];
  const formats = ['Multiple Choice', 'Short Answer', 'True/False'];

  // State for creating/editing session
  const [selectedClass, setSelectedClass] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [subject, setSubject] = useState('');
  const [format, setFormat] = useState('');
  const [editingSession, setEditingSession] = useState(null);

  // Reset Form
  const handleReset = () => {
    setSelectedClass('');
    setSessionTime('');
    setDifficulty('');
    setSubject('');
    setFormat('');
    setEditingSession(null);
  };

  // Handle Save (Create or Update)
  const handleSave = () => {
    if (!selectedClass || !sessionTime || !difficulty || !subject || !format) {
      alert('Please fill out all fields before saving.');
      return;
    }

    if (editingSession) {
      // Update existing session
      setSessions((prev) =>
        prev.map((session) =>
          session.id === editingSession.id
            ? {
                ...session,
                className: selectedClass,
                time: sessionTime,
                difficulty,
                subject,
                format,
              }
            : session
        )
      );
    } else {
      // Create new session
      setSessions((prev) => [
        ...prev,
        {
          id: Date.now(),
          className: selectedClass,
          time: sessionTime,
          difficulty,
          subject,
          format,
        },
      ]);
    }

    handleReset();
  };

  // Handle Edit
  const handleEdit = (session) => {
    setSelectedClass(session.className);
    setSessionTime(session.time);
    setDifficulty(session.difficulty);
    setSubject(session.subject);
    setFormat(session.format);
    setEditingSession(session);
  };

  // Handle Delete
  const handleDelete = (id) => {
    setSessions((prev) => prev.filter((session) => session.id !== id));
    if (editingSession?.id === id) handleReset();
  };

  return (
    <div className="session-config-page">
      <div className="session-config-content">
        <h2 className="title">Session Configuration</h2>

        {/* Current Sessions */}
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
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(session)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(session.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="empty-row">
                      No sessions configured yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Session Configuration Form */}
        <div className="form-section">
          <h3 className="subtitle">
            {editingSession ? 'Edit Session' : 'Configure New Session'}
          </h3>

          <label>Select a Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">-- Choose a Class --</option>
            {classrooms.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
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
            {difficulties.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>

          <label>Subject:</label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">-- Choose a Subject --</option>
            {subjects.map((subj, index) => (
              <option key={index} value={subj}>
                {subj}
              </option>
            ))}
          </select>

          <label>Format:</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="">-- Choose a Format --</option>
            {formats.map((fmt, index) => (
              <option key={index} value={fmt}>
                {fmt}
              </option>
            ))}
          </select>

          <button className="save-button" onClick={handleSave}>
            {editingSession ? 'Update Configuration' : 'Add Session'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionConfig;
