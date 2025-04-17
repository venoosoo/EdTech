"use client"

import React, { useEffect } from 'react'
import Header from '../components/header'
import { useNotification } from '../context/NotificationContent';
import RecentEventCard from '../components/events/recent_event_card';
import router, { useRouter } from 'next/navigation';

interface CardData {
    id: number; // Add an ID field
    event_name: string;
    text: string;
    date: string;
  }
  

const fakeData: CardData[] = [
    { id: 5, event_name: "Book fair", text: "Join us on March 15 for our Book Fair! Explore captivating reads for the entire family, seize the opportunity to enrich", date: "2025-05-10" },
    { id: 6, event_name: "Music Festival", text: "Enjoy live performances from top artists...", date: "2025-07-03" },
  ];


const page = () => {

    const {  getNotification } = useNotification();
    const router = useRouter();
    
    useEffect(() => {
        const events = getNotification()
        {/* ask db to get data from post id */}

        
      }, []);

      const hande_show_all = (id:number): void => {
        router.push(`/events?id=${id}`);
      };

  return (
    <div>
      <div className='xl:ml-16 mt-10 xl:mr-10'><Header /></div>
      <div className='text-center mt-20 items-center flex flex-col'>
        <p className='text-5xl'>Your saved events</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 grid-rows-3  gap-0 ml-5 lg:ml-16 mt-10 max-w-2xl '>
        {fakeData.map((event) => (
              <RecentEventCard
                classname="max-h-72 min-h-72 max-w-70 min-w-70"
                key={event.id}
                data={event}
                isActive={false}
                onClick={() => hande_show_all(event.id)} 
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default page
