"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ProjectFolder() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Triggers slightly earlier so the user has time to watch it
  const isInView = useInView(containerRef, { once: false, margin: "-25%" });

  return (
    <div 
      ref={containerRef}
      className="relative w-full flex justify-center items-center py-20"
      style={{ perspective: '1500px' }}
    >
      {/* Wrapper to scale the folder size up for desktop */}
      <div className="relative w-full max-w-[800px] flex justify-center items-center transform scale-[1.0] md:scale-[1.4] lg:scale-[1.8] mt-10 md:mt-20">
        
        {/* The Folder Container */}
        <motion.div
          className="relative w-[400px] h-[300px]"
          initial={{ rotateY: 0, y: 0 }}
          animate={{ 
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          
          {/* 1. BACK COVER OF THE FOLDER (z-10) */}
          <div className="absolute inset-0 w-full h-full z-10 flex flex-col pointer-events-none">
            {/* The Folder Tab (Left Side) */}
            <div className="w-[130px] h-[35px] bg-[#0a0a0a] border-t border-l border-r border-white/20 rounded-t-xl flex items-center px-4 relative z-10">
               <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Projects</span>
            </div>
            
            {/* The Main Back Body */}
            <div className="flex-1 w-full bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/20 rounded-b-2xl rounded-tr-2xl relative shadow-[inset_0_20px_50px_rgba(0,0,0,0.8)] -mt-[1px]">
               {/* Internal shadow to make it look deep */}
               <div className="absolute inset-0 bg-black/60 rounded-b-2xl rounded-tr-2xl" />
            </div>
          </div>

          {/* 2. THE PROJECT CARDS (Sandwiched inside, z-20) */}
          <div 
            className="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-[160px] h-[280px] z-20 pointer-events-auto" 
            style={{ 
              transformStyle: 'preserve-3d',
              clipPath: 'inset(-1000px -1000px 0px -1000px)' // This hides anything that falls below the bottom edge!
            }}
          >
             
             {[
               { id: 1, src: '/images/kisankhata-card.jpg', alt: 'Kisan Khata', rotate: -15, x: -75, zIndex: 1 },
               { id: 2, src: '/images/railsamay-card.jpg', alt: 'Rail Samay', rotate: -5, x: -25, zIndex: 2 },
               { id: 3, src: '/images/capabilio-card.jpg', alt: 'Capabilio AI', rotate: 5, x: 25, zIndex: 3 },
               { id: 4, src: '/images/arc-card.jpg', alt: 'ARC Aerospace', rotate: 15, x: 75, zIndex: 4 },
             ].map((card, index) => (
                <motion.div 
                   key={card.id}
                   className="absolute bottom-0 left-0 w-full h-full"
                   initial={{ y: 150, x: 0, rotateZ: 0 }}
                   animate={isInView ? { 
                      y: 10, 
                      x: card.x, 
                      rotateZ: card.rotate 
                   } : { 
                      y: 150, // Pushed deep down inside the folder!
                      x: 0, 
                      rotateZ: 0 
                   }}
                   transition={{ 
                      duration: 1.2, 
                      delay: isInView ? 1.8 + (index * 0.15) : 0, // Wait for folder to open, then slide up one by one!
                      ease: [0.22, 1, 0.36, 1] 
                   }}
                   style={{ 
                      zIndex: card.zIndex 
                   }}
                >
                   {/* The Card Itself (Hover logic isolated here so it works flawlessly) */}
                   <div className="relative w-full h-full transition-all duration-500 hover:-translate-y-12 cursor-pointer drop-shadow-2xl hover:drop-shadow-[0_20px_40px_rgba(255,255,255,0.15)] rounded-[1.5rem] overflow-hidden">
                      {/* By scaling the image up by 15%, we perfectly push the AI-generated black background padding out of bounds! */}
                      <img 
                        src={card.src} 
                        alt={card.alt} 
                        className="w-full h-full object-cover scale-[1.15]"
                      />
                   </div>
                </motion.div>
             ))}

          </div>

          {/* 3. FRONT FLAP OF THE FOLDER (Leans forward on scroll, z-30) */}
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-[220px] z-30 origin-bottom rounded-2xl bg-gradient-to-tr from-[#111] to-[#1a1a1a] border border-white/10 shadow-2xl flex flex-col justify-between p-4"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isInView ? -45 : 0 }} // Opens up MUCH wider!
            transition={{ duration: 2.5, ease: [0.45, 0, 0.55, 1], delay: 0.8 }} // Slow ease-in-out, giving time for the user to see it closed!
            style={{ 
              transformStyle: 'preserve-3d'
            }}
          >
             {/* Beautiful Glowing Red Accent Line */}
             <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />
             
             {/* Folder Details / Graphics */}
             <div className="w-full flex justify-between items-start opacity-30 mt-2">
                <div className="flex flex-col gap-1">
                   <div className="w-8 h-1 bg-white rounded-full" />
                   <div className="w-12 h-1 bg-white rounded-full" />
                </div>
                <div className="text-[8px] tracking-[0.4em] font-mono uppercase text-white">
                   PROJECT ARCHIVE // 2025—26
                </div>
             </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
