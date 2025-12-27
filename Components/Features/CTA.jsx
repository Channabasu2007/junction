"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "@/Components/ui/button";
import Link from "next/link";

export default function CTA() {
  const { data: session, status } = useSession();
  return (
    <section className="w-full bg-orange-500 text-white py-16 px-6 md:px-20 text-center rounded-t-3xl shadow-lg">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Boost Your Online Presence?
      </h2>
      <p className="text-lg md:text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
        Join JUNCTION today and create your fully customized page in minutes.
      </p>
      <Link href={session ? "/Dashboard" : "/login"} className="bg-white text-orange-600 hover:bg-orange-100 font-semibold px-8 py-6 rounded-xl text-lg shadow-md">
        {session ? "Open Dashboard" : "Get Started"}
      </Link>
    </section>
  );
}
