"use client";

import React, { use, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ShieldCheck, Trophy, Zap, MapPin, X, Maximize2, ArrowUpRight } from 'lucide-react';

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

const gearUpTeam = [
  { name: 'Manne Achuth', role: 'Team Lead | Full Stack Developer', linkedin: 'https://www.linkedin.com/in/manne-achuth-629394332/' },
  { name: 'Pateru Thanoj', role: 'ML Specialist', linkedin: 'https://www.linkedin.com/in/pateruthanoj30/' },
  { name: 'Meghanath Reddy', role: 'ML Specialist', linkedin: 'https://www.linkedin.com/in/meghanath-reddy93/' },
  { name: 'Saggurthi Avinash Matthew', role: 'ML Specialist', linkedin: 'https://www.linkedin.com/in/saggurthi-avinash/' },
  { name: 'Pamireddy Manohar Reddy', role: 'Data Scientist', linkedin: 'https://www.linkedin.com/in/pamireddy-manohar-reddy-7628b9380/' },
  { name: 'Mahini Singh', role: 'Pitch & Presenter', linkedin: 'https://www.linkedin.com/in/mahini-singh-200580378/' },
];

const trinetraTeam = [
  { name: 'Manne Achuth', role: 'Team Lead | Full Stack Web3 & Smart Contract Developer', linkedin: 'https://www.linkedin.com/in/manne-achuth-629394332/' },
  { name: 'Saggurthi Avinash Matthew', role: 'Smart Contract Architecture & Decentralized Systems', linkedin: 'https://www.linkedin.com/in/saggurthi-avinash/' },
];

