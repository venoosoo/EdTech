"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon 22", previous: 3.8, current: 4.2 },
  { day: "Tue 23", previous: 4.8, current: 4.0 },
  { day: "Wed 24", previous: 3.5, current: 4.1 },
  { day: "Thu 25", previous: 3.9, current: 4.7 },
  { day: "Fri 26", previous: 3.7, current: 4.3 },
];


export default function GPAChart() {
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
        <YAxis hide domain={[0,5]}/>
        <Bar radius={5} dataKey="previous" fill="url(#diagonalStripes)" />
        <Bar radius={5} dataKey="current" fill="black" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}
