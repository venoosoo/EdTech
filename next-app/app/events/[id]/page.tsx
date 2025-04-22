"use client"
import { useParams } from 'next/navigation'; // For App Router
import Header from "../../components/header";
import EventDecs from "../../components/events/event_decs.tsx"
import React from "react"



interface event {
  date: string,
  title: string,
};




interface comment {
  avatar: string,
  name: string,
  text: string,
  date: string,
  
}

const comments: comment[] = [
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "John Doe",
    text: "This is an interesting post! Thanks for sharing.",
    date: "2025-03-25",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Jane Smith",
    text: "I totally agree with your point. Well said!",
    date: "2025-03-24",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    name: "Michael Johnson",
    text: "Does anyone have more resources on this topic?",
    date: "2025-03-23",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Emily Brown",
    text: "Loved reading this! Keep up the great work.",
    date: "2025-03-22",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/89.jpg",
    name: "David Wilson",
    text: "Interesting perspective. I hadn't thought of it that way before.",
    date: "2025-03-21",
  }
];






const EventPage = () => {
  const params = useParams();  // Log the entire params object
  console.log(params);  // Check what the params contain


  return (
    <div>
      <div className='  xl:px-16 pt-5 pb-5 lg:pr-20'>
        <Header />
      </div>
      <div>
        <EventDecs data2={{ date: "15.02.2025", title: "Something" }} id={params.id} />
      </div>
    </div>
  );
};

export default EventPage;

