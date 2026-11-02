"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Monitor, Server } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function ConnectSection({ onComplete }: { onComplete?: () => void }) {
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success'>('idle');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const animDuration = isMobile ? 5.2 : 8.5;
  const particleCount = isMobile ? 22 : 50;
  const tailSpread = isMobile ? 45 : 150;

  const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "e153cc8f-b4a1-436b-bf35-58a7d7b94041";

  const handleTransmit = async () => {
    if (!message.trim()) {
      setErrorMessage('Please type your message before transmitting.');
      return;
    }

    setErrorMessage('');
    setStatus('transmitting');

    // Background delivery to Web3Forms -> achuthchowdary96@gmail.com
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          from_name: "Portfolio Signal Terminal",
          subject: "🚀 New Anonymous Signal Message from Portfolio",
          message: message.trim(),
          email: "visitor@portfolio.signal",
        }),
      });
    } catch (err) {
      console.error("Signal transmit error:", err);
    }
  };

  return (
    <section id="connect-section" className="relative w-full min-h-[50vh] md:min-h-[70vh] bg-transparent text-white overflow-hidden z-20 pt-16 pb-24 md:pt-56 md:pb-48 flex flex-col items-center justify-center">
      
      {/* 1. The Headings (Exact same style as prev sections) */}
      <div className="w-full flex flex-col items-center z-30 mb-6 md:mb-16 relative">
        <div className="text-center pointer-events-none px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-2 md:mb-3">
            SEND A <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">SIGNAL.</span>
          </h2>
          <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm lg:text-base font-light tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.18em] uppercase max-w-xs sm:max-w-lg md:max-w-none mx-auto leading-relaxed mb-4 md:mb-8">
            <span className="sm:hidden">Have an idea or something to build? Let&apos;s talk.</span>
            <span className="hidden sm:inline md:whitespace-nowrap">Have an idea, a problem worth solving, or something worth building? Let&apos;s talk.</span>
          </p>
        </div>
      </div>

      {/* 2. Interactive Terminal UI Container */}
      <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-4 z-30 relative min-h-[200px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          
          {/* STATE 1: IDLE (Single Frictionless Message Input) */}
          {status === 'idle' && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              className="relative flex flex-col items-end gap-6 w-full max-w-2xl mx-auto"
            >
              <div className="relative w-full group">
                {/* The Prompt Arrow */}
                <span className="absolute left-0 top-[18px] text-red-500 font-mono text-xl md:text-2xl font-bold animate-pulse">
                  &gt;
                </span>
                
                {/* The Textarea */}
                <textarea 
                  rows={3}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="w-full bg-transparent border-b border-white/20 text-white font-mono text-base sm:text-lg md:text-xl py-4 pl-8 pr-4 focus:outline-none focus:border-red-500 transition-colors resize-none placeholder:text-gray-600 placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg leading-relaxed"
                  placeholder="type your message... (include your email or contact info so I can get back to you)"
                />
              </div>

              {/* Error Warning Notice */}
              {errorMessage && (
                <div className="text-red-400 font-mono text-xs sm:text-sm tracking-wider self-start pl-1">
                  ! {errorMessage}
                </div>
              )}

              {/* Transmit Button */}
              <button 
                onClick={handleTransmit}
                className="flex items-center gap-2 text-white font-mono text-base md:text-lg font-bold tracking-[0.2em] hover:text-red-500 transition-colors active:scale-95 cursor-pointer"
              >
                [ TRANSMIT <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 stroke-[3] -mt-1" /> ]
              </button>
            </motion.div>
          )}

          {/* STATE 2: TRANSMITTING (The Traveling Message Packet) */}
          {status === 'transmitting' && (
            <motion.div 
              key="network"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.35 }}
              className="w-full flex items-center justify-between font-mono tracking-widest relative px-1 sm:px-4 py-3"
            >
              {/* Left Endpoint (Client PC) */}
              <div className="flex flex-col items-center gap-1.5 sm:gap-2 z-20 shrink-0">
                <div className="relative p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/10 shadow-md">
                  <Monitor className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-400" strokeWidth={1.5} />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
                </div>
                <span className="text-gray-400 font-bold text-[10px] sm:text-sm md:text-xl tracking-wider sm:tracking-widest whitespace-nowrap">
                  [ YOU ]
                </span>
              </div>
              
              {/* The Track & Message */}
              <div className="flex-1 mx-2 sm:mx-8 md:mx-16 h-[50px] relative flex items-center justify-center overflow-visible">
                
                {/* Laser Transmission Pathway Line */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-red-500/35 via-yellow-400/35 to-green-500/35" />
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] border-t border-dashed border-white/20" />

                {/* Traveling Glow Pulse along the track */}
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-12 sm:w-24 h-6 rounded-full blur-md opacity-45 pointer-events-none -translate-x-1/2"
                  initial={{ left: "6%", backgroundColor: "#ff1a1a" }}
                  animate={{ 
                    left: ["6%", "50%", "94%"], 
                    backgroundColor: ["#ff1a1a", "#ffcc00", "#16a34a"]
                  }}
                  transition={{ duration: animDuration, ease: "easeInOut", times: [0, 0.5, 1] }}
                />

                {/* The Traveling Message Container */}
                <motion.div
                  className="absolute z-10 flex items-center justify-center -translate-x-1/2"
                  initial={{ left: "6%", color: "#ff1a1a" }} // Start Pure Red
                  animate={{ 
                    left: ["6%", "50%", "94%"], 
                    color: ["#ff1a1a", "#ffcc00", "#16a34a"] // Exact Hex match for Red, Yellow, Green renders
                  }}
                  transition={{ duration: animDuration, ease: "easeInOut", times: [0, 0.5, 1] }}
                  onAnimationComplete={() => {
                    setTimeout(() => setStatus('success'), 400);
                  }}
                >
                  
                  {/* The Sparkle Particle Tail */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-[65%] h-[40px] w-[70px] sm:w-[140px] md:w-[200px] pointer-events-none overflow-visible">
                    {Array.from({ length: particleCount }).map((_, i) => (
                      <motion.div 
                        key={i}
                        className="absolute right-0 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]"
                        initial={{ x: 0, y: 0 }}
                        animate={{
                          x: [-4, -15 - Math.random() * tailSpread], // Drift smoothly backwards within runway
                          y: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 36], // Expand outwards
                          opacity: [0, 0.9, 0],
                          scale: [0, Math.random() * 1.2 + 0.4, 0] // Soft glowing orb sizes
                        }}
                        transition={{
                          duration: 0.8 + Math.random() * 1.0,
                          repeat: Infinity,
                          delay: Math.random() * 1.5,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>

                  {/* The 3D Envelopes Crossfade Stack */}
                  <div className="mix-blend-screen relative w-10 h-7 sm:w-14 sm:h-10 md:w-20 md:h-14 drop-shadow-[0_0_10px_currentColor]">
                     
                     {/* RED ENVELOPE */}
                     <motion.div
                       className="absolute inset-0"
                       animate={{ opacity: [1, 0, 0] }}
                       transition={{ duration: animDuration, ease: "easeInOut", times: [0, 0.5, 1] }}
                     >
                       <Image src="/images/env-red.png" alt="Packet Red" fill className="object-contain" priority />
                     </motion.div>

                     {/* YELLOW ENVELOPE */}
                     <motion.div
                       className="absolute inset-0"
                       animate={{ opacity: [0, 1, 0] }}
                       transition={{ duration: animDuration, ease: "easeInOut", times: [0, 0.5, 1] }}
                     >
                       <Image src="/images/env-yellow.png" alt="Packet Yellow" fill className="object-contain" priority />
                     </motion.div>

                     {/* GREEN ENVELOPE */}
                     <motion.div
                       className="absolute inset-0"
                       animate={{ opacity: [0, 0, 1] }}
                       transition={{ duration: animDuration, ease: "easeInOut", times: [0, 0.5, 1] }}
                     >
                       <Image src="/images/env-green.png" alt="Packet Green" fill className="object-contain" priority />
                     </motion.div>

                  </div>

                </motion.div>
                
              </div>

              {/* Right Endpoint (Host Server) */}
              <div className="flex flex-col items-center gap-1.5 sm:gap-2 z-20 shrink-0">
                <div className="relative p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/10 shadow-md">
                  <Server className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-400" strokeWidth={1.5} />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <span className="text-gray-400 font-bold text-[10px] sm:text-sm md:text-xl tracking-wider sm:tracking-widest whitespace-nowrap">
                  [ ACHUTH ]
                </span>
              </div>
            </motion.div>
          )}

          {/* STATE 3: SUCCESS */}
          {status === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onAnimationComplete={() => {
                if (onComplete) onComplete();
              }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="text-green-500 font-mono text-lg sm:text-xl md:text-2xl font-bold tracking-wider sm:tracking-widest mb-2 sm:mb-3">
                SIGNAL TRANSMITTED ✓
              </div>
              <div className="text-gray-400 font-mono text-xs sm:text-sm md:text-base uppercase tracking-wider sm:tracking-widest">
                I&apos;ll get back to you soon.
              </div>
              <button
                type="button"
                onClick={() => {
                  setStatus('idle');
                  setMessage('');
                }}
                className="mt-6 text-xs text-gray-400 hover:text-white font-mono uppercase tracking-widest transition-all cursor-pointer border border-white/10 hover:border-white/30 px-4 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] active:scale-95"
              >
                [ TRANSMIT ANOTHER SIGNAL ]
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </section>
  );
}
