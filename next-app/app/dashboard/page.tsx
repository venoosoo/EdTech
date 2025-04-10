import React from 'react';
import Header from '../components/header';
import Child_score from '../components/score/child_score';
import Average_gpa from '../components/score/average_gpa';
import Parents_contacts from '../components/parents/parents_contacts';
import Upcoming_tests from '../components/classes/Upcoming_tests';
import Today_classes from '../components/classes/today_classes';
import Recents_events from '../components/events/recents_events';

interface grade {
  grade_letter: string,
  grade_number: number,
  time: string
};


const data: grade = {
  grade_letter: "A+",
  grade_number: 94,
  time: "March 15",
};



const Dashboard = () => {
  return (
    <>
      <div className='bg-[#F7F6F2] px-5 xl:px-16 pt-5 pb-5 lg:pr-20'>
        <Header />


        <div className='flex flex-wrap justify-center gap-4'>
          <div className='flex justify-center w-full lg:w-[48%] 2xl:w-[32%]'>
            <Child_score data={data} />
          </div>
          <div className='w-full lg:w-[48%] 2xl:w-[32%]'>
            <Average_gpa />
          </div>
          <div className='w-full lg:w-full 2xl:w-[32%]'>
            <Parents_contacts />
          </div>
        </div>
      </div>

      <div className='flex flex-wrap justify-center gap-4 px-5 xl:px-16 lg:mr-10'>
        <div className='w-full lg:w-[48%] 2xl:w-[32%]'>
          <Upcoming_tests />
        </div>
        <div className='w-full lg:w-[48%] 2xl:w-[32%]'>
          <Today_classes />
        </div>
        <div className='w-full lg:w-full 2xl:w-[32%]'>
          <Recents_events />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
