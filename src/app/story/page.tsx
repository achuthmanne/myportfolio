"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import StoryBanner from '@/components/StoryBanner';

// Flight-Themed Particles (Balanced Mix of Crisp White & Ruby/Pink Theme Dots)
const FLIGHT_PARTICLES = [
  { top: '12%', left: '8%', size: 1.5, color: '#FFFFFF', opacity: 0.8 },
  { top: '22%', left: '16%', size: 2, color: '#E83D71', opacity: 0.7 },
  { top: '35%', left: '11%', size: 1, color: '#FFFFFF', opacity: 0.65 },
  { top: '18%', left: '28%', size: 1.5, color: '#C92A3A', opacity: 0.7 },
  { top: '14%', left: '82%', size: 2, color: '#FFFFFF', opacity: 0.85 },
  { top: '24%', left: '92%', size: 1.5, color: '#E83D71', opacity: 0.7 },
  { top: '32%', left: '86%', size: 1, color: '#FFFFFF', opacity: 0.6 },
  { top: '18%', left: '72%', size: 2, color: '#F4729B', opacity: 0.7 },
  { top: '48%', left: '5%', size: 1.5, color: '#FFFFFF', opacity: 0.75 },
  { top: '58%', left: '14%', size: 2, color: '#C92A3A', opacity: 0.65 },
  { top: '46%', left: '95%', size: 1.5, color: '#FFFFFF', opacity: 0.75 },
  { top: '56%', left: '88%', size: 2, color: '#E83D71', opacity: 0.7 },
  { top: '74%', left: '9%', size: 1.5, color: '#FFFFFF', opacity: 0.7 },
  { top: '85%', left: '18%', size: 2, color: '#9C1941', opacity: 0.6 },
  { top: '78%', left: '26%', size: 1, color: '#FFFFFF', opacity: 0.65 },
  { top: '72%', left: '80%', size: 1.5, color: '#C92A3A', opacity: 0.7 },
  { top: '86%', left: '89%', size: 2, color: '#FFFFFF', opacity: 0.85 },
  { top: '80%', left: '94%', size: 1, color: '#F4729B', opacity: 0.65 },
  { top: '91%', left: '42%', size: 1.5, color: '#FFFFFF', opacity: 0.7 },
  { top: '93%', left: '58%', size: 1.5, color: '#E83D71', opacity: 0.6 },
  { top: '8%', left: '48%', size: 1.5, color: '#FFFFFF', opacity: 0.8 },
  { top: '9%', left: '54%', size: 1, color: '#E83D71', opacity: 0.6 },
];

// Kisan Khata Theme Particles (Balanced Mix of Crisp White & Emerald Green Theme Dots)
const KISAN_PARTICLES = [
  { top: '10%', left: '7%', size: 1.5, color: '#FFFFFF', opacity: 0.8 },
  { top: '20%', left: '15%', size: 2, color: '#22C55E', opacity: 0.7 },
  { top: '32%', left: '10%', size: 1, color: '#FFFFFF', opacity: 0.65 },
  { top: '16%', left: '26%', size: 1.5, color: '#4ADE80', opacity: 0.7 },
  { top: '12%', left: '84%', size: 2, color: '#FFFFFF', opacity: 0.85 },
  { top: '22%', left: '92%', size: 1.5, color: '#22C55E', opacity: 0.7 },
  { top: '30%', left: '88%', size: 1, color: '#FFFFFF', opacity: 0.6 },
  { top: '16%', left: '74%', size: 2, color: '#4ADE80', opacity: 0.7 },
  { top: '48%', left: '5%', size: 1.5, color: '#FFFFFF', opacity: 0.75 },
  { top: '60%', left: '12%', size: 2, color: '#3E880F', opacity: 0.65 },
  { top: '46%', left: '95%', size: 1.5, color: '#FFFFFF', opacity: 0.75 },
  { top: '58%', left: '89%', size: 2, color: '#22C55E', opacity: 0.7 },
  { top: '75%', left: '8%', size: 1.5, color: '#FFFFFF', opacity: 0.7 },
  { top: '86%', left: '17%', size: 2, color: '#16A34A', opacity: 0.6 },
  { top: '80%', left: '25%', size: 1, color: '#FFFFFF', opacity: 0.65 },
  { top: '74%', left: '82%', size: 1.5, color: '#4ADE80', opacity: 0.7 },
  { top: '88%', left: '90%', size: 2, color: '#FFFFFF', opacity: 0.85 },
  { top: '82%', left: '95%', size: 1, color: '#22C55E', opacity: 0.65 },
  { top: '92%', left: '40%', size: 1.5, color: '#FFFFFF', opacity: 0.7 },
  { top: '94%', left: '60%', size: 1.5, color: '#22C55E', opacity: 0.6 },
  { top: '7%', left: '46%', size: 1.5, color: '#FFFFFF', opacity: 0.8 },
  { top: '8%', left: '55%', size: 1, color: '#4ADE80', opacity: 0.6 },
];

