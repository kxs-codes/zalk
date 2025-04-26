import React from 'react';
import {
  Area, AreaChart, Pie, PieChart, Cell, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts';
import useChartLogic from './ChartLogic';

const Chart = ({ activeClassroom }) => {
  const { areaChartData, pieData } = useChartLogic(activeClassroom);

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
            stroke="#4f46e5"
            fill="#a5b4fc"
            name="Right Answers"
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#f59e0b"
            fill="#fde68a"
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
