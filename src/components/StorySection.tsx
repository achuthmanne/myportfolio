"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const codeLines = [
  `<span class="text-pink-500">import</span> profileImage <span class="text-pink-500">from</span> <span class="text-yellow-300">"@/assets/images/achuth-profile.jpg"</span>;`,
  ``,
  `<span class="text-pink-500">const</span> <span class="text-blue-400">AchuthManneStory</span> <span class="text-pink-500">=</span> () <span class="text-pink-500">=&gt;</span> {`,
  `  <span class="text-pink-500">const</span> origin <span class="text-pink-500">=</span> <span class="text-yellow-300">"Curiosity"</span>;`,
  `  <span class="text-pink-500">const</span> catalyst <span class="text-pink-500">=</span> <span class="text-yellow-300">"Artificial Intelligence"</span>;`,
  ``,
  `  <span class="text-pink-500">return</span> (`,
  `    <span class="text-gray-400">&lt;</span><span class="text-blue-400">Developer</span> <span class="text-blue-300">avatar</span><span class="text-pink-500">=</span>{profileImage}<span class="text-gray-400">&gt;</span>`,
  `      <span class="text-gray-400">&lt;</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>I didn’t start with a clear plan to become a developer.<span class="text-gray-400">&lt;/</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>`,
  `      <span class="text-gray-400">&lt;</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>I started with {origin}. I was always interested in understanding how things work —<span class="text-gray-400">&lt;/</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>`,
  `      <span class="text-gray-400">&lt;</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>what happens behind a screen, and how an idea turns into something real.<span class="text-gray-400">&lt;/</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>`,
  `      <span class="text-gray-400">&lt;</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>That {origin} slowly pulled me deeper into technology.<span class="text-gray-400">&lt;/</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>`,
  ``,
  `      <span class="text-gray-400">&lt;</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>As I started learning to code, I realized programming wasn’t just solving problems.<span class="text-gray-400">&lt;/</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>`,
  `      <span class="text-gray-400">&lt;</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>It was also a way to create. I began experimenting, breaking things, and rebuilding.<span class="text-gray-400">&lt;/</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>`,
  ``,
  `      <span class="text-gray-400">&lt;</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>Then came {catalyst}.<span class="text-gray-400">&lt;/</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>`,
  `      <span class="text-gray-400">&lt;</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>Learning AI changed the way I think about development. Instead of seeing it only<span class="text-gray-400">&lt;/</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>`,
  `      <span class="text-gray-400">&lt;</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>as another technology, I started seeing it as a creative tool.<span class="text-gray-400">&lt;/</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>`,
  `      <span class="text-gray-400">&lt;</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>It pushed me to explore how intelligence, design, and engineering could come together.<span class="text-gray-400">&lt;/</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>`,
  ``,
  `      <span class="text-gray-400">&lt;</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>Today, I enjoy working at that intersection.<span class="text-gray-400">&lt;/</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>`,
  `      <span class="text-gray-400">&lt;</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>I turn ideas into creative web experiences — interfaces that feel alive.<span class="text-gray-400">&lt;/</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>`,
  `      <span class="text-gray-400">&lt;</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>I’m still figuring things out, still exploring, and still learning every day.<span class="text-gray-400">&lt;/</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>`,
  `      <span class="text-gray-400">&lt;</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>But that’s what I enjoy most about being a developer.<span class="text-gray-400">&lt;/</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>`,
  `      <span class="text-gray-400">&lt;</span><span class="text-blue-400">p</span> <span class="text-pink-500">className</span>=<span class="text-yellow-300">"font-bold"</span><span class="text-gray-400">&gt;</span>There’s always something new to build.<span class="text-gray-400">&lt;/</span><span class="text-blue-400">p</span><span class="text-gray-400">&gt;</span>`,
  `    <span class="text-gray-400">&lt;/</span><span class="text-blue-400">Developer</span><span class="text-gray-400">&gt;</span>`,
  `  );`,
  `};`
];

interface StorySectionProps {
  isCompiled: boolean;
  onCompile: () => void;
}

