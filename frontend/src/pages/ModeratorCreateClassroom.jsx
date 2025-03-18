import { useState } from "react";
import { AcademicCapIcon, UserGroupIcon, UserIcon, BookOpenIcon, XCircleIcon } from "@heroicons/react/24/solid";


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
        <section className="w-full flex flex-col items-center justify-center">
        <h2 className="font-semibold text-2xl flex items-center gap-2">
            🎓 Create Classroom
        </h2>

        <div className=" rounded-lg p-6 mt-6 w-full max-w-lg">
            <form onSubmit={handleSubmit} mclassName="w-11/12 md:w-8/12 lg:w-7/12 bg-gray-500">
                {/* Subject Level */}
                <div className="flex items-center gap-3 border-b pb-2">
                    <AcademicCapIcon className="size-6 text-blue-500"/>
                    <select 
                        name="subjectLevel" 
                        value={formData.subjectLevel} 
                        onChange={handleChange}
                        className="w-full border-none outline-none bg-transparent"
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
                <div className="flex items-center gap-3 border-b pb-2">
                    <UserIcon className="size-6 text-green-500"/>
                    <input 
                        type="text" 
                        name="educator"
                        placeholder="Educator Name"
                        value={formData.educator}
                        onChange={handleChange}
                        className="w-full border-none outline-none bg-transparent"
                    />
                </div>

                {/* Student Selection */}
                <div className="flex flex-col gap-3 pb-2">
                    <label htmlFor="student" className="font-medium text-gray-700">Select Students:</label>
                    
                    <input 
                        type="text"
                        name="student"
                        id="student"
                        placeholder="Search students..."
                        value={searchStudent}
                        onChange={handleSearch}
                        className="w-full p-2 border rounded-md" 
                    />

                    <div className="max-h-40 overflow-y-auto border rounded-md p-2 bg-gray-100">
                        {filteredStudents.map((student) => (
                            <div
                                key={student}
                                className="flex justify-between items-center bg-white p-2"
                                onClick={() => addStudent(student)}
                            >
                                {student}
                            </div>
                        ))}
                    </div>

                    {formData.students.length > 0 && (
                        <div className="p-2 border rounded-md bg-gray-50">
                            <p className="font-medium text-gray-600">Selected Students</p>
                            <div className="flex flex-wrap gap-5">
                                {formData.students.map((student) => (
                                    <div
                                        key={student}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        {student}
                                        <XCircleIcon className="size-4 text-red-700 hover:cursor-pointer" onClick={() => removeStudent(student)}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                </div>

                {/* Subject Name */}
                <div className="flex items-center gap-3 border-b pb-2">
                    <BookOpenIcon className="size-6 text-yellow-500"/>
                    <input 
                        type="text"
                        name="subjectName"
                        placeholder="Subject Name"
                        value={formData.subjectName}
                        onChange={handleChange}
                        className="w-full border-none outline-none bg-transparent" 
                    />
                </div>
                <button type="submit" className="bg-dark-red-primary-1 hover:bg-red-primary-3 cursor-pointer text-white p-4 my-2 rounded-full">Create Classroom</button>
            </form>
        </div>
    </section>
    )
}

export default ModeratorCreateClassroom;