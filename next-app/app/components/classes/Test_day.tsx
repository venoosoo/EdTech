import React from 'react'

interface TestDay {
  dayNumber: number;
  testName: string | undefined;
  day: string;
}

const Test_day = ({ data }: { data: TestDay }) => {
  return (
      <>
      {data.testName ? (
        <div className='min-w-36 min-h-42 max-w-36 max-h-42 rounded-3xl bg-black text-gray-100'>
          <p className='ml-7 mt-7 font-bold text-4xl'>{data.dayNumber}</p>
          <p className='text-md text-xl ml-7 mt-2'>{data.testName}</p>
          <p className='text-gray-400 mt-8 mb-4 text-lg ml-7'>{data.day}</p>
        </div>
      ) : (
        <div className='min-w-36 min-h-42 max-w-36 max-h-42 rounded-3xl bg-gray-200'>
          <p className='ml-7 mt-7 font-bold text-4xl'>{data.dayNumber}</p>
          <p className='text-md text-xl ml-7 mt-2'>{data.testName}</p>
          <p className='text-gray-400 mt-16 mb-4 text-lg ml-7'>{data.day}</p>  
        </div>
      )}
      </>
  );  
}

export default Test_day;
