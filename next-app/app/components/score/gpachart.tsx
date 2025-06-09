"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {useEffect, useState } from "react"


function getThisWeekDaysFormatted() {
  const now = new Date()
  const day = now.getDay() || 7 // Make Sunday=7 instead of 0
  const monday = new Date(now)
  monday.setDate(now.getDate() - day + 1) // Get Monday of this week
  monday.setHours(0,0,0,0)

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri"]

  return dayNames.map((name, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return `${name} ${d.getDate()}`
  })
}

function getLastNWorkingDays(n) {
  const days = []
  let date = new Date()
  date.setHours(0, 0, 0, 0) // normalize time

  while (days.length < n) {
    const dayOfWeek = date.getDay() // 0=Sun, 6=Sat
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Mon-Fri only
      days.unshift(new Date(date)) // add to start
    }
    date.setDate(date.getDate() - 1)
  }

  return days
}

// Main function
function gradesLastTwoWeeksWorkingDays(grades) {
  const last10WorkingDays = getLastNWorkingDays(10)

  // Map date string -> { sum, count }
  const gradesMap = {}

  grades.forEach(({ Grade, TimePlaced }) => {
    const date = new Date(TimePlaced)
    date.setHours(0, 0, 0, 0) // normalize

    const dateStr = date.toISOString().slice(0, 10)

    if (last10WorkingDays.some(d => d.toISOString().slice(0, 10) === dateStr)) {
      if (!gradesMap[dateStr]) gradesMap[dateStr] = { sum: 0, count: 0 }
      gradesMap[dateStr].sum += Grade
      gradesMap[dateStr].count++
    }
  })

  return last10WorkingDays.map(d => {
    const dateStr = d.toISOString().slice(0, 10)
    if (!gradesMap[dateStr]) return 0
    return Math.round(gradesMap[dateStr].sum / gradesMap[dateStr].count)
  })
}




export default function GPAChart() {
  
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) {
      console.error("No id found in localStorage");
      return;
    }

    async function fetchGrade(userId: string) {
      try {
        const res = await fetch("http://localhost:8080/get_graph_grades", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: userId }),
        });
        if (!res.ok) throw new Error("Failed to fetch grade");
        const gradeNumber: number = await res.json();
        const sortedData = gradesLastTwoWeeksWorkingDays(gradeNumber)
        const week = getThisWeekDaysFormatted()
        const data = [
          { day: week[0], previous:sortedData[0]  , current:sortedData[5] },
          { day: week[1], previous:sortedData[1]  , current:sortedData[6] },
          { day: week[2], previous:sortedData[2]  , current:sortedData[7] },
          { day: week[3], previous:sortedData[3]  , current:sortedData[8] },
          { day: week[4], previous:sortedData[4]  , current:sortedData[9] },

        ]
        setData(data)
      } catch (error) {
        console.error(error);
      }
    }

    fetchGrade(id);
  }, []);


  const [data, setData] = useState([])

  return (
    <div className="flex">
    <div className="mt-3 space-y-9 text-gray-400">
      <p>A</p>
      <p>B</p>
      <p>C</p>
      <p>D</p>
      <p>E</p>
      <p>F</p>
    </div>
    <ResponsiveContainer className='mt-auto' width="100%" height={380}>
      
      <BarChart data={data} barSize={40}>
        <defs>
          <pattern id="diagonalStripes" patternUnits="userSpaceOnUse" width="10" height="8" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="darkgray" strokeWidth="6" />
          </pattern>
        </defs>

        <XAxis dataKey="day" />
        <Tooltip />
        <YAxis hide domain={[0,100]}/>
        <Bar radius={5} dataKey="previous" fill="url(#diagonalStripes)" />
        <Bar radius={5} dataKey="current" fill="black" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}
