import React, { useState } from 'react';
import '../../styles/Educator/pages/Portal.css'; 
import PortalLogoBar from '../../components/PortalLogoBar';
import Chart from '../../components/Educator/Chart';
import Classrooms from '../../components/Educator/Classrooms';

const EducatorPortal = () => {
  const [activeClassroom, setActiveClassroom] = useState('');

  const classrooms = ["Classroom A", "Classroom B", "Classroom C"];

  const classroomStat = {
    "Classroom A": { students: 25, avgScore: 85, engagement: 100 },
    "Classroom B": { students: 30, avgScore: 75, engagement: 80 },
    "Classroom C": { students: 35, avgScore: 65, engagement: 70 }
  };

  return (
    <div className="container">
      <PortalLogoBar />
      
      <div className="main">
        <p className="title">Classroom at a Glance</p>

        <div className="content">
          <div className="gap45">
            <Classrooms
              classrooms={classrooms}
              activeClassroom={activeClassroom}
              setActiveClassroom={setActiveClassroom}
            />
          </div>

          <p style={{ marginTop: '2.5rem' }}>Charts</p>
          <div className="charts">
            <Chart
              activeClassroom={activeClassroom}
              statistics={classroomStat[activeClassroom]}
              ChartType="area"
            />
            <Chart
              activeClassroom={activeClassroom}
              statistics={classroomStat[activeClassroom]}
              ChartType="radar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorPortal;
