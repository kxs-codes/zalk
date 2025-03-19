import { useState } from "react";
import { AcademicCapIcon, UserIcon, UserGroupIcon, BookOpenIcon, XCircleIcon } from "@heroicons/react/24/solid";
import '../../styles/Moderator/ModeratorCreateClassroom.css';   

const ModeratorCreateClassroom = () => {
    const mockStudents = [
        "Alice Johnson", "Bob Smith", "Charlie Brown", "David Lee", "Emma Wilson",
        "Fiona Davis", "George Miller", "Hannah White", "Ian Scott", "Julia Roberts"
    ];

    const [formData, setFormData] = useState({
        subjectName: '',
        subjectLevel: '',
        educator: '',
        students: [],
    })
    const [searchStudent, setSearchStudent] = useState('');
    const [filteredStudents, setFilteredStudents] = useState(mockStudents);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: Send to backend (Backend Deadline)
    }
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchStudent(term);
        setFilteredStudents(mockStudents.filter((student) => student.toLowerCase().includes(term)));
    }

    const addStudent = (student) => {
        if (!formData.students.includes(student)) {
            setFormData((prev) => ({
                ...prev, 
                students: [...prev.students, student]}))
        }
    }
    const removeStudent = (student) => {
        if (formData.students.includes(student)) {
            setFormData((prev) => ({
                ...prev,
                students: prev.students.filter((s) => s !== student)
            }))
        }
    }

    return (
        <div className="create-classroom-container">
            <div className="inner-container">

                <section className="classroom-section">
                    <h2 className="section-header">🎓 Design Classroom</h2>

                    <div className="form-styling">
                        <form onSubmit={handleSubmit} className="form-tag">
                            {/* Subject Level */}
                            <div className="grade-container">
                                <AcademicCapIcon className="icon-style"/>
                                <select 
                                    name="subjectLevel" 
                                    value={formData.subjectLevel} 
                                    onChange={handleChange}
                                    className="select-style"
                                >
                                    <option value="1">Grade 1</option>
                                    <option value="2">Grade 2</option>
                                    <option value="3">Grade 3</option>
                                    <option value="4">Grade 4</option>
                                    <option value="5">Grade 5</option>
                                    <option value="6">Grade 6</option>
                                </select>
                            </div>

                            {/* Educator */}
                            <div className="educator-container">
                                <UserIcon className="user-icon"/>
                                <input 
                                    type="text" 
                                    name="educator"
                                    placeholder="Educator Name"
                                    value={formData.educator}
                                    onChange={handleChange}
                                    className="educator-input"
                                />
                            </div>

                            {/* Student Selection */}
                            <div className="student-container">
                                <label htmlFor="student">Select Students:</label>

                                <div className="student-input-container">
                                    <UserGroupIcon className="user-group-icon"/>
                                    <input 
                                        type="text"
                                        name="student"
                                        id="student"
                                        placeholder="Search students..."
                                        value={searchStudent}
                                        onChange={handleSearch}
                                        className="student-input" 
                                    />
                                </div>

                                <div className="student-list">
                                    {filteredStudents.map((student) => (
                                        <div
                                            key={student}
                                            className="student-in-list"
                                            onClick={() => addStudent(student)}
                                        >
                                            {student}
                                        </div>
                                    ))}
                                </div>

                                {formData.students.length > 0 && (
                                    <div className="selected-student-container">
                                        <p id="paragraph">Selected Students</p>
                                        <div className="selected-students-div">
                                            {formData.students.map((student) => (
                                                <div key={student} className="selected-student">
                                                    {student}
                                                    <XCircleIcon className="x-icon" onClick={() => removeStudent(student)}/>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="py-2 border rounded-md bg-gray-50 p-2">
                                            <p className="font-medium text-gray-600">Selected Students</p>
                                            <div className="flex flex-wrap gap-5 p-2">
                                                {formData.students.map((student) => (
                                                    <div key={student} className="flex items-center justify-center gap-2">
                                                        {student}
                                                        <XCircleIcon className="size-4 text-red-700 hover:cursor-pointer" onClick={() => removeStudent(student)}/>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Subject Name */}
                            <div className="subject-container">
                                <BookOpenIcon className="book-icon"/>
                                <input 
                                    type="text"
                                    name="subjectName"
                                    placeholder="Subject Name"
                                    value={formData.subjectName}
                                    onChange={handleChange}
                                    className="subject-input" 
                                />
                            </div>

                            <button type="submit" className="button-styling">Create Classroom</button>
                        </form>
                    </div> {/* Closing div for form-styling */}
                </section>
            </div>
        </div>
    )
}

export default ModeratorCreateClassroom;