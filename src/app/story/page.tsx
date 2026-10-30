"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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

export default function StoryPage() {
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
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">EXPERIENCE</span>
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
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#93C5FD] to-[#3B82F6]">FOUNDATION</span>
          </h2>
          <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm lg:text-base font-light tracking-[0.14em] sm:tracking-[0.2em] uppercase whitespace-nowrap max-w-full">
            The knowledge and experiences shaping my path forward
          </p>
        </motion.div>

        {/* Foundation Cards Container */}
        <div className="w-full flex flex-col gap-8">
          {/* Institutional cards will be added here one by one */}
        </div>

      </section>
    </main>
  );
}
