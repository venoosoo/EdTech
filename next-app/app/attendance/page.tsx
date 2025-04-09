"use client"

import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import Attendance from '../components/classes/attendance'



const month2 = [
  // Each row = week
  [4, 0, 2, 3, 2,],
  [3, 1, 4, 2, 4],
  [2, 2, 2, -1, 0],
  [1,4]
];

const month3 = [
  // Each row = week
  [4, 4, 4, 4, 4,],
  [3, 4, 2, 4, 0],
  [2, 2, -1, -1, -1],
];


const dataYear = [
  [
    [1, 0, 3, 4, 0],
    [3, 0, -1, 3, 4],
    [0, 0, -1, 4, 3],
    [-1, 4, 3, 2, 2]
  ],
  [
    [-1, 1, 2, -1, -1],
    [3, 3, 1, 3, 0],
    [2, 4, 1, 2, 0],
    [4, 0, 1, -1, 0]
  ],
  [
    [1, 2, 3, -1, 3],
    [3, 0, 4, -1, -1],
    [4, 0, -1, 1, 1],
    [4, 2, 2, 0, 2]
  ],
  [
    [2, 1, 4, 1, 2],
    [1, 4, 4, -1, -1],
    [1, -1, 4, 2, 4],
    [-1, 0, 2, -1, 1]
  ],
  [
    [-1, 3, -1, 4, 0],
    [1, 0, 2, 2, -1],
    [2, 1, 2, 1, -1],
    [-1, 2, 1, 4, 4]
  ],
  [
    [1, 4, 3, 1, 3],
    [3, -1, 3, -1, 1],
    [3, 2, -1, 3, 3],
    [0, 2, 4, 1, 2]
  ],
  [
    [-1, 2, 2, 4, 4],
    [0, 4, 2, 4, -1],
    [0, -1, 2, 0, 1],
    [0, 0, -1, 4, 0]
  ],
  [
    [-1, 3, 1, 0, 2],
    [0, 3, 3, -1, 2],
    [2, 3, 0, 0, 1],
    [1, 1, 1, 0, 4]
  ],
  [
    [1, 0, 1, 4, -1],
    [-1, 2, 1, 4, -1],
    [4, 1, 1, 3, 1],
    [2, 4, 0, 4, 0]
  ],
  [
    [4, -1, 2, -1, 2],
    [-1, 0, 4, 2, 1],
    [4, -1, -1, 4, -1],
    [-1, -1, 0, 3, 2]
  ],
  [
    [4, 2, 2, 0, -1],
    [1, 3, -1, 2, 1],
    [1, -1, 3, 2, 1],
    [1, -1, 1, 0, 3]
  ],
  [
    [1, 3, 2, 1, -1],
    [4, -1, 2, 2, 2],
    [-1, 4, 1, 4, 3],
    [1, 3, 1, -1, -1]
  ]
];



