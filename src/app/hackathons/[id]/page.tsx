"use client";

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ShieldCheck, Trophy, Sparkles, MapPin } from 'lucide-react';

export default function HackathonCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <main className="min-h-screen w-full bg-[#07070a] text-white relative overflow-hidden flex flex-col justify-between selection:bg-red-500/30 selection:text-white">
      {/* 1. HERO COVER BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/trinetra-hero-cover.jpg"
          alt="Trinetra Hackathon In-Action"
          fill
          priority
          quality={95}
          className="object-cover object-center filter brightness-[0.42] contrast-[1.12] saturate-[1.15] scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Cinematic Gradient Overlays */}
        {/* Top Dark Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/95 via-[#07070a]/40 to-[#07070a]" />

        {/* Radial Red Ambient Glow in Center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent pointer-events-none" />

        {/* Dark Vignette Edges */}
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[0.5px]" />
      </div>

      {/* 2. TOP FLOATING NAVIGATION BAR */}
      <header className="relative z-20 w-full px-6 py-6 sm:px-10 sm:py-8 flex items-center justify-between">
        <Link 
          href="/#battlegrounds-section"
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-xl border border-white/10 hover:border-red-500/50 text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(239,68,68,0.25)]"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300 text-red-400" />
          <span>Back to Battlegrounds</span>
        </Link>

        {/* Organization / Event Badge with Theme Red Accent */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/25 border border-red-500/30 backdrop-blur-md text-xs font-mono text-red-200 tracking-wider uppercase shadow-[0_0_15px_rgba(239,68,68,0.15)]">
          <MapPin className="w-3.5 h-3.5 text-red-500" />
          <span>VentureSpace • LPU</span>
        </div>
      </header>

      {/* 3. CENTER HERO HEADLINE & TAGLINE CONTENT */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col items-center text-center my-auto">


        {/* Main Hackathon Name (Giant, Bold, Hero Title) */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white uppercase drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)]"
        >
          TRINETRA
        </motion.h1>

        {/* Subtitle / Divider Line */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex items-center justify-center gap-3 sm:gap-6 mt-3 sm:mt-4 w-full"
        >
          <div className="h-[1px] flex-1 max-w-[80px] sm:max-w-[140px] bg-gradient-to-r from-transparent to-red-500/80" />
          <span className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-red-400 uppercase drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]">
            20 HOURS HACKATHON
          </span>
          <div className="h-[1px] flex-1 max-w-[80px] sm:max-w-[140px] bg-gradient-to-l from-transparent to-red-500/80" />
        </motion.div>

        {/* Punchy Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-gray-200/90 font-normal leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
        >
          Sleepless coding, deep-tech architecture, and rapid prototyping under intense 20-hour deadlines.
        </motion.p>

        {/* Key Feature Chips / Glassmorphism Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-gray-300 shadow-md">
            <Clock className="w-4 h-4 text-red-400" />
            <span>20 Hours Non-Stop</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-gray-300 shadow-md">
            <ShieldCheck className="w-4 h-4 text-red-400" />
            <span>Cybersecurity & Deep Tech</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-gray-300 shadow-md">
            <Trophy className="w-4 h-4 text-red-400" />
            <span>Project: <strong className="text-white">Trust Ballot</strong></span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-gray-300 shadow-md">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span>Live Action Build</span>
          </div>
        </motion.div>
      </section>


    </main>
  );
}
