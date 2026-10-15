"use client";

import React, { use } from 'react';
import Link from 'next/link';
import BlockchainScene from '@/components/BlockchainScene';

export default function HackathonCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <main className="fixed inset-0 w-screen h-screen bg-[#070707] overflow-hidden select-none">

      {/* Return to Base navigation button */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 md:top-12 md:left-16 text-gray-400 hover:text-white transition-all flex items-center gap-2 group z-50 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:border-white/30"
      >
        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="font-mono tracking-widest text-xs uppercase">Return to Base</span>
      </Link>

      {/* Fullscreen 3D Blockchain Background */}
      <div className="absolute inset-0 w-full h-full z-10">
        <BlockchainScene />
      </div>
    </main>
  );
}
