import { useState, useEffect } from "react";

const useChartLogic = (activeClassroom) => {
    const [areaChartData, setAreaChartData] = useState(null);
    const [pieData, setPieData] = useState(null);

    useEffect(() => {
        if (!activeClassroom) {
            setAreaChartData(null);
            setPieData(null);
            return;
        }

        const newAreaChartData = [
            { name: 'Right', value: activeClassroom.totalRight || 0 },
            { name: 'Wrong', value: activeClassroom.totalWrong || 0 },
        ];

        const newPieData = [
            { name: 'Total Time (mins)', value: Math.round((activeClassroom.totalTimeInSession || 0) / 60) },
            { name: 'Sessions Completed', value: activeClassroom.sessionsCompleted || 0 },
            { name: 'Days Logged In', value: activeClassroom.daysLoggedIn || 0 },
            { name: 'Avg Time (mins)', value: activeClassroom.avgTime || 0 },
        ];

        setAreaChartData(newAreaChartData);
        setPieData(newPieData);
    }, [activeClassroom]);

    return {
        areaChartData,
        pieData,
    };
};

export default useChartLogic;
