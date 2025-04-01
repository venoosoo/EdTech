import React from 'react'

interface Lesson_time {
    time_start: string,
    time_end: string,
    lesson_name: string,
};


const lesson_schedule = ({ data }: { data: Lesson_time }) => {
  return (
    <div className='border-gray-300 border-b flex mt-10 '>
      <p className='text-gray-300 mb-7 mr-10 text-xl'>{data.time_start} - {data.time_end}</p> 
      <p className=' text-2xl ml-auto'>{data.lesson_name}</p>
    </div>
  )
}

export default lesson_schedule
