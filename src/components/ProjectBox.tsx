import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface ProjectFolderProps {
  onSequenceComplete?: () => void;
}

const projects = [
  { id: 1, src: '/images/kisankhata-card.jpg', alt: 'Kisan Khata', rotate: -20, x: -80, zIndex: 1, color: '#4ade80', desc: 'A revolutionary fintech platform empowering farmers with seamless digital ledgers and financial tracking.' },
  { id: 2, src: '/images/railsamay-card.jpg', alt: 'Rail Samay', rotate: -10, x: -40, zIndex: 2, color: '#facc15', desc: 'High-performance real-time railway tracking and schedule prediction system built for millions of commuters.' },
  { id: 3, src: '/images/capabilio-card.jpg', alt: 'Capabilio AI', rotate: 0, x: 0, zIndex: 3, color: '#3b82f6', desc: 'Enterprise AI-driven talent acquisition and capability mapping software redefining HR tech.' },
  { id: 4, src: '/images/arc-card.jpg', alt: 'ARC Aerospace', rotate: 10, x: 40, zIndex: 4, color: '#ef4444', desc: 'Advanced aviation tracking, analytics, and aerospace management dashboard.' },
  { id: 5, src: '/images/aimitra-card.jpg', alt: 'AI Mitra', rotate: 20, x: 80, zIndex: 5, color: '#a855f7', desc: 'Next-gen conversational AI companion and personalized assistant for modern students.' },
];

