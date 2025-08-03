"use client";
import React from 'react';
import { motion } from 'framer-motion'; // Ensure this import is correct
import Link from 'next/link';

const LeftSide = () => {
    // Parent container variant for stagger effect
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Delay between each child element (line)
                delayChildren: 0.3 // Initial delay before the first child starts
            }
        }
    };

    // Variant for each main text line
    const textLineVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    // Variant for the button
    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring", // Spring for a bouncy feel
                stiffness: 120,
                damping: 10,
                delay: 1.5 // Appears after text
            }
        }
    };

    return (
        <motion.div
            className="flex flex-col justify-start items-start h-full p-4  " // Ensure the div takes up space
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-zinc-800 dark:text-zinc-200 tracking-tight"
                // No specific variant on h1, as children will animate
            >
                <motion.span variants={textLineVariants} className="block">
                    One <motion.span
                        className="text-orange-600 font-extrabold inline-block"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, color: "#ea580c" }} // Orange color
                        transition={{ delay: 0.8, duration: 0.5, type: "spring", stiffness: 200 }}
                    >JUNCTION</motion.span> for all your links.
                </motion.span>
                <motion.span variants={textLineVariants} className="block mt-3 text-zinc-600 text-3xl sm:text-4xl lg:text-5xl dark:text-zinc-400 font-medium">
                    Time to speak through <motion.span
                        className="italic font-semibold inline-block text-orange-500"
                        initial={{ opacity: 0, x: -20, rotate: -5 }}
                        animate={{ opacity: 1, x: 0, rotate: 0, color: "#f97316" }} // Slight movement and orange color
                        transition={{ delay: 1.2, duration: 0.7, ease: "easeOut" }}
                    >creativity</motion.span>.
                </motion.span>
            </motion.h1>

            <motion.h4
                className='hidden md:block text-md mt-6 ml-1 text-zinc-600 dark:text-zinc-400'
                variants={textLineVariants} // Use the same line variant
            >
                Showcase your work, links, and ideas — all in one smart, beautifully crafted space.
            </motion.h4>

            <motion.button
                className="mt-3 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm sm:text-base font-semibold transition"
                variants={buttonVariants}
            >
                <Link href={"/signup"}>
                Create Your Junction
                </Link>
            </motion.button>
        </motion.div>
    );
};

export default LeftSide;