export default function StorySection({ isCompiled, onCompile }: StorySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [startTyping, setStartTyping] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [isTypingDone, setIsTypingDone] = useState(false);

  // 1. GSAP ScrollTrigger to precisely detect when this section enters the view
  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 60%", 
          onEnter: () => setStartTyping(true),
          once: true
        });
      }, containerRef);
      return () => ctx.revert();
    }, 800); 
    
    return () => clearTimeout(timer);
  }, []);

  // 2. The Typing Animation Engine
  useEffect(() => {
    if (!startTyping) return;

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < codeLines.length) {
        setDisplayedLines(currentLine + 1);
        currentLine++;
      } else {
        clearInterval(interval);
        setIsTypingDone(true);
      }
    }, 400); 

    return () => clearInterval(interval);
  }, [startTyping]);

  // 3. Auto-Scroll the coding area down as new lines are added
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [displayedLines]);

  return (
    <section id="story" ref={containerRef} className="relative min-h-screen w-full bg-transparent flex flex-col items-center justify-center py-20 px-4 md:px-10 z-10" style={{ perspective: 2500 }}>
      
      <AnimatePresence mode="wait">
        {!isCompiled ? (
          <motion.div 
            key="vscode-view"
            initial={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ 
              opacity: 0, 
              scale: 0.9, 
              rotateY: -90, 
              filter: "blur(10px)" 
            }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="w-full flex flex-col items-center gap-8 md:gap-12"
          >
            {/* Container for the VS Code Image and Overlay */}
            <div className="relative w-full max-w-5xl aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(201,42,58,0.15)] group">
              
              <Image 
                src="/images/vscode-bg-v3.png" 
                alt="VS Code Interface" 
                fill 
                unoptimized
                quality={100}
                className="object-cover pointer-events-none"
              />

              {/* The Typing Canvas Overlay */}
              <div 
                ref={scrollContainerRef}
                data-lenis-prevent
                className="vscode-scrollbar absolute top-[12%] left-[22%] right-[2%] bottom-[4%] p-2 md:p-6 font-mono text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-sm leading-relaxed md:leading-loose overflow-y-auto overscroll-auto"
              >
                {codeLines.slice(0, displayedLines).map((line, index) => {
                  const isLastLine = index === displayedLines - 1 && !isTypingDone;
                  const visibleText = line.replace(/<[^>]*>?/gm, '');
                  const charCount = visibleText.length;
                  const targetWidth = charCount > 0 ? `${charCount}ch` : "0ch";

                  return (
                    <div key={index} className="flex items-center w-full h-[1.5em]">
                      <motion.div 
                        initial={{ width: "0ch" }}
                        animate={{ width: targetWidth }}
                        transition={{ duration: 0.35, ease: "linear" }}
                        className="whitespace-pre text-gray-300 overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: line }}
                      />
                      {isLastLine && (
                        <div className="w-[2px] h-[1.2em] bg-white ml-[2px] animate-pulse flex-shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* The Compile Button */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ 
                opacity: isTypingDone ? 1 : 0, 
                y: isTypingDone ? 0 : 30,
                filter: isTypingDone ? "blur(0px)" : "blur(10px)" 
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`pointer-events-auto ${!isTypingDone ? 'hidden' : 'block'}`}
            >
              <button 
                onClick={onCompile}
                className="relative group px-10 py-4 rounded-full bg-bg-secondary border border-border hover:border-accent-highlight text-text-primary uppercase tracking-[0.3em] font-medium text-sm overflow-hidden transition-all duration-500"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Play className="w-4 h-4 text-accent-highlight group-hover:text-white transition-colors duration-300" />
                  Compile Sequence
                </span>
                <div className="absolute inset-0 bg-accent-highlight/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="compiled-view"
            initial={{ opacity: 0, scale: 0.9, rotateY: 90, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="w-full max-w-6xl mx-auto"
          >
            {/* The Actual UI (Glassmorphism Story Card) */}
            <div className="flex flex-col md:flex-row bg-[#0A0A0A]/60 backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl relative">
              
              {/* Left Side: Portrait Image */}
              <div className="w-full md:w-2/5 relative aspect-square md:aspect-auto min-h-[400px] [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] md:[mask-image:linear-gradient(to_right,black_60%,transparent_100%)]">
                 <Image 
                   src="/images/achuth-profile.jpg" 
                   alt="Achuth Manne" 
                   fill 
                   className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700" 
                 />
                 <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(201,42,58,0.2)] mix-blend-screen pointer-events-none" />
              </div>

              {/* Right Side: The Story Content */}
              <div className="w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-center relative z-10">
                 
                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight">
                   Curiosity <br className="hidden md:block"/> meets <span className="text-accent-highlight">AI.</span>
                 </h2>
                 
                 <div className="space-y-6 text-text-secondary text-base lg:text-lg leading-relaxed font-light">
                    <p>
                      I didn’t start with a clear plan to become a developer. I started with curiosity. I was always interested in understanding how things work — what happens behind a screen, and how an idea turns into something real.
                    </p>
                    <p>
                      As I started learning to code, I realized programming wasn’t just solving problems. It was a way to create. Then came <span className="text-white font-medium">Artificial Intelligence</span>.
                    </p>
                    <p>
                      Learning AI changed the way I think about development. Today, I turn ideas into creative web experiences — interfaces that feel intentional, interactive, and alive.
                    </p>
                    <div className="pt-4 border-t border-white/10 mt-6">
                      <p className="text-white font-bold uppercase tracking-widest text-sm">
                        There’s always something new to build.
                      </p>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
