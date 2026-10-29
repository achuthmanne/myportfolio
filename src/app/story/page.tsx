"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import StoryBanner from '@/components/StoryBanner';

export default function StoryPage() {
  return (
    <main className="min-h-screen w-full bg-[#07070a] text-white relative selection:bg-white/20 selection:text-white flex flex-col items-center justify-start pt-8 sm:pt-12 md:pt-14 pb-20 px-3 sm:px-6 lg:px-8">
      {/* Main Centered Profile Card (Full-Width Flat Layout - Zero Glow / Zero Elevations) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl xl:max-w-7xl relative z-10 rounded-2xl border border-white/10 bg-[#0d0e12] overflow-hidden"
      >
        {/* Top Banner Area: Interactive Code-Based 3D Banner (Zero Glow, Minimal Corporate Level) */}
        <StoryBanner />

        {/* Profile Details Container (Flat) */}
        <div className="relative px-6 sm:px-8 lg:px-10 pb-8 sm:pb-10">
          {/* Circular Avatar Overlapping the Banner (Flat - No Drop Shadows) */}
          <div className="flex items-end justify-between -mt-16 sm:-mt-20 md:-mt-24 mb-4">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-[#0d0e12] bg-[#0d0e12] overflow-hidden shrink-0">
              <Image
                src="/images/story/profile-avatar-v2.png"
                alt="Manne Achuth"
                fill
                priority
                quality={98}
                className="object-cover object-center scale-[1.03]"
              />
            </div>
          </div>

          {/* 2-Column Information Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Column: Identity, Role, Location, Connections */}
            <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-1.5">
              <div className="flex items-baseline gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Manne Achuth
                </h1>
                <span className="text-sm font-normal text-gray-400">
                  (He/Him)
                </span>
              </div>

              <p className="text-sm sm:text-base text-gray-200 font-medium leading-snug">
                Founder &amp; Full Stack Developer at Kisan Khata
              </p>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mt-1 flex-wrap">
                <span>Phagwara Tehsil, Punjab, India</span>
                <span>·</span>
                <a
                  href="https://www.linkedin.com/in/manne-achuth-629394332/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#38bdf8] hover:underline font-medium cursor-pointer"
                >
                  Contact info
                </a>
              </div>

              <div className="mt-1.5">
                <a
                  href="https://www.linkedin.com/in/manne-achuth-629394332/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-[#38bdf8] font-semibold hover:underline cursor-pointer"
                >
                  266 connections
                </a>
              </div>
            </div>

            {/* Right Column: Institutions / Company Badges (Flat) */}
            <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-3.5 pt-1 md:pt-0">
              {/* Kisan Khata Badge */}
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-white border border-white/20 flex items-center justify-center shrink-0 p-1">
                  <Image
                    src="/images/story/kisan-khata-logo-v2.jpg"
                    alt="Kisan Khata"
                    width={40}
                    height={40}
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white/95 group-hover:text-gray-300 transition-colors">
                  Kisan Khata
                </span>
              </div>

              {/* Lovely Professional University Badge */}
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-white border border-white/20 flex items-center justify-center shrink-0 p-0.5">
                  <Image
                    src="/images/story/lpu-logo-v2.png"
                    alt="Lovely Professional University"
                    width={40}
                    height={40}
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white/95 group-hover:text-gray-300 transition-colors leading-tight">
                  Lovely Professional University
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
