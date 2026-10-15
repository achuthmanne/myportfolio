"use client";

import React, { use, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HackathonGalleryWire from '@/components/HackathonGalleryWire';

export default function HackathonCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className="min-h-screen w-full bg-bg-primary text-white relative overflow-hidden select-none">
      {/* Glassmorphism Header Badge floating gracefully above the wire */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-auto"
      >
        <div className="relative group px-8 py-3.5 md:px-12 md:py-4 rounded-2xl md:rounded-full bg-[#0a0a10]/70 backdrop-blur-2xl border border-white/10 hover:border-red-500/30 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_30px_rgba(220,38,38,0.2)] flex items-center justify-center">
          {/* Large, Clean, Bold Glassmorphism Title in Portfolio Signature Font */}
          <h1 className="flex items-center gap-3 md:gap-4 font-sans text-base sm:text-lg md:text-2xl font-black tracking-wider uppercase">
            <span className="text-white drop-shadow-md">TRINETRA</span>
            <span className="text-red-500/40 font-light">—</span>
            <span className="text-red-500 font-bold tracking-wide drop-shadow-[0_0_15px_rgba(239,68,68,0.45)]">
              20 HOURS HACKATHON
            </span>
          </h1>

          {/* Subtle Bottom Neon Red Glow Accent Line */}
          <div className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </div>
      </motion.div>

      {/* 3D Straight Iron Wire & Cosmic Tiny Particles */}
      <HackathonGalleryWire onCardClick={setSelectedImage} />

      {/* Full-Screen Image Modal with Cross to Close */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 pointer-events-auto">
            {/* Dark Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-2xl cursor-pointer"
            />

            {/* Cross (X) Close Button (Fixed at top-right of viewport with red hover) */}
            <button
              onClick={() => setSelectedImage(null)}
              className="fixed top-6 right-6 md:top-8 md:right-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#121218]/90 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center hover:bg-red-600 hover:border-red-500 hover:scale-110 hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] transition-all duration-300 z-[110] shadow-2xl cursor-pointer group"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6 text-white transform group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Image Box */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[88vh] rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.95)] z-10 flex items-center justify-center bg-black/60"
            >
              <img
                src={selectedImage}
                alt="Hackathon full view"
                className="w-auto h-auto max-h-[84vh] max-w-[90vw] object-contain rounded-xl select-none"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
