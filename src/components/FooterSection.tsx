"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

import BentLogo from './BentLogo';

export default function FooterSection() {
  const containerRef = React.useRef(null);
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
          <motion.div
            className="absolute inset-0 bg-black z-10 pointer-events-none origin-top"
            initial={{ y: "0%" }} 
            animate={isInView ? { y: "-150%" } : {}} 
            transition={{ duration: 4, delay: 0.2, ease: "linear" }}
          >
            <motion.svg 
              viewBox="0 0 1000 100" 
              className="absolute bottom-[-99px] left-0 w-[200%] h-[100px] fill-black"
              preserveAspectRatio="none"
              animate={isInView ? { x: ["0%", "-50%"] } : {}} 
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
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
        {/* THE TRUE 3D BENT LOGO (WebGL) */}
        <div className="relative -my-8 md:-my-12 z-20 drop-shadow-[0_0_15px_rgba(201,42,58,0.2)]">
          <BentLogo />
        </div>
        <p className="text-gray-400 font-mono text-sm md:text-base tracking-[0.4em] uppercase mt-2">
          Full Stack Developer
        </p>
      </motion.div>

    </section>
  );
}
