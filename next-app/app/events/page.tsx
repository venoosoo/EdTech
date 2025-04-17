"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/header";
import RecentEventCard from "../components/events/recent_event_card";
import Eventdecs from "../components/events/event_decs";
import { useSearchParams } from "next/navigation";


interface CardData {
  id: number;
  event_name: string;
  text: string;
  date: string;
}





const fakeData: CardData[] = [
  { id: 1, event_name: "Tech Conference 2025", text: "Join us for an exciting tech conference...", date: "2025-06-15" },
  { id: 3, event_name: "Photography Workshop", text: "Learn the fundamentals of photography...", date: "2025-04-20" },
  { id: 4, event_name: "Startup Pitc Night", text: "Watch entrepreneurs pitch their ideas...", date: "2025-05-10" },
  { id: 7, event_name: "Music Festival", text: "Enjoy live performances from top artists...", date: "2025-07-03" },
  { id: 5, event_name: "Book fair", text: "Join us on March 15 for our Book Fair! Explore captivating reads for the entire family, seize the opportunity to enrich", date: "2025-05-10" },
  { id: 6, event_name: "Music Festival", text: "Enjoy live performances from top artists...", date: "2025-07-03" },
];

const Page = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null); // Store selected event ID

  // Find the event with the selected ID
  const selectedEvent = selectedId !== null ? fakeData.find(event => event.id === selectedId) : null;
  const searchParams = useSearchParams()

  useEffect(() => {
    
    const id = Number(searchParams.get('id'))
    if (id != null) {
      setSelectedId(id)
    }
  }, [])

  

  return (
    <div className="">
      {/* Background */}
      <div className="xl:w-7/12 w-screen z-[-1] min-h-[135%] bg-[#F7F6F2] absolute right-0 top-0"></div>

      <div className="lg:pl-16 pt-5 lg:pr-10">
        <Header />
      </div>

      <div className="flex ">
        <div className=" h-full  xl:w-auto flex flex-col items-center w-full">
          <div className="lg:ml-20 mt-16">
            <p className="text-6xl">Recent Events</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-3  gap-0 ml-5 lg:ml-16 mt-10 max-w-2xl">
            {fakeData.map((event) => (
              <RecentEventCard
                classname="max-h-72 min-h-72 max-w-70 min-w-70"
                key={event.id}
                data={event}
                isActive={selectedId === event.id}
                onClick={() => setSelectedId(event.id)} // Set selected event ID
              />
            ))}
          </div>
        </div>

        {/* Display Selected Event Details */}
        <div className="hidden xl:block ml-16 flex-grow mt-16">
          {selectedEvent ? (
            <Eventdecs data2={{ date: selectedEvent.date, title: selectedEvent.event_name}} id={Number(selectedId)} />
          ) : (
            <p className="text-4xl text-black text-center mt-20">Click an event to see details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
