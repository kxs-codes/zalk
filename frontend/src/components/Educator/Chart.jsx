import React, {useState, useEffect, act} from 'react'
import {Radar, 
        RadarChart, 
        Area,
        AreaChart,
        XAxis,
        YAxis,
        Tooltip, 
        ResponsiveContainer,
        CartesianGrid,
        PolarGrid,
        PolarAngleAxis,
        PolarRadiusAxis} from 'recharts';


const Chart = ({activeClassroom, statistics, ChartType}) => {

  // State of the chart based on active classroom
  const [ChartData, setChartData ] = useState(null);

  useEffect(() => {
    if (statistics){
      const NewData = [
        { name: 'students', value: statistics.students},
        { name: 'avgScore', value: statistics.avgScore},
        { name: 'Participation', value: statistics.engagement}
      ];
      setChartData(NewData);

      } else {
        setChartData(null);
      }

  },[activeClassroom, statistics])
  return (
    <div className='h-80 w-100 '>
        {/* AreaChart */}
        
        {
          ChartType === 'area' ? (
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart  
                  data={ChartData}
                  margin={{right:30}}
              >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name" />
                
                <YAxis />
                <Tooltip />
                
                <Area
                  type='monotone'
                  dataKey='value'
                  stroke='#4f46e5'
                  fill='#818cf8'
                  
                /> 
              
              </AreaChart>
            </ResponsiveContainer>
          ): (
              <></>
          )
            
        }

        {/* RadarChart */}
         
        {
          ChartType === 'radar' &&
            <ResponsiveContainer width='100%' height='100%'>
              <RadarChart 
                data={ChartData}
                margin={{top: 20, right:100, bottom: 20, left:20}}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey='name' />
                  <PolarRadiusAxis angle='30' domain={[0,150]} />
                  <Radar 
                    type='monotone'
                    dataKey="value"
                    stroke='#4f46e5'
                    fill='#814cf8'
                  
                  />
              </RadarChart>
            </ResponsiveContainer>
        }

    </div>
  )
}

export default Chart