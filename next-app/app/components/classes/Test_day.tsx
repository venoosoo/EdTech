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
        <div className='min-w-48 min-h-48 max-w-48 max-h-48 rounded-3xl bg-black text-gray-100'>
          <p className='ml-7 mt-7 font-bold text-4xl'>{data.dayNumber}</p>
          <p className='text-md text-xl ml-7 mt-2'>{data.testName}</p>
          <p className='text-gray-400 mt-12 text-lg ml-7'>{data.day}</p>
        </div>
      ) : (
        <div className='min-w-48 min-h-48 max-w-48 max-h-48 rounded-3xl bg-gray-200'>
          <p className='ml-7 mt-7 font-bold text-4xl'>{data.dayNumber}</p>
          <p className='text-md text-xl ml-7 mt-2'>{data.testName}</p>
          <p className='text-gray-400 mt-20 text-lg ml-7'>{data.day}</p>  
        </div>
      )}
      </>
  );  
}

export default Test_day;
