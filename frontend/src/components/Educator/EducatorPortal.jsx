import React, { useState } from 'react';
import Classroom from './Classroom.jsx';
import Chart from './Chart';

const EducatorPortal = () => {
  const [activeClassroom, setActiveClassroom] = useState(null);

  const classrooms = [];

  return (
    <div>
      <Classroom
        classrooms={classrooms}
        activeClassroom={activeClassroom}
        setActiveClassroom={setActiveClassroom}
      />
      <Chart
        activeClassroom={activeClassroom}
        ChartType="area"
      />
    </div>
  );
};

export default EducatorPortal;
