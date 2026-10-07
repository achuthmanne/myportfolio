import React from 'react';
import HackathonWire from './HackathonWire';

export default function BattlegroundsSection() {
  return (
    <section id="battlegrounds-section" className="relative w-full min-h-[130vh] mt-32 md:mt-48 flex flex-col items-center justify-start bg-transparent text-white py-24 overflow-hidden">
      
      {/* The 3D Wire Background */}
      <HackathonWire />

      {/* Sleek, Minimalist Section Heading */}
      <div className="w-full flex flex-col items-center z-30 mb-8 md:mb-16 relative">
        <div className="text-center pointer-events-none">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">BATTLEGROUNDS</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light tracking-[0.2em] uppercase mb-8">
            Sleepless nights, crazy deadlines, and rapid innovation
          </p>
        </div>
      </div>

    </section>
  );
}
