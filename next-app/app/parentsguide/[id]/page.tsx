"use client"
import { useParams } from 'next/navigation';
import Header from "../../components/header";
import EventDecs from "../../components/events/event_decs.tsx"
import React from "react";

// TypeScript interfaces
interface TipItem {
  title: string;
  body: string;
  tip?: string;
}

interface GuideData {
  title: string;
  intro: string;
  tips: TipItem[];
  finalThought: string;
}

const guideData: GuideData = {
  title: "📱 Parent Guide: Managing Screen Time",
  intro: "Balancing screen time can feel tricky, especially in today’s digital world. Here’s a simple guide to help you set healthy habits without the battles.",
  tips: [
    {
      title: "1. Set Clear Limits",
      body: "Kids thrive on routine. Create daily or weekly screen time limits based on age and family priorities. Be consistent, but flexible when needed (like during sick days or long trips).",
      tip: "💡 Tip: Use timers or parental control apps to help reinforce limits.",
    },
    {
      title: "2. Create “Tech-Free” Zones",
      body: "Designate areas like the dinner table, bedrooms, or car rides as screen-free. These moments help foster connection and healthy sleep habits.",
    },
    {
      title: "3. Model Good Habits",
      body: "Kids learn more from what we do than what we say. Put your phone away during family time and show them that screens have a time and place.",
    },
    {
      title: "4. Prioritize Quality",
      body: "Not all screen time is created equal. Encourage content that’s educational, creative, or interactive—like drawing apps, coding games, or nature videos.",
    },
    {
      title: "5. Balance with Offline Time",
      body: "Make sure screens don’t replace sleep, outdoor play, reading, or in-person interactions. A balanced day includes all kinds of activities.",
    },
    {
      title: "6. Talk About Screen Use",
      body: "Have open conversations about why limits exist. Talk about online safety, kindness, and how to recognize when it’s time for a break.",
    },
  ],
  finalThought: "👪 Final Thought: You don’t have to aim for perfection—just progress. With some structure, honesty, and example-setting, screen time can become a healthy part of your family’s routine.",
};

const EventPage: React.FC = () => {
  const params = useParams();
  console.log(params);
  {/* get data from db with params.id */}

  return (
    <div>
      <div className="xl:px-16 pt-5 pb-5 lg:pr-20">
        <Header />
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-16 space-y-6 text-lg">
        <h1 className="text-2xl font-bold text-center">{guideData.title}</h1>
        <p>{guideData.intro}</p>

        <ul className="space-y-5">
          {guideData.tips.map((tip, idx) => (
            <li key={idx}>
              <h2 className="font-semibold text-xl">{tip.title}</h2>
              <p className="mt-1">{tip.body}</p>
              {tip.tip && <p className="italic text-sm mt-1">{tip.tip}</p>}
            </li>
          ))}
        </ul>

        <p className="mt-8 font-medium">{guideData.finalThought}</p>
      </div>
    </div>
  );
};

export default EventPage;

