import React, { useState } from 'react';
import '../../styles/Educator/pages/Manage.css'; 

const Manage = () => {
  // Dummy Data: Educator's Classes and Students
  const [classrooms, setClassrooms] = useState([
    { id: 'class1', name: 'Math 101', students: ['Alice Johnson', 'Bob Smith', 'Charlie Brown'] },
    { id: 'class2', name: 'Science 102', students: ['Diana Prince', 'Eve Adams', 'Frank Castle'] },
  ]);

  const [selectedClass, setSelectedClass] = useState(null);
  const [newStudent, setNewStudent] = useState('');

  // Select a class to manage
  const handleSelectClass = (classId) => {
    setSelectedClass(classrooms.find(c => c.id === classId));
  };

  // Add a new student
  const handleAddStudent = () => {
    if (newStudent.trim() === '') return;
    setClassrooms(prevClasses =>
      prevClasses.map(c =>
        c.id === selectedClass.id ? { ...c, students: [...c.students, newStudent] } : c
      )
    );
    setNewStudent('');
  };

  // Remove a student
  const handleRemoveStudent = (student) => {
    setClassrooms(prevClasses =>
      prevClasses.map(c =>
        c.id === selectedClass.id
          ? { ...c, students: c.students.filter(s => s !== student) }
          : c
      )
    );
  };

  // Delete a classroom
  const handleDeleteClassroom = (classId) => {
    setClassrooms(prevClasses => prevClasses.filter(c => c.id !== classId));
    if (selectedClass?.id === classId) setSelectedClass(null); // Reset selection if deleted
  };

  return (
    <div className="manage-container">
      <div className="manage-inner">

        <h2 className="manage-title">Manage Classrooms</h2>

        {/* Classroom Table */}
        <div className="section">
          <h3 className="section-title">Your Classes</h3>
          <table className="manage-table">
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Students</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classrooms.map((classroom) => (
                <tr key={classroom.id}>
                  <td>{classroom.name}</td>
                  <td>{classroom.students.length}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSelectClass(classroom.id)}
                    >
                      Manage
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteClassroom(classroom.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Classroom Management Panel */}
        {selectedClass && (
          <div className="manage-panel">
            <h3 className="manage-panel-title">
              Managing: {selectedClass.name}
            </h3>

            {/* Student List */}
            <div className="student-list-section">
              <h4 className="student-list-heading">Students</h4>
              {selectedClass.students.length > 0 ? (
                <ul className="student-list">
                  {selectedClass.students.map((student, index) => (
                    <li key={index} className="student-list-item">
                      <span>{student}</span>
                      <button
                        className="remove-link"
                        onClick={() => handleRemoveStudent(student)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-students">No students in this class.</p>
              )}
            </div>

            {/* Add Student Form */}
            <div className="add-student-form">
              <input
                type="text"
                placeholder="New Student Name"
                className="input-text"
                value={newStudent}
                onChange={(e) => setNewStudent(e.target.value)}
              />
              <button
                className="btn btn-success"
                onClick={handleAddStudent}
              >
                Add
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Manage;
