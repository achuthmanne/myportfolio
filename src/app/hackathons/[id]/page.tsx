"use client";

import React, { use } from 'react';
import Link from 'next/link';

export default function HackathonCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  return (
    <main className="min-h-screen bg-bg-primary text-white flex flex-col items-center justify-center relative p-8">
      {/* Temporary Back Button */}
      <Link href="/" className="absolute top-12 left-8 md:left-16 text-gray-400 hover:text-white transition-colors flex items-center gap-2 group z-50">
        <svg className="w-6 h-6 transform group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="font-mono tracking-widest text-sm uppercase">Return to Base</span>
      </Link>

      <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase">
        {resolvedParams.id.replace('-', ' ')}
      </h1>
      <p className="text-gray-400 font-mono tracking-widest uppercase mb-8">Case Study in progress...</p>
      
      {/* Placeholder content - User will specify later */}
      <div className="w-full max-w-3xl h-64 border border-dashed border-white/20 flex items-center justify-center rounded-xl">
        <span className="text-white/30 font-mono">CONTENT GOES HERE</span>
      </div>
    </main>
  );
}
