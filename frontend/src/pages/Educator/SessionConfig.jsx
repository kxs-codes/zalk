import React, { useState } from 'react';

const SessionConfig = () => {
  // Dummy Data: Existing Sessions
  const [sessions, setSessions] = useState([
    { id: 1, className: 'Math 101', time: 30, difficulty: 'Medium', subject: 'Mathematics', format: 'Multiple Choice' },
    { id: 2, className: 'Science 102', time: 45, difficulty: 'Hard', subject: 'Science', format: 'Short Answer' },
    { id: 3, className: 'History 201', time: 25, difficulty: 'Easy', subject: 'History', format: 'True/False' },
    { id: 4, className: 'English 301', time: 40, difficulty: 'Medium', subject: 'English', format: 'Multiple Choice' },
    { id: 5, className: 'Physics 101', time: 50, difficulty: 'Hard', subject: 'Science', format: 'Short Answer' },
  ]);

  // Dummy Classrooms for selection
  const classrooms = ['Math 101', 'Science 102', 'History 201', 'English 301', 'Physics 101'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const subjects = ['Mathematics', 'Science', 'History', 'English'];
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
      setSessions(sessions.map(session =>
        session.id === editingSession.id
          ? { ...session, className: selectedClass, time: sessionTime, difficulty, subject, format }
          : session
      ));
    } else {
      setSessions([...sessions, { id: Date.now(), className: selectedClass, time: sessionTime, difficulty, subject, format }]);
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
    setSessions(sessions.filter(session => session.id !== id));
    if (editingSession?.id === id) handleReset();
  };

  return (
    <div className='flex flex-col items-center overflow-auto bg-grey-secondary-lighter-1 w-screen h-screen p-6'>
      <div className='w-full max-w-4xl mt-15  bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4'>

        <h2 className="text-2xl font-bold text-center">Session Configuration</h2>

        {/* Scrollable Section 1: Current Sessions */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Current Sessions</h3>
          <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg shadow-sm">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-gray-200 shadow-md">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Class Name</th>
                  <th className="border border-gray-300 px-4 py-2">Time (Min)</th>
                  <th className="border border-gray-300 px-4 py-2">Difficulty</th>
                  <th className="border border-gray-300 px-4 py-2">Subject</th>
                  <th className="border border-gray-300 px-4 py-2">Format</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions.length > 0 ? (
                  sessions.map(session => (
                    <tr key={session.id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">{session.className}</td>
                      <td className="border border-gray-300 px-4 py-2">{session.time}</td>
                      <td className="border border-gray-300 px-4 py-2">{session.difficulty}</td>
                      <td className="border border-gray-300 px-4 py-2">{session.subject}</td>
                      <td className="border border-gray-300 px-4 py-2">{session.format}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                          onClick={() => handleEdit(session)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          onClick={() => handleDelete(session.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                      No sessions configured yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scrollable Section 2: Session Configuration Form */}
        <div className="flex flex-col max-h-72 overflow-y-auto border border-gray-300 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Configure New Session</h3>

          <label className="mb-1 font-medium">Select a Class:</label>
          <select className="w-full px-2 py-2 border rounded-lg mb-2" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="">-- Choose a Class --</option>
            {classrooms.map((c, index) => (<option key={index} value={c}>{c}</option>))}
          </select>

          <label className="mb-1 font-medium">Session Time (Minutes):</label>
          <input type="number" className="w-full px-2 py-2 border rounded-lg mb-2" value={sessionTime} onChange={(e) => setSessionTime(e.target.value)} placeholder="Enter session duration" min="5" max="120" />

          <label className="mb-1 font-medium">Difficulty:</label>
          <select className="w-full px-2 py-2 border rounded-lg mb-2" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            {difficulties.map((level, index) => (<option key={index} value={level}>{level}</option>))}
          </select>

          <label className="mb-1 font-medium">Subject:</label>
          <select className="w-full px-2 py-2 border rounded-lg mb-2" value={subject} onChange={(e) => setSubject(e.target.value)}>
            {subjects.map((subj, index) => (<option key={index} value={subj}>{subj}</option>))}
          </select>

          <label className="mb-1 font-medium">Format:</label>
          <select className="w-full px-2 py-2 border rounded-lg mb-4" value={format} onChange={(e) => setFormat(e.target.value)}>
            {formats.map((fmt, index) => (<option key={index} value={fmt}>{fmt}</option>))}
          </select>

          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSave}>
            {editingSession ? 'Update Configuration' : 'Add Session'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default SessionConfig;
