"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function HackathonCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <main className="min-h-screen w-full bg-bg-primary text-white flex flex-col items-center justify-center p-6 relative select-none">
      <Link 
        href="/#battlegrounds-section"
        className="absolute top-8 left-8 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Battlegrounds
      </Link>
    </main>
  );
}

