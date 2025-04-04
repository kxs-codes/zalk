import React from 'react';
import '../../styles/Educator/pages/Manage.css';
import useManageLogic from './ManageLogic';

const Manage = () => {
  const {
    classrooms,
    selectedClass,
    newStudent,
    showStudentList,
    handleSelectClass,
    handleAddStudent,
    handleViewStudents,
    handleCloseModal,
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
                  <td>{classroom.totalStudents}</td>
                  <td>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => handleViewStudents(classroom)}
                    >
                      View Students
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedClass && showStudentList && (
          <div className="manage-panel">
            <h3 className="manage-panel-title">Students in: {selectedClass.name}</h3>

            <div className="student-list-section">
              <h4 className="student-list-heading">Student List</h4>
              {selectedClass.students && selectedClass.students.length > 0 ? (
                <ul className="student-list">
                  {selectedClass.students.map((student, index) => (
                    <li key={index} className="student-list-item">
                      {student}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-students">No students in this class.</p>
              )}
            </div>

            <button 
              className="btn btn-secondary" 
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manage;
