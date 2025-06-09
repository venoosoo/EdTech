"use client"
import React, { useEffect, useState } from "react"
import Test_day from './Test_day';

interface TestDay {
  dayNumber: number;
  testName?: string;
  day: string;
}

function convertToFullWeekSchedule(
  input: { Date: string; ClassName: string }[]
): TestDay[] {
  // Use input date or fallback to current week
  const baseDate = input.length > 0 ? new Date(input[0].Date) : new Date();

  const testMap = new Map<string, string>();
  input.forEach((item) => {
    const dateObj = new Date(item.Date);
    const key = dateObj.toDateString(); // e.g., "Mon Jun 09 2025"
    testMap.set(key, item.ClassName);
  });

  // Find Monday of the week
  const baseDay = baseDate.getDay(); // 0 = Sunday
  const monday = new Date(baseDate);
  monday.setDate(baseDate.getDate() - ((baseDay + 6) % 7)); // Backtrack to Monday

  const weekSchedule: TestDay[] = [];

  for (let i = 0; i < 5; i++) {
    const currentDate = new Date(monday);
    currentDate.setDate(monday.getDate() + i);

    const key = currentDate.toDateString();
    const dayname = currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
    }).toLowerCase();

    weekSchedule.push({
      dayNumber: currentDate.getDate(),
      testName: testMap.get(key), // undefined if not found
      day: dayname,
    });
  }

  return weekSchedule;
}

const Upcoming_tests = () => {
  const [testSchedule, setTestSchedule] = useState<TestDay[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchExams() {
    try {
      const class_id = localStorage.getItem("class_id");
      if (!class_id) return;

      const res = await fetch("http://localhost:8080/get_exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: class_id }),
      });

      if (!res.ok) throw new Error("Failed to fetch exams");

      const exams: { Date: string; ClassName: string }[] = await res.json();
      const schedule = convertToFullWeekSchedule(exams);
      setTestSchedule(schedule);
    } catch (error) {
      console.error("Fetch error:", error);
      // Still show the full week with no tests
      const schedule = convertToFullWeekSchedule([]);
      setTestSchedule(schedule);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div className='mt-20'>
      <div className='flex-col md:flex md:flex-row items-center justify-items-center text-center'>
        <p className='text-5xl font-bold'>Upcoming Tests</p>
        <div className='flex md:flex-row mt-7 md:mt-0 items-center '>
          <p className='md:ml-20 text-xl flex items-center mr-7'>
            <span className="inline-block w-4 h-4 bg-black rounded-full"></span> Test day
          </p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
        </div>
      </div>

      {loading ? (
        <p className="text-center mt-10 text-lg">Loading...</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-5 xl:grid-cols-3 max-w-screen-sm">
          {testSchedule.map((test, index) => (
            <Test_day key={index} data={test} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Upcoming_tests;

