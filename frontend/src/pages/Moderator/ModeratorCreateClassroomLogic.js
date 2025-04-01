import { useState } from "react";

export const useModeratorCreateClassroom = () => {
    const mockStudents = [
        "Alice Johnson", "Bob Smith", "Charlie Brown", "David Lee", "Emma Wilson",
        "Fiona Davis", "George Miller", "Hannah White", "Ian Scott", "Julia Roberts"
    ];

    const [formData, setFormData] = useState({
        subjectName: '',
        subjectLevel: '',
        educator: '',
        students: [],
    });
    const [searchStudent, setSearchStudent] = useState('');
    const [filteredStudents, setFilteredStudents] = useState(mockStudents);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Send to backend (Backend Deadline)
        console.log("Classroom created:", formData);
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchStudent(term);
        setFilteredStudents(mockStudents.filter((student) => student.toLowerCase().includes(term)));
    };

    const addStudent = (student) => {
        if (!formData.students.includes(student)) {
            setFormData((prev) => ({
                ...prev,
                students: [...prev.students, student],
            }));
        }
    };

    const removeStudent = (student) => {
        if (formData.students.includes(student)) {
            setFormData((prev) => ({
                ...prev,
                students: prev.students.filter((s) => s !== student),
            }));
        }
    };

    return {
        formData,
        searchStudent,
        filteredStudents,
        handleChange,
        handleSubmit,
        handleSearch,
        addStudent,
        removeStudent,
    };
};