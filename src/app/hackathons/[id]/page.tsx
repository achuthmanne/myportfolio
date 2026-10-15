"use client";

import React, { use } from 'react';
import BlockchainScene from '@/components/BlockchainScene';

export default function HackathonCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <main className="fixed inset-0 w-screen h-screen bg-[#070707] overflow-hidden select-none">
      {/* Fullscreen 3D Blockchain Background */}
      <div className="absolute inset-0 w-full h-full z-10">
        <BlockchainScene />
      </div>
    </main>
  );
}
