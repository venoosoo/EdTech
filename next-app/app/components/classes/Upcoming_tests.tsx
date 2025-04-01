import React from 'react';
import Test_day from './Test_day';

interface TestDay {
  dayNumber: number;
  testName: string | undefined;
  day: string;
}

const testSchedule: TestDay[] = [
  { dayNumber: 22, testName: 'Math', day: 'Monday' },
  { dayNumber: 23, testName: "Physics", day: 'Tuesday' }, // No test
  { dayNumber: 24, testName: 'History', day: 'Wednesday' },
  { dayNumber: 25, testName: undefined, day: 'Thursday' }, // No test
  { dayNumber: 26, testName: undefined, day: 'Friday' },
];

const Upcoming_tests = () => {
  return (
    <div className='mt-20'>
      <div className='flex items-center'>
        <p className='text-5xl font-bold'>Upcoming Tests</p>
        <p className='ml-20 text-xl flex items-center mr-7'>
          <span className="inline-block w-2 h-2 bg-black rounded-full"></span> Test day
        </p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>

      </div>
      <div className="mt-10 grid grid-cols-3 gap-5 max-w-screen-sm">
        {testSchedule.map((test, index) => (
          <Test_day key={index} data={test} />
        ))}
      </div>
    </div>
  );
};

export default Upcoming_tests;
