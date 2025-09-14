"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Layout, Share2, Settings } from "lucide-react";
import Navbar from "@/components/Navbar/mainNavContainer"
import Footer from "@/components/Footer/Footer";

export default function GuidePage() {
  const steps = [
    {
      icon: <Layout className="w-8 h-8 text-orange-500" />,
      title: "Create Your Page",
      description:
        "Sign up and instantly get your personalized JUNCTION page with a unique link.",
    },
    {
      icon: <Settings className="w-8 h-8 text-orange-500" />,
      title: "Customize Freely",
      description:
        "Add links, change colors, upload images, and design your page exactly how you want.",
    },
    {
      icon: <Share2 className="w-8 h-8 text-orange-500" />,
      title: "Share Anywhere",
      description:
        "Use your JUNCTION link across social media, resumes, business cards, or portfolios.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-orange-500" />,
      title: "Grow Online",
      description:
        "Track visits, engage with your audience, and improve your digital presence.",
    },
  ];

  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 px-6 md:px-20 py-16">
      
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Getting Started with JUNCTION
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Follow these simple steps to create your perfect online presence.  
          It only takes a few minutes!
        </motion.p>
      </div>

      {/* Steps */}
      <div className="grid gap-10 md:grid-cols-2 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              {step.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <a
          href="/signup"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-2xl shadow-md transition"
        >
          Start Your Journey 🚀
        </a>
      </motion.div>
    </main>
    <Footer/>
    </>
  );
}
