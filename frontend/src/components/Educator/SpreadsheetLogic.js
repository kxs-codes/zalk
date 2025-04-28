import { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { toast } from 'react-toastify';
import useSpreadsheetLogic from './Spreadsheets.jsx';

const useProgressLogic = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [students, setStudents] = useState({});
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSpreadsheetDropdown, setShowSpreadsheetDropdown] = useState(false);

    const BASE_URL = 'http://localhost:8080';
    const { token } = useAuth();
    const educatorId = token?.jti;
    const { downloadSpreadsheet, loading: downloading } = useSpreadsheetLogic(); // Pull download logic

    useEffect(() => {
        if (!educatorId) {
            console.error('educatorId is not defined');
            return;
        }

        fetch(`${BASE_URL}/api/educator/progress?educatorId=${educatorId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch classrooms');
                }
                return response.json();
            })
            .then((data) => {
                const classMap = {};
                const studentMap = {};

                data.forEach((item) => {
                    if (!classMap[item.classId]) {
                        classMap[item.classId] = { classId: item.classId, name: item.name };
                        studentMap[item.classId] = [];
                    }
                    studentMap[item.classId].push({
                        studentId: item.studentId,   // <-- ✅ Save REAL UUID
                        studentUsername: item.username,
                        score: item.score,
                    });
                });

                setClassrooms(Object.values(classMap));
                setStudents(studentMap);
            })
            .catch((error) => console.error('Error fetching classrooms:', error));
    }, [educatorId]);

    useEffect(() => {
        if (selectedClass && selectedStudent) {
            const classStudents = students[selectedClass];
            const selectedStudentData = classStudents.find((s) => s.studentId === selectedStudent);

            const classAverage = {
                name: 'Class Average',
                score: classStudents.reduce((sum, s) => sum + s.score, 0) / classStudents.length,
            };

            const individualStudent = {
                name: 'Selected Student',
                score: selectedStudentData?.score || 0,
            };

            setChartData([classAverage, individualStudent]);
        }
    }, [selectedClass, selectedStudent, students]);

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
        setSelectedStudent('');
        setChartData([]);
        setShowSpreadsheetDropdown(false);
    };

    const handleStudentChange = (e) => {
        setSelectedStudent(e.target.value); // e.target.value is UUID now ✅
    };

    const handleSpreadsheetClick = () => {
        setShowSpreadsheetDropdown((prev) => !prev);
    };

    const handleDownload = (type) => {
        try {
            if (type === 'class') {
                if (!selectedClass) {
                    toast.error('Please select a class first.');
                    return;
                }
                downloadSpreadsheet('classroom', selectedClass);
            } else if (type === 'student') {
                if (!selectedStudent) {
                    toast.error('Please select a student first.');
                    return;
                }
                downloadSpreadsheet('student', selectedStudent);
            }
        } catch (error) {
            console.error('Download error:', error);
        }
    };

    const getChartData = () => chartData;

    return {
        classrooms,
        students,
        selectedClass,
        selectedStudent,
        handleClassChange,
        handleStudentChange,
        handleSpreadsheetClick,
        handleDownload,
        getChartData,
        showSpreadsheetDropdown,
        isLoading: isLoading || downloading, // Combine both loadings
    };
};

export default useProgressLogic;
