import { useState, useEffect } from "react";

export const useModeratorCreateClassroom = () => {
    const mockStudents = [
        "Alice Johnson", "Bob Smith", "Charlie Brown", "David Lee", "Emma Wilson",
        "Fiona Davis", "George Miller", "Hannah White", "Ian Scott", "Julia Roberts"
    ];

    useEffect(() => {
        const fetchStudentsAndEducators = async () => {
            const response = await fetch("http://localhost:8080/api/moderator/students-and-educators");
            const data = await response.json();
            console.log("Data fetching students and educators: ", data);
        }

        fetchStudentsAndEducators();
    }, [])

    const [formData, setFormData] = useState({
        subjectName: '',
        subjectLevel: '',
        educatorName: '',
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
        
        const postClassroom = async () => {
            console.log(formData);

            const response = await fetch("http://localhost:8080/api/moderator/generate-classroom", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    subjectName: formData.subjectName,
                    subjectLevel: formData.subjectLevel,
                    educatorName: formData.educatorName,
                    students: formData.students
                })
            })

            if(response.ok) {
                console.log("success in creating classroom");
            }
        }

        postClassroom();
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