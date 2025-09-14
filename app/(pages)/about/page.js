"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar/mainNavContainer";
import Footer from "@/components/Footer/Footer";

export default function AboutPage() {
  return (
    <>
     <Navbar/>
    <main className="min-h-screen bg-white dark:bg-black gap-1.5 text-gray-900 dark:text-gray-100 px-6 md:px-20 py-16">
     
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <motion.h1
          className="text-4xl  md:text-5xl font-extrabold text-orange-600 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About Us
        </motion.h1>

        {/* Intro */}
        <motion.p
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          At <span className="font-semibold text-orange-500">JUNCTION</span>, we believe 
          your online presence should be <strong>simple, beautiful, and truly yours</strong>.
        </motion.p>
      </div>

      {/* Sections */}
      <div className="grid gap-12 md:gap-16 max-w-5xl mx-auto">
        {/* Vision */}
        <motion.div
          className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Our Vision</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We want to make it easy for everyone—from students to entrepreneurs—
            to <strong>stand out online</strong>. Whether you’re sharing your portfolio,
            social media, or business links, JUNCTION helps you build a digital identity
            that feels professional yet personal.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-orange-500 mb-4">What Makes Us Different</h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>🎨 <strong>Customizable Pages</strong> – Design a page that reflects <em>you</em>.</li>
            <li>🌗 <strong>Light & Dark Mode</strong> – Clean UI with <span className="text-orange-500">orange highlights</span>.</li>
            <li>⚡ <strong>Fast & Simple</strong> – No clutter. Just you, your content, and your audience.</li>
            <li>📈 <strong>Built to Grow</strong> – Tools to expand your reach and build connections.</li>
          </ul>
        </motion.div>

        {/* Why Junction */}
        <motion.div
          className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Why JUNCTION?</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Your online presence is more than just a profile link—it’s your 
            <strong> digital identity</strong>. JUNCTION helps you create a page that 
            not only shares your links but also <strong>leaves a lasting impression</strong>.
          </p>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <a
          href="/signup"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-2xl shadow-md transition"
        >
          Start Building with JUNCTION ✨
        </a>
      </motion.div>
    </main>
    <Footer/>
    </>
  );
}
