import { useState } from 'react';

const useManageLogic = () => {
  const [classrooms, setClassrooms] = useState([
    { id: 'class1', name: 'Math 101', students: ['Alice Johnson']},
    {id: 'class2', name: 'Math 102', students: ['Luna Piere']}
  ]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [newStudent, setNewStudent] = useState('');

  const handleSelectClass = (id) => {
    setSelectedClass(classrooms.find(c => c.id === id));
  };

  const handleAddStudent = () => {
    if (!newStudent.trim()) return;
    setClassrooms(prev =>
      prev.map(c =>
        c.id === selectedClass.id
          ? { ...c, students: [...c.students, newStudent] }
          : c
      )
    );
    setNewStudent('');
  };

  // FYI: Changing this to where this can be added if the 

  // const handleRemoveStudent = (student) => {
  //   setClassrooms(prev =>
  //     prev.map(c =>
  //       c.id === selectedClass.id
  //         ? { ...c, students: c.students.filter(s => s !== student) }
  //         : c
  //     )
  //   );
  // };

  // const handleDeleteClassroom = (id) => {
  //   setClassrooms(prev => prev.filter(c => c.id !== id));
  //   if (selectedClass?.id === id) setSelectedClass(null);
  // };

  return {
    classrooms,
    selectedClass,
    newStudent,
    setNewStudent,
    handleSelectClass,
    handleAddStudent,
    // handleRemoveStudent,   Adding comment until usecase is added for this 
    // handleDeleteClassroom,
  };
};

export default useManageLogic;
