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

            // Add new student to student tdst (data in same format as state variable but with added id key)
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
        <div className="h-screen w-screen overflow-auto flex flex-col justify-center items-center">
            <h1>Student Portal</h1>
            <table className="border-collapse border-2 border-red-50 w-1/2 my-5">
                <thead>
                    <tr className="border-2 border-red-50">
                        <th className="border-2 border-red-50">Username</th>
                        <th className="border-2 border-red-50">Grade Level</th>
                        <th className="border-2 border-red-50">Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((student, index) => (
                            <tr className="border-2 border-red-50">
                                <td className="border-2 border-red-50" key={index}>{student.username}</td>
                                <td className="border-2 border-red-50" key={index}>{student.gradeLevel}</td>
                                <td className="border-2 border-red-50" key={index}>{student.relativeRating}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="w-1/4">
                <form onSubmit={handleSubmit} className="flex flex-col my-3">
                    <div className="flex flex-col w-full justify-between mb-2">
                        <label htmlFor="username" className="text-left mb-1">Username </label>
                        <input type="text" className="px-2 py-1 border-1 border-blue-200 rounded-lg"  id="username" name="username" placeholder="username" value={formInfo.username} onChange={handleChange} required />
                    </div>

                    <div className="flex flex-col w-full justify-between mb-2">
                        <label htmlFor="hashedPassword" className="text-left mb-1">Password </label>
                        <input type="password" className="px-2 py-1 border-1 border-blue-200 rounded-lg"  id="hashedPassword" name="hashedPassword" placeholder="********" value={formInfo.hashedPassword} onChange={handleChange} required />
                    </div>
                    
                    <div className="flex flex-col w-full justify-between mb-2">
                        <label htmlFor="gradeLevel" className="text-left mb-1">Grade Level </label>
                        <input type="text" className="px-2 py-1 border-1 border-blue-200 rounded-lg"  id="gradeLevel" name="gradeLevel" placeholder="gradeLevel" value={formInfo.gradeLevel} onChange={handleChange} required />
                    </div>

                    <div className="flex flex-col justify-between mb-2">
                        <label htmlFor="relativeRating" className="text-left mb-1">Rating </label>
                        <input type="text" className="px-2 py-1 border-1 border-blue-200 rounded-lg" id="relativeRating" name="relativeRating" placeholder="relativeRating" value={formInfo.relativeRating} onChange={handleChange} required />
                    </div>

                    <button type="submit" className="my-5">Create Student</button>
                </form>
            </div>
        </div>
    );
};

export default StudentList;
