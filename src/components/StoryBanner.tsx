"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// ============================================================================
// Exactly Like Home Page: Tiny Background Dust Particles with Bloom
// ============================================================================

function HomeStyleTinyParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 4500;

  // Exact spherical distribution of tiny background dust particles (same as home page)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 25 + Math.random() * 70;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  // Exact home page color palette: predominantly pure whites with occasional theme red sparks
  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const bgPalette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#ffffff"),
      new THREE.Color("#ffffff"),
      new THREE.Color("#ffffff"),
      new THREE.Color("#C92A3A"), // Portfolio Theme Ruby / Pink-Red
    ];

    for (let i = 0; i < count; i++) {
      const color = bgPalette[Math.floor(Math.random() * bgPalette.length)];
      // Occasional bright sparks (>0.75) to trigger the Bloom shader
      const isBrightSpark = Math.random() > 0.82;
      const brightness = isBrightSpark ? 1.5 : Math.random() > 0.5 ? 0.75 : 0.35;
      col[i * 3] = color.r * brightness;
      col[i * 3 + 1] = color.g * brightness;
      col[i * 3 + 2] = color.b * brightness;
    }
    return col;
  }, [count]);

  // Gentle cosmic rotation matching home page
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.025;
      pointsRef.current.rotation.x += delta * 0.012;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Subtle camera parallax from pointer movement
function CameraParallax() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.8, 0.035);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.5, 0.035);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// ============================================================================
// Main Banner Component
// ============================================================================

export default function StoryBanner() {
  return (
    <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-[#050508] overflow-hidden select-none border-b border-white/10 flex items-center justify-center">
      
      {/* 3D WebGL Canvas Layer: Exact Home Page Style Particles & Bloom */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <CameraParallax />
          <HomeStyleTinyParticles />
          <EffectComposer>
            <Bloom luminanceThreshold={0.7} mipmapBlur intensity={1.0} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Foreground Content: Pure Clean Typography Only in Center */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Left Spacer: Keeps lower-left avatar area 100% free */}
        <div className="w-16 sm:w-28 md:w-36 shrink-0" />

        {/* Center: ONLY TEXT */}
        <div className="flex flex-col items-center justify-center text-center flex-1 px-4 pointer-events-auto">
          {/* Main Title: Full Stack Developer & AI Builder */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold tracking-tight text-white font-sans whitespace-nowrap">
            Full Stack Developer &amp;{" "}
            <span className="text-[#C92A3A] font-bold">
              AI Builder
            </span>
          </h2>

          {/* Minimalist Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-gray-300/90 font-normal tracking-wide mt-2">
            Building Scalable Web Experiences &amp; Intelligent Systems
          </p>
        </div>

        {/* Right Spacer: Balances the center alignment */}
        <div className="w-16 sm:w-28 md:w-36 shrink-0 hidden md:block" />
      </div>

    </div>
  );
}
