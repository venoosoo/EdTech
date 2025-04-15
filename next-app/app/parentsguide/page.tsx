"use client"

import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import RecentEventCard from '../components/events/recent_event_card'
import { useSearchParams } from 'next/navigation';

interface CardData {
  id: number; 
  event_name: string;
  text: string;
  date: string;
}




const fakeData: CardData[] = [
  { id: 1, event_name: "Understanding Child Psychology", text: "Learn about child development and emotional intelligence.", date: "2025-06-10" },
  { id: 2, event_name: "Managing Screen Time", text: "Best practices for balancing digital exposure for kids.", date: "2025-07-05" },
  { id: 3, event_name: "Healthy Eating Habits", text: "Nutrition tips for growing children and picky eaters.", date: "2025-08-15" },
  { id: 4, event_name: "Effective Communication with Kids", text: "Strategies to improve conversations and trust.", date: "2025-09-20" },
  { id: 5, event_name: "Helping with Homework", text: "Techniques to support your child's learning at home.", date: "2025-10-12" },
  { id: 6, event_name: "Raising Emotionally Resilient Kids", text: "Teaching children how to handle emotions and setbacks.", date: "2025-11-03" },
  { id: 7, event_name: "Parental Self-Care", text: "How to take care of yourself while raising a child.", date: "2025-12-01" },
];


const page = () => {
  



  return (
    <div className='xl:mr-10'>
      <div className='mt-10 ml-5 xl:ml-16'>
        <Header />
      </div>
      <div className='flex justify-between ml-7 xl:ml-20 mt-16'>
        <p className='text-3xl ml-2 w-fit'>Parent's Guide</p>
        <div>
          <p className='text-gray-400 text-2xl mr-5'>
            Number of available guides <span className='text-black'>21</span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 place-items-center lg:grid-cols-2 xl:grid-cols-3 gap-4 mr-10 ml-5 xl:ml-20 mt-10">
        {fakeData.map((event, index) => (
          <RecentEventCard
            key={event.id}
            classname={`
              hover:rotate-1 transition-all duration-500 hover:bg-black hover:text-white
              max-w-lg min-h-96 w-full 
            `}
            data={event}
            isActive={false}
            onClick={() => null}
          />
        ))}
      </div>
    </div>
  )
}

export default page
