"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import AuthNav from "@/Components/Auth/AuthNav"
export default function NotFound() {
  return (
    <>
    <AuthNav/>
    <div className="flex min-h-[89vh] flex-col items-center justify-center bg-white dark:bg-zinc-950 px-6">
      
      {/* Animated 404 */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-9xl font-extrabold text-orange-500"
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      {/* Home Button */}
      <Link
        href="/"
        className="mt-8 inline-block rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-md hover:bg-orange-600 transition"
      >
        Go Home
      </Link>
    </div></>
  );
}
