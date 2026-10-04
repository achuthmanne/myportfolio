"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function MagicBurst({ burst, onComplete }: { burst: any, onComplete: (id: string) => void }) {
  const { viewport } = useThree();
  const count = 60; // particles per burst
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    // Parse percentage (e.g. "15%")
    const px = parseFloat(burst.x) / 100;
    const py = parseFloat(burst.y) / 100;
    
    // Convert DOM top-left percentage to Three.js center-origin coordinates
    // We add a slight offset so it bursts from the center of the icon
    const centerX = (px - 0.5 + 0.05) * viewport.width;
    const centerY = -(py - 0.5 + 0.05) * viewport.height;
    
    return Array.from({ length: count }).map(() => ({
      x: centerX + (Math.random() - 0.5) * 120, // Spread across the 140px icon
      y: centerY + (Math.random() - 0.5) * 120,
      z: (Math.random() - 0.5) * 10,
      vx: (Math.random() - 0.5) * 1.5, // gentle horizontal drift
      vy: Math.random() * 2 + 1,       // graceful slow rise (1-3px per frame)
      vz: (Math.random() - 0.5) * 0.5,
      life: 1.0,
      decay: Math.random() * 0.015 + 0.008, // smooth slow fade
      scale: Math.random() * 2 + 1 // crisp tiny sparkles (1 to 3 pixels absolute)
    }));
  }, [burst, viewport, count]);

  useFrame(() => {
    if (!meshRef.current) return;
    let alive = false;
    
    particles.forEach((p, i) => {
      if (p.life > 0) {
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.life -= p.decay;
        
        dummy.position.set(p.x, p.y, p.z);
        // Shrink as they fade out (absolute pixel sizes)
        dummy.scale.setScalar(Math.max(0, p.life) * p.scale);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      } else {
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      }
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    
    // Once all particles are dead, unmount this burst
    if (!alive) {
      onComplete(burst.id);
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <circleGeometry args={[1, 8]} />
      <meshBasicMaterial 
        color={burst.color} 
        transparent 
        opacity={0.9} 
        depthWrite={false} 
        blending={THREE.AdditiveBlending} 
      />
    </instancedMesh>
  );
}

const categories = [
  {
    id: "web",
    label: "WEB",
    skills: [
      { id: "react", name: "React + Vite", img: "/skills/vite.jpg", color: "#646cff", x: "8%", y: "10%", rotateX: 10, rotateY: -15, rotateZ: -5 },
      { id: "next", name: "Next.js", img: "/skills/next.png", color: "#ffffff", x: "45%", y: "25%", rotateX: -10, rotateY: 20, rotateZ: 5 },
      { id: "tailwind", name: "Tailwind CSS", img: "/skills/tailwind.png", color: "#38bdf8", x: "85%", y: "15%", rotateX: 15, rotateY: 10, rotateZ: -10 },
      { id: "node", name: "Node.js", img: "/skills/node.png", color: "#22c55e", x: "22%", y: "65%", rotateX: -5, rotateY: -20, rotateZ: 8 },
      { id: "express", name: "Express.js", img: "/skills/express.png", color: "#9ca3af", x: "70%", y: "75%", rotateX: 20, rotateY: -5, rotateZ: -12 },
    ]
  },
  {
    id: "mobile",
    label: "MOBILE",
    skills: [
      { id: "rn", name: "React Native", img: "/skills/rn.jpg", color: "#00d8ff", x: "15%", y: "25%", rotateX: 10, rotateY: -15, rotateZ: -5 },
      { id: "expo", name: "Expo", img: "/skills/expo.jpg", color: "#ffffff", x: "40%", y: "65%", rotateX: -10, rotateY: 10, rotateZ: 5 },
      { id: "ts", name: "TypeScript", img: "/skills/ts.jpg", color: "#3178c6", x: "65%", y: "25%", rotateX: 15, rotateY: -10, rotateZ: -10 },
      { id: "firebase", name: "Firebase", img: "/skills/firebase.jpg", color: "#ffca28", x: "85%", y: "65%", rotateX: -15, rotateY: -20, rotateZ: 10 },
    ]
  },
  {
    id: "ai",
    label: "AI & DATA",
    skills: [
      { id: "gemini", name: "Google Gemini", img: "/skills/gemini.jpg", color: "#8b5cf6", x: "8%", y: "20%", rotateX: 15, rotateY: -15, rotateZ: 5 },
      { id: "python", name: "Python", img: "/skills/python.jpg", color: "#facc15", x: "25%", y: "65%", rotateX: -10, rotateY: -10, rotateZ: -10 },
      { id: "groq", name: "Groq", img: "/skills/groq.jpg", color: "#ef4444", x: "42%", y: "25%", rotateX: 20, rotateY: 10, rotateZ: -5 },
      { id: "claude", name: "Claude", img: "/skills/claude.jpg", color: "#d97757", x: "58%", y: "70%", rotateX: -15, rotateY: 20, rotateZ: 5 },
      { id: "postgres", name: "PostgreSQL", img: "/skills/postgres.jpg", color: "#3b82f6", x: "75%", y: "20%", rotateX: 5, rotateY: 25, rotateZ: 0 },
      { id: "mongodb", name: "MongoDB", img: "/skills/mongodb.jpg", color: "#10b981", x: "90%", y: "60%", rotateX: -15, rotateY: -20, rotateZ: 10 },
    ]
  },
  {
    id: "cloud",
    label: "CLOUD / DEVOPS",
    skills: [
      { id: "vercel", name: "Vercel", img: "/skills/vercel.jpg", color: "#ffffff", x: "15%", y: "25%", rotateX: -20, rotateY: 10, rotateZ: 15 },
      { id: "render", name: "Render", img: "/skills/render.jpg", color: "#a8b1ff", x: "40%", y: "65%", rotateX: 15, rotateY: -10, rotateZ: 10 },
      { id: "github", name: "GitHub", img: "/skills/github.jpg", color: "#a1a1aa", x: "65%", y: "25%", rotateX: -15, rotateY: 20, rotateZ: -5 },
      { id: "aws", name: "AWS", img: "/skills/aws.jpg", color: "#f97316", x: "85%", y: "65%", rotateX: 10, rotateY: -20, rotateZ: 5 },
    ]
  },
  {
    id: "design",
    label: "DESIGN & TOOLS",
    skills: [
      { id: "figma", name: "Figma", img: "/skills/figma.jpg", color: "#f24e1e", x: "30%", y: "50%", rotateX: -10, rotateY: 15, rotateZ: -5 },
      { id: "vscode", name: "VS Code", img: "/skills/vscode.jpg", color: "#007acc", x: "60%", y: "30%", rotateX: 20, rotateY: -10, rotateZ: 10 },
    ]
  }
];

interface LabSectionProps {
  onComplete?: () => void;
}

export default function LabSection({ onComplete }: LabSectionProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [bursts, setBursts] = useState<any[]>([]);
  
  // Track which categories the user has clicked
  const [viewedCategories, setViewedCategories] = useState<Set<string>>(new Set([categories[0].id]));
  const containerRef = useRef<HTMLElement>(null);

  // Trigger completion when all categories have been viewed
  useEffect(() => {
    if (viewedCategories.size === categories.length) {
      if (onComplete) onComplete();
    }
  }, [viewedCategories, onComplete]);

  const handleCategorySwitch = (newId: string) => {
    if (newId === activeCategory) return;
    
    // Add to viewed categories
    setViewedCategories(prev => {
      const next = new Set(prev);
      next.add(newId);
      return next;
    });
    
    // Get the old category skills to explode them
    const oldCat = categories.find(c => c.id === activeCategory);
    if (oldCat) {
      const newBursts = oldCat.skills.map(s => ({
        id: s.id + "-" + Date.now(),
        x: s.x,
        y: s.y,
        color: s.color
      }));
      setBursts(prev => [...prev, ...newBursts]);
    }
    
    setActiveCategory(newId);
  };

  const removeBurst = (id: string) => {
    setBursts(prev => prev.filter(b => b.id !== id));
  };

  const currentCategory = categories.find(c => c.id === activeCategory);

  return (
    <section ref={containerRef} id="lab-section" className="relative w-full min-h-screen bg-transparent text-white overflow-hidden z-20">
      
      {/* Sleek, Minimalist Section Heading & Navigation */}
      <div className="absolute top-16 left-0 w-full flex flex-col items-center z-30">
        <div className="text-center pointer-events-none">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">LAB</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light tracking-[0.2em] uppercase mb-8">
            Tools I use to engineer digital experiences
          </p>
        </div>

        {/* Pure Black & White Category Navigation */}
        <div className="w-full max-w-4xl px-4">
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar pb-4">
            <div className="flex items-center gap-2 p-1.5 bg-[#111] border border-white/10 rounded-full shadow-2xl">
              {categories.map((cat) => {
                const isViewed = viewedCategories.has(cat.id);
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySwitch(cat.id)}
                    className={`relative px-5 py-2 rounded-full text-xs md:text-sm font-bold tracking-widest transition-all duration-300 whitespace-nowrap ${
                      activeCategory === cat.id 
                        ? 'bg-white text-black' 
                        : 'bg-transparent text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scattered Floating Nodes Container */}
      <div className="relative w-full h-[calc(100vh-250px)] max-w-[1200px] mx-auto z-10 mt-[220px]">
        {/* Magic 3D Canvas Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 1 }}>
            {bursts.map(burst => (
              <MagicBurst key={burst.id} burst={burst} onComplete={removeBurst} />
            ))}
          </Canvas>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            {currentCategory?.skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 80 }}
                className="absolute group z-10 hover:z-[100]"
                style={{
                  left: skill.x,
                  top: skill.y,
                }}
              >
                {/* Floating Animation (Always floating) */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative cursor-crosshair transition-all duration-500 group-hover:scale-110 group-hover:z-[100]"
                >
                  {/* 3D Icon Container (Rotates in 3D, flattens on hover) */}
                  <div 
                    className="relative w-24 h-24 md:w-36 md:h-36 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-[32px] flex items-center justify-center border border-white/5 shadow-2xl overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:!transform-none"
                    style={{
                      perspective: "1000px",
                      transformStyle: "preserve-3d",
                      transform: `rotateX(${skill.rotateX}deg) rotateY(${skill.rotateY}deg) rotateZ(${skill.rotateZ}deg)`,
                    }}
                  >
                    {skill.img ? (
                      <img 
                        src={skill.img} 
                        alt={skill.name} 
                        className={`w-full h-full object-contain p-2 ${skill.img.endsWith('.jpg') ? 'mix-blend-screen' : ''}`} 
                      />
                    ) : (
                      <span className="text-gray-600 font-bold text-xs tracking-widest uppercase">NEED IMG</span>
                    )}
                  </div>

                  {/* Smart Tooltip - Flips to the top if the icon is too low on the screen! */}
                  <div 
                    className={`absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-50 ${
                      parseFloat(skill.y) > 55 
                        ? "bottom-full mb-4 translate-y-4 group-hover:translate-y-0" 
                        : "top-full mt-4 -translate-y-4 group-hover:translate-y-0"
                    }`}
                  >
                    <div className="bg-[#111] border border-white/20 px-6 py-2.5 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.8)] whitespace-nowrap">
                      <h5 className="font-semibold text-white text-base tracking-normal">{skill.name}</h5>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
