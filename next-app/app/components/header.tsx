"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useNotification } from "../context/NotificationContent";
const Header = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const { notifications } = useNotification();

  return (
    <div className="flex text-2xl m-5 items-center">
      <h1 className="font-bold text-3xl">EdTech</h1>
      <div className="ml-32 sections text-xl flex space-x-10">
        <Link href="/dashboard">Dashboard</Link>
        <p>Activity</p>
        <p>Teachers</p>
        <Link href="/recent">Events</Link>
        <p>Payments</p>
        <p>Parent's guide</p>
      </div>
      <div className="flex space-x-4 items-center profile ml-auto">
        <div className="relative">
          <button onClick={() => setShowNotification(!showNotification)} className="p-2 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </button>
          {showNotification && (
            <div className="absolute top-12 right-0 w-48 p-3 bg-white shadow-lg rounded-md border">
              {notifications.length > 0 ? (
                notifications.map((msg, index) => (
                  <p key={index} className="text-sm text-gray-700 border-b last:border-none pb-1 mb-1">{msg}</p>
                ))
              ) : (
                <p className="text-sm text-gray-500">No notifications yet</p>
              )}
            </div>
          )}
        </div>
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 shadow-lg">
          <img src="/images/uifaces-popular-image.jpg" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <p>Isabella Lewis</p>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mt-2 size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
