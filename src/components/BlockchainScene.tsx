"use client";

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// -------------------------------------------------------------
// Helper: Procedural Canvas Texture for Rotating Cyber HUD Reticles
// -------------------------------------------------------------
function useHudRingTexture() {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = 512;
    const cy = 512;

    // 1. Outer dashed ring
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)';
    ctx.lineWidth = 4;
    ctx.setLineDash([16, 24]);
    ctx.beginPath();
    ctx.arc(cx, cy, 470, 0, Math.PI * 2);
    ctx.stroke();

    // 2. Middle precision degree ticks
    ctx.strokeStyle = 'rgba(255, 75, 75, 0.7)';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    for (let angle = 0; angle < 360; angle += 15) {
      const rad = (angle * Math.PI) / 180;
      const isMajor = angle % 45 === 0;
      const len = isMajor ? 32 : 16;
      const r1 = 435;
      const r2 = r1 - len;

      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(rad) * r1, cy + Math.sin(rad) * r1);
      ctx.lineTo(cx + Math.cos(rad) * r2, cy + Math.sin(rad) * r2);
      ctx.stroke();
    }

    // 3. Four cardinal crosshair brackets
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#ef4444';
    const brackets = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
    brackets.forEach((rad) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 385, rad - 0.12, rad + 0.12);
      ctx.stroke();
    });

    // 4. Subtle inner target reticle
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
    ctx.setLineDash([8, 12]);
    ctx.beginPath();
    ctx.arc(cx, cy, 330, 0, Math.PI * 2);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    setTexture(tex);
  }, []);

  return texture;
}

// -------------------------------------------------------------
// Rotating Holographic HUD Rings Centered on the Eye
// -------------------------------------------------------------
function EyeHudRings({ position }: { position: [number, number, number] }) {
  const ringTexture = useHudRingTexture();
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ring1Ref.current) {
      // Slow clockwise rotation
      ring1Ref.current.rotation.z += delta * 0.12;
    }
    if (ring2Ref.current) {
      // Counter-clockwise rotation for layered depth
      ring2Ref.current.rotation.z -= delta * 0.08;
    }
  });

  return (
    <group position={position}>
      {/* Dynamic Animated HUD Ring */}
      {ringTexture && (
        <mesh ref={ring1Ref} position={[0, 0, 0.02]}>
          <planeGeometry args={[3.8, 3.8]} />
          <meshBasicMaterial 
            map={ringTexture} 
            transparent 
            opacity={0.7} 
            depthWrite={false} 
            blending={THREE.AdditiveBlending} 
            toneMapped={false}
          />
        </mesh>
      )}

      {/* Outer subtle secondary ring */}
      <mesh ref={ring2Ref} position={[0, 0, 0.015]}>
        <ringGeometry args={[2.1, 2.13, 64]} />
        <meshBasicMaterial 
          color="#ef4444" 
          transparent 
          opacity={0.3} 
          depthWrite={false} 
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// Scanning Laser Beam across the Eye Iris
// -------------------------------------------------------------
function LaserScanner({ center }: { center: [number, number, number] }) {
  const laserRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (laserRef.current) {
      const t = state.clock.getElapsedTime();
      // Gentle vertical scanning cycle
      laserRef.current.position.y = center[1] + Math.sin(t * 1.6) * 0.65;
    }
  });

  return (
    <group ref={laserRef} position={[center[0], center[1], center[2] + 0.03]}>
      {/* Central Laser Line */}
      <mesh>
        <planeGeometry args={[3.2, 0.018]} />
        <meshBasicMaterial 
          color="#ff2233" 
          transparent 
          opacity={0.8} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending} 
          toneMapped={false} 
        />
      </mesh>
      {/* Soft Laser Glow Haze */}
      <mesh>
        <planeGeometry args={[3.4, 0.08]} />
        <meshBasicMaterial 
          color="#ef4444" 
          transparent 
          opacity={0.25} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending} 
          toneMapped={false} 
        />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// The Main Trinetra Centerpiece (Eye + Metallic TRINETRA Logo)
// -------------------------------------------------------------
function TrinetraArtPiece() {
  const texture = useTexture('/images/trinetra-cyber-centerpiece.png');
  const worldRef = useRef<THREE.Group>(null);

  // Exact coordinates of eye center in 3D local space
  const eyeCenter: [number, number, number] = [0, 0.164, 0];

  // Mouse Parallax Interaction
  useFrame((state, delta) => {
    if (worldRef.current) {
      const { pointer } = state;
      // Smooth interactive 3D tilt with mouse pointer
      worldRef.current.rotation.y = THREE.MathUtils.lerp(
        worldRef.current.rotation.y, 
        pointer.x * 0.28, 
        delta * 3.5
      );
      worldRef.current.rotation.x = THREE.MathUtils.lerp(
        worldRef.current.rotation.x, 
        -pointer.y * 0.22, 
        delta * 3.5
      );
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.25}>
      <group ref={worldRef} scale={1.05}>
        {/* 1. Main High-Resolution Art Piece (Eye + Metallic Logo) */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[6.45, 5.6]} />
          <meshBasicMaterial 
            map={texture} 
            transparent 
            depthWrite={false} 
            toneMapped={false} 
          />
        </mesh>

        {/* 2. Concentric Rotating Holographic HUD Rings */}
        <EyeHudRings position={eyeCenter} />

        {/* 3. Live Scanning Laser Beam */}
        <LaserScanner center={eyeCenter} />
      </group>
    </Float>
  );
}

// -------------------------------------------------------------
// Main Scene Export with Ambient Particles and Canvas
// -------------------------------------------------------------
export default function BlockchainScene() {
  return (
    <div className="w-full h-full relative">
      <Canvas 
        camera={{ position: [0, 0, 7.8], fov: 45 }}
        style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}
      >
        {/* Subtle ambient lighting */}
        <ambientLight intensity={1.0} color="#ffffff" />

        {/* Delicate, subtle floating background micro-sparkles */}
        <Sparkles 
          count={100} 
          scale={[14, 10, 8]} 
          size={1.5} 
          speed={0.35} 
          opacity={0.65} 
          color="#ff3344" 
        />
        <Sparkles 
          count={40} 
          scale={[10, 8, 6]} 
          size={1.2} 
          speed={0.25} 
          opacity={0.45} 
          color="#ffffff" 
        />

        {/* The Cybernetic Trinetra Centerpiece */}
        <Suspense fallback={null}>
          <TrinetraArtPiece />
        </Suspense>
      </Canvas>
    </div>
  );
}
