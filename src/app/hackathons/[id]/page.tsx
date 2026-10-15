"use client";

import React, { use } from 'react';
import { motion } from 'framer-motion';
import HackathonGalleryWire from '@/components/HackathonGalleryWire';

export default function HackathonCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <main className="min-h-screen w-full bg-bg-primary text-white relative overflow-hidden select-none">
      {/* Glassmorphism Header Badge floating gracefully above the wire */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-auto"
      >
        <div className="relative group px-6 py-2.5 md:px-8 md:py-3 rounded-full bg-[#0d0d12]/60 backdrop-blur-xl border border-white/10 hover:border-red-500/40 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(220,38,38,0.18)] flex items-center gap-3">
          {/* Pulsing Trinetra Red Beacon */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 shadow-[0_0_10px_#ef4444]"></span>
          </span>

          {/* Glassmorphism Title in Trinetra Theme Red */}
          <div className="flex items-center gap-2.5 font-mono text-xs md:text-sm tracking-[0.22em] uppercase">
            <span className="font-black text-white tracking-[0.25em]">TRINETRA</span>
            <span className="text-red-500/60 font-bold">•</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-rose-400 font-bold tracking-[0.2em]">
              20 HOURS HACKATHON
            </span>
          </div>

          {/* Subtle Bottom Glow Accent Line */}
          <div className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-3/5 h-[1px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
        </div>
      </motion.div>

      {/* 3D Straight Iron Wire & Cosmic Tiny Particles */}
      <HackathonGalleryWire />
    </main>
  );
}
