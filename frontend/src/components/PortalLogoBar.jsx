import React from 'react'

// TODO: Implement dynamic Title, username, and logo image to show on the right side of the bar depending on the user logged in
const PortalLogoBar = () => {
  return (
    <div className="w-screen flex sm:ml-43.5 lg:ml-44.5 items-center shadow-2xl fixed top-0 left-0 bg-[#FAFAFA]">
        <p className="w-3/4 py-3 pl-5  rounded-r-full text-left font-medium text-black lg:text-4xl md:text-2xl">ZALK: Advanced Learning and Knowledge</p>

        {/* This is where we will add the logic for the user based on title and username */}
        <div className='flex flex-col md:flex-row mr-48 items-center justify-end w-1/4 p-2'>
            <p className='mr-2 md:mr-10'>Title</p>
            <p className='mr-2 md:mr-20'>Username</p>
            <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
    </div>
  )
}

export default PortalLogoBar