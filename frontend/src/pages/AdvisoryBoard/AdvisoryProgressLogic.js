import { useState } from 'react';

const useAdvisoryProgress = () => {
    const [showSpreadsheetDropdown, setShowSpreadsheetDropdown] = useState(false);

    const handleSpreadsheetClick = () => {
        setShowSpreadsheetDropdown(!showSpreadsheetDropdown);
    };

    const dummyOverallData = [
        { name: 'Completed', value: 50 },
        { name: 'In Progress', value: 30 },
        { name: 'Not Started', value: 20 },
    ];

    const dummySessionBreakdownData = [
        { name: 'Session A', value: 80 },
        { name: 'Session B', value: 60 },
        { name: 'Session C', value: 40 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return {
        showSpreadsheetDropdown,
        handleSpreadsheetClick,
        dummyOverallData,
        dummySessionBreakdownData,
        COLORS,
        hasStudents: true,
        hasSessionData: true,
    };
};

export default useAdvisoryProgress;
