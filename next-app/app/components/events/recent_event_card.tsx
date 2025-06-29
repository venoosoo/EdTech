"use client";

import React from 'react'

interface card_data {
    event_name: string,
    text: string,
    date: string,
    classname?: string,
};


const RecentEventCard = ({ classname,data, isActive, onClick }: { classname: string, data: card_data; isActive: boolean; onClick: () => void }) => {
  return (
    <div
      className={`p-5 m-3 rounded-xl transition-all duration-500 flex flex-col cursor-pointer ${
        isActive ? "bg-black text-white" : "bg-gray-100"
      } ${classname} `}
      onClick={onClick}
    >
      <p className="text-3xl pb-5">{data.event_name}</p>
      <p className="text-gray-500">{data.text}</p>
      <div className="flex items-center mt-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-6 transition-transform duration-300 ease-in-out ${isActive ? "rotate-45" : "rotate-0"}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
        <p className="flex-1 text-right">
          Date: <span className="font-bold">{data.date}</span>
        </p>
      </div>
    </div>
  );
};


export default RecentEventCard;
