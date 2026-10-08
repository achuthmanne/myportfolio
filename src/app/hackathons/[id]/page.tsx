"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const hackathonData: Record<string, { title: string, subtitle: string, imageSrc: string, description: string }> = {
  'trinetra': {
    title: 'TRINETRA',
    subtitle: '20 Hours Hackathon',
    imageSrc: '/images/trinetra-card-transparent.png',
    description: 'An intense 20-hour cybersecurity and deep-tech hackathon organized by VentureSpace. Focused on building cutting-edge solutions for modern security challenges.',
  },
  'gear-up': {
    title: 'GEAR UP SEASON 5',
    subtitle: 'A 36 Hour Hackathon',
    imageSrc: '/images/gear-up-card-transparent.png',
    description: 'A grueling 36-hour hackathon bringing together the best minds to build rapid, innovative software solutions under crazy deadlines.',
  }
};

export default function HackathonPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const data = hackathonData[resolvedParams.id];

  if (!data) {
    return (
      <div className="min-h-screen bg-bg-primary text-white flex items-center justify-center">
        <h1 className="text-2xl">Hackathon not found.</h1>
        <Link href="/" className="ml-4 text-accent-primary underline">Go Back</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-bg-primary text-white overflow-hidden relative">
      {/* Smooth Fade-in Page Transition */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-full min-h-screen flex flex-col md:flex-row items-center justify-center p-8 md:p-24 relative z-10"
      >
        {/* Back Button */}
        <Link href="/" className="absolute top-12 left-8 md:left-24 text-gray-400 hover:text-white transition-colors flex items-center gap-2 group z-50">
          <svg className="w-6 h-6 transform group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-mono tracking-widest text-sm">RETURN TO BASE</span>
        </Link>

        {/* Left: The Massive ID Card */}
        <div className="w-full md:w-1/2 flex justify-center items-center mb-12 md:mb-0">
          <motion.img 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            src={data.imageSrc} 
            alt={data.title} 
            className="w-[300px] md:w-[450px] object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
          />
        </div>

        {/* Right: The Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center max-w-2xl px-4 md:px-12">
          <motion.h1 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold font-sans tracking-tight mb-4"
          >
            {data.title}
          </motion.h1>
          
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="w-20 h-1 bg-accent-primary mb-6"
          ></motion.div>

          <motion.h2 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="text-2xl md:text-3xl text-gray-400 font-mono mb-8"
          >
            {data.subtitle}
          </motion.h2>

          <motion.p 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed font-sans"
          >
            {data.description}
          </motion.p>
        </div>
      </motion.div>
    </main>
  );
}
