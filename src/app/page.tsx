"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Code2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// A subtle, dynamic 3D starfield/particle background so it NEVER feels static
function ParticleBackground() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={1} />
    </group>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const horizontalPanelRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const pipelineSteps = [
    { id: "figma", src: "/images/pipeline/figma.png", title: "01. ARCHITECTURE", desc: "Wireframing & UI/UX Design." },
    { id: "vscode", src: "/images/pipeline/vscode.png", title: "02. DEVELOPMENT", desc: "Writing scalable code." },
    { id: "github", src: "/images/pipeline/github.png", title: "03. VERSION CONTROL", desc: "Branching & Commits." },
    { id: "vercel", src: "/images/pipeline/vercel.png", title: "04. DEPLOYMENT", desc: "CI/CD & Hosting." },
    { id: "product", src: "/images/pipeline/product.jpg", title: "05. LIVE PRODUCT", desc: "The final experience." },
  ];

  useEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      
      // Horizontal Scroll Magic!
      const sections = gsap.utils.toArray(".panel");
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: scrollWrapperRef.current,
          pin: true,
          scrub: 1, // Smooth scrubbing
          snap: 1 / (sections.length - 1), // Snaps to each folder/panel
          end: () => "+=" + horizontalPanelRef.current?.offsetWidth,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <main 
      ref={containerRef}
      className="relative bg-bg-primary text-text-primary selection:bg-accent-rich selection:text-white"
    >
      {/* Dynamic 3D Background */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }} onCreated={() => setIsReady(true)}>
          <ParticleBackground />
        </Canvas>
      </div>

      {/* 
        THE HORIZONTAL SCROLL WRAPPER
        This div is massive vertically so you can scroll for a long time.
        The inner container gets pinned to the screen and translates horizontally!
      */}
      <div ref={scrollWrapperRef} className="relative w-full h-screen overflow-hidden z-10">
        
        {/* The massive horizontal track */}
        <div 
          ref={horizontalPanelRef} 
          className="flex w-[600vw] h-full"
        >
          
          {/* INTRO PANEL */}
          <section className="panel w-[100vw] h-full flex flex-col items-center justify-center text-center px-6 relative">
            
            {/* Folder Shape Border */}
            <div className="absolute inset-0 mx-6 my-24 sm:mx-10 sm:my-28 pointer-events-none flex flex-col">
              {/* Top Row: Tab (Left) + Top Border Line (Right) */}
              <div className="flex h-10 sm:h-12 w-full">
                {/* Folder Tab */}
                <div className="w-32 sm:w-64 h-full border-t-[8px] border-l-[8px] border-r-[8px] sm:border-t-[12px] sm:border-l-[12px] sm:border-r-[12px] border-border/30 rounded-t-2xl"></div>
                {/* Right side top border */}
                <div className="flex-1 border-b-[8px] sm:border-b-[12px] border-border/30 rounded-tr-2xl relative">
                  {/* Path text on the right */}
                  <div className="absolute bottom-3 right-4 sm:right-8">
                    <span className="text-text-secondary/70 font-bold tracking-wider uppercase text-[10px] sm:text-sm">
                      /Root/Workspace/Pipeline
                    </span>
                  </div>
                </div>
              </div>
              {/* Main Body */}
              <div className="flex-1 border-b-[8px] border-l-[8px] border-r-[8px] sm:border-b-[12px] sm:border-l-[12px] sm:border-r-[12px] border-border/30 rounded-b-3xl"></div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary px-4 py-2"
            >
              <Code2 className="h-4 w-4 text-accent-highlight" />
              <span className="text-sm font-medium tracking-widest text-text-secondary uppercase">
                Interactive Folder
              </span>
            </motion.div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl mb-6">
              Development <br />
              <span className="text-accent-highlight">
                pipeline.
              </span>
            </h1>
            <p className="max-w-xl text-lg text-text-secondary">
              Scroll down to pan horizontally through the workspace folder.
            </p>
          </section>

          {/* THE 5 PIPELINE PANELS */}
          {pipelineSteps.map((step, i) => (
            <section key={step.id} className="panel w-[100vw] h-full flex items-center justify-center relative px-10 sm:px-20">
              
              {/* Folder Shape Border */}
              <div className="absolute inset-0 mx-6 my-24 sm:mx-10 sm:my-28 pointer-events-none flex flex-col">
                {/* Top Row: Tab (Left) + Top Border Line (Right) */}
                <div className="flex h-10 sm:h-12 w-full">
                  {/* Folder Tab */}
                  <div className="w-32 sm:w-64 h-full border-t-[8px] border-l-[8px] border-r-[8px] sm:border-t-[12px] sm:border-l-[12px] sm:border-r-[12px] border-border/30 rounded-t-2xl"></div>
                  {/* Right side top border */}
                  <div className="flex-1 border-b-[8px] sm:border-b-[12px] border-border/30 rounded-tr-2xl relative">
                    {/* Path text on the right */}
                    <div className="absolute bottom-3 right-4 sm:right-8">
                      <span className="text-text-secondary/70 font-bold tracking-wider uppercase text-[10px] sm:text-sm">
                        /Root/Workspace/{step.id}.exe
                      </span>
                    </div>
                  </div>
                </div>
                {/* Main Body */}
                <div className="flex-1 border-b-[8px] border-l-[8px] border-r-[8px] sm:border-b-[12px] sm:border-l-[12px] sm:border-r-[12px] border-border/30 rounded-b-3xl"></div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-16 w-full max-w-7xl">
                
                {/* Massive Image Container (No Background) */}
                <div className="w-full md:w-3/5">
                  <div className="relative w-full aspect-[16/10] overflow-hidden group">
                    <Image 
                      src={step.src} 
                      alt={step.title} 
                      fill 
                      className="object-contain p-4 mix-blend-screen transition-transform duration-700 ease-out cursor-crosshair"
                    />
                  </div>
                </div>

                {/* Text Context */}
                <div className="w-full md:w-2/5 flex flex-col items-start text-left z-20">
                  <div className="text-6xl font-black text-border mb-4 opacity-50">{String(i + 1).padStart(2, '0')}</div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white drop-shadow-md whitespace-nowrap">
                    {step.title}
                  </h2>
                  <p className="text-text-secondary text-lg md:text-xl border-l-2 border-accent-highlight pl-4">
                    {step.desc}
                  </p>
                </div>
              </div>
            </section>
          ))}

        </div>
      </div>
    </main>
  );
}
