import { useState } from "react";

export const useModeratorCreateClassroom = () => {
    const [studentsList, setStudentsList] = useState([]);
    const [educatorsList, setEducatorsList] = useState([]);
    const [searchStudent, setSearchStudent] = useState('');
    const [filteredStudents, setFilteredStudents] = useState(studentsList);

    const fetchStudentsAndEducators = async () => {
        const response = await fetch("http://localhost:8080/api/moderator/students-and-educators");
        const data = await response.json();
        setStudentsList(data.students);
        setEducatorsList(data.educators);

        console.log("Data fetching students and educators: ", data);
    }

    const [formData, setFormData] = useState({
        subjectName: '',
        subjectLevel: '',
        educatorName: '',
        students: [],
    });

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

            const data = response.text();

            if(response.ok) {
                console.log("success in creating classroom, ", data);
            }
        }

        postClassroom();
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchStudent(term);
        setFilteredStudents(studentsList.filter((student) => student.toLowerCase().includes(term)));
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
        educatorsList,
        handleChange,
        handleSubmit,
        handleSearch,
        addStudent,
        removeStudent,
        fetchStudentsAndEducators
    };
};