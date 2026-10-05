"use client";

import React from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

import BentLogo from './BentLogo';
import HologramBody from './HologramBody';

export default function FooterSection() {
  const containerRef = React.useRef(null);
  
  // Trigger exactly when the section enters the viewport
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  
  // Track the FIRST 100vh (Section entering the screen)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  // Track the NEXT 300vh (The "Hijacked" lock screen)
  const { scrollYProgress: overlayProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // The 3D Ring drops down from the top of the section (-50vh) to its final resting place (0vh)
  const ringY = useTransform(scrollYProgress, [0, 1], ["-60vh", "0vh"]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

  // The Cinematic Curtain (Slides UP from the bottom extremely slowly)
  // We added a MASSIVE deadzone from 0.0 to 0.4. This acts as a physical brake!
  // It forces fast scrollers to stop and stare at the portrait before the curtain triggers.
  const curtainY = useTransform(overlayProgress, [0.4, 0.8], ["100%", "0%"]);
  
  // 1. Text starts typing exactly when the curtain is half-way up the screen (0.6) and finishes at 0.9!
  const textOpacity = useTransform(overlayProgress, [0.55, 0.6], [0, 1]);
  const textRevealPercent = useTransform(overlayProgress, [0.6, 0.9], [100, 0]);
  const textClipPath = useTransform(textRevealPercent, (val) => `inset(0% ${val}% 0% 0%)`);

  // 2. Copyright elements fade in ONLY AFTER typing finishes (0.9 to 0.95)
  const copyrightOpacity = useTransform(overlayProgress, [0.9, 0.95], [0, 1]);

  // 3. Back to Top Button slides UP from the bottom at the very end (0.95 to 1.0)
  const btnOpacity = useTransform(overlayProgress, [0.95, 1.0], [0, 1]);
  const btnY = useTransform(overlayProgress, [0.95, 1.0], [30, 0]);

  // Custom Cinematic Smooth Scroll to Top
  const handleScrollToTop = () => {
    const startY = window.scrollY;
    const duration = 2500; // 2.5 seconds cinematic glide
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Extremely smooth easing function (easeInOutExpo)
      const ease = progress === 0 
        ? 0 
        : progress === 1 
          ? 1 
          : progress < 0.5 
            ? Math.pow(2, 20 * progress - 10) / 2 
            : (2 - Math.pow(2, -20 * progress + 10)) / 2;

      window.scrollTo(0, startY * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <section ref={containerRef} id="footer-section" className="relative w-full h-[500vh] bg-transparent z-20">
      
      {/* THE STICKY LOCK - This freezes to the screen for the final 100vh of scrolling */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-24">
        
        {/* 1. Standard Static Image (Rollback per user request) */}
        <div className="relative w-[300px] h-[450px] md:w-[400px] md:h-[550px] z-10 flex items-center justify-center">
          <Image 
            src="/images/hologram-body.png" 
            alt="Standing Portrait" 
            fill 
            className="object-contain"
          />
        </div>

        {/* 2. The Hologram Base Platform (Typography Block) */}
        {/* Positioned exactly where his feet will be, so it looks like he is standing ON the rotating ring! */}
        <div className="absolute bottom-[12%] flex flex-col items-center justify-end text-center z-20 pointer-events-none">
          <motion.div 
            className="relative"
            style={{ y: ringY, opacity: ringOpacity }}
          >
            <BentLogo scrollProgress={scrollYProgress} />
          </motion.div>
          
          <motion.p 
            className="text-gray-400 font-mono text-sm md:text-base tracking-[0.4em] uppercase -mt-6 md:-mt-10 lg:-mt-16"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 2.5 }}
          >
            Full Stack Developer
          </motion.p>
        </div>

        {/* 3. THE GRAND FINALE CINEMATIC CURTAIN */}
        <motion.div 
          className="absolute inset-0 bg-[#000000] z-40 flex flex-col items-center justify-center pointer-events-auto"
          style={{ y: curtainY }}
        >
          {/* The Final Quote with scroll-tied typing animation */}
          <motion.h2 
            className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-white px-4 text-center uppercase whitespace-nowrap mb-24"
            style={{ opacity: textOpacity, clipPath: textClipPath }}
          >
            THERE&apos;S ALWAYS SOMETHING NEW TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">BUILD.</span>
          </motion.h2>

          {/* The Minimal Footer Elements */}
          <motion.div 
            className="absolute bottom-24 flex flex-col items-center gap-3 w-full"
            style={{ opacity: copyrightOpacity }}
          >
            <span className="text-gray-400 text-sm md:text-base font-light tracking-[0.2em] uppercase">© 2026 MANNE ACHUTH</span>
            <span className="text-gray-500 text-xs md:text-sm font-light tracking-[0.3em] uppercase">BUILT WITH REACT · NEXT.JS · THREE.JS · AI</span>
          </motion.div>
          
          {/* Back to Top - Pinned to absolute bottom edge */}
          <motion.button 
            onClick={handleScrollToTop}
            className="absolute bottom-8 text-xs md:text-sm font-light text-red-500 tracking-[0.2em] hover:text-red-400 transition-colors uppercase flex items-center gap-2"
            style={{ opacity: btnOpacity, y: btnY }}
          >
            RETURN TO ROOT 
            <svg 
              className="w-3.5 h-3.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
