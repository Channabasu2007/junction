"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import Navbar from "@/Components/Navbar/mainNavContainer";
import Footer from "@/Components/Footer/Footer";

import { CheckCircle } from "lucide-react";
export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  await fetch(
    "https://docs.google.com/forms/d/e/1FAIpQLSfRu-jENJm6HwWrAkNAfJ5eqPpZRgu6gxOCg8bGcXoj1yymTg/formResponse",
    {
      method: "POST",
      body: formData,
      mode: "no-cors", // Google ignores CORS
    }
  );
setSent(true)
 
};
if(sent){
  return(
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-6 md:px-20 py-16">
        <Card className="w-full max-w-lg shadow-lg border border-gray-200 dark:border-gray-800 rounded-2xl text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-orange-500" />
            </div>
            <CardTitle className="text-3xl font-bold text-orange-500">
              Message Sent!
            </CardTitle>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Thank you for contacting us. Our team will get back to you soon.
            </p>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => {setSent(false)}}
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl px-6"
            >
              Back to Contact Page
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  )
}
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 px-6 md:px-20 py-16 flex items-center justify-center">
        <Card className="w-full max-w-2xl shadow-lg border border-gray-200 dark:border-gray-800 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-orange-600">
              Contact Us
            </CardTitle>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
              Have a question or suggestion? Fill out the form below and we’ll get back to you.
            </p>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit} 
              target="_blank"
              className="space-y-6"
            >
              {/* Name */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  name="entry.980777824"
                  placeholder="Enter your name"
                  required
                  className="bg-white dark:bg-black border-gray-300 dark:border-gray-700"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  name="entry.650885188"
                  placeholder="Enter your email"
                  required
                  className="bg-white dark:bg-black border-gray-300 dark:border-gray-700"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <Textarea
                  name="entry.589497053"
                  rows={5}
                  placeholder="Write your message..."
                  required
                  className="bg-white dark:bg-black border-gray-300 dark:border-gray-700"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl"
              >
                Send Message 
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
