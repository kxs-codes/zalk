import React from 'react'
import PortalLogoBar from '../components/PortalLogoBar'
import Session from '../components/Educator/Session'
import Glance from '../components/Educator/Glance'
import Chart from '../components/Educator/Chart'

const EducatorPortal = () => {
  return (

    <div className=' flex items-center justify-center bg-grey-secondary-lighter-1 w-screen h-screen  '>
      <PortalLogoBar/>
      {/* Main div for containers and  */}
      <div className=' flex flex-col items-center mt-20 lg:mx-15 justify-start h-8/10 w-9/10 shadow-2xl bg-white overflow-y-auto'>
        <p className=' mt-12 font-semibold text-xl items-center justify-center'>Classroom at a Glance</p>
        <div className='flex flex-col'>
          <div className=' gap-45'>
            <Session />
            <Glance />
            </div>
            <Chart />
        </div>
            
          
      </div>
    </div>
  )
}

export default EducatorPortal