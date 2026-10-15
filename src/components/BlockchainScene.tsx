"use client";

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float, Sparkles, Text } from '@react-three/drei';
import * as THREE from 'three';

// -------------------------------------------------------------
// Helper: Generate crisp Canvas Textures for Coin Symbols
// -------------------------------------------------------------
function useCoinTexture(symbol: string, bgColor: string, fgColor: string, isEth = false) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background circle
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(256, 256, 246, 0, Math.PI * 2);
    ctx.fill();

    // Subtle gradient highlight
    const grad = ctx.createLinearGradient(120, 100, 392, 412);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(256, 256, 246, 0, Math.PI * 2);
    ctx.fill();

    // Inner embossed ring
    ctx.strokeStyle = fgColor;
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.arc(256, 256, 218, 0, Math.PI * 2);
    ctx.stroke();

    // Symbol drawing
    if (isEth) {
      // Top diamond pyramid
      ctx.fillStyle = fgColor;
      ctx.beginPath();
      ctx.moveTo(256, 120);
      ctx.lineTo(345, 245);
      ctx.lineTo(256, 285);
      ctx.lineTo(167, 245);
      ctx.closePath();
      ctx.fill();

      // Top right facet shade
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.beginPath();
      ctx.moveTo(256, 120);
      ctx.lineTo(345, 245);
      ctx.lineTo(256, 285);
      ctx.closePath();
      ctx.fill();

      // Bottom diamond pyramid
      ctx.fillStyle = fgColor;
      ctx.beginPath();
      ctx.moveTo(256, 310);
      ctx.lineTo(345, 265);
      ctx.lineTo(256, 395);
      ctx.lineTo(167, 265);
      ctx.closePath();
      ctx.fill();

      // Bottom right facet shade
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath();
      ctx.moveTo(256, 310);
      ctx.lineTo(345, 265);
      ctx.lineTo(256, 395);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillStyle = fgColor;
      ctx.font = '900 230px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(symbol, 256, 262);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    setTexture(tex);
  }, [symbol, bgColor, fgColor, isEth]);

  return texture;
}

// -------------------------------------------------------------
// Coin 3D Component
// -------------------------------------------------------------
function Coin({ 
  position, 
  rotation = [0, 0, 0], 
  symbol, 
  bgColor, 
  fgColor, 
  edgeColor, 
  isEth = false, 
  scale = 1 
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  symbol: string;
  bgColor: string;
  fgColor: string;
  edgeColor: string;
  isEth?: boolean;
  scale?: number;
}) {
  const texture = useCoinTexture(symbol, bgColor, fgColor, isEth);
  const coinRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (coinRef.current) {
      const t = state.clock.getElapsedTime();
      // Individual subtle wobble/float
      coinRef.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.08;
      coinRef.current.rotation.y = rotation[1] + Math.sin(t * 0.9 + position[0]) * 0.12;
      coinRef.current.rotation.x = rotation[0] + Math.cos(t * 0.7 + position[1]) * 0.08;
    }
  });

  return (
    <group ref={coinRef} position={position} rotation={rotation} scale={scale}>
      {/* Coin Edge Body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.09, 36]} />
        <meshStandardMaterial color={edgeColor} metalness={0.75} roughness={0.25} />
      </mesh>

      {/* Front Face with Symbol */}
      {texture && (
        <mesh position={[0, 0, 0.047]}>
          <circleGeometry args={[0.41, 36]} />
          <meshStandardMaterial map={texture} roughness={0.3} metalness={0.1} />
        </mesh>
      )}

      {/* Back Face with Symbol */}
      {texture && (
        <mesh position={[0, 0, -0.047]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.41, 36]} />
          <meshStandardMaterial map={texture} roughness={0.3} metalness={0.1} />
        </mesh>
      )}

      {/* Rim bevel accents */}
      <mesh position={[0, 0, 0.045]}>
        <torusGeometry args={[0.4, 0.02, 16, 36]} />
        <meshStandardMaterial color={edgeColor} metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, -0.045]}>
        <torusGeometry args={[0.4, 0.02, 16, 36]} />
        <meshStandardMaterial color={edgeColor} metalness={0.85} roughness={0.2} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// Shiny Floating Sphere Component
