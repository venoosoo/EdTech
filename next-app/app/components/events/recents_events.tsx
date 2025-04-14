"use client"

import React from 'react'
import Tweet from '../parents/tweet'
import { useRouter } from 'next/navigation'


interface tweet_data {
  avatar_link: string,
  name_surname: string
  job: string,
  title: string,
  text: string,
  time: string,
  comment_amount: number,


};

const tweetData: tweet_data = {
  avatar_link: "https://randomuser.me/api/portraits/men/6.jpg",
  name_surname: "Connor Elington",
  job: "Teacher Coordinator",
  title: "Book Fair",
  text: "Join us on March 15 for our Book Fair! Explore captivating reads for the entire family, seize the opportunity to enrich...",
  time: "January 27, 1:43 PM",
  comment_amount: 29,
};



const recents_events = () => {
  const router = useRouter();
  {/* simulate backend post id */}
  const id = 5

  const hande_show_all = (): void => {
    router.push(`/recent?id=${id}`);
  };


  return (
    <div className=' mt-24 mr-5 lg:mr-0'>
      <div className='flex items-center mb-16'>
        <p className=' text-4xl '>Recents Events</p>
        <button onClick={hande_show_all} className="max-h-9 ml-auto mt-2 px-4 py-1 bg-gray-100 text-black rounded-full whitespace-nowrap shadow-sm border border-gray-200 hover:bg-gray-200">
            Show all
        </button>
      </div>
      <div className='border border-gray-400 rounded-2xl '>
        <Tweet data={tweetData} />
      </div>
    </div>
  )
}

export default recents_events
