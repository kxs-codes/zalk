import {useEffect, useState } from "react";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [formInfo, setFormInfo] = useState({
        username: "",
        hashedPassword: "",
        gradeLevel: "",
        relativeRating: ""
    });

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await fetch("http://localhost:8080/api/students");
            const data = await response.json();
            setStudents(data);
        }
        fetchStudents();
    }, []);

    useEffect(() => {
        console.log("Students: ", students);
    },[students]);

    const handleSubmit = (event) => {
        // 1. Prevent page reload
        event.preventDefault();

        // 2. Create function to send to backend (POST, JSON format)
        const postStudent = async () => {
            console.log(formInfo);
            // Send to backend as JSON
            const response = await fetch("http://localhost:8080/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: formInfo.username,
                    hashedPassword: formInfo.hashedPassword,
                    gradeLevel: parseInt(formInfo.gradeLevel),
                    relativeRating: parseInt(formInfo.relativeRating)
                })
            });
            
            // Convert response to json
            const data = await response.json();

            // Add new student to student list (data in same format as state variable but with added id key)
            setStudents((prevState) => [...prevState, data]);

            // Reset form field
            setFormInfo({username: "", hashedPassword: "", gradeLevel: "", relativeRating: ""});
        }
        
        // 3. Call function
        postStudent();
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div>
            <h2>Student List</h2>
            {
                students.map((student, index) => (
                    <ul>
                        <li key={index}>{student.username}</li>
                        <li key={index}>{student.gradeLevel}</li>
                        <li key={index}>{student.relativeRating}</li>
                    </ul>
                ))
            }
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username </label>
                    <input type="text" id="username" name="username" placeholder="username" value={formInfo.username} onChange={handleChange} required />

                    <label htmlFor="hashedPassword">Password </label>
                    <input type="password" id="hashedPassword" name="hashedPassword" placeholder="password" value={formInfo.hashedPassword} onChange={handleChange} required />

                    <label htmlFor="gradeLevel">Grade Level </label>
                    <input type="text" id="gradeLevel" name="gradeLevel" placeholder="gradeLevel" value={formInfo.gradeLevel} onChange={handleChange} required />

                    <label htmlFor="relativeRating">Rating </label>
                    <input type="text" id="relativeRating" name="relativeRating" placeholder="relativeRating" value={formInfo.relativeRating} onChange={handleChange} required />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default StudentList;