import React, { useState } from 'react';
import HackathonWire from './HackathonWire';
import { motion, AnimatePresence } from 'framer-motion';

const hackathonData: Record<string, { title: string, subtitle: string, imageSrc: string, description: string, themeColor: string }> = {
  'trinetra': {
    title: 'TRINETRA',
    subtitle: '20 Hours Hackathon',
    imageSrc: '/images/trinetra-card-transparent.png',
    description: 'An intense 20-hour cybersecurity and deep-tech hackathon organized by VentureSpace. Focused on building cutting-edge solutions for modern security challenges.',
    themeColor: 'bg-red-500'
  },
  'gear-up': {
    title: 'GEAR UP SEASON 5',
    subtitle: 'A 36 Hour Hackathon',
    imageSrc: '/images/gear-up-card-transparent.png',
    description: 'A grueling 36-hour hackathon bringing together the best minds to build rapid, innovative software solutions under crazy deadlines.',
    themeColor: 'bg-[#0057B8]' // Royal Blue to match the wire
  }
};

export default function BattlegroundsSection() {
  const [selectedHackathon, setSelectedHackathon] = useState<string | null>(null);

  return (
    <section id="battlegrounds-section" className="relative w-full min-h-[130vh] mt-32 md:mt-48 flex flex-col items-center justify-start bg-transparent text-white py-24 overflow-hidden">
      
      {/* The 3D Wire Background */}
      <HackathonWire onCardClick={(id) => setSelectedHackathon(id)} />

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

      {/* The Hackathon Modal */}
      <AnimatePresence>
        {selectedHackathon && hackathonData[selectedHackathon] && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 pointer-events-auto">
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedHackathon(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Content container matches ProjectBox modal style */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[95vw] lg:max-w-7xl h-[85vh] bg-[#0a0a0a] rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl z-10"
            >
              {/* Left Side: Image display */}
              <div className="w-full md:w-1/2 h-[45%] md:h-full bg-black/50 flex items-center justify-center p-8 relative">
                <motion.img 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  src={hackathonData[selectedHackathon].imageSrc} 
                  alt={hackathonData[selectedHackathon].title} 
                  className="max-w-full max-h-full object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                />
              </div>

              {/* Right Side: Details */}
              <div className="w-full md:w-1/2 h-[55%] md:h-full flex flex-col justify-center p-6 md:p-16 relative">
                 <motion.h2 
                   initial={{ x: 20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: 0.3 }}
                   className="text-3xl md:text-5xl lg:text-6xl font-black font-sans tracking-tight mb-2 whitespace-nowrap overflow-hidden text-ellipsis"
                 >
                   {hackathonData[selectedHackathon].title}
                 </motion.h2>

                 <motion.div 
                   initial={{ x: 20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: 0.4 }}
                   className={`w-16 h-1 mb-6 ${hackathonData[selectedHackathon].themeColor.startsWith('bg-') ? hackathonData[selectedHackathon].themeColor : ''}`}
                   style={{ backgroundColor: hackathonData[selectedHackathon].themeColor.startsWith('#') ? hackathonData[selectedHackathon].themeColor : undefined }}
                 ></motion.div>

                 <motion.h3 
                   initial={{ x: 20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: 0.5 }}
                   className="text-xl md:text-2xl text-gray-400 font-mono mb-6"
                 >
                   {hackathonData[selectedHackathon].subtitle}
                 </motion.h3>

                 <motion.p 
                   initial={{ x: 20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: 0.6 }}
                   className="text-base md:text-lg text-gray-300 leading-relaxed font-sans"
                 >
                   {hackathonData[selectedHackathon].description}
                 </motion.p>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setSelectedHackathon(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:scale-110 transition-transform z-50 hover:bg-white/10"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
