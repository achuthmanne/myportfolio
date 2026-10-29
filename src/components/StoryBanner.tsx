"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Space_Grotesk, Syne } from 'next/font/google';

// Premium Google Fonts
const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// ============================================================================
// Genuine Animated LED Matrix Board
// EXTRA-LUMINOUS LIGHTING (Vivid, High-Radiance Glow & Crisp LED Beads)
// ============================================================================

function LEDAnimationBoard() {
  const pointsRef = useRef<THREE.Points>(null);

  // High-density precision LED matrix (76 columns x 19 rows = 1,444 micro-LEDs)
  const COLS = 76;
  const ROWS = 19;
  const count = COLS * ROWS;

  // Custom circular LED bead texture with razor-sharp bead rim (zero blurry side bleed)
  const ledTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const cx = 32;
    const cy = 32;

    // Solid core with sharp rim: prevents hazy white bleed while maintaining punchy radiance
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');       // Solid radiant core
    grad.addColorStop(0.72, 'rgba(255, 255, 255, 1)');    // Dense solid LED bead body
    grad.addColorStop(0.90, 'rgba(255, 255, 255, 0.7)');  // Ultra-crisp bead edge
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');       // Immediate cutoff (no fuzzy side glow)

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  // Grid coordinates
  const { positions, colIndices, rowIndices } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cIdx = new Float32Array(count);
    const rIdx = new Float32Array(count);

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = r * COLS + c;

        // X: -21 to +21 (spreads evenly across full wide banner)
        pos[i * 3] = (c / (COLS - 1) - 0.5) * 42;
        // Y: -2.8 to +2.8 (fits banner height)
        pos[i * 3 + 1] = (r / (ROWS - 1) - 0.5) * 5.6;
        // Z: -2.6 (fixed background depth)
        pos[i * 3 + 2] = -2.6;

        cIdx[i] = c;
        rIdx[i] = r;
      }
    }
    return { positions: pos, colIndices: cIdx, rowIndices: rIdx };
  }, [COLS, ROWS, count]);

  // Buffer colors
  const colors = useMemo(() => new Float32Array(count * 3), [count]);

  // Color constants (Extra-vibrant luminous palette)
  const rubyRed = useMemo(() => new THREE.Color("#ff1444"), []); // High-saturation electric ruby pink-red
  const pureWhite = useMemo(() => new THREE.Color("#ffffff"), []); // Diamond crystal pure white
  const idleColor = useMemo(() => new THREE.Color("#181f30"), []); // Sleek matrix grid background dots

  // Animation controller
  useFrame((state) => {
    if (!pointsRef.current) return;

    const t = state.clock.getElapsedTime();
    const geom = pointsRef.current.geometry;
    const colAttr = geom.attributes.color;
    const colArray = colAttr.array as Float32Array;

    // Cycle through 4 designs (~3.1 seconds per design)
    const mode = Math.floor((t * 0.32) % 4);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const x = positions[idx];
      const y = positions[idx + 1];

      let isLit = 0;
      let isAccentRed = false;

      if (mode === 0) {
        // DESIGN 0: Reversed Directional Chevrons (<<< Arrow Chasers with Wider Trail)
        const chevronOffset = (-x * 0.7 + Math.abs(y) * 1.3 - t * 7.5) % 8;
        const normChevron = ((chevronOffset % 8) + 8) % 8;
        if (normChevron < 1.3) {
          isLit = 1 - normChevron / 1.3;
          isAccentRed = false; // white arrowhead
        } else if (normChevron < 2.4) {
          isLit = (1 - (normChevron - 1.3) / 1.1) * 0.85;
          isAccentRed = true; // ruby pink-red trail
        }
      } else if (mode === 1) {
        // DESIGN 1: Flipped Shape Chevrons (>>> Direction OK, Shape Reversed!)
        const chevronOffset = (x * 0.7 + Math.abs(y) * 1.3 - t * 7.5) % 8;
        const normChevron = ((chevronOffset % 8) + 8) % 8;
        if (normChevron < 1.3) {
          isLit = 1 - normChevron / 1.3;
          isAccentRed = false; // white arrowhead
        } else if (normChevron < 2.4) {
          isLit = (1 - (normChevron - 1.3) / 1.1) * 0.85;
          isAccentRed = true; // ruby pink-red trail
        }
      } else if (mode === 2) {
        // DESIGN 2: Dual Undulating Dancing Waves (Richer Ribbon Glow)
        const wave1Y = Math.sin(x * 0.35 + t * 4.2) * 1.6;
        const wave2Y = Math.cos(x * 0.35 - t * 3.5) * 1.6;
        const dWave1 = Math.abs(y - wave1Y);
        const dWave2 = Math.abs(y - wave2Y);

        if (dWave1 < 0.52) {
          isLit = 1 - dWave1 / 0.52;
          isAccentRed = false; // Pure white wave
        } else if (dWave2 < 0.52) {
          isLit = 1 - dWave2 / 0.52;
          isAccentRed = true; // Ruby pink-red wave
        }
      } else {
        // DESIGN 3: Interlocking Diagonal Lattice (Luminous Diamond Cross-Hatch)
        const diag1 = ((x * 0.45 + y * 1.3 - t * 5.0) % 6 + 6) % 6;
        const diag2 = ((x * 0.45 - y * 1.3 + t * 5.0) % 6 + 6) % 6;
        const d1 = Math.min(diag1, 6 - diag1);
        const d2 = Math.min(diag2, 6 - diag2);

        if (d1 < 0.72 || d2 < 0.72) {
          const l1 = d1 < 0.72 ? 1 - d1 / 0.72 : 0;
          const l2 = d2 < 0.72 ? 1 - d2 / 0.72 : 0;
          isLit = Math.max(l1, l2);
          isAccentRed = d1 < 0.72 && d2 < 0.72;
        }
      }

      // Boosted high-radiance lighting application
      if (isLit > 0.08) {
        const targetColor = isAccentRed ? rubyRed : pureWhite;
        // High-power LED luminescence: powerful, radiant light emission without blur
        const brightness = isAccentRed ? (1.3 + isLit * 2.2) : (1.2 + isLit * 1.8);
        colArray[idx] = targetColor.r * brightness;
        colArray[idx + 1] = targetColor.g * brightness;
        colArray[idx + 2] = targetColor.b * brightness;
      } else {
        // Energized matrix grid dot
        colArray[idx] = idleColor.r;
        colArray[idx + 1] = idleColor.g;
        colArray[idx + 2] = idleColor.b;
      }
    }

    colAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.056} // High-presence LED bead size
        map={ledTexture || undefined} // Circular LED bead texture with solid core
        vertexColors
        transparent
        opacity={0.98}
        blending={THREE.AdditiveBlending} // Additive light blending for vivid glow
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ============================================================================
// Main Banner Component
// ============================================================================

