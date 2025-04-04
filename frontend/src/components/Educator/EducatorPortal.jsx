import React, { useState } from 'react';
import Classrooms from './Classrooms';
import Chart from './Chart';

const EducatorPortal = () => {
  const [activeClassroom, setActiveClassroom] = useState(null);

  const classrooms = [];

  return (
    <div>
      <Classrooms
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