// -------------------------------------------------------------
function FloatingSphere({ 
  position, 
  radius, 
  color 
}: { 
  position: [number, number, number]; 
  radius: number; 
  color: string; 
}) {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      const t = state.clock.getElapsedTime();
      sphereRef.current.position.y = position[1] + Math.sin(t * 1.8 + position[0]) * 0.1;
    }
  });

  return (
    <mesh ref={sphereRef} position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.2} 
        metalness={0.15} 
      />
    </mesh>
  );
}

// -------------------------------------------------------------
// Interlocking Chain Link Component
// -------------------------------------------------------------
function ChainLink({ 
  position, 
  rotation = [0, 0, 0] 
}: { 
  position: [number, number, number]; 
  rotation?: [number, number, number]; 
}) {
  return (
    <group position={position} rotation={rotation} scale={[1, 1, 1.45]}>
      <mesh>
        <torusGeometry args={[0.22, 0.065, 16, 32]} />
        <meshStandardMaterial 
          color="#f59e0b" 
          metalness={0.85} 
          roughness={0.2} 
        />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// Chain Connection between Two Nodes
// -------------------------------------------------------------
function ChainConnection({ 
  start, 
  end 
}: { 
  start: [number, number, number]; 
  end: [number, number, number]; 
}) {
  const groupRef = useRef<THREE.Group>(null);

  const startV = useMemo(() => new THREE.Vector3(...start), [start]);
  const endV = useMemo(() => new THREE.Vector3(...end), [end]);
  const mid = useMemo(() => new THREE.Vector3().addVectors(startV, endV).multiplyScalar(0.5), [startV, endV]);
  const dist = useMemo(() => startV.distanceTo(endV), [startV, endV]);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.lookAt(endV);
    }
  }, [endV]);

  return (
    <group ref={groupRef} position={[mid.x, mid.y, mid.z]}>
      {/* Golden pin extending from Start cube */}
      <mesh position={[0, 0, -dist * 0.38]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 20]} />
        <meshStandardMaterial 
          color="#f59e0b" 
          metalness={0.85} 
          roughness={0.2} 
        />
      </mesh>

      {/* Chain Link 1 (Flat in plane) */}
      <ChainLink position={[0, 0, -0.26]} rotation={[0, 0, 0]} />

      {/* Chain Link 2 (Rotated 90 degrees, interlocked) */}
      <ChainLink position={[0, 0, 0.26]} rotation={[0, 0, Math.PI / 2]} />

      {/* Golden pin extending from End cube */}
      <mesh position={[0, 0, dist * 0.38]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 20]} />
        <meshStandardMaterial 
          color="#f59e0b" 
          metalness={0.85} 
          roughness={0.2} 
        />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// Rounded Blockchain Node (Claymorphic Cube)
// -------------------------------------------------------------
function BlockchainCube({ 
  position, 
  rotation = [0.55, -0.75, 0.1], 
  size = 1.35 
}: { 
  position: [number, number, number]; 
  rotation?: [number, number, number]; 
  size?: number; 
}) {
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[size, size, size]} radius={0.18} smoothness={4}>
        <meshStandardMaterial 
          color="#c53030" 
          roughness={0.35} 
          metalness={0.06} 
        />
      </RoundedBox>
    </group>
  );
}

