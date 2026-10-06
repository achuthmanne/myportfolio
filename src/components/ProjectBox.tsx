import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useLenis } from 'lenis/react';

interface ProjectFolderProps {
  onSequenceComplete?: () => void;
}

const projects = [
  { 
    id: 1, 
    src: '/images/kisankhata-card.jpg', 
    alt: 'Kisan Khata', 
    rotate: -20, 
    x: -80, 
    zIndex: 1, 
    color: '#4ade80', 
    desc: 'Kisan Khata is an offline-first agricultural management app that helps farmers track daily expenses and worker attendance even with limited internet connectivity. It also delivers relevant government schemes in Telugu through an AI-powered system.',
    tech: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Gemini API'],
    liveLink: 'https://www.kisankhata.co.in/',
    githubLink: 'https://github.com/achuthmanne/kisan-khata-app'
  },
  { id: 2, src: '/images/railsamay-card.jpg', alt: 'Rail Samay', rotate: -10, x: -40, zIndex: 2, color: '#facc15', desc: 'High-performance real-time railway tracking and schedule prediction system built for millions of commuters.', tech: ['React', 'Next.js', 'Tailwind'] },
  { id: 3, src: '/images/capabilio-card.jpg', alt: 'Capabilio AI', rotate: 0, x: 0, zIndex: 3, color: '#3b82f6', desc: 'Enterprise AI-driven talent acquisition and capability mapping software redefining HR tech.', tech: ['React', 'Next.js', 'Tailwind'] },
  { id: 4, src: '/images/arc-card.jpg', alt: 'ARC Aerospace', rotate: 10, x: 40, zIndex: 4, color: '#ef4444', desc: 'Advanced aviation tracking, analytics, and aerospace management dashboard.', tech: ['React', 'Next.js', 'Tailwind'] },
  { id: 5, src: '/images/aimitra-card.jpg', alt: 'AI Mitra', rotate: 20, x: 80, zIndex: 5, color: '#a855f7', desc: 'Next-gen conversational AI companion and personalized assistant for modern students.', tech: ['React', 'Next.js', 'Tailwind'] },
];

