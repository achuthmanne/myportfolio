"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { RefreshCw } from "lucide-react";

export default function Navbar() {
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const navLinks = [
    { name: "STORY", href: "#story" },
    { name: "LAB", href: "#lab" },
    { name: "WORK", href: "#work" },
    { name: "CONNECT", href: "#connect" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-transparent"
    >
      {/* 3D Flipping Logo - Hard Refresh on click */}
      <a 
        href="/" 
        onClick={(e) => {
          e.preventDefault();
          window.location.reload();
        }}
        className="flex items-center gap-2 cursor-pointer"
        onMouseEnter={() => setIsLogoHovered(true)}
        onMouseLeave={() => setIsLogoHovered(false)}
      >
        <div className="relative w-48 h-12 -ml-5 sm:-ml-8" style={{ perspective: 1000 }}>
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
                className="object-contain object-left scale-[2.3] sm:scale-[2.5] origin-left"
                priority
              />
            </div>

            {/* BACK FACE (Creative Refresh Text) */}
            <div 
              className="absolute inset-0 flex items-center justify-start pl-8 sm:pl-10" 
              style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
            >
              <div className="flex items-center gap-2 whitespace-nowrap">
                <RefreshCw className="w-4 h-4 text-accent-highlight" />
                <span className="text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase bg-gradient-to-r from-white to-text-secondary text-transparent bg-clip-text">
                  System Reboot
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </a>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-2">
        {navLinks.map((link, index) => (
          <Link 
            key={index} 
            href={link.href}
            className="relative px-5 py-2 text-xs sm:text-sm font-semibold tracking-[0.15em] text-text-secondary hover:text-white transition-colors duration-300 group z-10"
          >
            <span className="relative z-10">{link.name}</span>
            
            {/* SVG Drawing Border */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
              <rect 
                x="0" y="0" width="100%" height="100%" rx="999" 
                fill="transparent" 
                stroke="var(--color-accent-highlight)" 
                strokeWidth="1.5" 
                className="nav-border-draw opacity-60 group-hover:opacity-100 transition-opacity duration-500" 
              />
            </svg>

            {/* Fading Glass Background */}
            <span className="absolute inset-0 rounded-full bg-accent-highlight/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out backdrop-blur-md -z-20"></span>
            
            {/* Subtle glow */}
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(201,42,58,0.2)] transition-opacity duration-500 ease-out -z-30"></span>
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button (Hamburger - hidden on desktop) */}
      <button className="md:hidden text-text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" x2="20" y1="12" y2="12"/>
          <line x1="4" x2="20" y1="6" y2="6"/>
          <line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
      </button>
    </motion.nav>
  );
}
