"use client";

import React from "react";
import Image from "next/image"
import Reaction from "../reaction";
interface tweet_data {
  id: number,
  avatar_link: string;
  name_surname: string;
  job: string;
  title: string;
  text: string;
  time: string;
  comment_amount: number;
}

const Tweet = ({ data }: { data: tweet_data }) => {

  const handleAddToCalendar = () => {
    console.log('smth')
  };

  return (
    <div className="p-5">
      <div className="flex items-center">
        <div className="mr-4 w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 shadow-lg">
          <Image src={data.avatar_link} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <p>{data.name_surname}</p>
          <p className="text-gray-400">{data.job}</p>
        </div>
      </div>
      <div className="pl-4 rounded-xl ml-12 pt-3 mt-4 pb-5 bg-gray-100 max-w-lg">
        <p className="text-xl">{data.title}</p>
        {/* make 115 characters limit */}
        <p className="whitespace-normal">{data.text}</p>
      </div>
      <div className="items-center flex-col lg:flex-row flex ml-12 mt-3 ">
        <div className="flex space-x-2">
          <Reaction data={{ amount: 2, emoji: "👍" }} />
          <Reaction data={{ amount: 6, emoji: "👍" }} />
          <Reaction data={{ amount: 3, emoji: "⚡" }} />
        </div>
        <p className= "text-gray-400 text-center lg:ml-auto">{data.time}</p>
      </div>
      <div className="flex ml-12 mt-4 items-center">
        {/* make avatars overlap each other a little bit */}
        <div className="flex items-center">
          <Image
            src="https://api.dicebear.com/7.x/personas/svg?seed=User1"
            alt="User 1"
            className="w-10 h-10 rounded-full border-2 border-gray-200 z-10"
          />
          <Image
            src="https://api.dicebear.com/7.x/personas/svg?seed=User2"
            alt="User 2"
            className="w-10 h-10 rounded-full border-2 border-gray-200 -ml-3 z-20"
          />
          <Image
            src="https://api.dicebear.com/7.x/personas/svg?seed=User3"
            alt="User 3"
            className="w-10 h-10 rounded-full border-2 border-gray-200 -ml-3 z-30"
          />
        </div>
        <p className="ml-5 ">{data.comment_amount}</p>
        <button
          onClick={() => {
            handleAddToCalendar(); 
          }}
          className="max-h-9 ml-auto px-4 py-1 bg-gray-100 text-black rounded-full whitespace-nowrap shadow-sm border border-gray-200 hover:bg-gray-200"
        >
          + Add to calendar
        </button>
      </div>
    </div>
  );
};

export default Tweet;
