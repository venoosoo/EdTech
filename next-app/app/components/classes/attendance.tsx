import React from 'react'


  
  const getCircleColor = (value: number) => {
    switch (value) {
      case 4: return 'bg-black w-10 h-10';
      case 3: return 'bg-gray-800 w-8 h-8';
      case 2: return 'bg-gray-500 w-6 h-6';
      default: return 'bg-white w-5 h-5';
    }
  };


interface attendance_data {
  month: string,
  data: number[][],
};



const attendance = ({attendace_data, className}: {attendace_data: attendance_data, className?: string}) => {
  console.log(attendace_data.data)
  return (
    <div className={className}>   
      <div className="flex flex-row gap-2">
      <div className=''>
        <div className='mb-5 text-gray-600 text-2xl mt-5'>
          <p>{attendace_data.month}</p>
        </div>
      <div className='flex gap-5'>
      {attendace_data.data.map((week, weekIdx) => (
        <div key={weekIdx} className="flex flex-col gap-2">
          {week.map((val, dayIdx) => (
            <div
              key={dayIdx}
              className={`w-12 h-12 xl:w-16 xl:h-16 ${val < 0 ? 'bg-white' : 'bg-gray-200'} rounded flex items-center justify-center`}
            >
              <div className={`rounded-full ${getCircleColor(val)}`} />
            </div>
          ))}
        </div>
      ))}
      </div>
      </div>
    </div>
    </div>
  )
}

export default attendance