export default function ProjectFolder({ onSequenceComplete }: ProjectFolderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-25%" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [shatteringProject, setShatteringProject] = useState<typeof projects[0] | null>(null);
  const [cardRect, setCardRect] = useState<{
    hoveredTop: number;
    hoveredLeft: number;
    restingTop: number;
    restingLeft: number;
  } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [cardsSettled, setCardsSettled] = useState(false);
  const lenis = useLenis();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, card: typeof projects[0]) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setCardRect({
      hoveredTop: centerY - 140, // 280 height / 2
      hoveredLeft: centerX - 80, // 160 width / 2
      restingTop: (centerY + 48) - 140, // add 48px to offset the whileHover y: -48
      restingLeft: centerX - 80,
    });
    setSelectedProject(card);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setCardsSettled(true);
        if (onSequenceComplete) onSequenceComplete();
      }, 4000); 
      return () => clearTimeout(timer);
    }
  }, [isInView, onSequenceComplete]);

  // Lock scrolling perfectly when a project is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      lenis?.start();
    }
  }, [selectedProject, lenis]);

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
                       onClick={(e) => handleCardClick(e, card)}
                       whileHover={{ y: -48 }}
                       className="relative w-full h-full cursor-pointer drop-shadow-2xl hover:drop-shadow-[0_20px_40px_rgba(255,255,255,0.15)] rounded-[1.5rem] overflow-hidden border border-white/10 bg-black"
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
                  <div className="text-[8px] tracking-[0.4em] font-mono uppercase text-white">PROJECT ARCHIVE // 2025-26</div>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* THE MAGIC MORPHING INTERFACE */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <div 
               className="fixed inset-0 z-[999999] flex items-center justify-center pointer-events-auto"
               data-lenis-prevent="true"
            >
            
            {/* Massive explicit blocker to kill all background pointer events */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#050505]"
            />
            
            {/* The Custom Manual Clone Engine! */}
            <motion.div 
              initial={cardRect ? {
                position: 'absolute',
                top: cardRect.hoveredTop,
                left: cardRect.hoveredLeft,
                width: 160,
                height: 280,
                rotateZ: selectedProject.rotate,
                borderRadius: '24px',
              } : {}}
              animate={{
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                rotateZ: 0,
                borderRadius: '0px',
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], exit: { duration: 0 } }}
              className="bg-[#050505] flex flex-col md:flex-row overflow-hidden shadow-2xl relative"
            >
               {/* LEFT SIDE: The exact Image Clone. */}
               <motion.div 
                 initial={{ width: "100%", height: "100%", padding: "0px" }}
                 animate={{ 
                   width: typeof window !== 'undefined' && window.innerWidth < 768 ? "100%" : "400px", 
                   height: typeof window !== 'undefined' && window.innerWidth < 768 ? "30vh" : "100%",
                   padding: "0px" // Removed padding so it zooms in completely!
                 }}
                 exit={{ width: "100%", height: "280px", padding: "0px" }} // Force full 280px height so the wrapper clips it!
                 transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                 className="relative border-b md:border-b-0 md:border-r border-white/10 bg-black z-20 flex-shrink-0 flex items-center justify-center overflow-hidden"
               >
                  <motion.img 
                    src={selectedProject.src} 
                    alt={selectedProject.alt} 
                    initial={{ objectFit: "cover", borderRadius: "24px", scale: 1.15 }}
                    animate={{ objectFit: "contain", borderRadius: "0px", scale: 1 }} // No border radius on the image itself inside the panel
                    exit={{ objectFit: "cover", borderRadius: "24px", scale: 1.15 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full" 
                  />
               </motion.div>
               
               {/* RIGHT SIDE: The Content. */}
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.3 } }}
                 exit={{ opacity: 0, transition: { duration: 0 } }}
                 className="absolute right-0 top-0 w-full md:w-[calc(100vw-400px)] h-full flex flex-col bg-[#0a0a0a] z-10"
               >
                  
                  {/* Top Header: Title, Details, Buttons */}
                  <div className="w-full p-6 md:p-8 flex flex-col lg:flex-row gap-6 items-start lg:items-end justify-between border-b border-white/10 bg-black/50">
                     <div className="flex-1">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight" style={{ color: selectedProject.color }}>
                           {selectedProject.alt}
                        </h2>
                        
                        <p className="mt-3 md:mt-4 text-gray-400 text-xs md:text-sm leading-relaxed font-light max-w-3xl">
                           {selectedProject.desc}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                           {selectedProject.tech?.map((tech: string) => (
                             <span key={tech} className="px-3 py-1 rounded-sm text-[9px] md:text-[10px] font-bold tracking-widest uppercase bg-white/5 border border-white/10" style={{ color: selectedProject.color }}>
                               {tech}
                             </span>
                           ))}
                        </div>
                     </div>
                     
                     <div className="flex flex-col gap-3 min-w-[200px] w-full lg:w-auto mt-4 lg:mt-0">
                        {selectedProject.liveLink && (
                          <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-lg text-center text-sm font-bold tracking-wide transition-all bg-white text-black hover:opacity-80">
                             Open Full Screen
                          </a>
                        )}
                        {selectedProject.githubLink && (
                          <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-lg text-center text-sm font-bold tracking-wide transition-all border border-white/20 bg-transparent text-white hover:bg-white/5">
                             GitHub Repository
                          </a>
                        )}
                     </div>
                  </div>
                  
                  {/* Bottom Section: The Live Project Preview / Iframe */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex-1 w-full relative flex items-center justify-center bg-[#050505]"
                  >
                     {selectedProject.liveLink ? (
                        <iframe 
                           src={selectedProject.liveLink} 
                           className="w-full h-full border-none"
                           title={`${selectedProject.alt} Live Preview`}
                        />
                     ) : (
                        <div className="flex flex-col items-center justify-center opacity-30">
                           <svg className="w-12 h-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                           </svg>
                           <p className="font-mono text-sm tracking-widest uppercase text-center px-4">Live Project Iframe Loads Here</p>
                        </div>
                     )}
                  </motion.div>
               </motion.div>
               
               {/* Close Button */}
               <motion.button 
                 onClick={() => {
                   setShatteringProject(selectedProject);
                   setSelectedProject(null);
                 }}
                 exit={{ opacity: 0, transition: { duration: 0 } }}
                 className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:scale-110 transition-transform z-50 hover:bg-white/10"
               >
                 <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </motion.button>
            </motion.div>
          </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* THE SHATTERING MAGIC ENGINE */}
      {shatteringProject && mounted && typeof document !== 'undefined' && createPortal(
        <ParticleSwarm 
          project={shatteringProject} 
          cardRect={cardRect} 
          onComplete={() => setShatteringProject(null)} 
        />,
        document.body
      )}
    </>
  );
}

// Magical Particle Swarm Engine
function ParticleSwarm({ project, cardRect, onComplete }: { project: typeof projects[0], cardRect: any, onComplete: () => void }) {
  const particles = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => {
      // Spawn randomly across the viewport (the shattering modal)
      const startX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000);
      const startY = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000);
      
      // Target the center of the waiting card in the folder!
      const targetX = cardRect.restingLeft + 80; // 160/2
      const targetY = cardRect.restingTop + 140; // 280/2
      
      return {
        id: i,
        startX,
        startY,
        targetX,
        targetY,
        size: Math.random() * 5 + 2, // 2px to 7px sparkles
        delay: Math.random() * 0.15, // tight burst delay
        duration: Math.random() * 0.5 + 0.5, // 0.5s to 1.0s travel time
      };
    });
  }, [cardRect]);

  useEffect(() => {
    const timer = setTimeout(onComplete, 1200); // Wait for the longest particle
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999999] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: p.startX, y: p.startY, opacity: 1, scale: 0 }}
          animate={{ 
            x: p.targetX, 
            y: p.targetY, 
            opacity: [0, 1, 1, 0], // pop in, fly, fade out exactly at the target
            scale: [0, 1.5, 1, 0.5] // sparkle pop
          }}
          transition={{ 
            duration: p.duration, 
            delay: p.delay, 
            ease: "circIn" // Accelerates like a vacuum sucking them in!
          }}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: project.color,
            boxShadow: `0 0 10px ${project.color}, 0 0 20px ${project.color}, 0 0 30px #ffffff`
          }}
        />
      ))}
    </div>
  );
}
