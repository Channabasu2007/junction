"use client"
import React from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaDiscord,
  FaFacebook,
  FaTiktok,
  FaSnapchatGhost,
  FaGoogle
} from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

const RightSide = () => {
    // Icons array for random assignment
    const icons = [
        FaGithub,
        FaLinkedin,
        FaInstagram,
        FaTwitter,
        FaYoutube,
        FaDiscord,
        FaFacebook,
        FaTiktok,
        FaSnapchatGhost,
        FaGoogle,
        FaX
    ];

    // Function to get a random icon
    const getRandomIcon = () => {
        return icons[Math.floor(Math.random() * icons.length)];
    };

    // Variant for the main container div
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.5, // Start animating after the LeftSide text begins
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    // Variant for individual animated shapes
    const shapeVariants = {
        hidden: { opacity: 0, scale: 0.5, rotate: 0 },
        visible: i => ({
            opacity: 1,
            scale: 1,
            rotate: i % 2 === 0 ? 360 : -360, // Rotate clockwise or counter-clockwise
            transition: {
                delay: 1 + i * 0.15, // Slightly faster staggered entry for more shapes
                duration: 2 + Math.random() * 1, // Varying duration for initial entry
                ease: "easeInOut",
                repeat: Infinity, // Loop animation
                repeatType: "reverse", // Reverse direction on repeat
                repeatDelay: 1 // Pause before repeating
            }
        })
    };

    // Shape data with random icons assigned
    const shapeData = [
        { id: 1, color: 'bg-orange-500', size: 'w-32 h-32', position: 'top-[15%] left-[10%]', shape: 'rounded-2xl', IconComponent: getRandomIcon() },
        { id: 2, color: 'bg-orange-400', size: 'w-24 h-24', position: 'bottom-[20%] right-[15%]', shape: 'rounded-full', IconComponent: getRandomIcon() },
        { id: 3, color: 'bg-orange-600', size: 'w-40 h-40', position: 'top-[40%] left-[45%] -translate-x-1/2 -translate-y-1/2', shape: 'rounded-xl', IconComponent: getRandomIcon() },
        { id: 4, color: 'bg-orange-300', size: 'w-28 h-28', position: 'top-[10%] right-[25%]', shape: 'rounded-full', IconComponent: getRandomIcon() },
        { id: 5, color: 'bg-orange-700', size: 'w-20 h-20', position: 'bottom-[15%] left-[20%]', shape: 'rounded-lg', IconComponent: getRandomIcon() },
        { id: 6, color: 'bg-orange-200', size: 'w-20 h-20', position: 'top-[60%] left-[5%]', shape: 'rounded-full', IconComponent: getRandomIcon() },
        { id: 7, color: 'bg-orange-800', size: 'w-36 h-36', position: 'bottom-[5%] right-[5%]', shape: 'rounded-3xl', IconComponent: getRandomIcon() },
        { id: 8, color: 'bg-orange-400', size: 'w-28 h-28', position: 'top-[5%] left-[60%]', shape: 'rounded-lg', IconComponent: getRandomIcon() },
        { id: 9, color: 'bg-orange-600', size: 'w-16 h-16', position: 'bottom-[30%] left-[40%]', shape: 'rounded-full', IconComponent: getRandomIcon() },
        { id: 10, color: 'bg-orange-500', size: 'w-24 h-24', position: 'top-[25%] right-[5%]', shape: 'rounded-xl', IconComponent: getRandomIcon() },
    ];

    return (
        <motion.div
            className="flex justify-center items-center h-full w-[100%] p-4 relative overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Background gradient for visual appeal, slightly adjusted for more depth */}
            <div className="absolute inset-0 bg-gradient-to-br bg-white dark:bg-zinc-950 z-0"></div>

            {/* Animated shapes */}
            {shapeData.map((shape, index) => {
                const IconComponent = shape.IconComponent;
                return (
                    <motion.div
                        key={shape.id}
                        className={`absolute ${shape.color} ${shape.size} ${shape.position} ${shape.shape} shadow-xl flex items-center justify-center`}
                        variants={shapeVariants}
                        custom={index} // Pass index as custom prop for staggered animation
                        animate="visible"
                        initial="hidden"
                        style={{
                            // More varied and subtle movements
                            x: [`${Math.random() * 10 - 5}%`, `${Math.random() * 20 - 10}%`, `${Math.random() * 10 - 5}%`, `${Math.random() * 5 - 2.5}%`],
                            y: [`${Math.random() * 10 - 5}%`, `${Math.random() * 20 - 10}%`, `${Math.random() * 10 - 5}%`, `${Math.random() * 5 - 2.5}%`],
                            scale: [1, 1.05, 0.95, 1], // Subtle scale pulse
                            opacity: [0.7, 1, 0.6, 0.7], // Subtle opacity pulse
                            rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360], // Full rotation with more steps
                            filter: `blur(${Math.random() * 0.5}px)` // Subtle random blur for depth
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10, // Longer, more varied duration for continuous motion
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "loop" // Loop continuously
                        }}
                    >
                        <IconComponent className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
                    </motion.div>
                );
            })}

            {/* Optional: Add a subtle overlay or text on top of the animation */}
            <div className="relative z-10 text-center text-zinc-700 dark:text-zinc-300">
                {/* You can add a subtle logo or tagline here if desired */}
                <motion.p
                    className="text-xl sm:text-2xl font-semibold text-orange-700 dark:text-orange-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 1, ease: "easeOut" }}
                >
                    
                </motion.p>
            </div>
        </motion.div>
    );
};

export default RightSide;