"use client";

import React from "react";
import { motion } from "framer-motion";
// assuming Grid and GridPattern are in the same folder

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
  ];

  return (
    <section className="w-full py-24 bg-background">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">What Makes Our Platform Stand Out?</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
          Our modern web tools are built to make your online presence more powerful, efficient, and beautiful — all with a simple interface and fast performance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {features.map((feature, id) => (
            <div key={id} className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>))}





     
      </div>
    </div>
</section >

  );
};

export default Allfeatures;
