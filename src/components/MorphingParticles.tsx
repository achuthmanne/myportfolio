"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MorphingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const bgCount = 5000;
  const shapeCount = 2500;
  const particleCount = bgCount + shapeCount;
  
  // 1. Generate standard tiny Stars
  const randomPositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 30 + Math.random() * 70;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [particleCount]);

  // 2. Generate crisp, exact </ > shape with NO messy scatter
  const codePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    
    const addLine = (startIndex: number, count: number, x1: number, y1: number, x2: number, y2: number) => {
      for (let i = 0; i < count; i++) {
        const t = Math.random();
        const idx = (startIndex + i) * 3;
        
        const scale = 5.5;
        const offsetX = -11;
        const baseZ = -15; 
        
        // Zero scatter to keep the shape perfectly crisp and recognizable!
        const scatterRadius = Math.random() * 0.1; 
        const scatterAngle = Math.random() * Math.PI * 2;
        const scatterX = Math.cos(scatterAngle) * scatterRadius;
        const scatterY = Math.sin(scatterAngle) * scatterRadius;

        pos[idx] = (x1 + t * (x2 - x1)) * scale + offsetX + scatterX;
        pos[idx + 1] = (y1 + t * (y2 - y1)) * scale + scatterY;
        pos[idx + 2] = baseZ + (Math.random() - 0.5) * 0.2; 
      }
    };

    const pointsPerSegment = Math.floor(shapeCount / 5);
    const offset = bgCount; 
    
    addLine(offset, pointsPerSegment, 1, 1, 0, 0);
    addLine(offset + pointsPerSegment, pointsPerSegment, 0, 0, 1, -1);
    addLine(offset + pointsPerSegment * 2, pointsPerSegment, 1.5, -1.2, 2.5, 1.2);
    addLine(offset + pointsPerSegment * 3, pointsPerSegment, 3, 1, 4, 0);
    addLine(offset + pointsPerSegment * 4, pointsPerSegment, 4, 0, 3, -1);

    return pos;
  }, [particleCount, bgCount, shapeCount]);

  // 3. Simple elegant white colors (matches original Stars)
  const colors = useMemo(() => {
    const col = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const brightness = Math.random() > 0.8 ? 1.0 : 0.6;
      col[i * 3] = brightness;
      col[i * 3 + 1] = brightness;
      col[i * 3 + 2] = brightness;
    }
    return col;
  }, [particleCount]);

  const currentPositions = useMemo(() => new Float32Array(randomPositions), [randomPositions]);
  
  const particleOffsets = useMemo(() => {
    const offsets = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      offsets[i] = Math.random() * 0.4; 
    }
    return offsets;
  }, [particleCount]);

  const progressRef = useRef({ value: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      const triggerEl = document.getElementById("tools-section");
      if (triggerEl) {
        ScrollTrigger.create({
          trigger: triggerEl,
          start: "top bottom", 
          end: "top top",     
          scrub: 1.5,
          onUpdate: (self) => {
            progressRef.current.value = self.progress;
          }
        });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const geom = pointsRef.current.geometry;
    const positions = geom.attributes.position.array as Float32Array;
    const globalProgress = progressRef.current.value;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      
      if (i >= bgCount) {
        let p = (globalProgress - particleOffsets[i]) * (1 / (1 - 0.4));
        p = Math.max(0, Math.min(1, p)); 
        
        const ease = p * p * (3 - 2 * p);
        
        // Very minimal floating so it stays precise
        const floatX = Math.sin(time * 0.5 + i) * 0.05 * ease;
        const floatY = Math.cos(time * 0.8 + i) * 0.05 * ease;
        const floatZ = Math.sin(time * 0.6 + i) * 0.05 * ease;
        
        positions[idx] = THREE.MathUtils.lerp(randomPositions[idx], codePositions[idx], ease) + floatX;
        positions[idx + 1] = THREE.MathUtils.lerp(randomPositions[idx + 1], codePositions[idx + 1], ease) + floatY;
        positions[idx + 2] = THREE.MathUtils.lerp(randomPositions[idx + 2], codePositions[idx + 2], ease) + floatZ;
      } else {
        positions[idx] = randomPositions[idx];
        positions[idx + 1] = randomPositions[idx + 1];
        positions[idx + 2] = randomPositions[idx + 2];
      }
    }
    
    geom.attributes.position.needsUpdate = true;
    
    const targetRotation = THREE.MathUtils.lerp(time * 0.05, 0, globalProgress);
    pointsRef.current.rotation.y = targetRotation;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(time * 0.02, 0, globalProgress);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[currentPositions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      {/* Exact match to the small dots they loved */}
      <pointsMaterial
        size={0.12} 
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
