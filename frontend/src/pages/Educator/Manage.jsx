import React, { useState } from 'react';

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
    <div className='flex flex-col items-center bg-grey-secondary-lighter-1 w-screen h-screen p-6'>
      <div className=' mt-35 w-full max-w-4xl  bg-white shadow-lg rounded-lg p-6 overflow-y-auto'>

        <h2 className="text-2xl font-bold mb-4 text-center">Manage Classrooms</h2>

        {/* Classroom Table */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Your Classes</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Class Name</th>
                <th className="border border-gray-300 px-4 py-2">Students</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classrooms.map((classroom) => (
                <tr key={classroom.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{classroom.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{classroom.students.length}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                      onClick={() => handleSelectClass(classroom.id)}
                    >
                      Manage
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
          <div className="w-full bg-gray-50 rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold text-center mb-4">
              Managing: {selectedClass.name}
            </h3>

            {/* Student List */}
            <div className="mb-4">
              <h4 className="text-md font-medium">Students</h4>
              <ul className="list-disc list-inside bg-white p-2 rounded">
                {selectedClass.students.length > 0 ? (
                  selectedClass.students.map((student, index) => (
                    <li key={index} className="flex justify-between px-2 py-1 border-b">
                      {student}
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveStudent(student)}
                      >
                        Remove
                      </button>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No students in this class.</p>
                )}
              </ul>
            </div>

            {/* Add Student Form */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="New Student Name"
                className="w-full px-2 py-1 border rounded-lg"
                value={newStudent}
                onChange={(e) => setNewStudent(e.target.value)}
              />
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
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
