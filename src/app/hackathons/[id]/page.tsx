"use client";

import React, { use } from 'react';
import HackathonGalleryWire from '@/components/HackathonGalleryWire';

export default function HackathonCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <main className="min-h-screen w-full bg-bg-primary text-white relative overflow-hidden">
      {/* 3D Curved Iron Wire & Cosmic Tiny Particles */}
      <HackathonGalleryWire />
    </main>
  );
}
