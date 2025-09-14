"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function DashboardPreview() {
  return (
    <section className="w-full bg-white dark:bg-black py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Smart <span className="text-orange-500">Analytics</span> for Growth
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
            Track your clicks, monitor engagement, and understand your audience better.  
            JUNCTION’s analytics give you the insights you need to improve and grow your online presence.
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-6 rounded-xl text-lg shadow-md">
            View Analytics
          </Button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-2xl">
            <Image
              src="/Images/Dashboard.png" // replace with your analytics image path
              alt="JUNCTION Analytics"
              width={1200}
              height={800}
              className="rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