// LPU Theme Particles (Balanced Mix of Crisp White & LPU Theme Orange Dots)
const LPU_PARTICLES = [
  { top: '10%', left: '8%', size: 1.5, color: '#FFFFFF', opacity: 0.8 },
  { top: '20%', left: '16%', size: 2, color: '#F97316', opacity: 0.7 },
  { top: '32%', left: '11%', size: 1, color: '#FFFFFF', opacity: 0.65 },
  { top: '16%', left: '28%', size: 1.5, color: '#FB923C', opacity: 0.7 },
  { top: '12%', left: '82%', size: 2, color: '#FFFFFF', opacity: 0.85 },
  { top: '22%', left: '90%', size: 1.5, color: '#F97316', opacity: 0.7 },
  { top: '30%', left: '86%', size: 1, color: '#FFFFFF', opacity: 0.6 },
  { top: '16%', left: '72%', size: 2, color: '#FB923C', opacity: 0.7 },
  { top: '48%', left: '6%', size: 1.5, color: '#FFFFFF', opacity: 0.75 },
  { top: '60%', left: '14%', size: 2, color: '#EA580C', opacity: 0.65 },
  { top: '46%', left: '94%', size: 1.5, color: '#FFFFFF', opacity: 0.75 },
  { top: '58%', left: '88%', size: 2, color: '#F97316', opacity: 0.7 },
  { top: '75%', left: '9%', size: 1.5, color: '#FFFFFF', opacity: 0.7 },
  { top: '86%', left: '18%', size: 2, color: '#EA580C', opacity: 0.6 },
  { top: '80%', left: '26%', size: 1, color: '#FFFFFF', opacity: 0.65 },
  { top: '74%', left: '80%', size: 1.5, color: '#FB923C', opacity: 0.7 },
  { top: '88%', left: '91%', size: 2, color: '#FFFFFF', opacity: 0.85 },
  { top: '82%', left: '95%', size: 1, color: '#F97316', opacity: 0.65 },
  { top: '92%', left: '42%', size: 1.5, color: '#FFFFFF', opacity: 0.7 },
  { top: '94%', left: '58%', size: 1.5, color: '#F97316', opacity: 0.6 },
  { top: '7%', left: '48%', size: 1.5, color: '#FFFFFF', opacity: 0.8 },
  { top: '8%', left: '54%', size: 1, color: '#FB923C', opacity: 0.6 },
];

// Narayana Theme Particles (Balanced Mix of Crisp White & Royal/Sapphire Blue Dots)
const NARAYANA_PARTICLES = [
  { top: '10%', left: '7%', size: 1.5, color: '#FFFFFF', opacity: 0.8 },
  { top: '20%', left: '15%', size: 2, color: '#3B82F6', opacity: 0.7 },
  { top: '32%', left: '10%', size: 1, color: '#FFFFFF', opacity: 0.65 },
  { top: '16%', left: '26%', size: 1.5, color: '#60A5FA', opacity: 0.7 },
  { top: '12%', left: '84%', size: 2, color: '#FFFFFF', opacity: 0.85 },
  { top: '22%', left: '92%', size: 1.5, color: '#3B82F6', opacity: 0.7 },
  { top: '30%', left: '88%', size: 1, color: '#FFFFFF', opacity: 0.6 },
  { top: '16%', left: '74%', size: 2, color: '#60A5FA', opacity: 0.7 },
  { top: '48%', left: '5%', size: 1.5, color: '#FFFFFF', opacity: 0.75 },
  { top: '60%', left: '12%', size: 2, color: '#2563EB', opacity: 0.65 },
  { top: '46%', left: '95%', size: 1.5, color: '#FFFFFF', opacity: 0.75 },
  { top: '58%', left: '89%', size: 2, color: '#3B82F6', opacity: 0.7 },
  { top: '75%', left: '8%', size: 1.5, color: '#FFFFFF', opacity: 0.7 },
  { top: '86%', left: '17%', size: 2, color: '#2563EB', opacity: 0.6 },
  { top: '80%', left: '25%', size: 1, color: '#FFFFFF', opacity: 0.65 },
  { top: '74%', left: '82%', size: 1.5, color: '#60A5FA', opacity: 0.7 },
  { top: '88%', left: '90%', size: 2, color: '#FFFFFF', opacity: 0.85 },
  { top: '82%', left: '95%', size: 1, color: '#3B82F6', opacity: 0.65 },
  { top: '92%', left: '40%', size: 1.5, color: '#FFFFFF', opacity: 0.7 },
  { top: '94%', left: '60%', size: 1.5, color: '#3B82F6', opacity: 0.6 },
  { top: '7%', left: '46%', size: 1.5, color: '#FFFFFF', opacity: 0.8 },
  { top: '8%', left: '55%', size: 1, color: '#60A5FA', opacity: 0.6 },
];

