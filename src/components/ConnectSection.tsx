"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Monitor, Server } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function ConnectSection({ onComplete }: { onComplete?: () => void }) {
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success'>('idle');

  const handleTransmit = () => {
    setStatus('transmitting');
  };

  return (
    <section id="connect-section" className="relative w-full min-h-[70vh] bg-transparent text-white overflow-hidden z-20 pt-56 pb-48 flex flex-col items-center justify-center">
      
      {/* 1. The Headings (Exact same style as prev sections) */}
      <div className="w-full flex flex-col items-center z-30 mb-16 relative">
        <div className="text-center pointer-events-none px-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            SEND A <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">SIGNAL.</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light tracking-[0.2em] uppercase mb-8">
            Have an idea, a problem worth solving, or something worth building? Let's talk.
          </p>
        </div>
      </div>

      {/* 2. Interactive Terminal UI Container */}
      <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-4 z-30 relative min-h-[200px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          
          {/* STATE 1: IDLE (The Input Box) */}
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
                  className="w-full bg-transparent border-b border-white/20 text-white font-mono text-lg md:text-xl py-4 pl-8 pr-4 focus:outline-none focus:border-red-500 transition-colors resize-none placeholder-gray-700"
                  placeholder="type your message..."
                />
              </div>

              {/* Transmit Button */}
              <button 
                onClick={handleTransmit}
                className="flex items-center gap-2 text-white font-mono text-base md:text-lg font-bold tracking-[0.2em] hover:text-red-500 transition-colors"
              >
                [ TRANSMIT <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 stroke-[3] -mt-1" /> ]
              </button>
            </motion.div>
          )}

          {/* STATE 2: TRANSMITTING (The Traveling Message) */}
          {status === 'transmitting' && (
            <motion.div 
              key="network"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              className="w-full flex items-center justify-between font-mono tracking-widest relative px-2"
            >
              {/* Left Endpoint (Client PC) */}
              <div className="flex flex-col items-center gap-2 z-10">
                <Monitor className="w-8 h-8 md:w-10 md:h-10 text-gray-500" strokeWidth={1.5} />
                <span className="text-gray-400 font-bold text-xl md:text-3xl">
                  [ YOU ]
                </span>
              </div>
              
              {/* The Track & Message */}
              <div className="flex-1 mx-4 md:mx-16 h-[50px] relative flex items-center justify-center">
                
                {/* The Traveling Message Container */}
                <motion.div
                  className="absolute z-10 flex items-center justify-center -translate-x-1/2"
                  initial={{ left: "5%", color: "#ff1a1a" }} // Start Pure Red
                  animate={{ 
                    left: ["5%", "50%", "95%"], 
                    color: ["#ff1a1a", "#ffcc00", "#16a34a"] // Exact Hex match for Red, Yellow, Green renders
                  }}
                  transition={{ duration: 8.5, ease: "easeInOut", times: [0, 0.5, 1] }}
                  onAnimationComplete={() => {
                    setTimeout(() => setStatus('success'), 500);
                  }}
                >
                  
                  {/* The Sparkle Particle Tail */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-[70%] h-[50px] w-[200px] pointer-events-none">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <motion.div 
                        key={i}
                        className="absolute right-0 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-current shadow-[0_0_10px_currentColor]"
                        initial={{ x: 0, y: 0 }}
                        animate={{
                          x: [-10, -50 - Math.random() * 150], // Drift smoothly backwards
                          y: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 50], // Expand outwards
                          opacity: [0, 1, 0],
                          scale: [0, Math.random() * 1.2 + 0.5, 0] // Soft glowing orb sizes
                        }}
                        transition={{
                          duration: 1 + Math.random() * 1.5,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>

                  {/* The 3D Envelopes Crossfade Stack */}
                  <div className="mix-blend-screen relative w-16 h-10 md:w-20 md:h-14">
                     
                     {/* RED ENVELOPE */}
                     <motion.div
                       className="absolute inset-0"
                       animate={{ opacity: [1, 0, 0] }}
                       transition={{ duration: 8.5, ease: "easeInOut", times: [0, 0.5, 1] }}
                     >
                       <Image src="/images/env-red.png" alt="Packet Red" fill className="object-contain" priority />
                     </motion.div>

                     {/* YELLOW ENVELOPE */}
                     <motion.div
                       className="absolute inset-0"
                       animate={{ opacity: [0, 1, 0] }}
                       transition={{ duration: 8.5, ease: "easeInOut", times: [0, 0.5, 1] }}
                     >
                       <Image src="/images/env-yellow.png" alt="Packet Yellow" fill className="object-contain" priority />
                     </motion.div>

                     {/* GREEN ENVELOPE */}
                     <motion.div
                       className="absolute inset-0"
                       animate={{ opacity: [0, 0, 1] }}
                       transition={{ duration: 8.5, ease: "easeInOut", times: [0, 0.5, 1] }}
                     >
                       <Image src="/images/env-green.png" alt="Packet Green" fill className="object-contain" priority />
                     </motion.div>

                  </div>

                </motion.div>
                
              </div>

              {/* Right Endpoint (Host Server) */}
              <div className="flex flex-col items-center gap-2 z-10">
                <Server className="w-8 h-8 md:w-10 md:h-10 text-gray-500" strokeWidth={1.5} />
                <span className="text-gray-400 font-bold text-xl md:text-3xl">
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
              className="flex flex-col items-center text-center"
            >
              <div className="text-green-500 font-mono text-xl md:text-2xl font-bold tracking-widest mb-3">
                SIGNAL TRANSMITTED ✓
              </div>
              <div className="text-gray-400 font-mono text-sm md:text-base uppercase tracking-widest">
                I'll get back to you soon.
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </section>
  );
}
