import React, { useState } from 'react'
import PortalLogoBar from '../../components/PortalLogoBar'
import Chart from '../../components/Educator/Chart'
import Classrooms from '../../components/Educator/Classrooms'
const EducatorPortal = () => {

  const [activeClassroom, setActiveClassroom] = useState('');

  // static data for class filter and display

   const classrooms = [
    "Classroom A", "Classroom B", "Classroom C" ]


    const classroomStat = {
      "Classroom A": { students: 25, avgScore: 85, engagement: 100},
      "Classroom B": { students: 30, avgScore: 75, engagement: 80},
      "Classroom C": { students: 35, avgScore: 65, engagement: 70}
    }

  return (

    <div className=' flex items-center justify-center bg-grey-secondary-lighter-1 w-screen h-screen  '>
      <PortalLogoBar/>
      {/* Main div for containers  */}
      <div className=' flex flex-col items-center mt-20 lg:mx-15 justify-start h-8/10 w-9/10 shadow-2xl bg-white overflow-y-auto'>
        <p className=' mt-12 font-semibold text-xl items-center justify-center'>Classroom at a Glance</p>
        <div className='flex flex-col items-center justify-center mt-10'>
          <div className=' gap-45'>
            <p>Classrooms</p>
            <Classrooms
            classrooms={classrooms} 
            activeClassroom={activeClassroom}
            setActiveClassroom={setActiveClassroom}
             />
            </div>
            <p className='flex items-center justify-center mt-10'>Charts</p>
            <div className='flex flex-row gap-45 mb-20 '>
              
            <Chart activeClassroom={activeClassroom} statistics={classroomStat[activeClassroom]} ChartType='area'/>
            <Chart activeClassroom={activeClassroom} statistics={classroomStat[activeClassroom]} ChartType='radar' />
            </div> 
        </div>
            
          
      </div>
    </div>
  )
}

export default EducatorPortal