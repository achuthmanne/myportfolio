"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MorphingParticles({ isCompiled = false }: { isCompiled?: boolean }) {
  const bgPointsRef = useRef<THREE.Points>(null);
  const shapePointsRef = useRef<THREE.Points>(null);
  const bgCount = 5000;
  const shapeCount = 1200; 

  // --- BACKGROUND PARTICLES ---
  const bgRandomPositions = useMemo(() => {
    const pos = new Float32Array(bgCount * 3);
    for (let i = 0; i < bgCount; i++) {
      const r = 30 + Math.random() * 70;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [bgCount]);

  const premiumPalette = useMemo(() => [
    new THREE.Color("#00d8ff").multiplyScalar(1.5), // Electric Cyan
    new THREE.Color("#3b82f6").multiplyScalar(1.5), // Electric Blue
    new THREE.Color("#8b5cf6").multiplyScalar(1.5), // Subtle Violet
    new THREE.Color("#f97316").multiplyScalar(1.5), // Warm Orange
    new THREE.Color("#ffffff").multiplyScalar(2.0), // Golden White
  ], []);

  const bgPalette = useMemo(() => [
    new THREE.Color("#ffffff"), 
    new THREE.Color("#ffffff"), 
    new THREE.Color("#ffffff"), 
    new THREE.Color("#ffffff"), 
    new THREE.Color("#ef4444"), // Theme Red
  ], []);

  const bgColors = useMemo(() => {
    const col = new Float32Array(bgCount * 3);
    for (let i = 0; i < bgCount; i++) {
      const color = bgPalette[Math.floor(Math.random() * bgPalette.length)];
      const brightness = Math.random() > 0.8 ? 0.8 : 0.3;
      col[i * 3] = color.r * brightness;
      col[i * 3 + 1] = color.g * brightness;
      col[i * 3 + 2] = color.b * brightness;
    }
    return col;
  }, [bgCount, bgPalette]);

  const currentBgPositions = useMemo(() => new Float32Array(bgRandomPositions), [bgRandomPositions]);

  // --- SHAPE PARTICLES ---
  const shapeRandomPositions = useMemo(() => {
    const pos = new Float32Array(shapeCount * 3);
    for (let i = 0; i < shapeCount; i++) {
      const r = 30 + Math.random() * 70;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - 100; // Pushed far back so they look like tiny background dust initially!
    }
    return pos;
  }, [shapeCount]);

  const shapeCodePositions = useMemo(() => {
    const pos = new Float32Array(shapeCount * 3);
    const addLine = (startIndex: number, count: number, x1: number, y1: number, x2: number, y2: number) => {
      for (let i = 0; i < count; i++) {
        const t = Math.random();
        const idx = (startIndex + i) * 3;
        const scale = 5.5;
        const offsetX = -11;
        const baseZ = -15; 
        
        const scatterRadius = Math.random() * 0.35; 
        const scatterAngle = Math.random() * Math.PI * 2;
        const scatterX = Math.cos(scatterAngle) * scatterRadius;
        const scatterY = Math.sin(scatterAngle) * scatterRadius;

        pos[idx] = (x1 + t * (x2 - x1)) * scale + offsetX + scatterX;
        pos[idx + 1] = (y1 + t * (y2 - y1)) * scale + scatterY;
        pos[idx + 2] = baseZ + (Math.random() - 0.5) * 0.4; 
      }
    };

    const pointsPerSegment = Math.floor(shapeCount / 5);
    addLine(0, pointsPerSegment, 1, 1, 0, 0);
    addLine(pointsPerSegment, pointsPerSegment, 0, 0, 1, -1);
    addLine(pointsPerSegment * 2, pointsPerSegment, 1.5, -1.2, 2.5, 1.2);
    addLine(pointsPerSegment * 3, pointsPerSegment, 3, 1, 4, 0);
    addLine(pointsPerSegment * 4, pointsPerSegment, 4, 0, 3, -1);
    return pos;
  }, [shapeCount]);

  const shapeStartColors = useMemo(() => {
    const col = new Float32Array(shapeCount * 3);
    for (let i = 0; i < shapeCount; i++) {
      const color = bgPalette[Math.floor(Math.random() * bgPalette.length)];
      const brightness = Math.random() > 0.8 ? 1.0 : 0.4; // Soft white/red start
      col[i * 3] = color.r * brightness;
      col[i * 3 + 1] = color.g * brightness;
      col[i * 3 + 2] = color.b * brightness;
    }
    return col;
  }, [shapeCount, bgPalette]);

  const shapeEndColors = useMemo(() => {
    const col = new Float32Array(shapeCount * 3);
    const themeRed = new THREE.Color("#ef4444").multiplyScalar(1.5); 
    const pointsPerSegment = Math.floor(shapeCount / 5);
    
    for (let i = 0; i < shapeCount; i++) {
      const isSlashLine = i >= pointsPerSegment * 2 && i < pointsPerSegment * 3;
      if (isSlashLine) {
        col[i * 3] = themeRed.r;
        col[i * 3 + 1] = themeRed.g;
        col[i * 3 + 2] = themeRed.b;
      } else {
        const isGlowingNode = Math.random() > 0.8;
        const color = premiumPalette[Math.floor(Math.random() * premiumPalette.length)];
        const brightness = isGlowingNode ? 2.0 : (Math.random() > 0.8 ? 1.0 : 0.6);
        col[i * 3] = color.r * brightness;
        col[i * 3 + 1] = color.g * brightness;
        col[i * 3 + 2] = color.b * brightness;
      }
    }
    return col;
  }, [shapeCount, premiumPalette]);

  // --- GIT BRANCH POSITIONS ---
  const gitPositions = useMemo(() => {
    const pos = new Float32Array(shapeCount * 3);
    
    // Draw a circular Node (Commit)
    const drawNode = (startIndex: number, cx: number, cy: number, radius: number) => {
       for(let i=0; i<150; i++){
          const idx = (startIndex + i) * 3;
          const r = Math.sqrt(Math.random()) * radius;
          const theta = Math.random() * Math.PI * 2;
          pos[idx] = cx + r * Math.cos(theta);
          pos[idx+1] = cy + r * Math.sin(theta);
          pos[idx+2] = -15 + (Math.random() - 0.5) * 0.2;
       }
    };
    
    drawNode(0, -4, -6, 1.2);  // Node 1 (Bottom Left)
    drawNode(150, -4, 6, 1.2); // Node 2 (Top Left)
    drawNode(300, 4, 6, 1.2);  // Node 3 (Top Right Branch)
    
    // Main Trunk (250 particles)
    for(let i=0; i<250; i++){
       const idx = (450 + i) * 3;
       const t = Math.random();
       pos[idx] = -4 + (Math.random() - 0.5) * 0.4; // Thick line at x = -4
       pos[idx+1] = -4.8 + (9.6 * t); // Connects y=-4.8 to y=4.8
       pos[idx+2] = -15 + (Math.random() - 0.5) * 0.3;
    }
    
    // Branch Curve (500 particles) using Quadratic Bezier
    for(let i=0; i<500; i++){
       const idx = (700 + i) * 3;
       const t = Math.random();
       
       // Start at trunk (-4, -2.5), Control point (4, -2.5), End at Node 3 (4, 4.8)
       const x = Math.pow(1 - t, 2) * (-4) + 2 * (1 - t) * t * (4) + Math.pow(t, 2) * (4);
       const y = Math.pow(1 - t, 2) * (-2.5) + 2 * (1 - t) * t * (-2.5) + Math.pow(t, 2) * (4.8);
       
       pos[idx] = x + (Math.random() - 0.5) * 0.4;
       pos[idx+1] = y + (Math.random() - 0.5) * 0.4;
       pos[idx+2] = -15 + (Math.random() - 0.5) * 0.3;
    }
    
    return pos;
  }, [shapeCount]);

  const gitEndColors = useMemo(() => {
    const col = new Float32Array(shapeCount * 3);
    const colorLeft = new THREE.Color("#06b6d4").multiplyScalar(1.5); // Cyan (Main Trunk)
    const colorRight = new THREE.Color("#ef4444").multiplyScalar(1.5); // Theme Red (Branch)
    
    for (let i = 0; i < shapeCount; i++) {
       const isRightSide = (i >= 300 && i < 450) || (i >= 700);
       const finalCol = isRightSide ? colorRight : colorLeft;
       
       col[i * 3] = finalCol.r;
       col[i * 3 + 1] = finalCol.g;
       col[i * 3 + 2] = finalCol.b;
    }
    return col;
  }, [shapeCount]);

  // --- INFINITY POSITIONS ---
  const infinityPositions = useMemo(() => {
    const pos = new Float32Array(shapeCount * 3);
    const scale = 14; 
    
    for(let i=0; i<shapeCount; i++){
       const t = Math.random() * Math.PI * 2;
       const denominator = 1 + Math.sin(t) * Math.sin(t);
       
       const ix = (scale * Math.cos(t)) / denominator;
       const iy = (scale * Math.cos(t) * Math.sin(t)) / denominator;
       
       const scatterRadius = Math.random() * 0.35; 
       const scatterAngle = Math.random() * Math.PI * 2;
       
       pos[i*3] = ix + Math.cos(scatterAngle) * scatterRadius;
       pos[i*3+1] = iy + Math.sin(scatterAngle) * scatterRadius;
       pos[i*3+2] = -15 + (Math.random() - 0.5) * 0.4;
    }
    return pos;
  }, [shapeCount]);

  const infinityEndColors = useMemo(() => {
    const col = new Float32Array(shapeCount * 3);
    const themeRed = new THREE.Color("#ef4444").multiplyScalar(1.5); 
    const themeViolet = new THREE.Color("#8b5cf6").multiplyScalar(1.5); 
    
    for (let i = 0; i < shapeCount; i++) {
       const x = infinityPositions[i*3];
       if (x > 0) {
          // Right half: Theme Red
          col[i * 3] = themeRed.r;
          col[i * 3 + 1] = themeRed.g;
          col[i * 3 + 2] = themeRed.b;
       } else {
          // Left half: Electric Violet
          col[i * 3] = themeViolet.r;
          col[i * 3 + 1] = themeViolet.g;
          col[i * 3 + 2] = themeViolet.b;
       }
    }
    return col;
  }, [shapeCount, infinityPositions]);

  const currentShapePositions = useMemo(() => new Float32Array(shapeRandomPositions), [shapeRandomPositions]);
  const currentShapeColors = useMemo(() => new Float32Array(shapeStartColors), [shapeStartColors]);

  const particleOffsets = useMemo(() => {
    const offsets = new Float32Array(shapeCount);
    for (let i = 0; i < shapeCount; i++) {
      offsets[i] = Math.random() * 0.4; 
    }
    return offsets;
  }, [shapeCount]);

  const particleTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.3)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvas);
  }, []);

  const progressRef = useRef({ value: 0 });

  useEffect(() => {
    if (!isCompiled) return;
    const timer = setTimeout(() => {
      const triggerEl = document.getElementById("tools-section");
      if (triggerEl) {
        ScrollTrigger.create({
          trigger: triggerEl,
          start: "top top", 
          end: "bottom bottom",     
          scrub: 1.5, // Perfectly balanced inertia (Not too laggy, not too instant)
          onUpdate: (self) => {
            progressRef.current.value = self.progress;
          }
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isCompiled]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Animate Background
    if (bgPointsRef.current) {
      bgPointsRef.current.rotation.y = time * 0.05;
      bgPointsRef.current.rotation.x = time * 0.02;

      const bgGeom = bgPointsRef.current.geometry;
      const bgPos = bgGeom.attributes.position.array as Float32Array;

      for (let i = 0; i < bgCount; i++) {
        const idx = i * 3;
        const bgFloatX = Math.sin(time * 0.2 + i) * 1.5;
        const bgFloatY = Math.cos(time * 0.3 + i * 0.5) * 1.5;
        const bgFloatZ = Math.sin(time * 0.25 + i * 0.2) * 1.5;
        
        bgPos[idx] = bgRandomPositions[idx] + bgFloatX;
        bgPos[idx + 1] = bgRandomPositions[idx + 1] + bgFloatY;
        bgPos[idx + 2] = bgRandomPositions[idx + 2] + bgFloatZ;
      }
      bgGeom.attributes.position.needsUpdate = true;
    }
    
    // Animate Shape (12-Stage Bomb Blast Sequence for 3 Shapes!)
    if (shapePointsRef.current) {
      const shapeGeom = shapePointsRef.current.geometry;
      const shapePos = shapeGeom.attributes.position.array as Float32Array;
      const shapeCol = shapeGeom.attributes.color.array as Float32Array;
      
      const p = progressRef.current.value;

      for (let i = 0; i < shapeCount; i++) {
        const idx = i * 3;
        
        let staggeredP = (p - particleOffsets[i] * 0.1) * (1 / (1 - 0.1));
        staggeredP = Math.max(0, Math.min(1, staggeredP));

        let targetX, targetY, targetZ;
        let colorR, colorG, colorB;
        const centerX = 0;
        const centerY = 0;
        const centerZ = -15;

        // --- THE 3-SHAPE TIMELINE ---
        
        if (staggeredP < 0.05) {
          // Stage 1: Galaxy -> Implode to Center
          const phase = staggeredP / 0.05; 
          const easeIn = phase * phase; 
          targetX = THREE.MathUtils.lerp(shapeRandomPositions[idx], centerX, easeIn);
          targetY = THREE.MathUtils.lerp(shapeRandomPositions[idx + 1], centerY, easeIn);
          targetZ = THREE.MathUtils.lerp(shapeRandomPositions[idx + 2], centerZ, easeIn);
          colorR = shapeStartColors[idx];
          colorG = shapeStartColors[idx + 1];
          colorB = shapeStartColors[idx + 2];
        } else if (staggeredP < 0.10) {
          // Stage 2: GAP (HOLD CENTER DOT)
          targetX = centerX;
          targetY = centerY;
          targetZ = centerZ;
          colorR = shapeStartColors[idx];
          colorG = shapeStartColors[idx + 1];
          colorB = shapeStartColors[idx + 2];
        } else if (staggeredP < 0.15) {
          // Stage 3: Center -> Explode to </ >
          const phase = (staggeredP - 0.10) / 0.05; 
          const easeOut = phase * (2 - phase); 
          targetX = THREE.MathUtils.lerp(centerX, shapeCodePositions[idx], easeOut);
          targetY = THREE.MathUtils.lerp(centerY, shapeCodePositions[idx + 1], easeOut);
          targetZ = THREE.MathUtils.lerp(centerZ, shapeCodePositions[idx + 2], easeOut);
          colorR = THREE.MathUtils.lerp(shapeStartColors[idx], shapeEndColors[idx], easeOut);
          colorG = THREE.MathUtils.lerp(shapeStartColors[idx + 1], shapeEndColors[idx + 1], easeOut);
          colorB = THREE.MathUtils.lerp(shapeStartColors[idx + 2], shapeEndColors[idx + 2], easeOut);
        } else if (staggeredP < 0.35) {
          // Stage 4: HOLD </ > SHAPE
          targetX = shapeCodePositions[idx];
          targetY = shapeCodePositions[idx + 1];
          targetZ = shapeCodePositions[idx + 2];
          colorR = shapeEndColors[idx];
          colorG = shapeEndColors[idx + 1];
          colorB = shapeEndColors[idx + 2];
        } else if (staggeredP < 0.40) {
          // Stage 5: </ > -> Implode to Center
          const phase = (staggeredP - 0.35) / 0.05; 
          const easeIn = phase * phase; 
          targetX = THREE.MathUtils.lerp(shapeCodePositions[idx], centerX, easeIn);
          targetY = THREE.MathUtils.lerp(shapeCodePositions[idx + 1], centerY, easeIn);
          targetZ = THREE.MathUtils.lerp(shapeCodePositions[idx + 2], centerZ, easeIn);
          colorR = THREE.MathUtils.lerp(shapeEndColors[idx], shapeStartColors[idx], easeIn); 
          colorG = THREE.MathUtils.lerp(shapeEndColors[idx + 1], shapeStartColors[idx + 1], easeIn);
          colorB = THREE.MathUtils.lerp(shapeEndColors[idx + 2], shapeStartColors[idx + 2], easeIn);
        } else if (staggeredP < 0.45) {
          // Stage 6: GAP (HOLD CENTER DOT)
          targetX = centerX;
          targetY = centerY;
          targetZ = centerZ;
          colorR = shapeStartColors[idx];
          colorG = shapeStartColors[idx + 1];
          colorB = shapeStartColors[idx + 2];
        } else if (staggeredP < 0.50) {
          // Stage 7: Center -> Explode to Git Branch
          const phase = (staggeredP - 0.45) / 0.05; 
          const easeOut = phase * (2 - phase); 
          targetX = THREE.MathUtils.lerp(centerX, gitPositions[idx], easeOut);
          targetY = THREE.MathUtils.lerp(centerY, gitPositions[idx + 1], easeOut);
          targetZ = THREE.MathUtils.lerp(centerZ, gitPositions[idx + 2], easeOut);
          colorR = THREE.MathUtils.lerp(shapeStartColors[idx], gitEndColors[idx], easeOut);
          colorG = THREE.MathUtils.lerp(shapeStartColors[idx + 1], gitEndColors[idx + 1], easeOut);
          colorB = THREE.MathUtils.lerp(shapeStartColors[idx + 2], gitEndColors[idx + 2], easeOut);
        } else if (staggeredP < 0.70) {
          // Stage 8: HOLD GIT BRANCH
          targetX = gitPositions[idx];
          targetY = gitPositions[idx + 1];
          targetZ = gitPositions[idx + 2];
          colorR = gitEndColors[idx];
          colorG = gitEndColors[idx + 1];
          colorB = gitEndColors[idx + 2];
        } else if (staggeredP < 0.75) {
          // Stage 9: Git Branch -> Implode to Center
          const phase = (staggeredP - 0.70) / 0.05; 
          const easeIn = phase * phase; 
          targetX = THREE.MathUtils.lerp(gitPositions[idx], centerX, easeIn);
          targetY = THREE.MathUtils.lerp(gitPositions[idx + 1], centerY, easeIn);
          targetZ = THREE.MathUtils.lerp(gitPositions[idx + 2], centerZ, easeIn);
          colorR = THREE.MathUtils.lerp(gitEndColors[idx], shapeStartColors[idx], easeIn); 
          colorG = THREE.MathUtils.lerp(gitEndColors[idx + 1], shapeStartColors[idx + 1], easeIn);
          colorB = THREE.MathUtils.lerp(gitEndColors[idx + 2], shapeStartColors[idx + 2], easeIn);
        } else if (staggeredP < 0.80) {
          // Stage 10: GAP (HOLD CENTER DOT)
          targetX = centerX;
          targetY = centerY;
          targetZ = centerZ;
          colorR = shapeStartColors[idx];
          colorG = shapeStartColors[idx + 1];
          colorB = shapeStartColors[idx + 2];
        } else if (staggeredP < 0.85) {
          // Stage 11: Center -> Explode to Infinity!
          const phase = (staggeredP - 0.80) / 0.05; 
          const easeOut = phase * (2 - phase); 
          targetX = THREE.MathUtils.lerp(centerX, infinityPositions[idx], easeOut);
          targetY = THREE.MathUtils.lerp(centerY, infinityPositions[idx + 1], easeOut);
          targetZ = THREE.MathUtils.lerp(centerZ, infinityPositions[idx + 2], easeOut);
          colorR = THREE.MathUtils.lerp(shapeStartColors[idx], infinityEndColors[idx], easeOut);
          colorG = THREE.MathUtils.lerp(shapeStartColors[idx + 1], infinityEndColors[idx + 1], easeOut);
          colorB = THREE.MathUtils.lerp(shapeStartColors[idx + 2], infinityEndColors[idx + 2], easeOut);
        } else if (staggeredP < 0.90) {
          // Stage 12: HOLD INFINITY
          targetX = infinityPositions[idx];
          targetY = infinityPositions[idx + 1];
          targetZ = infinityPositions[idx + 2];
          colorR = infinityEndColors[idx];
          colorG = infinityEndColors[idx + 1];
          colorB = infinityEndColors[idx + 2];
        } else {
          // Stage 13: THE FINAL BLAST (Explode into the void!)
          const phase = (staggeredP - 0.90) / 0.10; 
          const easeIn = phase * phase * phase; // Violent acceleration
          
          // Scatter far outwards and fly directly past the camera (Z + 30)
          targetX = THREE.MathUtils.lerp(infinityPositions[idx], shapeRandomPositions[idx] * 4, easeIn);
          targetY = THREE.MathUtils.lerp(infinityPositions[idx + 1], shapeRandomPositions[idx + 1] * 4, easeIn);
          targetZ = THREE.MathUtils.lerp(infinityPositions[idx + 2], shapeRandomPositions[idx + 2] * 2 + 30, easeIn);
          
          // Fade to black as they fly past
          colorR = THREE.MathUtils.lerp(infinityEndColors[idx], 0, easeIn);
          colorG = THREE.MathUtils.lerp(infinityEndColors[idx + 1], 0, easeIn);
          colorB = THREE.MathUtils.lerp(infinityEndColors[idx + 2], 0, easeIn);
        }

        // Calculate organic firefly (butterfly) floating for ALL phases
        let floatMultiplier = 0;
        
        // Float for </ >
        if (staggeredP >= 0.10 && staggeredP <= 0.15) floatMultiplier = (staggeredP - 0.10) / 0.05;
        else if (staggeredP > 0.15 && staggeredP <= 0.35) floatMultiplier = 1;
        else if (staggeredP > 0.35 && staggeredP <= 0.40) floatMultiplier = 1 - ((staggeredP - 0.35) / 0.05);
        
        // Float for Git Branch
        else if (staggeredP >= 0.45 && staggeredP <= 0.50) floatMultiplier = (staggeredP - 0.45) / 0.05;
        else if (staggeredP > 0.50 && staggeredP <= 0.70) floatMultiplier = 1;
        else if (staggeredP > 0.70 && staggeredP <= 0.75) floatMultiplier = 1 - ((staggeredP - 0.70) / 0.05);
        
        // Float for Infinity
        else if (staggeredP >= 0.80 && staggeredP <= 0.85) floatMultiplier = (staggeredP - 0.80) / 0.05;
        else if (staggeredP > 0.85 && staggeredP <= 0.90) floatMultiplier = 1;
        else if (staggeredP > 0.90) floatMultiplier = Math.max(0, 1 - ((staggeredP - 0.90) / 0.10));

        const floatX = Math.sin(time * 1.2 + i) * 0.4 * floatMultiplier;
        const floatY = Math.cos(time * 1.5 + i * 0.5) * 0.4 * floatMultiplier;
        const floatZ = Math.sin(time * 1.1 + i * 0.2) * 0.4 * floatMultiplier;

        let finalX = targetX;
        let finalY = targetY;
        let finalZ = targetZ;

        // Add the vibrant butterfly drift to everything!
        finalX += floatX;
        finalY += floatY;
        finalZ += floatZ;

        shapePos[idx] = finalX;
        shapePos[idx + 1] = finalY;
        shapePos[idx + 2] = finalZ;
        
        shapeCol[idx] = colorR;
        shapeCol[idx + 1] = colorG;
        shapeCol[idx + 2] = colorB;
      }
      shapeGeom.attributes.position.needsUpdate = true;
      shapeGeom.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Background Stars - Extremely Tiny */}
      <points ref={bgPointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[currentBgPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[bgColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.03} 
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Shape Particles - Thick & Bold */}
      <points ref={shapePointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[currentShapePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[currentShapeColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.35} 
          map={particleTexture}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
