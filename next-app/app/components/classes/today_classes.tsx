"use client"
import React, { useEffect  } from "react"

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

const Today_classes = () => {

  
  async function fetchLessons() {
    try {
      const class_id = localStorage.getItem("class_id");
      if (!class_id) return;

      const res = await fetch("/api/get_lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: class_id }),
      });
      console.log(res)
      if (!res.ok) throw new Error("Failed to fetch lessons");
      const lessons = await res.json();
      console.log(lessons)

    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <div className=' mt-24 text-4xl mr-5'>
      <p className='text-5xl lg:text-center'>Today&apos;s Schedule</p>
      <div className=''>
      {lessons.map((test, index) => (
          <Lesson_schedule key={index} data={test} />
        ))}
      </div>
    </div>
  )
}

export default Today_classes
