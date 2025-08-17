import React from 'react';
import { MessageSquare, Share2 } from "lucide-react";
import Image from 'next/image';

export default function HeroBannerImproved() {
  const bannerUrl = "http://res.cloudinary.com/dttkivero/image/upload/v1755159067/mkpv43bwbehyq5cfyt8p.jpg";
  const profileUrl = "http://res.cloudinary.com/dttkivero/image/upload/v1755159052/d3xiagcnitquiriz639q.jpg";

  return (
    <section className="w-full bg-white dark:bg-zinc-900 shadow-lg rflow-hidden animate-fade-in-up">
      {/* Banner Section */}
      <div className="relative flex items-center justify-center h-56 md:h-72 w-full">
        <Image
          src={bannerUrl}
          alt="User Profile Banner"
          fill
          className="object-cover object-center w-full h-full"
        />
      </div>

      {/* Profile Info Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start px-6 relative z-10">
        {/* Profile Picture Container */}
        <div className="w-32 h-32 md:w-50 md:h-50 rounded-full border-4 border-white dark:border-zinc-900 shadow-xl overflow-hidden -mt-16 md:-mt-20 transition-transform duration-300 hover:scale-105">
          <Image
            src={profileUrl}
            alt="User Profile Picture"
            width={160}
            height={160}
            className="object-cover object-center w-full h-full "
          />
        </div>

        {/* User Details and Actions */}
        <div className="flex flex-col md:flex-row flex-1 text-center md:text-left md:ml-6 mt-4 md:mt-0 pb-6 items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white leading-tight">
              Channabasu Mathad
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              MERN Stack Developer • Bangalore, India
            </p>
          </div>
          
          {/* Action Buttons with responsive layout */}
          <div className="mt-4 md:mt-3 flex mx-auto md:mx-1 justify-center md:justify-end gap-3 flex-1">
            <button className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-blue-600 text-white font-medium shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5">
              <MessageSquare className="w-4 h-4" /> 
              <span className="md:inline hidden">Send Message</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-300 transition-all duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:shadow-md transform hover:-translate-y-0.5">
              <Share2 className="w-4 h-4" /> 
              <span className="md:inline hidden">Share Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bio Section with improved positioning */}
      <div className="px-6 pb-6 md:pt-2 text-zinc-700 dark:text-zinc-300">
        <p className="text-left text-base leading-relaxed">
          Passionate full-stack developer with hands-on experience building
          scalable, modern web applications using MongoDB, Express, React, and
          Node.js. I love solving real-world problems with clean code and
          thoughtful design.
        </p>
      </div>
    </section>
  );
}
