import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'



const Classrooms = ({classrooms, activeClassroom, setActiveClassroom}) => {
  // Create a state for the search input
  const [search, setSearch] = useState('')

  // Static classroom array for testing
 

  // Filter the classrooms based on the search input
  const filteredClassrooms = classrooms.filter(classroom =>
    classroom.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='  bg-dark-red-primary-1 h-80 w-200 rounded-2xl overflow-y-auto'>
      <div className='sticky top-0 bg-grey-secondary-darker-1 z-10 p-3'>
      <div className='flex justify-end items-end relative'>
      <input
        className=' flex bg-grey-secondary-lighter-1  rounded-full mt-5 mr-5 pl-10 h-10 font-extralight'
        type='text'
        placeholder='Search Classes'
        value={search}
        onChange={e => setSearch(e.target.value)}
        
      />
      </div>
      {/* TODO? -> Look for a better way to contain the icon with the search bar */}
      <MagnifyingGlassIcon className="h-5 w-5 text-grey-secondary-darker-1 absolute right-4 top-10 mr-65 mt-0.5 " />
      </div>

      {/* Display the filtered classrooms */}
      <div className='mt-10 '>
        {
          filteredClassrooms.map((cls) => (
            <div
              key={cls}
              className={`p-3  cursor-pointer
                ${activeClassroom === cls
                    ? 'bg-grey-secondary-darker-1 text-amber-400 font-bold  hover:text-white'  // Active Classroom
                    : 'bg-grey-secondary-lighter-1 hover:text-dark-red-primary-1 text-black font-normal'     // Inactice Classroom
                  }`}
                  onClick={() => setActiveClassroom(cls)} // Update active classroom
            >
              {cls}
      </div>
       ))
        }
      </div>

    </div>
  )
}

export default Classrooms