export default function ProjectFolder({ onSequenceComplete }: ProjectFolderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-25%" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        if (onSequenceComplete) onSequenceComplete();
      }, 4000); 
      return () => clearTimeout(timer);
    }
  }, [isInView, onSequenceComplete]);

  // Lock scrolling when a project is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  return (
    <>
      <div 
        ref={containerRef}
        className="relative w-full flex justify-center items-center py-20"
        style={{ perspective: '1500px' }}
      >
        <div className="relative w-full max-w-[800px] flex justify-center items-center transform scale-[1.0] md:scale-[1.4] lg:scale-[1.8] mt-10 md:mt-20">
          
          <motion.div
            className="relative w-[400px] h-[300px]"
            initial={{ rotateY: 0, y: 0 }}
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            
            {/* 1. BACK COVER */}
            <div className="absolute inset-0 w-full h-full z-10 flex flex-col pointer-events-none">
              <div className="w-[130px] h-[35px] bg-[#0a0a0a] border-t border-l border-r border-white/20 rounded-t-xl flex items-center px-4 relative z-10">
                 <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Projects</span>
              </div>
              <div className="flex-1 w-full bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/20 rounded-b-2xl rounded-tr-2xl relative shadow-[inset_0_20px_50px_rgba(0,0,0,0.8)] -mt-[1px]">
                 <div className="absolute inset-0 bg-black/60 rounded-b-2xl rounded-tr-2xl" />
              </div>
            </div>

            {/* 2. THE PROJECT CARDS */}
            <div 
              className="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-[160px] h-[280px] z-20 pointer-events-auto" 
              style={{ transformStyle: 'preserve-3d', clipPath: 'inset(-1000px -1000px 0px -1000px)' }}
            >
               {projects.map((card, index) => (
                  <motion.div 
                     key={card.id}
                     className="absolute bottom-0 left-0 w-full h-full"
                     initial={{ y: 150, x: 0, rotateZ: 0 }}
                     animate={isInView ? { y: 10, x: card.x, rotateZ: card.rotate } : { y: 150, x: 0, rotateZ: 0 }}
                     transition={{ duration: 1.2, delay: isInView ? 1.8 + (index * 0.15) : 0, ease: [0.22, 1, 0.36, 1] }}
                     style={{ zIndex: card.zIndex }}
                  >
                     <motion.div 
                       layoutId={`project-card-${card.id}`}
                       onClick={() => setSelectedProject(card)}
                       className="relative w-full h-full transition-all duration-500 hover:-translate-y-12 cursor-pointer drop-shadow-2xl hover:drop-shadow-[0_20px_40px_rgba(255,255,255,0.15)] rounded-[1.5rem] overflow-hidden border border-white/10"
                     >
                        <img src={card.src} alt={card.alt} className="w-full h-full object-cover scale-[1.15]" />
                     </motion.div>
                  </motion.div>
               ))}
            </div>

            {/* 3. FRONT FLAP */}
            <motion.div 
              className="absolute bottom-0 left-0 w-full h-[220px] z-30 origin-bottom rounded-2xl bg-gradient-to-tr from-[#111] to-[#1a1a1a] border border-white/10 shadow-2xl flex flex-col justify-between p-4"
              initial={{ rotateX: 0 }}
              animate={{ rotateX: isInView ? -45 : 0 }} 
              transition={{ duration: 2.5, ease: [0.45, 0, 0.55, 1], delay: 0.8 }} 
              style={{ transformStyle: 'preserve-3d' }}
            >
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />
               <div className="w-full flex justify-between items-start opacity-30 mt-2">
                  <div className="flex flex-col gap-1">
                     <div className="w-8 h-1 bg-white rounded-full" />
                     <div className="w-12 h-1 bg-white rounded-full" />
                  </div>
                  <div className="text-[8px] tracking-[0.4em] font-mono uppercase text-white">PROJECT ARCHIVE // 2025?"26</div>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* THE MAGIC MORPHING INTERFACE */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-auto">
            
            {/* Backdrop Blur that fades in independently */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            
            {/* The Morphing Card that becomes the UI! */}
            <motion.div 
              layoutId={`project-card-${selectedProject.id}`}
              className="relative w-full max-w-6xl h-[90vh] md:h-[80vh] rounded-[2rem] overflow-hidden bg-[#050505] shadow-2xl flex flex-col md:flex-row border"
              style={{ 
                borderColor: `${selectedProject.color}40`,
                boxShadow: `0 20px 100px -20px ${selectedProject.color}40`
              }}
            >
               {/* Left Side: The Image stays there but expands */}
               <div className="w-full md:w-[45%] h-[40%] md:h-full relative border-b md:border-b-0 md:border-r border-white/5">
                  <img src={selectedProject.src} alt={selectedProject.alt} className="w-full h-full object-cover" />
                  {/* Glowing gradient matching the theme color */}
                  <div className="absolute inset-0 mix-blend-screen" style={{ background: `linear-gradient(to top, #050505, transparent, ${selectedProject.color}20)` }} />
               </div>
               
               {/* Right Side: The details fade in AFTER the morph completes */}
               <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="w-full md:w-[55%] p-8 md:p-14 flex flex-col justify-between overflow-y-auto"
               >
                  <div>
                     <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter" style={{ textShadow: `0 0 30px ${selectedProject.color}60` }}>
                        {selectedProject.alt}
                     </h2>
                     
                     <p className="mt-6 text-gray-400 text-sm md:text-lg leading-relaxed font-light">
                        {selectedProject.desc}
                     </p>
                     
                     <div className="flex flex-wrap gap-3 mt-8">
                        {['React', 'Next.js', 'Tailwind', 'Three.js'].map(tech => (
                          <span key={tech} className="px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/10" style={{ color: selectedProject.color }}>
                            {tech}
                          </span>
                        ))}
                     </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 mt-12">
                     <a href="#" className="flex-1 py-4 rounded-xl text-center text-sm md:text-base font-bold tracking-wide transition-all hover:scale-105 bg-white text-black hover:opacity-80">
                        View Live Vercel
                     </a>
                     <a href="#" className="flex-1 py-4 rounded-xl text-center text-sm md:text-base font-bold tracking-wide transition-all hover:scale-105 border bg-black text-white" style={{ borderColor: `${selectedProject.color}60` }}>
                        GitHub Code
                     </a>
                  </div>
               </motion.div>
               
               {/* Close Button */}
               <button 
                 onClick={() => setSelectedProject(null)}
                 className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:scale-110 transition-transform z-50 hover:bg-white/10"
               >
                 ✕
               </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
