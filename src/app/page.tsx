"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Code2 } from "lucide-react";
import StorySection from "@/components/StorySection";
import MorphingParticles from "@/components/MorphingParticles";
import LabSection from "@/components/LabSection";
import WorkSection from "@/components/WorkSection";
import BattlegroundsSection from "@/components/BattlegroundsSection";
import ConnectSection from "@/components/ConnectSection";
import SocialSection from "@/components/SocialSection";
import FooterSection from "@/components/FooterSection";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const horizontalPanelRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isCompiled, setIsCompiled] = useState(false);
  const [showWorkSection, setShowWorkSection] = useState(false);
  const [showBattlegroundsSection, setShowBattlegroundsSection] = useState(false);
  const [showConnectSection, setShowConnectSection] = useState(false);
  const [showFooterSection, setShowFooterSection] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isReturn =
      window.location.search.includes('battleground') ||
      window.location.hash.includes('battleground') ||
      window.location.href.includes('battleground') ||
      sessionStorage.getItem('returnToBattlegrounds') === 'true';

    if (isReturn) {
      setIsCompiled(true);
      setShowWorkSection(true);
      setShowBattlegroundsSection(true);
      setShowConnectSection(true);
      setShowFooterSection(true);
    }
  }, []);

  useEffect(() => {
    if (!showBattlegroundsSection || typeof window === 'undefined') return;

    const shouldScroll =
      window.location.search.includes('battleground') ||
      window.location.hash.includes('battleground') ||
      window.location.href.includes('battleground') ||
      sessionStorage.getItem('scrollBattleground') === 'true';

    if (shouldScroll) {
      const scrollToBattlegrounds = () => {
        const el = document.getElementById('battlegrounds-section');
        if (el) {
          if (lenis) {
            lenis.scrollTo(el, { immediate: true, offset: 0 });
          } else {
            el.scrollIntoView({ behavior: 'instant', block: 'start' });
          }
          ScrollTrigger.refresh();
        }
      };

      scrollToBattlegrounds();
      const t1 = setTimeout(scrollToBattlegrounds, 50);
      const t2 = setTimeout(scrollToBattlegrounds, 150);
      const t3 = setTimeout(scrollToBattlegrounds, 350);
      const t4 = setTimeout(scrollToBattlegrounds, 700);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [showBattlegroundsSection, lenis]);

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
      id="top"
      ref={containerRef}
      className="relative bg-bg-primary text-text-primary selection:bg-accent-rich selection:text-white"
    >
      {/* Dynamic 3D Background */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }} onCreated={() => setIsReady(true)}>
          <MorphingParticles isCompiled={isCompiled} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.7} mipmapBlur intensity={1.0} />
          </EffectComposer>
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
          <section className="panel w-[100vw] h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 relative">
            
            {/* Folder Shape Border */}
            <div className="folder-border absolute inset-0 mx-5 mt-24 mb-14 sm:mx-8 sm:mt-26 sm:mb-18 md:mx-10 md:my-28 pointer-events-none flex flex-col">
              {/* Top Row: Tab (Left) + Top Border Line (Right) */}
              <div className="flex h-8 sm:h-10 md:h-12 w-full">
                {/* Folder Tab */}
                <div className="w-28 sm:w-44 md:w-64 h-full border-t-[6px] border-l-[6px] border-r-[6px] sm:border-t-[8px] sm:border-l-[8px] sm:border-r-[8px] md:border-t-[12px] md:border-l-[12px] md:border-r-[12px] border-border/30 rounded-t-xl sm:rounded-t-2xl"></div>
                {/* Right side top border */}
                <div className="flex-1 border-b-[6px] sm:border-b-[8px] md:border-b-[12px] border-border/30 rounded-tr-xl sm:rounded-tr-2xl relative">
                  {/* Path text on the right */}
                  <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-4 md:right-8 overflow-hidden">
                    <div className="folder-path text-text-secondary/70 font-bold tracking-wider uppercase text-[8px] sm:text-[10px] md:text-sm whitespace-nowrap">
                      /Root/Workspace/Pipeline
                    </div>
                  </div>
                </div>
              </div>
              {/* Main Body */}
              <div className="flex-1 border-b-[6px] border-l-[6px] border-r-[6px] sm:border-b-[8px] border-l-[8px] border-r-[8px] md:border-b-[12px] sm:border-l-[12px] sm:border-r-[12px] border-border/30 rounded-b-2xl sm:rounded-b-3xl"></div>
            </div>
            
            <div className="hero-element mb-4 sm:mb-6 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-border bg-bg-secondary px-3 py-1.5 sm:px-4 sm:py-2">
              <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent-highlight" />
              <span className="text-xs sm:text-sm font-medium tracking-widest text-text-secondary uppercase">
                Interactive Folder
              </span>
            </div>

            <h1 className="hero-element text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
              Development <br />
              <span className="text-accent-highlight">
                pipeline.
              </span>
            </h1>
            <p className="hero-element max-w-xl text-sm sm:text-base md:text-lg text-text-secondary px-4 leading-relaxed">
              Scroll down to pan horizontally through the workspace folder.
            </p>
          </section>

          {/* THE 5 PIPELINE PANELS */}
          {pipelineSteps.map((step, i) => (
            <section key={step.id} className="panel w-[100vw] h-full flex items-center justify-center relative px-6 sm:px-12 md:px-20">
              
              {/* Folder Shape Border */}
              <div className="folder-border absolute inset-0 mx-5 mt-24 mb-14 sm:mx-8 sm:mt-26 sm:mb-18 md:mx-10 md:my-28 pointer-events-none flex flex-col">
                {/* Top Row: Tab (Left) + Top Border Line (Right) */}
                <div className="flex h-8 sm:h-10 md:h-12 w-full">
                  {/* Folder Tab */}
                  <div className="w-28 sm:w-44 md:w-64 h-full border-t-[6px] border-l-[6px] border-r-[6px] sm:border-t-[8px] sm:border-l-[8px] sm:border-r-[8px] md:border-t-[12px] md:border-l-[12px] md:border-r-[12px] border-border/30 rounded-t-xl sm:rounded-t-2xl"></div>
                  {/* Right side top border */}
                  <div className="flex-1 border-b-[6px] sm:border-b-[8px] md:border-b-[12px] border-border/30 rounded-tr-xl sm:rounded-tr-2xl relative">
                    {/* Path text on the right */}
                    <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-4 md:right-8 overflow-hidden">
                      <div className="folder-path text-text-secondary/70 font-bold tracking-wider uppercase text-[8px] sm:text-[10px] md:text-sm whitespace-nowrap">
                        /Root/Workspace/{step.id}.exe
                      </div>
                    </div>
                  </div>
                </div>
                {/* Main Body */}
                <div className="flex-1 border-b-[6px] border-l-[6px] border-r-[6px] sm:border-b-[8px] border-l-[8px] border-r-[8px] md:border-b-[12px] sm:border-l-[12px] sm:border-r-[12px] border-border/30 rounded-b-2xl sm:rounded-b-3xl"></div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-8 md:gap-16 w-full max-w-7xl pt-4 sm:pt-0">
                
                {/* Image Container (Scaled smoothly for mobile viewports) */}
                <div className="w-full md:w-3/5 flex justify-center">
                  <div className="relative w-full max-w-[280px] sm:max-w-[460px] md:max-w-none aspect-[16/10] max-h-[28vh] sm:max-h-[36vh] md:max-h-none overflow-hidden group">
                    <Image 
                      src={step.src} 
                      alt={step.title} 
                      fill 
                      className="object-contain p-2 sm:p-4 mix-blend-screen transition-transform duration-700 ease-out cursor-crosshair"
                    />
                  </div>
                </div>

                {/* Text Context */}
                <div className="w-full md:w-2/5 flex flex-col items-start text-left z-20 px-8 sm:px-10 md:px-0">
                  <div className="text-3xl sm:text-5xl md:text-6xl font-black text-border mb-1 sm:mb-2 md:mb-4 opacity-50">{String(i + 1).padStart(2, '0')}</div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 tracking-tight text-white drop-shadow-md">
                    {step.title}
                  </h2>
                  <p className="text-text-secondary text-xs sm:text-base md:text-xl border-l-2 border-accent-highlight pl-3 sm:pl-4 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </section>
          ))}

        </div>
      </div>

      {/* STORY SECTION (VS Code Typing Animation) */}
      <StorySection isCompiled={isCompiled} onCompile={() => setIsCompiled(true)} />

      {/* TOOLS SECTION (Morphing Particles Scroll Trigger Area) */}
      {/* Scroll is completely locked until isCompiled is true, because this section doesn't exist in the DOM until then! */}
      {isCompiled && (
        <section id="tools-section" className="relative h-[1800vh] w-full flex flex-col items-center justify-start pointer-events-none z-10" />
      )}

      {/* LAB SECTION (Technical Playground) */}
      {isCompiled && (
        <LabSection onComplete={() => setShowWorkSection(true)} />
      )}
      
      {/* THE WORK SECTION */}
      {showWorkSection && (
        <WorkSection onFolderComplete={() => setShowBattlegroundsSection(true)} />
      )}

      {/* THE BATTLEGROUNDS SECTION (Hackathons) */}
      {showBattlegroundsSection && (
        <div onMouseEnter={() => setShowConnectSection(true)}>
          <BattlegroundsSection />
        </div>
      )}

      {/* THE CONNECT SECTION (Optional Interaction) */}
      {showConnectSection && <ConnectSection />}

      {/* THE SOCIAL VAULTS (Now immediately accessible) */}
      {showConnectSection && <SocialSection />}

      {/* THE GRAND FINALE (Now immediately accessible) */}
      {showConnectSection && <FooterSection />}

    </main>
  );
}
