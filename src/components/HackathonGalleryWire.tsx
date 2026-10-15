"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

// -------------------------------------------------------------
// 1. Cosmic Background Tiny Dust Particles (Exact from Home)
// -------------------------------------------------------------
function TinyParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 5000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 30 + Math.random() * 70;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const bgPalette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#ffffff"),
      new THREE.Color("#ffffff"),
      new THREE.Color("#ffffff"),
      new THREE.Color("#ef4444"), // Theme Red Accent
    ];

    for (let i = 0; i < count; i++) {
      const color = bgPalette[Math.floor(Math.random() * bgPalette.length)];
      const brightness = Math.random() > 0.8 ? 0.8 : 0.3;
      col[i * 3] = color.r * brightness;
      col[i * 3 + 1] = color.g * brightness;
      col[i * 3 + 2] = color.b * brightness;
    }
    return col;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
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
  );
}

// -------------------------------------------------------------
// 2. Hanging Photo Card Component
// -------------------------------------------------------------
function HangingPhotoCard({
  x,
  y,
  imageSrc,
  width = 2.35,
  height = 2.94,
  swingOffset = 0,
  onClick
}: {
  x: number;
  y: number;
  imageSrc: string;
  width?: number;
  height?: number;
  swingOffset?: number;
  onClick?: () => void;
}) {
  const texture = useTexture(imageSrc);
  const swingRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  // Manage cursor style on card hover
  React.useEffect(() => {
    if (hovered) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'auto';
    }
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered]);

  // Gentle physical pendulum swinging physics
  useFrame((state) => {
    if (swingRef.current) {
      const time = state.clock.getElapsedTime();
      swingRef.current.rotation.z = Math.sin(time * 1.5 + swingOffset) * 0.025;
      swingRef.current.rotation.x = Math.sin(time * 1.1 + swingOffset * 1.3) * 0.02;
    }
  });

  return (
    <group position={[x, y, 0]}>
      {/* 1. Slender metal clip hooked over the thin iron wire */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.018, 0.018, 0.10, 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.94} roughness={0.2} />
      </mesh>
      {/* Clip clamp body hanging down */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.09, 0.07, 0.03]} />
        <meshStandardMaterial color="#64748b" metalness={0.92} roughness={0.25} />
      </mesh>

      {/* 2. Hanging Card with Swing Physics and Hover Interactivity */}
      <group 
        ref={swingRef} 
        position={[0, -0.09, 0]}
        scale={hovered ? 1.04 : 1.0}
      >
        {/* Card Backplate / Subtle Rim */}
        <mesh position={[0, -height / 2, -0.005]}>
          <planeGeometry args={[width + 0.08, height + 0.08]} />
          <meshStandardMaterial color={hovered ? "#dc2626" : "#0b0f19"} roughness={0.3} metalness={0.1} />
        </mesh>

        {/* The Front Photo Image (Clickable) */}
        <mesh 
          position={[0, -height / 2, 0.005]}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
          onPointerOut={() => setHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick();
          }}
        >
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 3. Straight Horizontal Iron Wire Spanning Screen Edge to Edge
// -------------------------------------------------------------
function StraightIronGallery({ onCardClick }: { onCardClick?: (src: string) => void }) {
  // Height chosen so the cards sit vertically centered in the viewport
  const pipeY = 1.45;

  // The 4 Cards in chronological sequence
  const cards = [
    { id: "trust-ballot", x: -4.8, src: "/images/trust-ballot-card.jpg", offset: 0 },
    { id: "building", x: -1.6, src: "/images/building-trust-ballot.jpg", offset: 1.6 },
    { id: "creators", x: 1.6, src: "/images/the-creators.jpg", offset: 3.2 },
    { id: "certificate", x: 4.8, src: "/images/trinetra-certificate.png", offset: 4.8 },
  ];

  return (
    <group>
      {/* Ultra-slender straight iron wire running horizontally across the screen */}
      <mesh position={[0, pipeY, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.009, 0.009, 28, 32]} />
        <meshStandardMaterial
          color="#d1d5db" // Sleek metallic silver/iron
          metalness={0.94}
          roughness={0.22}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* The 4 Hanging Photo Cards along the straight pipe */}
      <Suspense fallback={null}>
        {cards.map((card) => (
          <HangingPhotoCard
            key={card.id}
            x={card.x}
            y={pipeY}
            imageSrc={card.src}
            width={2.35}
            height={2.94}
            swingOffset={card.offset}
            onClick={() => onCardClick && onCardClick(card.src)}
          />
        ))}
      </Suspense>
    </group>
  );
}

// -------------------------------------------------------------
// 4. Full 3D Scene Viewport
// -------------------------------------------------------------
export default function HackathonGalleryWire({ onCardClick }: { onCardClick?: (src: string) => void }) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}
      >
        {/* Clean studio lighting for crisp metallic specular highlights */}
        <ambientLight intensity={0.75} color="#ffffff" />
        <directionalLight position={[6, 8, 5]} intensity={2.0} color="#ffffff" />
        <directionalLight position={[-6, 4, 3]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[0, -3, 2]} intensity={0.5} color="#94a3b8" />

        {/* Straight Iron Pipe Gallery */}
        <StraightIronGallery onCardClick={onCardClick} />

        {/* Tiny Cosmic Particles Floating in the Ambient Background */}
        <TinyParticles />
      </Canvas>
    </div>
  );
}