const page = () => {
  const currentYear = new Date().getFullYear();
  const [yearData, setYearData] = useState<number[][][]>(dataYear);
  const [selectedYear, setselectedYear] = useState<string>("2025");

  useEffect(() => {
    const storedData = localStorage.getItem(`attendanceData${currentYear}`);

    if (storedData) {
      setYearData(JSON.parse(storedData));
    } else {
      setYearData(dataYear);
      localStorage.setItem(`attendanceData${currentYear}`, JSON.stringify(dataYear));
    }
  }, []);

  const HandeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = event.target.value;
    setselectedYear(selectedYear)
    
    const storedData = localStorage.getItem(`attendanceData${event.target.value}`);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setYearData(parsedData);
    } else {
      if (selectedYear === "2025") {
        setYearData(dataYear);
        localStorage.setItem("attendanceData", JSON.stringify(dataYear));
      } else if (selectedYear === "2024") {
        const data_year: number[][][] = [];
        for (let index = 0; index < 12; index++) {
          const month = [];
          for (let index2 = 0; index2 < 4; index2++) {
            const week = [];
            for (let index3 = 0; index3 < 5; index3++) {
              week.push(Math.floor(Math.random() * 6) - 1);
            }
            month.push(week);
          }
          data_year.push(month);
        }
        setYearData(data_year);
        localStorage.setItem(`attendanceData${selectedYear}`, JSON.stringify(data_year));
      } else if (selectedYear === "2023") {
        const data_year: number[][][] = [];
        for (let index = 0; index < 12; index++) {
          const month = [];
          for (let index2 = 0; index2 < 4; index2++) {
            const week = [];
            for (let index3 = 0; index3 < 5; index3++) {
              week.push(Math.floor(Math.random() * 6) - 1);
            }
            month.push(week);
          }
          data_year.push(month);
        }
        setYearData(data_year);
        localStorage.setItem(`attendanceData${selectedYear}`, JSON.stringify(data_year));
      }
    }
  };

  return (
    <div>
      <div className='ml-16 mt-10 mr-10'><Header /></div>
      <div className='ml-20 mt-20 '>
        <div className='flex'>
          <p className='text-3xl'>Child's Attendance and Success</p>
          <div className='flex items-center text-xl gap-2 ml-auto mr-16'>
            <div className='rounded-full bg-black w-12 h-12'></div>
            <p>Full day</p>
            <div className='rounded-full bg-gray-800 w-10 h-10'></div>
            <p>Half day</p>
            <div className='rounded-full bg-gray-500 w-7 h-7'></div>
            <p>One lesson</p>
            <div className='rounded-full bg-gray-100 w-5 h-5'></div>
            <p>Sick leave</p>
            <select 
              onChange={HandeChange}
              className="px-4 py-1 bg-neutral-100 text-sm rounded-full hover:bg-neutral-200 hover:outline-none">
              <option>{currentYear}</option>
              <option>{currentYear - 1}</option>
              <option>{currentYear - 2}</option>
              <option>{currentYear - 3}</option>
            </select>
          </div>
        </div>
        <p className='text-4xl mt-10 text-black'>{selectedYear}</p>
        <div className='flex'>
        <div>
            <div className='text-gray-400 space-y-11 flex flex-col text-center text-xl mr-5 mt-20'>
              <p className='mt-2'>Mon</p>
              <p>Tue</p>
              <p>Wed</p>
              <p>Thu</p>
              <p className='mb-4'>Fri</p>
            </div>
            <div className='text-gray-400 space-y-11 flex flex-col text-center text-xl mr-5 mt-32'>
              <p className=''>Mon</p>
              <p>Tue</p>
              <p>Wed</p>
              <p>Thu</p>
              <p className='mb-4'>Fri</p>
            </div>
            <div className='text-gray-400 space-y-11 flex flex-col text-center text-xl mr-5 mt-32'>
              <p className=''>Mon</p>
              <p>Tue</p>
              <p>Wed</p>
              <p>Thu</p>
              <p className='mb-4'>Fri</p>
            </div>
          </div>
          <div className='grid grid-cols-4 gap-5 space-x-10'>
            <Attendance className='ml-10' attendace_data={{month: "January", data: yearData[0]}} />
            <Attendance attendace_data={{month: "February", data: yearData[1]}} />
            <Attendance attendace_data={{month: "March", data: yearData[2]}} />
            <Attendance attendace_data={{month: "April", data: yearData[3]}} />
            <Attendance attendace_data={{month: "May", data: yearData[4]}} />
            <Attendance attendace_data={{month: "June", data: yearData[5]}} />
            <Attendance attendace_data={{month: "July", data: yearData[6]}} />
            <Attendance attendace_data={{month: "August", data: yearData[7]}} />
            <Attendance attendace_data={{month: "September", data: yearData[8]}} />
            <Attendance attendace_data={{month: "October", data: yearData[9]}} />
            <Attendance attendace_data={{month: "November", data: yearData[10]}} />
            <Attendance attendace_data={{month: "December", data: yearData[11]}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page;