export default function HackathonCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isGearUp = resolvedParams.id?.toLowerCase().includes('gear');

  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const [sweepDistance, setSweepDistance] = useState<number>(850);

  const section2Ref = useRef<HTMLElement>(null);
  const imageWrapper2Ref = useRef<HTMLDivElement>(null);
  const [sweepDistance2, setSweepDistance2] = useState<number>(850);

  const section3Ref = useRef<HTMLElement>(null);
  const imageWrapper3Ref = useRef<HTMLDivElement>(null);
  const [sweepDistance3, setSweepDistance3] = useState<number>(850);

  const section5Ref = useRef<HTMLElement>(null);
  const imageWrapper5Ref = useRef<HTMLDivElement>(null);
  const [sweepDistance5, setSweepDistance5] = useState<number>(850);

  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
    caption: string;
    badge: string;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const updateDistance = () => {
      if (typeof window !== 'undefined') {
        const desktop = window.innerWidth >= 1024;
        setIsDesktop(desktop);
        setSweepDistance(desktop ? 850 : window.innerWidth * 0.8);
        setSweepDistance2(desktop ? 850 : window.innerWidth * 0.8);
        setSweepDistance3(desktop ? 850 : window.innerWidth * 0.8);
        setSweepDistance5(desktop ? 850 : window.innerWidth * 0.8);
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
    <main className={`w-full bg-[#07070a] text-white relative overflow-x-hidden ${isGearUp ? 'selection:bg-blue-500/30 selection:text-white' : 'selection:bg-red-500/30 selection:text-white'}`}>
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
              src={isGearUp ? "/images/gear-up-hero-cover.jpg" : "/images/trinetra-hero-cover.jpg"}
              alt={isGearUp ? "Gear Up Season 5 Hackathon Team" : "Trinetra Hackathon In-Action"}
              fill
              priority
              quality={95}
              className={`object-cover ${isGearUp ? 'object-[center_28%] filter brightness-[0.46] contrast-[1.1] saturate-[1.12]' : 'object-center filter brightness-[0.42] contrast-[1.12] saturate-[1.15]'}`}
            />
          </motion.div>

          {/* Cinematic Gradient Overlays */}
          <div className="absolute inset-0 bg-black/35" />
          
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
          className="relative z-20 w-full px-6 py-6 sm:px-10 sm:py-8 flex items-center justify-end"
        >
          {/* Organization / Location Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-xl border border-white/10 hover:border-white/25 text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 shadow-lg cursor-default">
            <MapPin className={`w-4 h-4 ${isGearUp ? 'text-blue-500' : 'text-red-500'}`} />
            <span>{isGearUp ? 'Block 25 • School of CSE, LPU' : 'Block 14 • Mittal School of Business, LPU'}</span>
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
              {isGearUp ? 'GEAR UP' : 'TRINETRA'}
            </motion.h1>
          </div>

          {/* Punchy Tagline with Smooth Blur-to-Sharp Reveal */}
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.3, ease: luxuryEase }}
            className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-gray-200/90 font-normal leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          >
            {isGearUp 
              ? '36 hours of non-stop adrenaline, rapid engineering, and relentless innovation under crazy deadlines.'
              : 'Sleepless coding, deep-tech architecture, and rapid prototyping under intense 20-hour deadlines.'}
          </motion.p>

          {/* Key Feature Chips / Staggered Corporate Badges: 3 On Top, 1 Below */}
          <motion.div
            variants={chipsContainerVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-3 sm:gap-4 w-full"
          >
            {isGearUp ? (
              <>
                {/* Top Row: 3 Chips */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  <motion.div 
                    variants={chipItemVariants}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 hover:border-white/25 hover:bg-black/80 backdrop-blur-md text-xs sm:text-sm text-gray-300 shadow-md transition-colors duration-300"
                  >
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>36 Hours Non-Stop</span>
                  </motion.div>

                  <motion.div 
                    variants={chipItemVariants}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 hover:border-white/25 hover:bg-black/80 backdrop-blur-md text-xs sm:text-sm text-gray-300 shadow-md transition-colors duration-300"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-500" />
                    <span>National Hackathon</span>
                  </motion.div>

                  <motion.div 
                    variants={chipItemVariants}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 hover:border-white/25 hover:bg-black/80 backdrop-blur-md text-xs sm:text-sm text-gray-300 shadow-md transition-colors duration-300"
                  >
                    <Trophy className="w-4 h-4 text-blue-500" />
                    <span>Project: <strong className="text-white">RailSamay</strong></span>
                  </motion.div>
                </div>

                {/* Bottom Row: 1 Chip (Centered) */}
                <div className="flex items-center justify-center">
                  <motion.div 
                    variants={chipItemVariants}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 hover:border-white/25 hover:bg-black/80 backdrop-blur-md text-xs sm:text-sm text-gray-300 shadow-md transition-colors duration-300"
                  >
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span>Live Action Build</span>
                  </motion.div>
                </div>
              </>
            ) : (
              <>
                {/* Top Row: 3 Chips */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
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
                </div>

                {/* Bottom Row: 1 Chip (Centered) */}
                <div className="flex items-center justify-center">
                  <motion.div 
                    variants={chipItemVariants}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 hover:border-white/25 hover:bg-black/80 backdrop-blur-md text-xs sm:text-sm text-gray-300 shadow-md transition-colors duration-300"
                  >
                    <Zap className="w-4 h-4 text-red-500" />
                    <span>Live Action Build</span>
                  </motion.div>
                </div>
              </>
            )}
          </motion.div>
        </section>
      </section>

      {/* ======================================================== */}
      {/* SECTION 01: THE CHALLENGE (Spacious 2-Column Layout with Wiper Reveal) */}
      {/* ======================================================== */}
      <section ref={sectionRef} className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 py-28 sm:py-36 flex flex-col items-start text-left">
        {/* Title Row with Sharp Colored Bar */}
        <div className="relative flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Bold, Sharp 4-Corner Solid Colored Vertical Bar */}
          <div className={`w-1.5 sm:w-2 h-10 sm:h-14 shrink-0 ${isGearUp ? 'bg-blue-500' : 'bg-red-500'}`} />

          {/* Masked Container: Automatically slides out from inside the bar */}
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
            {/* Wiper Wipe Curtain: Slides from left to right revealing the matter in clean sync with the 3D image */}
            <motion.div
              initial={{ x: "0%" }}
              whileInView={{ x: "102%", transitionEnd: { display: "none" } }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.25, delay: 0.75, ease: luxuryEase }}
              className="absolute inset-0 z-30 bg-[#07070a] pointer-events-none"
            />

            {/* Context Statement */}
            <p className="text-base sm:text-lg md:text-[19px] text-gray-300/90 font-normal leading-relaxed max-w-3xl">
              {isGearUp
                ? "Indian Railways' vast passenger network still relies on static timetables and estimated delays, leaving millions of daily commuters and operations vulnerable to unpredictable cascading bottlenecks."
                : "Traditional democratic voting systems continue to suffer from centralized vulnerabilities, opaque tabulation, and an inherent lack of public trust."}
            </p>

            {/* Unified Big Box (Contains Core Mandate + 3 Pillars inside with spacious tracking) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-6 sm:gap-7">
              {/* Header Label & Question */}
              <div className="flex flex-col gap-3">
                <span className="block text-[11px] sm:text-xs font-sans font-bold tracking-[0.2em] text-gray-400 uppercase">
                  THE CORE PROBLEM STATEMENT
                </span>

                <p className="text-base sm:text-lg md:text-[21px] text-white/95 font-medium leading-[1.65] tracking-normal">
                  {isGearUp ? (
                    <>
                      How can we engineer a <span className="text-blue-400 font-bold">real-time, data-driven dynamic forecasting engine</span> that continuously predicts train arrival times across thousands of coaching routes, eliminating cascading delays while guaranteeing <span className="underline decoration-blue-500/60 underline-offset-4 font-semibold">millisecond-latency precision</span> for passengers and station controllers?
                    </>
                  ) : (
                    <>
                      How can we architect a <span className="text-red-400 font-bold">decentralized, tamper-proof</span> digital voting infrastructure that guarantees <span className="underline decoration-red-500/60 underline-offset-4 font-semibold">100% cryptographic verifiability</span> and <span className="text-white font-bold">absolute voter anonymity</span>, without compromising on real-time transparency or scalability?
                    </>
                  )}
                </p>
              </div>

              {/* Subtle Divider Line */}
              <div className="w-full h-[1px] bg-white/[0.08]" />

              {/* 3 Structured Pillars (Spacious Cards with comfortable text kerning) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {isGearUp ? (
                  <>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 transition-colors duration-300 hover:border-blue-500/20">
                      <span className="font-sans text-xs font-bold tracking-wider block">
                        <span className="text-blue-500 mr-1.5 font-bold">01.</span>
                        <span className="text-white">DYNAMIC TELEMETRY</span>
                      </span>
                      <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                        Live GPS tracking and sectional speed integration eliminating reliance on static timetable estimates.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 transition-colors duration-300 hover:border-blue-500/20">
                      <span className="font-sans text-xs font-bold tracking-wider block">
                        <span className="text-blue-500 mr-1.5 font-bold">02.</span>
                        <span className="text-white">PREDICTIVE ML ENGINE</span>
                      </span>
                      <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                        Adaptive machine learning forecasting signal halts, preceding train delays, and downstream network congestion.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 transition-colors duration-300 hover:border-blue-500/20">
                      <span className="font-sans text-xs font-bold tracking-wider block">
                        <span className="text-blue-500 mr-1.5 font-bold">03.</span>
                        <span className="text-white">OPERATIONAL SYNC</span>
                      </span>
                      <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                        High-concurrency APIs powering real-time platform allocation, crew scheduling, and unified passenger displays.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 transition-colors duration-300 hover:border-red-500/20">
                      <span className="font-sans text-xs font-bold tracking-wider block">
                        <span className="text-red-500 mr-1.5 font-bold">01.</span>
                        <span className="text-white">IMMUTABILITY</span>
                      </span>
                      <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                        Distributed ledger architecture preventing retroactive tampering or ballot stuffing.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 transition-colors duration-300 hover:border-red-500/20">
                      <span className="font-sans text-xs font-bold tracking-wider block">
                        <span className="text-red-500 mr-1.5 font-bold">02.</span>
                        <span className="text-white">PRIVACY</span>
                      </span>
                      <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                        Cryptographic proofs allowing vote verification without exposing voter identity.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 transition-colors duration-300 hover:border-red-500/20">
                      <span className="font-sans text-xs font-bold tracking-wider block">
                        <span className="text-red-500 mr-1.5 font-bold">03.</span>
                        <span className="text-white">AUDITABILITY</span>
                      </span>
                      <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                        Publicly verifiable tallies completely eliminating reliance on centralized authorities.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column (Dedicated 3D Character / Card Artwork - Clean Static Smooth Slide Entrance) */}
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
                  src={isGearUp ? "/images/gearup-thinking-blue-v2.png" : "/images/challenge-thinking-red-3d.png"}
                  alt={isGearUp ? "3D Thinking Character with Blue Metallic Question Mark" : "3D Thinking Character with Red Metallic Question Mark"}
                  fill
                  priority
                  quality={95}
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 02: WHAT WE BUILT (Trinetra: Trust Ballot | Gear Up: RailSamay) */}
      {/* ======================================================== */}
      <section ref={section2Ref} className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 py-28 sm:py-36 flex flex-col items-start text-left">
        {/* Title Row with Sharp Colored Bar (Reversed: Right-Aligned with Colored Bar on the Right & Slide from Right to Left) */}
        <div className="w-full flex justify-end mb-8 sm:mb-12">
          <div className="relative flex items-center gap-4 sm:gap-6 flex-row-reverse">
            {/* Bold, Sharp 4-Corner Solid Colored Vertical Bar on Right */}
            <div className={`w-1.5 sm:w-2 h-10 sm:h-14 shrink-0 ${isGearUp ? 'bg-blue-500' : 'bg-red-500'}`} />

            {/* Masked Container: Automatically slides out from inside the bar from Right to Left */}
            <div className="overflow-hidden py-1">
              <motion.h2
                initial={{ x: 160, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.85, ease: luxuryEase }}
                className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase text-right"
              >
                WHAT WE BUILT
              </motion.h2>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Left Image (5 cols) + Right Matter (7 cols) in Reverse Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (Dedicated 3D Character Coding Artwork - Sweeping in from Right to Left) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start items-center relative z-20">
            <motion.div
              ref={imageWrapper2Ref}
              initial={{
                x: isDesktop ? sweepDistance2 : "75%",
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
                  src={isGearUp ? "/images/gearup-what-we-built-3d.png" : "/images/trinetra-what-we-built-3d.png"}
                  alt={isGearUp ? "3D Character Coding on Laptop with Indian Railways Clock Emblem" : "3D Boy Coding on Laptop with Red Metallic Ballot Box"}
                  fill
                  priority
                  quality={95}
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column (Matter / Architecture / Pillars - Reverse Wiper Unmask Reveal from Right to Left) */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-7 relative z-10 overflow-hidden p-1 -m-1">
            {/* Reverse Wiper Curtain: Slides from right to left (0% -> -102%) revealing the matter in clean sync with the 3D image sweeping from right to left */}
            <motion.div
              initial={{ x: "0%" }}
              whileInView={{ x: "-102%", transitionEnd: { display: "none" } }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.25, delay: 0.75, ease: luxuryEase }}
              className="absolute inset-0 z-30 bg-[#07070a] pointer-events-none"
            />

            {/* Context Statement */}
            {isGearUp ? (
              <p className="text-base sm:text-lg md:text-[19px] text-gray-300/90 font-normal leading-relaxed max-w-3xl">
                To move beyond Indian Railways’ legacy static delay tracking (NTES), we engineered <strong className="text-white font-semibold">RailSamay</strong> — a comprehensive Automatic Train Supervision (ATS) & Dynamic AI Forecasting ecosystem that transforms raw RTIS telemetry into predictive ETAs and proactive traffic control.
              </p>
            ) : (
              <p className="text-base sm:text-lg md:text-[19px] text-gray-300/90 font-normal leading-relaxed max-w-3xl">
                As juniors stepping into a 20-hour hackathon for the very first time, we were excited to experiment and learn by doing. We built <strong className="text-white font-semibold">Trust Ballot</strong> — our humble first prototype exploring how basic blockchain concepts could make digital voting more transparent and tamper-resistant.
              </p>
            )}

            {/* Unified Big Box (Contains Prototype Concept + 3 Practical Pillars) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-6 sm:gap-7">
              {/* Header Label & Headline */}
              <div className="flex flex-col gap-3">
                <span className="block text-[11px] sm:text-xs font-sans font-bold tracking-[0.2em] text-gray-400 uppercase">
                  {isGearUp ? "AUTOMATIC TRAIN SUPERVISION & DYNAMIC AI FORECASTING" : "OUR HACKATHON PROTOTYPE"}
                </span>

                {isGearUp ? (
                  <p className="text-base sm:text-lg md:text-[21px] text-white/95 font-medium leading-[1.65] tracking-normal">
                    RailSamay fuels live <span className="text-blue-400 font-bold">RTIS GPS & speed telemetry</span> into dynamic ETA forecasting models and an <span className="text-orange-400 font-bold">automated AI conflict resolution engine</span> — bridging the ATS Control Room and passenger screens with <span className="underline decoration-blue-500/60 underline-offset-4 font-semibold">sub-second cross-tab synchronization</span>.
                  </p>
                ) : (
                  <p className="text-base sm:text-lg md:text-[21px] text-white/95 font-medium leading-[1.65] tracking-normal">
                    Trust Ballot connected a straightforward web frontend to an <span className="text-red-400 font-bold">Ethereum testnet smart contract</span> — enabling voters to connect a crypto wallet and log their vote directly to an <span className="text-white font-bold">open, immutable ledger</span> without needing a central server.
                  </p>
                )}
              </div>

              {/* Subtle Divider Line */}
              <div className="w-full h-[1px] bg-white/[0.08]" />

              {/* 3 Structured Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {isGearUp ? (
                  <>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 transition-colors duration-300 hover:border-blue-500/20">
                      <span className="font-sans text-xs font-bold tracking-wider block">
                        <span className="text-blue-500 mr-1.5 font-bold">01.</span>
                        <span className="text-white">ATS CONTROL ROOM</span>
                      </span>
                      <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                        Division & Zone command center with Leaflet GIS rail tracking, Recharts KPI donuts, and 1-click AI conflict resolution to prevent junction gridlocks.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 transition-colors duration-300 hover:border-orange-500/20">
                      <span className="font-sans text-xs font-bold tracking-wider block">
                        <span className="text-orange-500 mr-1.5 font-bold">02.</span>
                        <span className="text-white">DUAL-SYNC ENGINE</span>
                      </span>
                      <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                        Real-time cross-tab & WebSocket architecture: controller actions (e.g. 6-min hold at Majri) instantly cascade live delay shifts to passengers without refreshing.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 transition-colors duration-300 hover:border-blue-500/20">
                      <span className="font-sans text-xs font-bold tracking-wider block">
                        <span className="text-blue-500 mr-1.5 font-bold">03.</span>
                        <span className="text-white">DYNAMIC ETA & BLAST RADIUS</span>
                      </span>
                      <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                        Live speed profile and recovery probability models predicting cascading delays across 5 master scenarios (Nagpur conflict, Pathankot platforming, etc.).
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 transition-colors duration-300 hover:border-red-500/20">
                      <span className="font-sans text-xs font-bold tracking-wider block">
                        <span className="text-red-500 mr-1.5 font-bold">01.</span>
                        <span className="text-white">BASIC SMART CONTRACTS</span>
                      </span>
                      <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                        Wrote simple Solidity contracts on a testnet to register candidate votes and prevent duplicate entries from the same address.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 transition-colors duration-300 hover:border-red-500/20">
                      <span className="font-sans text-xs font-bold tracking-wider block">
                        <span className="text-red-500 mr-1.5 font-bold">02.</span>
                        <span className="text-white">METAMASK WALLET AUTH</span>
                      </span>
                      <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                        Integrated MetaMask for wallet-based authentication, replacing traditional username/password logins with cryptographic keys.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 transition-colors duration-300 hover:border-red-500/20">
                      <span className="font-sans text-xs font-bold tracking-wider block">
                        <span className="text-red-500 mr-1.5 font-bold">03.</span>
                        <span className="text-white">LIVE ON-CHAIN TALLY</span>
                      </span>
                      <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                        Built a lightweight UI dashboard that read vote totals directly from the smart contract, making the count publicly viewable in real time.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 03: TECH STACK & SKILLS (Trinetra: Trust Ballot | Gear Up: RailSamay) */}
      {/* ======================================================== */}
      <section ref={section3Ref} className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 py-28 sm:py-36 flex flex-col items-start text-left">
        {/* Title Row with Sharp Colored Bar (Left-to-Right layout like Section 01) */}
        <div className="relative flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Bold, Sharp 4-Corner Solid Colored Vertical Bar */}
          <div className={`w-1.5 sm:w-2 h-10 sm:h-14 shrink-0 ${isGearUp ? 'bg-blue-500' : 'bg-red-500'}`} />

          {/* Masked Container: Slides out from inside the bar from Left to Right */}
          <div className="overflow-hidden py-1">
            <motion.h2
              initial={{ x: -160, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.85, ease: luxuryEase }}
              className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase"
            >
              TECH STACK & SKILLS
            </motion.h2>
          </div>
        </div>

        {/* 2-Column Grid: Left Matter (7 cols) + Right Image (5 cols) in Left-to-Right Motion */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (Categorized Tech Matrix - Wiper Unmask Reveal Left to Right) */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-7 relative z-10 overflow-hidden p-1 -m-1">
            {/* Wiper Curtain: Slides from left to right (0% -> 102%) revealing the tech stack in sync with the 3D character */}
            <motion.div
              initial={{ x: "0%" }}
              whileInView={{ x: "102%", transitionEnd: { display: "none" } }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.25, delay: 0.75, ease: luxuryEase }}
              className="absolute inset-0 z-30 bg-[#07070a] pointer-events-none"
            />

            {/* Context Statement */}
            {isGearUp ? (
              <p className="text-base sm:text-lg md:text-[19px] text-gray-300/90 font-normal leading-relaxed max-w-3xl">
                To handle high-frequency train telemetry and deliver real-time supervisory control, we architected RailSamay across four tightly decoupled layers — combining an asynchronous Python computation core with a reactive geospatial interface.
              </p>
            ) : (
              <p className="text-base sm:text-lg md:text-[19px] text-gray-300/90 font-normal leading-relaxed max-w-3xl">
                As eager junior builders exploring decentralized systems for the first time, we designed Trust Ballot across four practical Web3 tiers — connecting a lightweight React interface to transparent Ethereum testnet contracts via MetaMask authentication.
              </p>
            )}

            {/* Categorized Tech Architecture Matrix (2x2 Grid with distinct domain cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {isGearUp ? (
                <>
                  {/* 1. Client & Geospatial Interface */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-3 transition-colors duration-300 hover:border-blue-500/30 group">
                    <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-gray-400 uppercase">
                      CLIENT & GIS UI
                    </span>
                    
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
                        React.js (Vite)
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-medium text-gray-200">
                        Tailwind CSS
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
                        Leaflet (React-Leaflet)
                      </span>
                    </div>

                    <p className="text-[13px] text-gray-300/80 leading-[1.65] font-normal tracking-normal pt-1">
                      Engineered high-performance ATS controller dashboards with custom GIS railway network overlays, live train marker pins, and interactive station inspection.
                    </p>
                  </div>

                  {/* 2. Real-Time State & Sync Bus */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-3 transition-colors duration-300 hover:border-orange-500/30 group">
                    <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-gray-400 uppercase">
                      REAL-TIME SYNC
                    </span>
                    
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400">
                        SimulationStore
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-medium text-gray-200">
                        WebSockets
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400">
                        Cross-Tab Sync
                      </span>
                    </div>

                    <p className="text-[13px] text-gray-300/80 leading-[1.65] font-normal tracking-normal pt-1">
                      Custom event-driven broadcast architecture ensuring Section Controller actions (e.g. holds, priority switches) immediately propagate to passenger tabs with zero latency.
                    </p>
                  </div>

                  {/* 3. Computation Engine & AI Conflict Resolution */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-3 transition-colors duration-300 hover:border-blue-500/30 group">
                    <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-gray-400 uppercase">
                      CORE ENGINE & AI
                    </span>
                    
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
                        Python
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-medium text-gray-200">
                        FastAPI
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
                        Async Telemetry API
                      </span>
                    </div>

                    <p className="text-[13px] text-gray-300/80 leading-[1.65] font-normal tracking-normal pt-1">
                      Asynchronous backend ingesting live RTIS GPS & speed feeds to dynamically compute downstream arrival variances and generate automated 1-click conflict solutions.
                    </p>
                  </div>

                  {/* 4. Data Layer & Visual Telemetry */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-3 transition-colors duration-300 hover:border-orange-500/30 group">
                    <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-gray-400 uppercase">
                      DATA & ANALYTICS
                    </span>
                    
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400">
                        MongoDB
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-medium text-gray-200">
                        Recharts Analytics
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400">
                        14+ IR Route Datasets
                      </span>
                    </div>

                    <p className="text-[13px] text-gray-300/80 leading-[1.65] font-normal tracking-normal pt-1">
                      Processed historical Indian Railways routes and sectional speed limits, visualizing live punctuality donut metrics and delay recovery probability gauges.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* 1. Client & Wallet Auth */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-3 transition-colors duration-300 hover:border-red-500/30 group">
                    <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-gray-400 uppercase">
                      CLIENT & WALLET AUTH
                    </span>
                    
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400">
                        React.js (Vite)
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-medium text-gray-200">
                        MetaMask SDK
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400">
                        Tailwind CSS
                      </span>
                    </div>

                    <p className="text-[13px] text-gray-300/80 leading-[1.65] font-normal tracking-normal pt-1">
                      Built a lightweight, responsive voter portal allowing voters to authenticate via their MetaMask crypto wallet instead of traditional passwords.
                    </p>
                  </div>

                  {/* 2. Smart Contract Ledger */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-3 transition-colors duration-300 hover:border-red-500/30 group">
                    <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-gray-400 uppercase">
                      SMART CONTRACT LEDGER
                    </span>
                    
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400">
                        Solidity
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-medium text-gray-200">
                        Ethereum Testnet
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400">
                        Remix IDE
                      </span>
                    </div>

                    <p className="text-[13px] text-gray-300/80 leading-[1.65] font-normal tracking-normal pt-1">
                      Wrote and tested basic Solidity smart contracts to register candidate choices on-chain and prevent duplicate votes from the same address.
                    </p>
                  </div>

                  {/* 3. Web3 Contract Integration */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-3 transition-colors duration-300 hover:border-red-500/30 group">
                    <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-gray-400 uppercase">
                      WEB3 INTEGRATION
                    </span>
                    
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400">
                        Ethers.js
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-medium text-gray-200">
                        Web3 Provider
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400">
                        RPC Testnet Nodes
                      </span>
                    </div>

                    <p className="text-[13px] text-gray-300/80 leading-[1.65] font-normal tracking-normal pt-1">
                      Connected the frontend directly to Ethereum smart contract methods, broadcasting vote transactions to testnet nodes with instant on-screen confirmations.
                    </p>
                  </div>

                  {/* 4. On-Chain Tally & State */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-3 transition-colors duration-300 hover:border-red-500/30 group">
                    <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-gray-400 uppercase">
                      ON-CHAIN TALLY & STATE
                    </span>
                    
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400">
                        Contract Events
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-medium text-gray-200">
                        Immutable Ledger
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400">
                        Live Results UI
                      </span>
                    </div>

                    <p className="text-[13px] text-gray-300/80 leading-[1.65] font-normal tracking-normal pt-1">
                      Read vote tallies directly from the public smart contract state, enabling a live, decentralized election count without relying on centralized servers.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column (Dedicated 3D Character with Orbiting Tech Stack Artwork) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative z-20">
            <motion.div
              ref={imageWrapper3Ref}
              initial={{
                x: isDesktop ? -sweepDistance3 : "-75%",
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
                  src={isGearUp ? "/images/gearup-tech-stack-3d.png" : "/images/trinetra-tech-stack-3d.png"}
                  alt={isGearUp ? "3D Developer with RailSamay Orbiting Tech Stack" : "3D Junior Developer with Trust Ballot Web3 Tech Stack"}
                  fill
                  priority
                  quality={95}
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ======================================================== */}
      {/* SECTION 04: HACKATHON SNAPSHOT (Gear Up & Trinetra Bento) */}
      {/* ======================================================== */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 py-28 sm:py-36 flex flex-col items-end text-right">
        {/* Title Row with Sharp Colored Bar on the Right (Opposite: Right to Left) */}
        <div className="w-full flex justify-end mb-6 sm:mb-8">
          <div className="relative flex items-center gap-4 sm:gap-6 flex-row-reverse">
            {/* Bold, Sharp 4-Corner Solid Colored Vertical Bar on Right */}
            <div className={`w-1.5 sm:w-2 h-10 sm:h-14 ${isGearUp ? "bg-blue-500" : "bg-red-500"} shrink-0`} />

            {/* Masked Container: Slides out from inside the bar from Right to Left */}
            <div className="overflow-hidden py-1">
              <motion.h2
                initial={{ x: 160, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.85, ease: luxuryEase }}
                className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase text-right"
              >
                HACKATHON SNAPSHOT
              </motion.h2>
            </div>
          </div>
        </div>

        {/* Context Statement */}
        <p className="text-base sm:text-lg md:text-[19px] text-gray-300/90 font-normal leading-relaxed max-w-3xl mb-10 sm:mb-14 text-right">
          {isGearUp
            ? "Unfiltered captures from the 36-hour sprint at School of CSE, LPU — featuring the live hacking arena, team strategy sessions, and post-evaluation jury moments."
            : "Raw captures from the 20-hour sprint at Mittal School of Business, LPU — coding the Trust Ballot decentralized prototype, official credentials, and jury defense."}
        </p>

        {/* Full-Width Bento Grid (Dynamic cards with varied aspect ratios & interactive lightbox) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 text-left">
          {isGearUp ? (
            <>
            {/* 1. Hero Bento Card: Live Hacking Table (6 cols on lg) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: luxuryEase }}
              onClick={() => setSelectedImage({
                src: '/images/gearup/snapshot-table.jpg',
                alt: 'Team coding live at hackathon table',
                title: '36-Hour Non-Stop Hacking Arena',
                caption: 'Locked in at the hackathon desks with live notebooks, telemetry models & coding sprints.',
                badge: 'Live Hacking Arena'
              })}
              className="md:col-span-12 lg:col-span-6 relative h-[380px] sm:h-[440px] rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-blue-500/50 bg-white/[0.02] shadow-2xl transition-all duration-500"
            >
              <Image
                src="/images/gearup/snapshot-table.jpg"
                alt="Team coding live at hackathon table"
                fill
                priority
                quality={95}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Cinematic Dark Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top Right Expand Icon Only (Top Left Chip Removed) */}
              <div className="absolute top-5 right-5 z-10 pointer-events-none">
                <span className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300 inline-flex items-center justify-center">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
                  36-Hour Non-Stop Hacking Arena
                </h3>
                <p className="text-xs sm:text-sm text-gray-300/80 font-normal line-clamp-2 max-w-xl">
                  Locked in at the hackathon desks with live notebooks, telemetry models & coding sprints under the &apos;Motivation & Habit&apos; arena.
                </p>
              </div>
            </motion.div>

            {/* 2. Portrait Bento Card: Badge Pair 1 (3 cols on lg) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.08, ease: luxuryEase }}
              onClick={() => setSelectedImage({
                src: '/images/gearup/snapshot-badge-pair-1.jpg',
                alt: 'Team members holding Gear Up Season 5 participant badge',
                title: 'Gear Up Participant Pass',
                caption: 'Official Season 5 builder credentials at the workstation desk.',
                badge: 'Delegate Credentials'
              })}
              className="md:col-span-6 lg:col-span-3 relative h-[380px] sm:h-[440px] rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-blue-500/50 bg-white/[0.02] shadow-2xl transition-all duration-500"
            >
              <Image
                src="/images/gearup/snapshot-badge-pair-1.jpg"
                alt="Team members holding Gear Up Season 5 participant badge"
                fill
                priority
                quality={95}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Cinematic Dark Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top Right Expand Icon Only (Top Left Chip Removed) */}
              <div className="absolute top-5 right-5 z-10 pointer-events-none">
                <span className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300 inline-flex items-center justify-center">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mb-1">
                  Participant Pass
                </h3>
                <p className="text-xs text-gray-300/80 font-normal line-clamp-2">
                  Official Season 5 credentials at the workstation.
                </p>
              </div>
            </motion.div>

            {/* 3. Portrait Bento Card: Badge Pair 2 (3 cols on lg) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.12, ease: luxuryEase }}
              onClick={() => setSelectedImage({
                src: '/images/gearup/snapshot-badge-pair-2.jpg',
                alt: 'Team members proudly presenting official badges',
                title: 'Season 5 Finalists',
                caption: 'Proudly presenting official hackathon badges at Block 25.',
                badge: 'Badge Showcase'
              })}
              className="md:col-span-6 lg:col-span-3 relative h-[380px] sm:h-[440px] rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-blue-500/50 bg-white/[0.02] shadow-2xl transition-all duration-500"
            >
              <Image
                src="/images/gearup/snapshot-badge-pair-2.jpg"
                alt="Team members proudly presenting official badges"
                fill
                priority
                quality={95}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Cinematic Dark Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top Right Expand Icon Only (Top Left Chip Removed) */}
              <div className="absolute top-5 right-5 z-10 pointer-events-none">
                <span className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300 inline-flex items-center justify-center">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mb-1">
                  Season 5 Finalists
                </h3>
                <p className="text-xs text-gray-300/80 font-normal line-clamp-2">
                  Official hackathon credentials at Block 25.
                </p>
              </div>
            </motion.div>

            {/* 4. Wide Bento Card: Official Lineup (6 cols on lg) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.16, ease: luxuryEase }}
              onClick={() => setSelectedImage({
                src: '/images/gearup/snapshot-lineup.jpg',
                alt: 'Full official team portrait lineup',
                title: 'The RailSamay Ensemble',
                caption: 'All 6 team builders unified in delegate dress code after presenting the ATS ecosystem.',
                badge: 'Official Squad'
              })}
              className="md:col-span-12 lg:col-span-6 relative h-[320px] sm:h-[360px] rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-blue-500/50 bg-white/[0.02] shadow-2xl transition-all duration-500"
            >
              <Image
                src="/images/gearup/snapshot-lineup.jpg"
                alt="Full official team portrait lineup"
                fill
                priority
                quality={95}
                className="object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Cinematic Dark Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top Right Expand Icon Only (Top Left Chip Removed) */}
              <div className="absolute top-5 right-5 z-10 pointer-events-none">
                <span className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300 inline-flex items-center justify-center">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
                  The RailSamay Ensemble
                </h3>
                <p className="text-xs sm:text-sm text-gray-300/80 font-normal line-clamp-1">
                  Unified team portrait following the successful ATS ecosystem demo at LPU.
                </p>
              </div>
            </motion.div>

            {/* 5. Wide Bento Card: Auditorium Wide Angle (6 cols on lg) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2, ease: luxuryEase }}
              onClick={() => setSelectedImage({
                src: '/images/gearup/snapshot-auditorium-1.jpg',
                alt: 'Wide angle team selfie in the presentation hall',
                title: 'Jury Defense & Showcase',
                caption: 'Capturing the final moments post-evaluation inside the grand presentation auditorium.',
                badge: 'Block 25 Stage'
              })}
              className="md:col-span-12 lg:col-span-6 relative h-[320px] sm:h-[360px] rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-blue-500/50 bg-white/[0.02] shadow-2xl transition-all duration-500"
            >
              <Image
                src="/images/gearup/snapshot-auditorium-1.jpg"
                alt="Wide angle team selfie in the presentation hall"
                fill
                priority
                quality={95}
                className="object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Cinematic Dark Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top Right Expand Icon Only (Top Left Chip Removed) */}
              <div className="absolute top-5 right-5 z-10 pointer-events-none">
                <span className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300 inline-flex items-center justify-center">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
                  Jury Showcase & Victory Lap
                </h3>
                <p className="text-xs sm:text-sm text-gray-300/80 font-normal line-clamp-1">
                  Capturing the post-evaluation relief and celebration inside the grand presentation hall.
                </p>
              </div>
            </motion.div>
            </>
          ) : (
            <>
              {/* 1. Bento Card: Official Certificate (6 cols on lg) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: luxuryEase }}
                onClick={() => setSelectedImage({
                  src: '/images/trinetra/trinetra-official-certifier-award.png',
                  alt: 'Official Trinetra Hackathon Certificate of Participation awarded to Manne Achuth',
                  title: 'Official Certificate of Participation',
                  caption: 'Awarded to Manne Achuth by VentureSpace & LPU for participating in the 20-Hour Trinetra Hackathon.',
                  badge: 'Verified Credential'
                })}
                className="md:col-span-12 lg:col-span-6 relative h-[420px] sm:h-[480px] rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-red-500/50 bg-[#0d0e12] shadow-2xl transition-all duration-500"
              >
                <Image
                  src="/images/trinetra/trinetra-official-certifier-award.png"
                  alt="Official Trinetra Hackathon Certificate of Participation awarded to Manne Achuth"
                  fill
                  priority
                  quality={98}
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Cinematic Dark Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />
                <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top Right Expand Icon Only */}
                <div className="absolute top-5 right-5 z-10 pointer-events-none">
                  <span className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300 inline-flex items-center justify-center">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                {/* Bottom Info Bar */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
                    Official Certificate
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300/80 font-normal line-clamp-1">
                    Awarded to Manne Achuth by VentureSpace &amp; LPU.
                  </p>
                </div>
              </motion.div>

              {/* 2. Bento Card: Auditorium Pitch & Evaluation (6 cols on lg) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.1, ease: luxuryEase }}
                onClick={() => setSelectedImage({
                  src: '/images/trinetra/snapshot-selfie.jpg',
                  alt: 'Team selfie inside the presentation auditorium',
                  title: 'Auditorium Pitch & Evaluation',
                  caption: 'Live capture inside the grand presentation hall during project evaluation and team debrief.',
                  badge: 'Main Auditorium'
                })}
                className="md:col-span-12 lg:col-span-6 relative h-[420px] sm:h-[480px] rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-red-500/50 bg-white/[0.02] shadow-2xl transition-all duration-500"
              >
                <Image
                  src="/images/trinetra/snapshot-selfie.jpg"
                  alt="Team selfie inside the presentation auditorium"
                  fill
                  priority
                  quality={95}
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Cinematic Dark Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top Right Expand Icon Only */}
                <div className="absolute top-5 right-5 z-10 pointer-events-none">
                  <span className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300 inline-flex items-center justify-center">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                {/* Bottom Info Bar */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
                    Auditorium Pitch & Evaluation
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300/80 font-normal line-clamp-1 max-w-xl">
                    Live capture inside the grand presentation hall during project evaluation and team debrief.
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 05: OUTCOME & IMPACT (Editorial Architectural Design) */}
      {/* ======================================================== */}
      <section ref={section5Ref} className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 py-28 sm:py-36 flex flex-col items-start text-left">
        {/* Title Row with Sharp Colored Bar on the Left (Left to Right) */}
        <div className="relative flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Bold, Sharp 4-Corner Solid Colored Vertical Bar */}
          <div className={`w-1.5 sm:w-2 h-10 sm:h-14 shrink-0 ${isGearUp ? 'bg-blue-500' : 'bg-red-500'}`} />

          {/* Masked Container: Slides out from inside the bar from Left to Right */}
          <div className="overflow-hidden py-1">
            <motion.h2
              initial={{ x: -160, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.85, ease: luxuryEase }}
              className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase"
            >
              OUTCOME &amp; IMPACT
            </motion.h2>
          </div>
        </div>

        {/* 2-Column Grid: Expanded Left Column (7 cols) + Right 3D Character (5 cols) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Outcome Matter & Team Showcase (Wiper Reveal from Left to Right) */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-7 relative z-10 overflow-hidden p-1 -m-1">
            {/* Wiper Wipe Curtain: Slides from left to right revealing the matter in clean sync with the 3D image */}
            <motion.div
              initial={{ x: "0%" }}
              whileInView={{ x: "102%", transitionEnd: { display: "none" } }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.25, delay: 0.75, ease: luxuryEase }}
              className="absolute inset-0 z-30 bg-[#07070a] pointer-events-none"
            />
            {/* Context Statement */}
            <p className="text-base sm:text-lg md:text-[19px] text-gray-300/90 font-normal leading-relaxed max-w-3xl">
              {isGearUp
                ? "Across 36 relentless hacking hours, six engineers transformed raw spatial datasets into an end-to-end Dynamic ETA Forecasting and Automatic Train Supervision platform."
                : "Across 20 continuous sprint hours, two builders turned theoretical blockchain mechanics into an immutable, on-chain ballot verification prototype."}
            </p>

            {/* Unified Big Box (Matching Section 01 Luxury Design System) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-xl flex flex-col gap-6 sm:gap-7">
              {/* Header Label & Core Mandate */}
              <div className="flex flex-col gap-3">
                <span className="block text-[11px] sm:text-xs font-sans font-bold tracking-[0.2em] text-gray-400 uppercase">
                  {isGearUp ? "36 HOURS · 6 MINDS · 1 WORKING PROTOTYPE" : "20 HOURS · 2 MINDS · 1 WORKING PROTOTYPE"}
                </span>

                <p className="text-base sm:text-lg md:text-[21px] text-white/95 font-medium leading-[1.65] tracking-normal">
                  {isGearUp ? (
                    <>
                      Delivered a functional <span className="text-blue-400 font-bold">Automatic Train Supervision (ATS) ecosystem</span> capable of predicting cascading bottlenecks across coaching routes with <span className="underline decoration-blue-500/60 underline-offset-4 font-semibold">sub-second telemetry updates</span> and automated conflict resolution.
                    </>
                  ) : (
                    <>
                      Architected and deployed a <span className="text-red-400 font-bold">cryptographically verifiable Web3 voting portal</span> with <span className="underline decoration-red-500/60 underline-offset-4 font-semibold">zero-tampering guarantees</span> and transparent on-chain ballot tallying.
                    </>
                  )}
                </p>
              </div>

              {/* Subtle Divider Line */}
              <div className="w-full h-[1px] bg-white/[0.08]" />

              {/* 3 Structured Accomplishment Pillars (Numbered - Zero Emojis) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {isGearUp ? (
                  <>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 transition-colors duration-300 hover:border-blue-500/20">
                      <span className="font-sans text-xs font-bold tracking-wider block">
                        <span className="text-blue-500 mr-1.5 font-bold">01.</span>
                        <span className="text-white">DUAL DASHBOARDS</span>
                      </span>
                      <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                        Unified ATS Controller Room view paired with passenger-facing live spatial telemetry.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 transition-colors duration-300 hover:border-blue-500/20">
                      <span className="font-sans text-xs font-bold tracking-wider block">
                        <span className="text-blue-500 mr-1.5 font-bold">02.</span>
                        <span className="text-white">CONFLICT ENGINE</span>
                      </span>
                      <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                        Delay cascading and blast-radius predictive models resolving junction bottlenecks before impact.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 transition-colors duration-300 hover:border-blue-500/20">
                      <span className="font-sans text-xs font-bold tracking-wider block">
                        <span className="text-blue-500 mr-1.5 font-bold">03.</span>
                        <span className="text-white">5 ROUTE SCENARIOS</span>
                      </span>
                      <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                        Stress-tested against live Indian Railways historical telemetry with proven arrival convergence.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 transition-colors duration-300 hover:border-red-500/20">
                      <span className="font-sans text-xs font-bold tracking-wider block">
                        <span className="text-red-500 mr-1.5 font-bold">01.</span>
                        <span className="text-white">VOTING PORTAL</span>
                      </span>
                      <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                        Responsive dApp interface connecting MetaMask wallets with transparent candidate ballots.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 transition-colors duration-300 hover:border-red-500/20">
                      <span className="font-sans text-xs font-bold tracking-wider block">
                        <span className="text-red-500 mr-1.5 font-bold">02.</span>
                        <span className="text-white">SOLIDITY LEDGER</span>
                      </span>
                      <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                        Immutable smart contracts governing vote authorization, single-vote enforcement, and tallying.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 transition-colors duration-300 hover:border-red-500/20">
                      <span className="font-sans text-xs font-bold tracking-wider block">
                        <span className="text-red-500 mr-1.5 font-bold">03.</span>
                        <span className="text-white">AUDIT TRAIL</span>
                      </span>
                      <p className="text-[13px] text-gray-300/80 leading-[1.6] font-normal tracking-normal">
                        Publicly verifiable cryptographic proof eliminating reliance on centralized tally servers.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Subtle Divider Line */}
              <div className="w-full h-[1px] bg-white/[0.08]" />

              {/* Team Showcase (Luxury Roster Grid) */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="block text-[11px] sm:text-xs font-sans font-bold tracking-[0.2em] text-gray-400 uppercase">
                    {isGearUp ? "CORE BUILDERS · TEAM RAIL SAMAY" : "CORE BUILDERS · TEAM TRUST BALLOT"}
                  </span>
                  <span className="text-[11px] font-mono tracking-widest text-gray-500">
                    {isGearUp ? "6 MEMBERS" : "2 MEMBERS"}
                  </span>
                </div>

                {/* Team Member Cards Grid */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${isGearUp ? "lg:grid-cols-3" : "lg:grid-cols-2"} gap-3`}>
                  {(isGearUp ? gearUpTeam : trinetraTeam).map((member) => (
                    <a
                      key={member.name}
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group p-3.5 sm:p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 ${isGearUp ? 'hover:border-blue-500/30' : 'hover:border-red-500/30'} transition-all duration-300 flex items-center justify-between shadow-sm`}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className={`text-[13px] font-semibold text-white/95 ${isGearUp ? 'group-hover:text-blue-400' : 'group-hover:text-red-400'} transition-colors duration-200`}>
                          {member.name}
                        </span>
                        <span className="text-[12px] text-gray-400/90 font-normal leading-snug">
                          {member.role}
                        </span>
                      </div>
                      <ArrowUpRight className={`w-3.5 h-3.5 text-gray-500 ${isGearUp ? 'group-hover:text-blue-400' : 'group-hover:text-red-400'} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 ml-2`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Dedicated 3D Character - Sweeping in from Left to Right) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative z-20">
            <motion.div
              ref={imageWrapper5Ref}
              initial={{
                x: isDesktop ? -sweepDistance5 : "-75%",
                opacity: 0,
              }}
              whileInView={{
                x: 0,
                opacity: 1,
              }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.25, delay: 0.75, ease: luxuryEase }}
              className="relative w-full max-w-[500px] lg:max-w-[540px] aspect-[1024/819] flex items-center justify-center select-none"
            >
              <div className="relative w-full h-full">
                <Image
                  src={isGearUp ? '/images/gearup-outcome-3d.png' : '/images/trinetra-outcome-3d.png'}
                  alt={isGearUp ? '3D Developer sitting proudly on futuristic high-speed train celebrating RailSamay hackathon victory' : '3D Developer sitting proudly on red Trust Ballot box celebrating Trinetra hackathon victory'}
                  fill
                  priority
                  quality={98}
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* FULLSCREEN LIGHTBOX MODAL (Clear View with Top-Right Close) */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            {/* Top-Right Dedicated Close (X) Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50 p-3 sm:p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200 border border-white/15 hover:scale-110 active:scale-95 shadow-2xl cursor-pointer"
              aria-label="Close Fullscreen Image"
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Modal Image Wrapper with Pop-in Motion */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: luxuryEase }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center cursor-default"
            >
              <div className="relative w-full h-[60vh] sm:h-[72vh] rounded-2xl overflow-hidden border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.9)] bg-black/40">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  priority
                  quality={98}
                  className="object-contain"
                />
              </div>

              {/* Caption Tag Pill */}
              <div className="mt-4 px-6 py-3 rounded-full bg-black/75 backdrop-blur-xl border border-white/10 flex items-center gap-3 text-xs sm:text-sm text-gray-200 shadow-xl">
                <span className="font-semibold text-white">{selectedImage.title}</span>
                <span className="hidden sm:inline text-gray-400">— {selectedImage.caption}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
