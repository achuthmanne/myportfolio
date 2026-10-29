"use client";

import React from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { Space_Grotesk, Syne } from 'next/font/google';
import StoryBanner from '@/components/StoryBanner';

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

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
                src="/images/achuth-profile.jpg"
                alt="Manne Achuth"
                fill
                priority
                quality={98}
                className="object-cover object-center"
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
                  className="text-[#C92A3A] hover:underline font-medium cursor-pointer"
                >
                  Contact info
                </a>
              </div>
            </div>

            {/* Right Column: Institutions / Company Badges (Flat) */}
            <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-3.5 pt-1 md:pt-0">
              {/* Kisan Khata Badge */}
              <a
                href="https://www.kisankhata.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-white border border-white/20 flex items-center justify-center shrink-0 p-1 group-hover:border-[#C92A3A]/60 transition-colors">
                  <Image
                    src="/images/story/kisan-khata-logo-v2.jpg"
                    alt="Kisan Khata"
                    width={40}
                    height={40}
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white/95 group-hover:text-[#C92A3A] transition-colors">
                  Kisan Khata
                </span>
              </a>

              {/* Lovely Professional University Badge */}
              <a
                href="https://www.lpu.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-white border border-white/20 flex items-center justify-center shrink-0 p-0.5 group-hover:border-[#C92A3A]/60 transition-colors">
                  <Image
                    src="/images/story/lpu-logo-v2.png"
                    alt="Lovely Professional University"
                    width={40}
                    height={40}
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white/95 group-hover:text-[#C92A3A] transition-colors leading-tight">
                  Lovely Professional University
                </span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==================================================================== */}
      {/* THE STORY SECTION (Scroll-Triggered Sentences Slide-Up) */}
      {/* ==================================================================== */}
      <section className="w-full max-w-5xl xl:max-w-6xl mt-12 sm:mt-16 md:mt-20 relative flex flex-col items-center justify-center py-10 sm:py-14 px-4 sm:px-6 md:px-8">
        
        {/* Background Image: Static (Zero Animation, Clean Crisp Original) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
          <div className="relative w-full max-w-6xl aspect-[3/1]">
            <Image
              src="/images/story/story-journey-minimal.png"
              alt="Journey Doodle Background"
              fill
              priority
              quality={100}
              className="object-contain object-center"
            />
          </div>
        </div>

        {/* Foreground Story Content (Each Element Slides Up As You Scroll) */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full">
          
          {/* Main Page Signature Heading Style & Exact Font */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="w-full flex flex-col items-center mb-8 sm:mb-12 pointer-events-none"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">STORY</span>
            </h2>
            <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm lg:text-base font-light tracking-[0.14em] sm:tracking-[0.2em] uppercase whitespace-nowrap max-w-full">
              From curiosity to code · The journey of building with purpose
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h3
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-8"
          >
            Curiosity turned into creation.
          </motion.h3>

          {/* Narrative Sentences - Slide Up As You Scroll */}
          <div className="flex flex-col gap-6 text-base sm:text-lg md:text-xl text-gray-300 font-normal leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            >
              I didn’t start with a perfect roadmap. I started with curiosity — wanting to understand how things work and how technology can turn ideas into something real.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            >
              As I explored development, writing code became more than solving problems. It became a way to create experiences, experiment with ideas, and build things that people can actually use.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            >
              Today, I explore the intersection of full-stack engineering and AI — building responsive interfaces, scalable applications, and intelligent systems while constantly pushing myself to learn beyond what I already know.
            </motion.p>
          </div>

          {/* Closing Line */}
          <motion.p
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-[#C92A3A] tracking-wide mt-10"
          >
            Still exploring. Always building.
          </motion.p>

        </div>

      </section>
    </main>
  );
}
