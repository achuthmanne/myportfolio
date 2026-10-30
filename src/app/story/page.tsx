"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import StoryBanner from '@/components/StoryBanner';

// Flight-Colored Tiny Particles (Stardust matching the plane's exact ruby/pink palette)
const FLIGHT_PARTICLES = [
  { top: '12%', left: '8%', size: 1.5, color: '#E83D71', opacity: 0.6 },
  { top: '22%', left: '16%', size: 2, color: '#F4729B', opacity: 0.7 },
  { top: '35%', left: '11%', size: 1, color: '#9C1941', opacity: 0.5 },
  { top: '18%', left: '28%', size: 1.5, color: '#C92A3A', opacity: 0.65 },
  { top: '14%', left: '82%', size: 2, color: '#E83D71', opacity: 0.7 },
  { top: '24%', left: '92%', size: 1.5, color: '#FFA6BE', opacity: 0.65 },
  { top: '32%', left: '86%', size: 1, color: '#9C1941', opacity: 0.5 },
  { top: '18%', left: '72%', size: 2, color: '#F4729B', opacity: 0.7 },
  { top: '48%', left: '5%', size: 2, color: '#E83D71', opacity: 0.65 },
  { top: '58%', left: '14%', size: 1.5, color: '#C92A3A', opacity: 0.55 },
  { top: '46%', left: '95%', size: 1.5, color: '#F4729B', opacity: 0.65 },
  { top: '56%', left: '88%', size: 2, color: '#E83D71', opacity: 0.7 },
  { top: '74%', left: '9%', size: 1.5, color: '#F4729B', opacity: 0.6 },
  { top: '85%', left: '18%', size: 2, color: '#9C1941', opacity: 0.55 },
  { top: '78%', left: '26%', size: 1, color: '#E83D71', opacity: 0.65 },
  { top: '72%', left: '80%', size: 1.5, color: '#C92A3A', opacity: 0.7 },
  { top: '86%', left: '89%', size: 2, color: '#E83D71', opacity: 0.75 },
  { top: '80%', left: '94%', size: 1, color: '#F4729B', opacity: 0.55 },
  { top: '91%', left: '42%', size: 1.5, color: '#E83D71', opacity: 0.5 },
  { top: '93%', left: '58%', size: 1.5, color: '#F4729B', opacity: 0.6 },
  { top: '8%', left: '48%', size: 1.5, color: '#FFA6BE', opacity: 0.65 },
  { top: '9%', left: '54%', size: 1, color: '#E83D71', opacity: 0.55 },
];

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
      {/* THE STORY SECTION (Full Width Card with Paper Plane Graphic) */}
      {/* ==================================================================== */}
      <section className="w-full max-w-6xl xl:max-w-7xl mt-12 sm:mt-16 md:mt-20 relative flex flex-col items-center py-6 px-3 sm:px-6 lg:px-8">
        
        {/* Main Page Signature Heading Style & Exact Font */}
        <div className="w-full flex flex-col items-center mb-10 sm:mb-12 pointer-events-none text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">STORY</span>
          </h2>
          <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm lg:text-base font-light tracking-[0.14em] sm:tracking-[0.2em] uppercase whitespace-nowrap max-w-full">
            From curiosity to code · The journey of building with purpose
          </p>
        </div>

        {/* Full-Width Story Card (Zero Glow Flat Dark BG + Pink Paper Plane + Flight-Themed Particles) */}
        <div className="w-full relative rounded-2xl border border-white/10 bg-[#0d0e12] overflow-hidden px-6 py-12 sm:px-12 md:px-16 lg:px-20 flex flex-col items-center text-center">
          {/* Background Pink Paper Plane Graphic */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex items-center justify-center">
            <div className="relative w-64 h-44 sm:w-80 sm:h-56 md:w-[420px] md:h-[290px] opacity-25 sm:opacity-35">
              <Image
                src="/images/story/pink-paper-plane.png"
                alt="Paper Plane"
                fill
                priority
                className="object-contain object-center"
              />
            </div>
          </div>

          {/* Tiny Flight-Colored Particles (Stardust in exact palette of the plane) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            {FLIGHT_PARTICLES.map((p, idx) => (
              <span
                key={idx}
                className="absolute rounded-full block transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  top: p.top,
                  left: p.left,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  opacity: p.opacity,
                }}
              />
            ))}
          </div>

          {/* Foreground Story Content (Clean & Simple) */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full">
            
            {/* Heading */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-8">
              Curiosity turned into creation.
            </h3>

            {/* Narrative Body */}
            <div className="flex flex-col gap-6 text-base sm:text-lg text-gray-200 font-normal leading-relaxed">
              <p>
                I never had a perfect roadmap to becoming a developer. It all began with curiosity — a desire to understand how things work, explore what technology can do, and turn ideas into something meaningful.
              </p>
              <p>
                What started as an interest in coding gradually became a passion for building. I began exploring different technologies, experimenting with ideas, and learning how to transform concepts into real, usable experiences. Along the way, I discovered that development is not just about writing code — it&apos;s about thinking creatively, solving problems, and finding better ways to make things work.
              </p>
              <p>
                As I grew, my interests expanded beyond traditional development into the world of AI. I became fascinated by how intelligent systems could complement software engineering and open up entirely new possibilities.
              </p>
              <p>
                Today, I work across full-stack development and AI, exploring new technologies and building applications that combine functionality, thoughtful design, and meaningful experiences. I believe in learning by building, embracing challenges, and constantly pushing beyond my comfort zone.
              </p>
            </div>

            {/* Closing Line */}
            <p className="text-lg sm:text-xl font-semibold text-[#C92A3A] tracking-wide mt-10">
              I&apos;m still learning, still experimenting, and still discovering what&apos;s possible.
            </p>

          </div>
        </div>

      </section>
    </main>
  );
}