export default function StoryBanner() {
  return (
    <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-[#050508] overflow-hidden select-none border-b border-white/10 flex items-center justify-center">
      
      {/* 3D WebGL Canvas Layer: High-Radiance Animated LED Matrix */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <LEDAnimationBoard />
          <EffectComposer>
            {/* Boosted Bloom for bright, vivid lighting radiance */}
            <Bloom luminanceThreshold={0.50} mipmapBlur intensity={1.65} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Foreground Content: 100% Dead-Center In The Banner (Zero Glow, Clean Reduced Size) */}
      <div className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-center justify-center">
          
          {/* Main Title: Syne Font, Reduced Balanced Size, Crisp Flat - ZERO GLOW */}
          <h2 className={`${syne.className} text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold tracking-tight text-white whitespace-nowrap leading-tight`}>
            Full Stack Developer &amp;{" "}
            <span className="text-[#C92A3A] font-bold">
              AI Builder
            </span>
          </h2>

          {/* Subtitle: Space Grotesk, Balanced Size, Crisp Flat - ZERO GLOW */}
          <p className={`${spaceGrotesk.className} text-[11px] sm:text-xs md:text-sm font-normal text-gray-300 tracking-[0.12em] uppercase mt-2`}>
            Building Scalable Web Experiences <span className="text-[#C92A3A] mx-1">·</span> Intelligent Systems
          </p>

        </div>
      </div>

    </div>
  );
}
