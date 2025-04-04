import { useState, useEffect } from 'react';
import {
  Area, AreaChart, Pie, PieChart, Cell, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts';

const Chart = ({ activeClassroom }) => {
  const [areaChartData, setAreaChartData] = useState(null); // Data for the Area Chart
  const [pieData, setPieData] = useState(null); // Data for the Pie Chart

  const COLORS = ['#4f46e5', '#818cf8', '#f59e0b', '#ef4444', '#10b981', '#3b82f6']; // Matching color scheme

  useEffect(() => {
    if (!activeClassroom) {
      setAreaChartData(null);
      setPieData(null);
      return;
    }

    // Data for the Area Chart (Right vs Wrong)
    const newAreaChartData = [
      { name: 'Right', value: activeClassroom.totalRight || 0 },
      { name: 'Wrong', value: activeClassroom.totalWrong || 0 },
    ];

    // Data for the Pie Chart
    const newPieData = [
      { name: 'Total Time (mins)', value: Math.round((activeClassroom.totalTimeInSession || 0) / 60) },
      { name: 'Sessions Completed', value: activeClassroom.sessionsCompleted || 0 },
      { name: 'Days Logged In', value: activeClassroom.daysLoggedIn || 0 },
      { name: 'Avg Time (mins)', value: activeClassroom.avgTime || 0 },
    ];

    setAreaChartData(newAreaChartData);
    setPieData(newPieData);
  }, [activeClassroom]);

  if (!activeClassroom) {
    return (
      <div className="h-80 w-100 flex items-center justify-center text-gray-500">
        Select a classroom to view statistics
      </div>
    );
  }

  if (!areaChartData || !pieData) {
    return (
      <div className="h-80 w-100 flex items-center justify-center text-gray-400">
        No data available for the selected classroom.
      </div>
    );
  }

  return (
    <div className="h-80 w-175 grid grid-cols-2 gap-20">
      {/* Area Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={areaChartData} margin={{ right: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
      type="monotone"
      dataKey="value"
      stroke="#4f46e5" // Deep indigo
      fill="#a5b4fc"   // Light indigo
      name="Right Answers"
    />
    
    <Area
      type="monotone"
      dataKey="value"
      stroke="#f59e0b" // Amber
      fill="#fde68a"   // Light amber
      name="Wrong Answers"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#4f46e5"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
