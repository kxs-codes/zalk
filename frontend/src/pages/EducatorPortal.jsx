import React from 'react'
import PortalLogoBar from '../components/PortalLogoBar'
import Session from '../components/Educator/Session'
import Glance from '../components/Educator/Glance'
import Chart from '../components/Educator/Chart'
import NavBar from '../components/NavBar'

const EducatorPortal = () => {
  return (

    <div className=' flex items-center justify-center bg-grey-secondary-lighter-1 w-screen h-screen'>
      <PortalLogoBar />
      <NavBar />
      {/* Main div for containers and  */}
      <div className=' flex flex-col items-center  justify-start h-9/10 w-9/10 shadow-2xl bg-white'>
        <p className=' mt-12 font-semibold text-xl items-center justify-center'>Classroom at a Glance</p>
          <div className='flex flex-row gap-4'>
            <Session />
            <Glance />
            <Chart />
          </div>
      </div>
    </div>
  )
}

export default EducatorPortal