// Sri Gowthami Theme Particles (Balanced Mix of Crisp White & Dark Chocolate/Saddle Brown Dots)
const GOWTHAMI_PARTICLES = [
  { top: '10%', left: '8%', size: 1.5, color: '#FFFFFF', opacity: 0.8 },
  { top: '20%', left: '16%', size: 2, color: '#8B4513', opacity: 0.75 },
  { top: '32%', left: '11%', size: 1, color: '#FFFFFF', opacity: 0.65 },
  { top: '16%', left: '28%', size: 1.5, color: '#A0522D', opacity: 0.7 },
  { top: '12%', left: '82%', size: 2, color: '#FFFFFF', opacity: 0.85 },
  { top: '22%', left: '90%', size: 1.5, color: '#8B4513', opacity: 0.75 },
  { top: '30%', left: '86%', size: 1, color: '#FFFFFF', opacity: 0.6 },
  { top: '16%', left: '72%', size: 2, color: '#78350F', opacity: 0.75 },
  { top: '48%', left: '6%', size: 1.5, color: '#FFFFFF', opacity: 0.75 },
  { top: '60%', left: '14%', size: 2, color: '#5D2906', opacity: 0.7 },
  { top: '46%', left: '94%', size: 1.5, color: '#FFFFFF', opacity: 0.75 },
  { top: '58%', left: '88%', size: 2, color: '#8B4513', opacity: 0.75 },
  { top: '75%', left: '9%', size: 1.5, color: '#FFFFFF', opacity: 0.7 },
  { top: '86%', left: '18%', size: 2, color: '#5D2906', opacity: 0.65 },
  { top: '80%', left: '26%', size: 1, color: '#FFFFFF', opacity: 0.65 },
  { top: '74%', left: '80%', size: 1.5, color: '#A0522D', opacity: 0.7 },
  { top: '88%', left: '91%', size: 2, color: '#FFFFFF', opacity: 0.85 },
  { top: '82%', left: '95%', size: 1, color: '#8B4513', opacity: 0.7 },
  { top: '92%', left: '42%', size: 1.5, color: '#FFFFFF', opacity: 0.7 },
  { top: '94%', left: '58%', size: 1.5, color: '#78350F', opacity: 0.65 },
  { top: '7%', left: '48%', size: 1.5, color: '#FFFFFF', opacity: 0.8 },
  { top: '8%', left: '54%', size: 1, color: '#A0522D', opacity: 0.65 },
];

