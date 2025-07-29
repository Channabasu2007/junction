"use client"

import { motion } from "framer-motion"
import React from "react"

const Allfeatures = () => {
  const features = [
    {
      title: "Store Social Media Presence",
      description:
        "Add and manage all your social handles in one place with clickable links to every platform.",
    },
    {
      title: "Custom Domain Support",
      description:
        "Get your own personalized domain after signing up to share your profile professionally.",
    },
    {
      title: "One-Tap Mail Contact",
      description:
        "Visitors can connect with you easily using a one-click mail option built into your page.",
    },
    {
      title: "Live Dashboard Access",
      description:
        "Access a real-time dashboard to manage your page, with inbuilt click tracking and insights.",
    },
    {
      title: "Full Page Customization",
      description:
        "Change the look and feel of your page by selecting styles for each component individually.",
    },
    {
      title: "Visitor Feedback System",
      description:
        "Receive direct feedback from your visitors with built-in protection against bad language.",
    },
    {
      title: "Unlimited Links",
      description:
        "Add as many links as you want without any restrictions or limits.",
    },
    {
      title: "Pexels + Cloudinary (Premium)",
      description:
        "Search and use beautiful images from Pexels, with Cloudinary storage for premium users.",
    },
    {
      title: "Add Video to Your Page",
      description:
        "Option to upload and showcase one video to better express your message or story.",
    },
    {
      title: "Secure Payments with Razorpay",
      description:
        "All transactions are handled securely using Razorpay, ensuring fast and trusted payments.",
    },
  ]

  return (
    <section className="w-full px-4 md:px-16 py-16 bg-white dark:bg-zinc-950">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white">
          <span className="text-orange-500 italic font-semibold">
            Smart Features{" "}
          </span>
          <span>to Boost Your Web Presence</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center items-center ">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-zinc-900 border border-orange-100 dark:border-zinc-800 rounded-xl p-4 shadow hover:shadow-md transition duration-200 h-full flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <h3 className="text-md font-semibold text-orange-600 dark:text-orange-400 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Allfeatures
