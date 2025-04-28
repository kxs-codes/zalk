import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import useClassroomLogic from './ClassroomLogic';

const Classroom = ({ classrooms, activeClassroom, setActiveClassroom }) => {
  const { search, setSearch, filteredClassrooms, handleSelect } = useClassroomLogic(
    classrooms,
    activeClassroom,
    setActiveClassroom
  );

  return (
    <div className='bg-dark-red-primary-1 h-80 w-200 rounded-2xl overflow-y-auto'>
      <div className='sticky top-0 bg-grey-secondary-darker-1 z-10 p-3'>
        <div className='flex justify-end items-end relative'>
          <input
            className='flex bg-grey-secondary-lighter-1 rounded-full mt-5 mr-5 pl-10 h-10 font-extralight'
            type='text'
            placeholder='Search Classes'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <MagnifyingGlassIcon className="h-5 w-5 text-grey-secondary-darker-1 absolute right-4 top-10 mr-65 mt-0.5" />
      </div>

      {/* Render list */}
      <div className='mt-10'>
        {filteredClassrooms.map(classroom => (
          <div
            key={classroom.classroomId}
            className={`p-3 cursor-pointer ${
              activeClassroom?.classroomId === classroom.classroomId
                ? 'bg-grey-secondary-darker-1 text-amber-400 font-bold hover:text-white'
                : 'bg-grey-secondary-lighter-1 hover:text-dark-red-primary-1 text-black font-normal'
            }`}
            onClick={() => handleSelect(classroom)}
          >
            {classroom.subject} {classroom.subjectLevel && `- Level ${classroom.subjectLevel}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classroom;
