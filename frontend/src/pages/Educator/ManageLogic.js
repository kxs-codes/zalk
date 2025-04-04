import { useState, useEffect } from 'react';

const useManageLogic = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [newStudent, setNewStudent] = useState('');
  const [showStudentList, setShowStudentList] = useState(false);

  const educatorId = 'b18bd975-3f02-452a-b02c-b6fe5f79d39f'; // Example educatorId

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/educator/classrooms?educatorId=${educatorId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Raw data from backend:', data); // Debug log

        // Map the received data to match the component's expected format
        const mappedClassrooms = data.map(classroom => ({
          id: classroom.classroomId,
          name: `${classroom.subject} - Level ${classroom.subjectLevel}`,
          students: classroom.studentUsernames || [],
          totalStudents: classroom.students
        }));

        console.log('Mapped classrooms:', mappedClassrooms); // Debug log
        setClassrooms(mappedClassrooms);
      } catch (error) {
        console.error('Error fetching classrooms:', error);
      }
    };

    fetchClassrooms();
  }, [educatorId]);

  const handleSelectClass = (id) => {
    console.log('Selecting class with id:', id); // Debug log
    const selected = classrooms.find(c => c.id === id);
    console.log('Selected class:', selected); // Debug log
    setSelectedClass(selected);
    setShowStudentList(true);
  };

  const handleAddStudent = () => {
    if (!newStudent.trim() || !selectedClass) return;
    setClassrooms(prev =>
      prev.map(c =>
        c.id === selectedClass.id
          ? { ...c, students: [...c.students, newStudent] }
          : c
      )
    );
    setNewStudent('');
  };

  const handleViewStudents = (classroom) => {
    setSelectedClass(classroom);
    setShowStudentList(true);
  };

  const handleCloseModal = () => {
    setShowStudentList(false);
    setSelectedClass(null);
  };

  return {
    classrooms,
    selectedClass,
    newStudent,
    setNewStudent,
    showStudentList,
    handleSelectClass,
    handleAddStudent,
    handleViewStudents,
    handleCloseModal,
  };
};

export default useManageLogic;
