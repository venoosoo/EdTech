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
      <div className='bg-[#F7F6F2] pl-16 pt-5 pb-5 pr-10'>
        <div className=''>
          <Header />
          <div className='flex justify-between items-center'>
            <Child_score data={data} />
            <Average_gpa />
            <Parents_contacts />
          </div>
        </div>
      </div>
      <div className='flex justify-between ml-16 mr-10'>
        <Upcoming_tests />
        <Today_classes />
        <Recents_events />
      </div>
    </>
  );
};

export default Dashboard;
