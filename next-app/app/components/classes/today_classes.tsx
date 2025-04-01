import React from 'react'
import Lesson_schedule from './lesson_schedule'


interface Lesson_time {
    time_start: string,
    time_end: string,
    lesson_name: string,
};

const lessons: Lesson_time[] = [
  { time_start: "8:45 AM", time_end: "10:10 AM", lesson_name: "English Language Arts" },
  { time_start: "10:20 AM", time_end: "11:35 AM", lesson_name: "Mathematics" },
  { time_start: "11:45 AM", time_end: "1:00 PM", lesson_name: "Science" },
  { time_start: "1:30 PM", time_end: "2:45 PM", lesson_name: "History" },
  { time_start: "2:55 PM", time_end: "4:10 PM", lesson_name: "Physical Education" },
];

const today_classes = () => {
  return (
    <div className='ml-16 mt-24 text-4xl'>
      <p className='text-5xl'>Today's Schedule</p>
      <div>
      {lessons.map((test, index) => (
          <Lesson_schedule key={index} data={test} />
        ))}
      </div>
    </div>
  )
}

export default today_classes
