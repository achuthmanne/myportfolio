import React from 'react';
import ProjectFolder from './ProjectBox'; // Keep the filename the same for now, but use the new component name

interface WorkSectionProps {
  onFolderComplete?: () => void;
}

export default function WorkSection({ onFolderComplete }: WorkSectionProps) {
  return (
    <section id="work-section" className="relative w-full min-h-screen bg-transparent text-white overflow-hidden z-20 py-24">
      
      {/* Sleek, Minimalist Section Heading */}
      <div className="w-full flex flex-col items-center z-30 mb-16 relative">
        <div className="text-center pointer-events-none">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">WORK</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light tracking-[0.2em] uppercase mb-8">
            Things I've built to solve real problems
          </p>
        </div>
      </div>

      {/* Projects Container (3D Folder) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        <ProjectFolder onSequenceComplete={onFolderComplete} />
      </div>

    </section>
  );
}
