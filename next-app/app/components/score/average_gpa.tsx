import React from 'react'
import GPAChart from './gpachart'


const average_gpa = () => {
  return (
    <div className='ml-16 flex flex-col flex-grow '>
      <div className="flex mt-20 mr-10 items-center space-x-16 mb-3">
        <p className='text-center text-4xl'>Average GPA</p>
        <div className='flex flex-1 space-x-10 text-gray-400 text-lg'>
          <p className='flex ml-auto items-center'><span className="inline-block w-2 h-2 bg-gray-400 rounded-full"></span> Previous week</p> 
          <p className='flex items-center'><span className="inline-block w-2 h-2 bg-black rounded-full"></span> This week</p>  
        </div>
      </div>
      <GPAChart />
    </div>
  )
}

export default average_gpa
