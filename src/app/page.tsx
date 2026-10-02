"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Code2 } from "lucide-react";
import StorySection from "@/components/StorySection";

gsap.registerPlugin(ScrollTrigger);

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
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
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
      
      const tl = gsap.timeline();

      // 1. Folder creation animation: A techy diagonal laser scan reveal
      tl.fromTo(".folder-border", 
        { clipPath: "circle(0% at 0% 0%)", opacity: 0 },
        { 
          clipPath: "circle(150% at 0% 0%)", 
          opacity: 1, 
          duration: 1.8, 
          ease: "power3.inOut",
          stagger: 0.1
        }
      )
      
      // 2. Path text TYPES out (left to right reveal)
      // Starts earlier (-=1.0) so it's typing while the folder finishes forming
      .fromTo(".folder-path",
        { clipPath: "inset(0% 100% 0% 0%)", opacity: 1 },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "none", stagger: 0.1 },
        "-=1.0"
      )
      
      // 3. The content inside the folder finally reveals
      .fromTo(".hero-element",
        { opacity: 0, y: 40, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.2, ease: "back.out(1.2)" },
        "-=0.2"
      );

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
            <div className="folder-border absolute inset-0 mx-6 my-24 sm:mx-10 sm:my-28 pointer-events-none flex flex-col">
              {/* Top Row: Tab (Left) + Top Border Line (Right) */}
              <div className="flex h-10 sm:h-12 w-full">
                {/* Folder Tab */}
                <div className="w-32 sm:w-64 h-full border-t-[8px] border-l-[8px] border-r-[8px] sm:border-t-[12px] sm:border-l-[12px] sm:border-r-[12px] border-border/30 rounded-t-2xl"></div>
                {/* Right side top border */}
                <div className="flex-1 border-b-[8px] sm:border-b-[12px] border-border/30 rounded-tr-2xl relative">
                  {/* Path text on the right */}
                  <div className="absolute bottom-3 right-4 sm:right-8 overflow-hidden">
                    <div className="folder-path text-text-secondary/70 font-bold tracking-wider uppercase text-[10px] sm:text-sm whitespace-nowrap">
                      /Root/Workspace/Pipeline
                    </div>
                  </div>
                </div>
              </div>
              {/* Main Body */}
              <div className="flex-1 border-b-[8px] border-l-[8px] border-r-[8px] sm:border-b-[12px] sm:border-l-[12px] sm:border-r-[12px] border-border/30 rounded-b-3xl"></div>
            </div>
            
            <div className="hero-element mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary px-4 py-2">
              <Code2 className="h-4 w-4 text-accent-highlight" />
              <span className="text-sm font-medium tracking-widest text-text-secondary uppercase">
                Interactive Folder
              </span>
            </div>

            <h1 className="hero-element text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl mb-6">
              Development <br />
              <span className="text-accent-highlight">
                pipeline.
              </span>
            </h1>
            <p className="hero-element max-w-xl text-lg text-text-secondary">
              Scroll down to pan horizontally through the workspace folder.
            </p>
          </section>

          {/* THE 5 PIPELINE PANELS */}
          {pipelineSteps.map((step, i) => (
            <section key={step.id} className="panel w-[100vw] h-full flex items-center justify-center relative px-10 sm:px-20">
              
              {/* Folder Shape Border */}
              <div className="folder-border absolute inset-0 mx-6 my-24 sm:mx-10 sm:my-28 pointer-events-none flex flex-col">
                {/* Top Row: Tab (Left) + Top Border Line (Right) */}
                <div className="flex h-10 sm:h-12 w-full">
                  {/* Folder Tab */}
                  <div className="w-32 sm:w-64 h-full border-t-[8px] border-l-[8px] border-r-[8px] sm:border-t-[12px] sm:border-l-[12px] sm:border-r-[12px] border-border/30 rounded-t-2xl"></div>
                  {/* Right side top border */}
                  <div className="flex-1 border-b-[8px] sm:border-b-[12px] border-border/30 rounded-tr-2xl relative">
                    {/* Path text on the right */}
                    <div className="absolute bottom-3 right-4 sm:right-8 overflow-hidden">
                      <div className="folder-path text-text-secondary/70 font-bold tracking-wider uppercase text-[10px] sm:text-sm whitespace-nowrap">
                        /Root/Workspace/{step.id}.exe
                      </div>
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

      {/* STORY SECTION (VS Code Typing Animation) */}
      <StorySection />

    </main>
  );
}
