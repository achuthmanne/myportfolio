"use client";

import React, { use, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ShieldCheck, Trophy, Zap, MapPin } from 'lucide-react';

// Refined corporate easing curve (Apple / Vercel style)
const luxuryEase = [0.16, 1, 0.3, 1] as const;

const chipsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.4,
    },
  },
};

const chipItemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: luxuryEase,
    },
  },
};

export default function HackathonCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const [sweepDistance, setSweepDistance] = useState<number>(850);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateDistance = () => {
      if (typeof window !== 'undefined') {
        const desktop = window.innerWidth >= 1024;
        setIsDesktop(desktop);
        if (desktop && sectionRef.current && imageWrapperRef.current) {
          const secLeft = sectionRef.current.getBoundingClientRect().left;
          const imgLeft = imageWrapperRef.current.getBoundingClientRect().left;
          const diff = imgLeft - secLeft;
          if (diff > 100) {
            setSweepDistance(diff);
            return;
          }
        }
        setSweepDistance(desktop ? 850 : window.innerWidth * 0.8);
      }
    };

    updateDistance();
    const timer = setTimeout(updateDistance, 100);
    window.addEventListener('resize', updateDistance);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDistance);
    };
  }, []);

  return (
    <main className="w-full bg-[#07070a] text-white relative overflow-x-hidden selection:bg-red-500/30 selection:text-white">
      {/* ======================================================== */}
      {/* HERO SECTION (Full-Screen Cover with Synchronized Motion) */}
      {/* ======================================================== */}
      <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* 1. HERO COVER BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            initial={{ scale: 1.08, opacity: 0, filter: "blur(8px)" }}
            animate={{ 
              scale: [1.08, 1.0, 1.035, 1.0],
              opacity: 1, 
              filter: "blur(0px)" 
            }}
            transition={{ 
              scale: {
                times: [0, 0.08, 0.55, 1],
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut"
              },
              opacity: { duration: 1.2, ease: luxuryEase },
              filter: { duration: 1.2, ease: luxuryEase },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/images/trinetra-hero-cover.jpg"
              alt="Trinetra Hackathon In-Action"
              fill
              priority
              quality={95}
              className="object-cover object-center filter brightness-[0.42] contrast-[1.12] saturate-[1.15]"
            />
          </motion.div>

          {/* Cinematic Gradient Overlays */}
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Top smooth dark fade */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#07070a]/90 to-transparent pointer-events-none" />

          {/* Gentle, Natural Bottom Fade (Only softens the bottom edge without eating into the photo) */}
          <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-40 bg-gradient-to-t from-[#07070a] via-[#07070a]/70 to-transparent pointer-events-none z-10" />
        </div>

        {/* 2. TOP FLOATING NAVIGATION BAR */}
        <motion.header 
          initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: luxuryEase }}
          className="relative z-20 w-full px-6 py-6 sm:px-10 sm:py-8 flex items-center justify-between"
        >
          <Link 
            href="/#battlegrounds-section"
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-xl border border-white/10 hover:border-white/25 text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300 text-red-500" />
            <span>Back to Battlegrounds</span>
          </Link>

          {/* Organization / Location Badge */}
          <div className="hidden sm:inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-xl border border-white/10 hover:border-white/25 text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 shadow-lg cursor-default">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>VentureSpace • LPU</span>
          </div>
        </motion.header>

        {/* 3. CENTER HERO HEADLINE & TAGLINE CONTENT */}
        <section className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col items-center text-center my-auto">
          {/* Main Hackathon Name */}
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 28, filter: "blur(12px)", letterSpacing: "0.05em" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "-0.04em" }}
              transition={{ duration: 1.0, delay: 0.1, ease: luxuryEase }}
              className="text-6xl sm:text-8xl md:text-9xl font-black text-white uppercase drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)]"
            >
              TRINETRA
            </motion.h1>
          </div>

          {/* Punchy Tagline with Smooth Blur-to-Sharp Reveal */}
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.3, ease: luxuryEase }}
            className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-gray-200/90 font-normal leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          >
            Sleepless coding, deep-tech architecture, and rapid prototyping under intense 20-hour deadlines.
          </motion.p>

          {/* Key Feature Chips / Staggered Corporate Badges */}
          <motion.div
            variants={chipsContainerVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-3xl"
          >
            <motion.div 
              variants={chipItemVariants}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 hover:border-white/25 hover:bg-black/80 backdrop-blur-md text-xs sm:text-sm text-gray-300 shadow-md transition-colors duration-300"
            >
              <Clock className="w-4 h-4 text-red-500" />
              <span>20 Hours Non-Stop</span>
            </motion.div>

            <motion.div 
              variants={chipItemVariants}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 hover:border-white/25 hover:bg-black/80 backdrop-blur-md text-xs sm:text-sm text-gray-300 shadow-md transition-colors duration-300"
            >
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>Cybersecurity & Deep Tech</span>
            </motion.div>

            <motion.div 
              variants={chipItemVariants}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 hover:border-white/25 hover:bg-black/80 backdrop-blur-md text-xs sm:text-sm text-gray-300 shadow-md transition-colors duration-300"
            >
              <Trophy className="w-4 h-4 text-red-500" />
              <span>Project: <strong className="text-white">Trust Ballot</strong></span>
            </motion.div>

            <motion.div 
              variants={chipItemVariants}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 hover:border-white/25 hover:bg-black/80 backdrop-blur-md text-xs sm:text-sm text-gray-300 shadow-md transition-colors duration-300"
            >
              <Zap className="w-4 h-4 text-red-500" />
              <span>Live Action Build</span>
            </motion.div>
          </motion.div>
        </section>
      </section>

      {/* ======================================================== */}
      {/* SECTION 01: THE CHALLENGE (Expanded Spacious 2-Column Layout) */}
      {/* ======================================================== */}
      <section ref={sectionRef} className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 py-28 sm:py-36 flex flex-col items-start text-left">
        {/* Title Row with Sharp Red Bar */}
        <div className="relative flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Bold, Sharp 4-Corner Solid Red Vertical Bar */}
          <div className="w-1.5 sm:w-2 h-10 sm:h-14 bg-red-500 shrink-0" />

          {/* Masked Container: Automatically slides out from inside the red bar */}
          <div className="overflow-hidden py-1">
            <motion.h2
              initial={{ x: -160, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.85, ease: luxuryEase }}
              className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase"
            >
              THE CHALLENGE
            </motion.h2>
          </div>
        </div>

        {/* 2-Column Grid: Expanded Left Column (7 cols) + Right Image (5 cols) with Comfortable Gap */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (Matter / Problem Statement / Pillars - Wiper Unmask Reveal) */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-7 relative z-10 overflow-hidden p-1 -m-1">
            {/* Wiper Wipe Curtain: Slides from left to right revealing the matter like a car window wiper */}
            <motion.div
              initial={{ x: "0%" }}
              whileInView={{ x: "102%", transitionEnd: { display: "none" } }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.25, delay: 0.75, ease: luxuryEase }}
              className="absolute inset-0 z-30 bg-[#07070a] pointer-events-none flex"
            >
              {/* Sharp Red Wiper Blade Line sweeping across */}
              <div className="w-1.5 h-full bg-red-500 shrink-0" />
            </motion.div>

            {/* Context Statement */}
            <p className="text-base sm:text-lg md:text-[19px] text-gray-300/90 font-normal leading-relaxed max-w-3xl">
              Traditional democratic voting systems continue to suffer from centralized vulnerabilities, opaque tabulation, and an inherent lack of public trust.
            </p>

            {/* Unified Big Box (Contains Core Mandate + 3 Pillars inside with spacious tracking) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-6 sm:gap-7">
              {/* Header Label & Question */}
              <div className="flex flex-col gap-3">
                <span className="block text-[11px] sm:text-xs font-sans font-bold tracking-[0.2em] text-red-500 uppercase">
                  THE CORE PROBLEM STATEMENT
                </span>
                <p className="text-base sm:text-lg md:text-[21px] text-white/95 font-medium leading-[1.65] tracking-normal">
                  How can we architect a <span className="text-red-400 font-bold">decentralized, tamper-proof</span> digital voting infrastructure that guarantees <span className="underline decoration-red-500/60 underline-offset-4 font-semibold">100% cryptographic verifiability</span> and <span className="text-white font-bold">absolute voter anonymity</span>, without compromising on real-time transparency or scalability?
                </p>
              </div>

              {/* Subtle Divider Line */}
              <div className="w-full h-[1px] bg-white/[0.08]" />

              {/* 3 Structured Pillars (Spacious Cards with comfortable text kerning) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
                  <span className="font-sans text-xs text-red-500 font-bold tracking-wider block">01. IMMUTABILITY</span>
                  <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                    Distributed ledger architecture preventing retroactive tampering or ballot stuffing.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
                  <span className="font-sans text-xs text-red-500 font-bold tracking-wider block">02. PRIVACY</span>
                  <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                    Cryptographic proofs allowing vote verification without exposing voter identity.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
                  <span className="font-sans text-xs text-red-500 font-bold tracking-wider block">03. AUDITABILITY</span>
                  <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                    Publicly verifiable tallies completely eliminating reliance on centralized authorities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Dedicated 3D Thinking Character - Clean Static Smooth Slide Entrance) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative z-20">
            <motion.div
              ref={imageWrapperRef}
              initial={{
                x: isDesktop ? -sweepDistance : "-75%",
                opacity: 0,
              }}
              whileInView={{
                x: 0,
                opacity: 1,
              }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.25, delay: 0.75, ease: luxuryEase }}
              className="relative w-full max-w-[480px] lg:max-w-[540px] aspect-[1024/819] flex items-center justify-center select-none"
            >
              {/* Clean, Steady Static 3D Image (Zero wobble, Zero tilt, Zero shaking) */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/challenge-thinking-red-3d.png"
                  alt="3D Thinking Character with Red Metallic Question Mark"
                  fill
                  priority
                  quality={95}
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
