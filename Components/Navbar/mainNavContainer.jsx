"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ModeToggle from "../Workers/ModeToggle";
import { AnimatePresence, motion } from "framer-motion";

const MainNavContainer = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const Navs = [
    { name: "Home", link: "/" },
    { name: "Pricing", link: "/pricing" },
    { name: "Guide", link: "/guide" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full bg-zinc-50 dark:bg-zinc-950">
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto text-zinc-900 dark:text-zinc-100">
        {/* Logo */}
        <Link href={"/"} className="text-3xl font-extrabold tracking-tight text-orange-600 select-none">
          JUNCTION
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
          {Navs.map((nav, index) => {
            const isActive = pathname === nav.link;
            return (
              <li key={index}>
                <Link
                  href={nav.link}
                  className={`relative px-2 py-1 transition-all duration-200 rounded-md focus-visible:outline-none ${
                    isActive
                      ? "text-orange-600 dark:text-orange-400 font-semibold"
                      : "text-zinc-700 dark:text-zinc-300 hover:text-orange-500"
                  }`}
                >
                  {nav.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 rounded-full"></span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium border border-orange-500 text-orange-500 px-4 py-1.5 rounded-md hover:bg-orange-500 hover:text-white transition-colors"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 text-sm font-medium rounded-md shadow-md transition-all"
          >
            Sign Up
          </Link>

          <ModeToggle />
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-orange-500 z-50"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full h-full bg-zinc-50/10 dark:bg-zinc-900/10 backdrop-blur-sm z-40"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 text-lg font-medium text-zinc-800 dark:text-zinc-200">
              {Navs.map((nav, index) => {
                const isActive = pathname === nav.link;
                return (
                  <Link
                    key={index}
                    href={nav.link}
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl transition-colors ${
                      isActive
                        ? "text-orange-600 dark:text-orange-400 font-semibold"
                        : "hover:text-orange-500"
                    }`}
                  >
                    {nav.name}
                  </Link>
                );
              })}

              <div className="flex gap-4 pt-8">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-md font-medium border border-orange-500 text-orange-500 px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-md font-medium rounded-md shadow-md transition"
                >
                  Sign Up
                </Link>
              </div>

              <div className="pt-4">
                <ModeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default MainNavContainer;