// -------------------------------------------------------------
// Interactive 3D World (Blockchain Network)
// -------------------------------------------------------------
function BlockchainWorld() {
  const worldRef = useRef<THREE.Group>(null);

  // Mouse Parallax Effect
  useFrame((state, delta) => {
    if (worldRef.current) {
      const { pointer } = state;
      // Smoothly tilt with mouse movement
      worldRef.current.rotation.y = THREE.MathUtils.lerp(
        worldRef.current.rotation.y, 
        pointer.x * 0.35, 
        delta * 3
      );
      worldRef.current.rotation.x = THREE.MathUtils.lerp(
        worldRef.current.rotation.x, 
        -pointer.y * 0.25, 
        delta * 3
      );
    }
  });

  // Coordinates widened horizontally to create a cinematic diamond frame for TRINETRA
  const topPos: [number, number, number] = [0, 2.1, 0];
  const bottomPos: [number, number, number] = [0, -2.1, 0];
  const leftPos: [number, number, number] = [-3.15, 0, 0];
  const rightPos: [number, number, number] = [3.15, 0, 0];

  return (
    <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={worldRef} scale={0.78}>
        {/* Center: TRINETRA Title inside the blockchain diamond frame */}
        <group position={[0, 0, 0]}>
          <Text
            fontSize={0.82}
            letterSpacing={0.22}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/LuxiSans-Regular.ttf"
          >
            TRINETRA
          </Text>
          <Text
            position={[0, -0.52, 0]}
            fontSize={0.16}
            letterSpacing={0.3}
            color="#ef4444"
            anchorX="center"
            anchorY="middle"
          >
            20H BLOCKCHAIN BUILD
          </Text>
        </group>

        {/* 1. The 4 Outer Trinetra Crimson Blockchain Cubes */}
        <BlockchainCube position={topPos} size={1.35} />
        <BlockchainCube position={bottomPos} size={1.35} />
        <BlockchainCube position={leftPos} size={1.35} />
        <BlockchainCube position={rightPos} size={1.35} />

        {/* 2. The 4 Interlocking Golden Chains forming the Diamond loop */}
        <ChainConnection start={topPos} end={leftPos} />
        <ChainConnection start={topPos} end={rightPos} />
        <ChainConnection start={bottomPos} end={leftPos} />
        <ChainConnection start={bottomPos} end={rightPos} />

        {/* 3. Floating Crypto Coins (High-Contrast Authentic Crypto Palette) */}
        {/* Bitcoin (Gold) - Top Left */}
        <Coin 
          position={[-3.7, 1.8, 0.7]} 
          rotation={[0.2, 0.4, -0.1]}
          symbol="₿" 
          bgColor="#fef08a" 
          fgColor="#ca8a04" 
          edgeColor="#eab308" 
          scale={1.05}
        />

        {/* Doge Token (Lilac) - Top Center Left */}
        <Coin 
          position={[-1.2, 3.1, 0.4]} 
          rotation={[0.15, -0.1, 0.1]}
          symbol="Ð" 
          bgColor="#e9d5ff" 
          fgColor="#7c3aed" 
          edgeColor="#a855f7" 
          scale={0.95}
        />

        {/* Ethereum (Pink/Magenta) - Top Right */}
        <Coin 
          position={[3.7, 1.75, 0.7]} 
          rotation={[0.2, -0.35, 0.1]}
          symbol="ETH" 
          bgColor="#fbcfe8" 
          fgColor="#db2777" 
          edgeColor="#ec4899" 
          isEth={true}
          scale={1.05}
        />

        {/* Litecoin (Teal/Mint) - Bottom Right */}
        <Coin 
          position={[2.75, -2.4, 0.6]} 
          rotation={[-0.15, -0.2, 0.05]}
          symbol="Ł" 
          bgColor="#99f6e4" 
          fgColor="#0d9488" 
          edgeColor="#14b8a6" 
          scale={1.0}
        />

        {/* 4. Floating Decorative Accent Spheres */}
        {/* Mint/Teal Sphere - Top Right */}
        <FloatingSphere position={[1.0, 3.1, 0.2]} radius={0.18} color="#2dd4bf" />

        {/* Golden Amber Sphere - Bottom Left */}
        <FloatingSphere position={[-2.9, -2.45, 0.5]} radius={0.19} color="#f59e0b" />

        {/* Soft Pink Marble - Far Left */}
        <FloatingSphere position={[-4.4, -1.6, 0.3]} radius={0.11} color="#f472b6" />
      </group>
    </Float>
  );
}

// -------------------------------------------------------------
// Main Scene Export with Lighting & Canvas
// -------------------------------------------------------------
export default function BlockchainScene() {
  return (
    <div className="w-full h-full relative">
      <Canvas 
        camera={{ position: [0, 0, 8.8], fov: 45 }}
        style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}
      >
        {/* Soft clean neutral ambient light */}
        <ambientLight intensity={0.9} color="#ffffff" />

        {/* Key Directional Light (Top-Left) */}
        <directionalLight 
          position={[6, 9, 7]} 
          intensity={2.2} 
          color="#ffffff" 
        />

        {/* Fill Directional Light (Bottom-Left) */}
        <directionalLight 
          position={[-6, -5, 4]} 
          intensity={0.6} 
          color="#ffffff" 
        />

        {/* Delicate, subtle floating background micro-sparkles */}
        <Sparkles 
          count={150} 
          scale={[16, 12, 10]} 
          size={1.4} 
          speed={0.35} 
          opacity={0.6} 
          color="#ffffff" 
        />
        <Sparkles 
          count={60} 
          scale={[12, 9, 8]} 
          size={2.0} 
          speed={0.25} 
          opacity={0.45} 
          color="#fef08a" 
        />

        {/* The Complete 3D Blockchain System */}
        <BlockchainWorld />
      </Canvas>
    </div>
  );
}