export default function StoryPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsProfileOpen(false);
    };
    if (isProfileOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isProfileOpen]);

  return (
    <main className="min-h-screen w-full bg-[#07070a] text-white relative selection:bg-white/20 selection:text-white flex flex-col items-center justify-start pb-24 px-3 sm:px-6 lg:px-8">
      {/* ==================================================================== */}
      {/* HERO SECTION: Strictly ONLY the Profile Board in the Initial Viewport */}
      {/* ==================================================================== */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center pt-20 sm:pt-24 pb-10 sm:pb-14">
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
          {/* Circular Avatar Overlapping the Banner (Click to View / Expand) */}
          <div className="flex items-end justify-between -mt-16 sm:-mt-20 md:-mt-24 mb-4">
            <button
              type="button"
              onClick={() => setIsProfileOpen(true)}
              aria-label="View profile photo"
              className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-[#0d0e12] bg-[#0d0e12] overflow-hidden shrink-0 cursor-pointer group transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <Image
                src="/images/achuth-profile.jpg"
                alt="Manne Achuth"
                fill
                priority
                quality={98}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              {/* Subtle hover overlay with view pill */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs font-medium px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 shadow-md">
                  View
                </span>
              </div>
            </button>
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
      </section>

      {/* ==================================================================== */}
      {/* THE JOURNEY SECTION (Full Width Card with Paper Plane Graphic) */}
      {/* ==================================================================== */}
      <section className="w-full max-w-6xl xl:max-w-7xl mt-8 sm:mt-12 md:mt-16 relative flex flex-col items-center py-6 px-3 sm:px-6 lg:px-8">
        
        {/* Main Page Signature Heading Style - Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center mb-10 sm:mb-12 pointer-events-none text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFA6BE] to-[#E83D71]">JOURNEY</span>
          </h2>
          <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm lg:text-base font-light tracking-[0.14em] sm:tracking-[0.2em] uppercase whitespace-nowrap max-w-full">
            Building, learning, and evolving with purpose
          </p>
        </motion.div>

        {/* Full-Width Story Card - Smooth Scale & Glide-In Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative rounded-2xl border border-white/10 bg-transparent overflow-hidden px-6 py-12 sm:px-12 md:px-16 lg:px-20 flex flex-col items-center text-center"
        >
          
          {/* Subtle Precision Horizon Light Beams (Zero Corner Clutter) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1.5px] bg-gradient-to-r from-transparent via-[#E83D71]/80 to-transparent pointer-events-none z-20" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1.5px] bg-gradient-to-r from-transparent via-[#E83D71]/80 to-transparent pointer-events-none z-20" />

          {/* Background Pink Paper Plane Graphic (Subtly Scaled Down) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex items-center justify-center">
            <div className="relative w-56 h-38 sm:w-72 sm:h-50 md:w-[360px] md:h-[250px] opacity-20 sm:opacity-28">
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

          {/* Foreground Story Content (Clean & Simple - Expanded Width) */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl lg:max-w-5xl w-full">
            
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

            {/* Closing Line in Glass Badge (Tech Stack Footer Style) */}
            <div className="pt-6 border-t border-white/10 w-full flex items-center justify-center mt-10">
              <span className="text-sm sm:text-base md:text-lg font-medium px-6 py-2.5 rounded-full bg-[#E83D71]/10 border border-[#E83D71]/25 text-[#FF85A1]">
                I&apos;m still learning, still experimenting, and still discovering what&apos;s possible.
              </span>
            </div>

          </div>
        </motion.div>

      </section>

      {/* ==================================================================== */}
      {/* THE EXPERIENCE SECTION */}
      {/* ==================================================================== */}
      <section className="w-full max-w-6xl xl:max-w-7xl mt-16 sm:mt-20 md:mt-28 relative flex flex-col items-center py-6 px-3 sm:px-6 lg:px-8">
        
        {/* Main Page Signature Heading Style - Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center mb-10 sm:mb-12 pointer-events-none text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#86EFAC] to-[#22C55E]">EXPERIENCE</span>
          </h2>
          <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm lg:text-base font-light tracking-[0.14em] sm:tracking-[0.2em] uppercase whitespace-nowrap max-w-full">
            Roles, milestones, and hands-on building
          </p>
        </motion.div>

        {/* Full-Width Kisan Khata Experience Card - Smooth Scale & Glide-In Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative rounded-2xl border border-white/10 bg-transparent overflow-hidden px-6 py-10 sm:px-10 md:px-14 lg:px-16 flex flex-col text-left"
        >
          
          {/* Subtle Precision Horizon Light Beams in Kisan Khata Theme Emerald Green */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1.5px] bg-gradient-to-r from-transparent via-[#22C55E]/80 to-transparent pointer-events-none z-20" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1.5px] bg-gradient-to-r from-transparent via-[#22C55E]/80 to-transparent pointer-events-none z-20" />

          {/* Background Watermark: Pure Kisan Khata Emblem (Zero Text - Proportioned to Card) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex items-center justify-center">
            <div className="relative w-56 h-40 sm:w-72 sm:h-52 md:w-[380px] md:h-[275px] opacity-[0.14] sm:opacity-[0.18]">
              <Image
                src="/images/story/kisan-khata-emblem.png"
                alt="Kisan Khata Emblem"
                fill
                priority
                className="object-contain object-center"
              />
            </div>
          </div>

          {/* Kisan Khata Theme Tiny Particles (Sprout & Emerald Green Palette) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            {KISAN_PARTICLES.map((p, idx) => (
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

          {/* Foreground Experience Content */}
          <div className="relative z-10 flex flex-col w-full">
            
            {/* Header: Logo + Role + Company + Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                {/* Logo badge with link */}
                <a
                  href="https://www.kisankhata.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-white border border-white/20 p-1.5 shrink-0 hover:border-[#22C55E]/80 transition-colors group cursor-pointer"
                >
                  <Image
                    src="/images/story/kisan-khata-logo-v2.jpg"
                    alt="Kisan Khata Logo"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                </a>

                {/* Role & Company */}
                <div className="flex flex-col">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Founder &amp; Full Stack Developer
                  </h3>
                  
                  <a
                    href="https://www.kisankhata.co.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg font-semibold text-[#22C55E] hover:text-[#4ADE80] transition-colors mt-1 w-fit cursor-pointer"
                  >
                    Kisan Khata
                  </a>
                </div>
              </div>

              {/* Location Badge */}
              <div className="text-xs sm:text-sm text-gray-400 font-normal">
                <span>Andhra Pradesh &amp; Telangana, India</span>
              </div>
            </div>

            {/* Mission Overview */}
            <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed mt-6 mb-8 max-w-4xl">
              Building a digital agricultural management platform focused on simplifying farm operations and financial record-keeping for farmers across Andhra Pradesh and Telangana.
            </p>

            {/* Bullet Points / Achievements (Exact Matching Size as THE STORY: text-base sm:text-lg) */}
            <div className="flex flex-col gap-4 mb-8">
              {[
                {
                  label: "Mobile Development",
                  desc: "Developed an offline-first mobile application using React Native and Expo, enabling farmers to manage daily expenses and worker attendance even with limited internet connectivity.",
                },
                {
                  label: "Backend & Cloud",
                  desc: "Integrated Firebase Firestore, Authentication, Cloud Functions, and FCM for data management, cloud processing, and real-time notifications.",
                },
                {
                  label: "AI Integration",
                  desc: "Built AI-powered workflows using Google Gemini to collect, translate, and categorize government schemes into Telugu, delivering relevant updates to farmers.",
                },
                {
                  label: "User Experience",
                  desc: "Designed a bilingual Telugu-English interface with accessibility-focused features and voice-based input to simplify everyday interactions.",
                },
                {
                  label: "Agricultural Intelligence",
                  desc: "Integrated weather updates and agricultural market-price information to make essential farming insights more accessible.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.15 + (idx * 0.08), ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-3.5"
                >
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] mt-2.5 shrink-0" />
                  <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal">
                    <strong className="font-semibold text-white mr-2">
                      {item.label}:
                    </strong>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Tech Stack Footer Bar - Cascading Entry */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2.5"
            >
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400 mr-2">
                Tech Stack:
              </span>
              {[
                "React Native",
                "Expo",
                "TypeScript",
                "Firebase",
                "Firestore",
                "Cloud Functions",
                "FCM",
                "OpenWeather API",
              ].map((tech) => (
                <span
                  key={tech}
                  className="text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/25 text-[#86EFAC]"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

          </div>
        </motion.div>

      </section>

      {/* ==================================================================== */}
      {/* THE FOUNDATION SECTION */}
      {/* ==================================================================== */}
      <section className="w-full max-w-6xl xl:max-w-7xl mt-16 sm:mt-20 md:mt-28 relative flex flex-col items-center py-6 px-3 sm:px-6 lg:px-8">
        
        {/* Main Page Signature Heading Style - Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center mb-10 sm:mb-12 pointer-events-none text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FDBA74] to-[#F97316]">FOUNDATION</span>
          </h2>
          <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm lg:text-base font-light tracking-[0.14em] sm:tracking-[0.2em] uppercase whitespace-nowrap max-w-full">
            The knowledge and experiences shaping my path forward
          </p>
        </motion.div>

        {/* Foundation Cards Container */}
        <div className="w-full flex flex-col gap-8">
          {/* Lovely Professional University (LPU) Card - Smooth Scale & Glide-In Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative rounded-2xl border border-white/10 bg-transparent overflow-hidden px-6 py-10 sm:px-10 md:px-14 lg:px-16 flex flex-col text-left"
          >
            {/* Subtle Precision Horizon Light Beams in LPU Theme Orange */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1.5px] bg-gradient-to-r from-transparent via-[#F97316]/80 to-transparent pointer-events-none z-20" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1.5px] bg-gradient-to-r from-transparent via-[#F97316]/80 to-transparent pointer-events-none z-20" />

            {/* Background Watermark: LPU Emblem (Subtle & Proportioned) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex items-center justify-center">
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-[320px] md:h-[320px] opacity-[0.14] sm:opacity-[0.18]">
                <Image
                  src="/images/story/lpu-logo-transparent.png"
                  alt="LPU Emblem Watermark"
                  fill
                  priority
                  className="object-contain object-center"
                />
              </div>
            </div>

            {/* LPU Theme Tiny Particles (Orange & White Palette) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
              {LPU_PARTICLES.map((p, idx) => (
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

            {/* Foreground Foundation Content */}
            <div className="relative z-10 flex flex-col w-full">
              
              {/* Header: Logo + Degree + Institution + Timeline & Location */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  {/* Logo badge with link */}
                  <a
                    href="https://www.lpu.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-white border border-white/20 p-1.5 shrink-0 hover:border-[#F97316]/80 transition-colors group cursor-pointer"
                  >
                    <Image
                      src="/images/story/lpu-logo-transparent.png"
                      alt="Lovely Professional University Logo"
                      fill
                      className="object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
                    />
                  </a>

                  {/* Degree & Institution */}
                  <div className="flex flex-col">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Bachelor of Technology — CSE
                    </h3>
                    
                    <a
                      href="https://www.lpu.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-semibold text-[#F97316] hover:text-[#FB923C] transition-colors mt-1 w-fit cursor-pointer"
                    >
                      Lovely Professional University
                    </a>
                  </div>
                </div>

                {/* Timeline, CGPA & Location Badge */}
                <div className="flex flex-col sm:items-end gap-1 text-xs sm:text-sm text-gray-400 font-normal shrink-0">
                  <span className="font-medium text-gray-300">Jalandhar, Punjab, India</span>
                  <span>
                    August 2024 – May 2028 · <strong className="text-white font-semibold">CGPA: 7.32</strong>
                  </span>
                </div>
              </div>

              {/* Narrative Content */}
              <div className="flex flex-col gap-5 mt-6 w-full">
                <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed">
                  Alongside my core Computer Science curriculum, I am pursuing an{" "}
                  <strong className="text-white font-semibold">Open Minor in UI/UX Design</strong> and a{" "}
                  <strong className="text-white font-semibold">Minor in Full Stack Web Development</strong>,
                  expanding my learning beyond traditional computer science.
                </p>

                <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed">
                  These complementary areas allow me to explore technology from two perspectives — understanding how
                  digital experiences should look and feel, while also learning how to engineer the systems that power
                  them. Through UI/UX, I am developing a deeper understanding of user-centred design, interface principles,
                  and creating intuitive experiences. My Full Stack Web Development studies further strengthen my knowledge
                  of building modern web applications, from crafting responsive frontends to understanding backend
                  architecture and application workflows.
                </p>

                <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed">
                  Together, these learning paths help me connect design thinking with technical execution, approach
                  problems from multiple perspectives, and turn ideas into functional, user-focused digital experiences.
                  I believe that great technology is not just about how well something works, but also about how naturally
                  people can interact with it.
                </p>
              </div>

              {/* Academic Focus Areas Footer */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2.5 mt-8"
              >
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400 mr-2">
                  Academic Focus:
                </span>
                {[
                  "CSE",
                  "Open Minor in UI/UX Design",
                  "Minor in Full Stack Web Development",
                ].map((track) => (
                  <span
                    key={track}
                    className="text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/25 text-[#FDBA74]"
                  >
                    {track}
                  </span>
                ))}
              </motion.div>

            </div>
          </motion.div>

          {/* Narayana Junior College Card - Smooth Scale & Glide-In Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative rounded-2xl border border-white/10 bg-transparent overflow-hidden px-6 py-10 sm:px-10 md:px-14 lg:px-16 flex flex-col text-left"
          >
            {/* Subtle Precision Horizon Light Beams in Narayana Theme Sapphire Blue */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1.5px] bg-gradient-to-r from-transparent via-[#3B82F6]/80 to-transparent pointer-events-none z-20" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1.5px] bg-gradient-to-r from-transparent via-[#3B82F6]/80 to-transparent pointer-events-none z-20" />

            {/* Background Watermark: Narayana Emblem (Subtle & Proportioned) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex items-center justify-center">
              <div className="relative w-64 h-48 sm:w-80 sm:h-60 md:w-[380px] md:h-[295px] opacity-[0.14] sm:opacity-[0.18]">
                <Image
                  src="/images/story/narayana-emblem.png"
                  alt="Narayana Emblem Watermark"
                  fill
                  priority
                  className="object-contain object-center"
                />
              </div>
            </div>

            {/* Narayana Theme Tiny Particles (Blue & White Palette) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
              {NARAYANA_PARTICLES.map((p, idx) => (
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

            {/* Foreground Foundation Content */}
            <div className="relative z-10 flex flex-col w-full">
              
              {/* Header: Logo + Degree + Institution + Timeline & Location */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  {/* Logo badge with link */}
                  <a
                    href="https://www.narayanagroup.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-white border border-white/20 p-1.5 shrink-0 hover:border-[#3B82F6]/80 transition-colors group cursor-pointer"
                  >
                    <Image
                      src="/images/story/narayana-logo.png"
                      alt="Narayana Junior College Logo"
                      fill
                      className="object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
                    />
                  </a>

                  {/* Program & Institution */}
                  <div className="flex flex-col">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Intermediate — MPC
                    </h3>
                    
                    <a
                      href="https://www.narayanagroup.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-semibold text-[#3B82F6] hover:text-[#60A5FA] transition-colors mt-1 w-fit cursor-pointer"
                    >
                      Narayana Junior College
                    </a>
                  </div>
                </div>

                {/* Class, Percentage & Location Badge */}
                <div className="flex flex-col sm:items-end gap-1 text-xs sm:text-sm text-gray-400 font-normal shrink-0">
                  <span className="font-medium text-gray-300">Vijayawada, Andhra Pradesh, India</span>
                  <span>
                    June 2022 – March 2024 · <strong className="text-white font-semibold">95.4%</strong>
                  </span>
                </div>
              </div>

              {/* Narrative Content */}
              <div className="flex flex-col gap-5 mt-6 w-full">
                <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed">
                  My intermediate education at Narayana Junior College was an important phase in shaping my academic
                  foundation and approach towards learning. Through the MPC curriculum, I developed a stronger
                  understanding of Mathematics, Physics, and Chemistry while strengthening my analytical thinking,
                  logical reasoning, and problem-solving abilities.
                </p>

                <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed">
                  Alongside my academic coursework, I prepared for and appeared in competitive entrance examinations,
                  including JEE and EAMCET. This journey challenged me to go beyond classroom learning, strengthen my
                  conceptual understanding, and apply knowledge under time constraints.
                </p>

                <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed">
                  The preparation and examination experience taught me discipline, consistency, time management, and how
                  to approach unfamiliar problems with patience and structured thinking.
                </p>

                <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed">
                  These experiences played a significant role in my academic growth and prepared me for the transition
                  into Computer Science and Engineering, where I continue to explore, learn, and solve problems through
                  technology.
                </p>
              </div>

              {/* Academic Focus Areas Footer */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2.5 mt-8"
              >
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400 mr-2">
                  Academic Focus:
                </span>
                {[
                  "Mathematics, Physics & Chemistry (MPC)",
                  "Competitive Exams (JEE & EAMCET)",
                  "Academic Discipline",
                ].map((track) => (
                  <span
                    key={track}
                    className="text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/25 text-[#93C5FD]"
                  >
                    {track}
                  </span>
                ))}
              </motion.div>

            </div>
          </motion.div>

          {/* Sri Gowthami High School Card - Smooth Scale & Glide-In Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative rounded-2xl border border-white/10 bg-transparent overflow-hidden px-6 py-10 sm:px-10 md:px-14 lg:px-16 flex flex-col text-left"
          >
            {/* Subtle Precision Horizon Light Beams in Sri Gowthami Theme Dark Saddle Brown */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1.5px] bg-gradient-to-r from-transparent via-[#8B4513]/80 to-transparent pointer-events-none z-20" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1.5px] bg-gradient-to-r from-transparent via-[#8B4513]/80 to-transparent pointer-events-none z-20" />

            {/* Background Watermark: Sri Gowthami School Emblem (Subtle & Proportioned) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex items-center justify-center">
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-[320px] md:h-[320px] opacity-[0.14] sm:opacity-[0.18]">
                <Image
                  src="/images/story/sri-gowthami-logo.png"
                  alt="Sri Gowthami Emblem Watermark"
                  fill
                  priority
                  className="object-contain object-center"
                />
              </div>
            </div>

            {/* Sri Gowthami Theme Tiny Particles (Dark Brown & White Palette) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
              {GOWTHAMI_PARTICLES.map((p, idx) => (
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

            {/* Foreground Foundation Content */}
            <div className="relative z-10 flex flex-col w-full">
              
              {/* Header: Logo + Degree + Institution + Timeline & Location */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  {/* Logo badge */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-white border border-white/20 p-1.5 shrink-0 hover:border-[#8B4513]/80 transition-colors group cursor-default">
                    <Image
                      src="/images/story/sri-gowthami-logo.png"
                      alt="Sri Gowthami High School Logo"
                      fill
                      className="object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Program & Institution */}
                  <div className="flex flex-col">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Secondary School Education — Class X
                    </h3>
                    
                    <span className="text-base sm:text-lg font-semibold text-[#C47D48] mt-1 w-fit">
                      Sri Gowthami High School
                    </span>
                  </div>
                </div>

                {/* Timeline, Percentage & Location Badge */}
                <div className="flex flex-col sm:items-end gap-1 text-xs sm:text-sm text-gray-400 font-normal shrink-0">
                  <span className="font-medium text-gray-300">Jaggayyapeta, Andhra Pradesh, India</span>
                  <span>
                    June 2021 – April 2022 · <strong className="text-white font-semibold">86.5%</strong>
                  </span>
                </div>
              </div>

              {/* Narrative Content */}
              <div className="flex flex-col gap-5 mt-6 w-full">
                <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed">
                  My academic journey began at Sri Gowthami High School, where I developed the foundations of learning,
                  discipline, and curiosity. These early years played an important role in shaping my approach towards
                  education, encouraging me to explore new subjects, understand concepts, and develop a consistent
                  learning mindset.
                </p>

                <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed">
                  Beyond academics, school life helped me build confidence, adaptability, and the ability to approach
                  challenges with patience and determination. It was during this phase that I began discovering my
                  interests and developing the mindset that continues to guide my learning journey.
                </p>

                <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed">
                  The knowledge, values, and experiences gained during these formative years became the foundation for my
                  higher education and my continued exploration of technology.
                </p>
              </div>

              {/* Academic Focus Areas Footer */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2.5 mt-8"
              >
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400 mr-2">
                  Academic Focus:
                </span>
                {[
                  "Secondary School Certificate (SSC)",
                  "Foundational Learning",
                  "Discipline & Consistency",
                ].map((track) => (
                  <span
                    key={track}
                    className="text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full bg-[#78350F]/20 border border-[#8B4513]/40 text-[#E8C4A2]"
                  >
                    {track}
                  </span>
                ))}
              </motion.div>

            </div>
          </motion.div>
        </div>

      </section>

      {/* Profile Picture Lightbox Modal */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsProfileOpen(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            {/* Close Button Top Right */}
            <button
              type="button"
              onClick={() => setIsProfileOpen(false)}
              aria-label="Close profile picture"
              className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 cursor-pointer focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Dialog Content (Click inside won't close) */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm sm:max-w-md md:max-w-lg w-full flex flex-col items-center"
            >
              {/* Profile Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl bg-[#0d0e12]">
                <Image
                  src="/images/achuth-profile.jpg"
                  alt="Manne Achuth"
                  fill
                  quality={100}
                  priority
                  className="object-cover object-center"
                />
              </div>

              {/* Caption Under Profile Image */}
              <div className="mt-5 text-center flex flex-col items-center">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Manne Achuth
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Founder &amp; Full Stack Developer at Kisan Khata
                </p>
                <p className="text-[11px] text-gray-500 mt-2">
                  Click anywhere or press Esc to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
