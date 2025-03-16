import React, { useState } from 'react'
import PortalLogoBar from '../../components/PortalLogoBar'
import Chart from '../../components/Educator/Chart'
import Classrooms from '../../components/Educator/Classrooms'
const EducatorPortal = () => {

  const [activeClassroom, setActiveClassroom] = useState('');


  return (

    <div className=' flex items-center justify-center bg-grey-secondary-lighter-1 w-screen h-screen  '>
      <PortalLogoBar/>
      {/* Main div for containers and  */}
      <div className=' flex flex-col items-center mt-20 lg:mx-15 justify-start h-8/10 w-9/10 shadow-2xl bg-white overflow-y-auto'>
        <p className=' mt-12 font-semibold text-xl items-center justify-center'>Classroom at a Glance</p>
        <div className='flex flex-col items-center justify-center mt-10'>
          <div className=' gap-45'>
            <p>Classrooms</p>
            <Classrooms 
            activeClassroom={activeClassroom}
            setActiveClassroom={setActiveClassroom}
             />
            </div>
            <p className='flex items-center justify-center mt-10'>Charts</p>
            <div className='flex flex-row gap-45 mb-20'>
              
            <Chart activeClassroom={activeClassroom}/>
            <Chart activeClassroom={activeClassroom} />
            </div> 
        </div>
            
          
      </div>
    </div>
  )
}

export default EducatorPortal