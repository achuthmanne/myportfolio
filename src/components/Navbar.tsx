"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (pathname !== "/") {
      setShowNav(true);
      return;
    }

    if (latest < 100) {
      setShowNav(true);
      return;
    }

    // Hide if we hit the Lab Section
    const labSection = document.getElementById("lab-section");
    if (labSection) {
      const labRect = labSection.getBoundingClientRect();
      // Hide the navbar as soon as the final explosion starts (when lab section barely enters the screen)
      if (labRect.top <= window.innerHeight * 0.9) {
        setShowNav(false);
        return;
      }
    }

    // Keep nav visible during tools-section cinematic scroll
    const toolsSection = document.getElementById("tools-section");
    if (toolsSection) {
      const rect = toolsSection.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        setShowNav(true);
        return;
      }
    }

    setShowNav(false);
  });

  // Completely hide the navbar on immersive routes (hackathons and story page)
  if (pathname && (pathname.startsWith("/hackathons") || pathname.startsWith("/story"))) {
    return null;
  }

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: showNav ? 0 : -100, opacity: showNav ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 bg-transparent pointer-events-auto"
    >
      {/* 3D Flipping Logo - Hard Refresh on click */}
      <a 
        href="/" 
        onClick={(e) => {
          e.preventDefault();
          window.location.reload();
        }}
        className="flex items-center gap-2 cursor-pointer select-none"
        onMouseEnter={() => setIsLogoHovered(true)}
        onMouseLeave={() => setIsLogoHovered(false)}
      >
        <div className="relative w-36 sm:w-48 h-10 sm:h-12 -ml-3 sm:-ml-8" style={{ perspective: 1000 }}>
          <motion.div 
            className="relative w-full h-full"
            animate={{ rotateX: isLogoHovered ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 150, damping: 15 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* FRONT FACE (Logo) */}
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
              <Image 
                src="/images/logo-transparent.png" 
                alt="Achuth Manne Logo" 
                fill 
                className="object-contain object-left scale-[2.1] sm:scale-[2.5] origin-left"
                priority
              />
            </div>

            {/* BACK FACE (Creative Refresh Text) */}
            <div 
              className="absolute inset-0 flex items-center justify-start pl-6 sm:pl-10" 
              style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-highlight" />
                <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.18em] sm:tracking-[0.25em] uppercase bg-gradient-to-r from-white to-text-secondary text-transparent bg-clip-text">
                  System Reboot
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </a>

      {/* High-Contrast White & Black "About me" CTA Button with Slide-Up Fill Effect */}
      <Link 
        href="/story"
        className="group relative inline-flex items-center justify-center px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-white/20 hover:border-white bg-[#07070a]/80 backdrop-blur-md overflow-hidden text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 active:scale-95 cursor-pointer select-none shrink-0"
      >
        <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300">
          About me
        </span>
        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
      </Link>
    </motion.nav>
  );
}
