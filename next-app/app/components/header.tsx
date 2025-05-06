"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNotification } from "../context/NotificationContent";
import { isAuthenticated } from "./auth";

const Header = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // State for mobile menu
  const { notifications, disableNotification, getNewNotification, getNotification } = useNotification();

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/register"); // Redirects immediately if not logged in
    }
  }, []);


  return (
    <div className="flex text-2xl m-5 items-center">
      <h1 className="font-bold text-3xl">EdTech</h1>

      {/* Navigation Links for desktop */}
      <div className="xl:flex hidden ml-32 sections text-xl space-x-10">
        <Link className="hover:font-bold" href="/dashboard">Dashboard</Link>
        <Link className="hover:font-bold" href="/attendance">Attendance</Link>
        <p>Teachers</p>
        <Link className="hover:font-bold" href="/events">Events</Link>
        <Link href="/calendar" className="hover:font-bold">Calendar</Link>
        <Link className="hover:font-bold" href="/parentsguide">Parent's guide</Link>
      </div>

      {/* Notification and Profile Section */}
      <div className="flex space-x-4 ml-auto">
        <div className="relative flex items-center">
          {getNewNotification() && (
            <div className="absolute top-2 left-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
          <button
            onClick={() => {
              setShowNotification(!showNotification);
              disableNotification();
            }}
            className="p-2 transition"
          >
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
                  <p key={index} className="text-sm text-gray-700 border-b last:border-none pb-1 mb-1">
                    {msg}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-500">No notifications yet</p>
              )}
            </div>
          )}
          <div className="xl:hidden mt-1 ml-2">
            <button className="" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 hover:size-11">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Profile Image */}
        <div className="hidden sm:block w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 shadow-lg">
          <img
            src="/images/uifaces-popular-image.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name Section with centering */}
        <div className="flex items-center justify-center flex-1">
          <p className="hidden sm:block">Isabella Lewis</p>
        </div>

        {/* Dropdown Icon */}
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mt-2 size-6 hidden sm:block"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-60 h-full bg-white shadow-lg z-10 flex flex-col space-y-4 p-6">
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-3xl text-gray-700"
          >
            &times; {/* This is the close button "X" */}
          </button>
          
          <Link href="/dashboard" className="text-xl font-semibold">Dashboard</Link>
          <Link href="/attendance" className="text-xl font-semibold">Attendance</Link>
          <Link href="/events" className="text-xl font-semibold">Events</Link>
          <Link href="/parentsguide" className="text-xl font-semibold">Parent's guide</Link>
          <Link href="/calendar" className="text-xl font-semibold">Calendar</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
