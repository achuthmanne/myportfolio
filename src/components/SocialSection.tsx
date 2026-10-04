"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SocialSection() {
  return (
    <section id="social-section" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-transparent z-20 py-12">
      
      {/* 1. The Headings (Consistent with the rest of the site) */}
      <div className="w-full flex flex-col items-center z-30 mb-20 relative">
        <div className="text-center pointer-events-none px-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            EXTERNAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">UPLINK.</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light tracking-[0.2em] uppercase mb-8">
            Establish a direct protocol connection to my external channels.
          </p>
        </div>
      </div>

      {/* 2. The Clean Minimalist Icons */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 px-8">
        <MinimalSocialIcon 
          path="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          color="rgba(255, 255, 255, 1)"
          transparentColor="rgba(255, 255, 255, 0)"
          label="SOURCE"
        />
        <MinimalSocialIcon 
          path="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.603 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          color="rgba(59, 130, 246, 1)"
          transparentColor="rgba(59, 130, 246, 0)"
          label="NETWORK"
        />
        <MinimalSocialIcon 
          path="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
          color="rgba(168, 85, 247, 1)"
          transparentColor="rgba(168, 85, 247, 0)"
          label="DIRECT"
        />
      </div>

    </section>
  );
}

function MinimalSocialIcon({ path, color, transparentColor, label }: { path: string, color: string, transparentColor: string, label: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex flex-col items-center justify-center gap-8 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SVG Container (Massive icons) */}
      <div className="w-24 h-24 md:w-32 md:h-32 relative flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-2xl">
          
          {/* Base dim outline (Always visible) */}
          <path d={path} fill="none" stroke="#222" strokeWidth="0.4" fillRule="evenodd" clipRule="evenodd" />
          
          {/* The Magic Drawing Layer */}
          <motion.path
            d={path}
            fillRule="evenodd" 
            clipRule="evenodd"
            initial={{ pathLength: 0, fill: transparentColor, stroke: color, strokeWidth: 0.4 }}
            animate={{
              pathLength: isHovered ? 1 : 0, 
              fill: isHovered ? color : transparentColor
            }}
            transition={{
              pathLength: { duration: 1.5, ease: "easeInOut" }, // Slow, deliberate tracing
              fill: { duration: 0.15, delay: 1.5, ease: "linear" } // Flash fill instantly
            }}
          />
        </svg>
      </div>

      {/* Clean minimal text */}
      <div 
        className="font-mono text-base md:text-xl tracking-[0.5em] transition-colors duration-500 uppercase"
        style={{ color: isHovered ? color : "#6b7280" }} // gray-500 idle, brand color active
      >
        {label}
      </div>
    </div>
  );
}
