// SessionConfigLogic.js
import { useState } from 'react';

const useSessionConfig = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      className: 'Math 100',
      time: 30,
      difficulty: 'Medium',
      subject: 'Basic Math',
      format: 'Multiple Choice',
    },
    {
      id: 2,
      className: 'Math 102',
      time: 45,
      difficulty: 'Hard',
      subject: 'Geometry',
      format: 'Short Answer',
    },
    {
      id: 3,
      className: 'Math 201',
      time: 25,
      difficulty: 'Easy',
      subject: 'Applicational Math',
      format: 'True/False',
    },
    {
      id: 4,
      className: 'Math 301',
      time: 40,
      difficulty: 'Medium',
      subject: 'Trignometry',
      format: 'Multiple Choice',
    },
    {
      id: 5,
      className: 'Math 101',
      time: 50,
      difficulty: 'Hard',
      subject: 'Algebra',
      format: 'Short Answer',
    },
    {
      id: 2,
      className: 'Math 102',
      time: 45,
      difficulty: 'Hard',
      subject: 'Geometry',
      format: 'Short Answer',
    },
    {
      id: 2,
      className: 'Math 102',
      time: 45,
      difficulty: 'Hard',
      subject: 'Geometry',
      format: 'Short Answer',
    },
  ]);

  const classrooms = ['Math 101', 'Math 102', 'Math 201', 'Math 301', 'Math 501'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const subjects = ['Basic Math', 'Geometry', 'Triginometry', 'Algebra', 'Applicational Math'];
  const formats = ['Multiple Choice', 'Short Answer', 'True/False'];

  const [selectedClass, setSelectedClass] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [subject, setSubject] = useState('');
  const [format, setFormat] = useState('');
  const [editingSession, setEditingSession] = useState(null);

  const handleReset = () => {
    setSelectedClass('');
    setSessionTime('');
    setDifficulty('');
    setSubject('');
    setFormat('');
    setEditingSession(null);
  };

  const handleSave = () => {
    if (!selectedClass || !sessionTime || !difficulty || !subject || !format) {
      alert('Please fill out all fields before saving.');
      return;
    }

    if (editingSession) {
      setSessions((prev) =>
        prev.map((session) =>
          session.id === editingSession.id
            ? { ...session, className: selectedClass, time: sessionTime, difficulty, subject, format }
            : session
        )
      );
    } else {
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

  const handleEdit = (session) => {
    setSelectedClass(session.className);
    setSessionTime(session.time);
    setDifficulty(session.difficulty);
    setSubject(session.subject);
    setFormat(session.format);
    setEditingSession(session);
  };

  const handleDelete = (id) => {
    setSessions((prev) => prev.filter((session) => session.id !== id));
    if (editingSession?.id === id) handleReset();
  };

  return {
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
    handleReset,
  };
};

export default useSessionConfig;