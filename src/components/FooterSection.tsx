"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function FooterSection() {
  const containerRef = React.useRef(null);
  // amount: 0.8 forces the animation to WAIT until the section is physically locked into the center of the screen!
  const isInView = useInView(containerRef, { once: true, amount: 0.8 });

  return (
    <section ref={containerRef} id="footer-section" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-transparent z-20 py-24 overflow-hidden">
      
      {/* 1. The Portrait Container */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 mb-12 flex items-center justify-center">
        
        {/* The Final Halftone Portrait Image */}
        <div className="relative w-full h-full overflow-hidden">
          
          <Image 
            src="/images/profile-retro.jpg" 
            alt="Manne Achuth" 
            fill 
            className="object-cover mix-blend-lighten"
            style={{
              maskImage: "radial-gradient(circle at center, black 50%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(circle at center, black 50%, transparent 75%)"
            }}
          />

          {/* THE SMOOTH LIQUID WAVE REVEALER */}
          {/* This is a solid background block that covers the image, with a smooth wave at the bottom. As it moves up, it reveals the image below. */}
          <motion.div
            className="absolute inset-0 bg-black z-10 pointer-events-none origin-top"
            initial={{ y: "0%" }} // Covers the whole image initially
            animate={isInView ? { y: "-150%" } : {}} // Slides perfectly up and completely out of the container!
            transition={{ duration: 4, delay: 0.2, ease: "linear" }}
          >
            {/* The seamlessly looping smooth water wave */}
            <motion.svg 
              viewBox="0 0 1000 100" 
              className="absolute bottom-[-99px] left-0 w-[200%] h-[100px] fill-black"
              preserveAspectRatio="none"
              animate={isInView ? { x: ["0%", "-50%"] } : {}} // Continuous smooth slosh
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              {/* Flawless Cubic Bezier continuous sine wave */}
              <path d="M 0 0 L 1000 0 L 1000 50 Q 875 100 750 50 T 500 50 T 250 50 T 0 50 Z" />
            </motion.svg>
          </motion.div>

        </div>
      </div>

      {/* 2. Typography Block */}
      <motion.div 
        className="flex flex-col items-center text-center z-20 mt-4"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 2.5 }}
      >
        {/* The Custom Cyberpunk Name Logo */}
        <div className="relative w-[350px] md:w-[600px] lg:w-[800px] -my-8 md:-my-16 z-20 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] pointer-events-none">
          <img 
            src="/images/manne-achuth-logo.png" 
            alt="Manne Achuth" 
            className="w-full h-auto object-contain scale-[1.2] md:scale-[1.4]"
          />
        </div>
        <p className="text-gray-400 font-mono text-sm md:text-base tracking-[0.4em] uppercase">
          Full Stack Developer
        </p>
      </motion.div>

    </section>
  );
}
