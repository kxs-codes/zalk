import React from 'react';
import '../../styles/Educator/pages/Manage.css';
import useManageLogic from './ManageLogic';

const Manage = () => {
  const {
    classrooms,
    selectedClass,
    newStudent,
    handleSelectClass,
    handleAddStudent,
    setNewStudent
  } = useManageLogic();

  return (
    <div className="manage-container">
      <div className="manage-inner">
        <h2 className="manage-title">Manage Classrooms</h2>

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
                    <button className="btn btn-primary" onClick={() => handleSelectClass(classroom.id)}>Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedClass && (
          <div className="manage-panel">
            <h3 className="manage-panel-title">Managing: {selectedClass.name}</h3>

            <div className="student-list-section">
              <h4 className="student-list-heading">Students</h4>
              {selectedClass.students.length > 0 ? (
                <ul className="student-list">
                  {selectedClass.students.map((student, index) => (
                    <li key={index} className="student-list-item">
                      <span>{student}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-students">No students in this class.</p>
              )}
            </div>

            <div className="add-student-form">
              <input
                type="text"
                placeholder="New Student Name"
                className="input-text"
                value={newStudent}
                onChange={(e) => setNewStudent(e.target.value)}
              />
              <button className="btn btn-success" onClick={handleAddStudent}>Add</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manage;
