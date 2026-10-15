"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function TinyParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 5000;

  // Exact spherical distribution of 5,000 tiny background dust particles
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

  // Exact color setup: pure whites with occasional theme red sparks
  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const bgPalette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#ffffff"),
      new THREE.Color("#ffffff"),
      new THREE.Color("#ffffff"),
      new THREE.Color("#ef4444"), // Theme Red
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

  // Gentle cosmic rotation
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
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function TinyParticlesBackground() {
  return (
    <div className="fixed inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <TinyParticles />
        <EffectComposer>
          <Bloom luminanceThreshold={0.7} mipmapBlur intensity={1.0} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
