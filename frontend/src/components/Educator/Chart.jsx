import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const Chart = ({ activeClassroom, statistics, ChartType }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (statistics) {
      const newData = [
        { name: 'students', value: statistics.students || 0 },
        { name: 'avgScore', value: statistics.avgScore || 0 },
        { name: 'Participation', value: statistics.engagement || 0 },
      ];
      setChartData(newData);
    } else {
      setChartData([]);
    }
  }, [activeClassroom, statistics]);

  // If there's no data, display a fallback
  if (chartData.length === 0) {
    return <div>No data available for the chart.</div>;
  }

  return (
    <div className="h-80 w-100">
      {ChartType === 'area' ? (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area dataKey="value" stroke="#4f46e5" fill="#818cf8" type="monotone" />
          </AreaChart>
        </ResponsiveContainer>
      ) : ChartType === 'radar' ? (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} margin={{ top: 20, right: 100, bottom: 20, left: 20 }}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar dataKey="value" stroke="#4f46e5" fill="#814cf8" />
          </RadarChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
};

export default Chart;
