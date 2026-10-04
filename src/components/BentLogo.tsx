"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

import { MotionValue } from 'framer-motion';

function ContinuousRing({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const [tex1, tex2] = useTexture([
    '/images/manne-achuth-logo.png',
    '/images/build.png'
  ]);
  
  tex1.generateMipmaps = true;
  tex1.minFilter = THREE.LinearMipmapLinearFilter;
  tex2.generateMipmaps = true;
  tex2.minFilter = THREE.LinearMipmapLinearFilter;
  
  const groupRef = useRef<THREE.Group>(null);
  const lastScrollProgress = useRef(0);

  // Seamless Spin + Scroll Momentum
  useFrame((state, delta) => {
    if (!groupRef.current || !scrollProgress) return;

    // Phase 1: Always auto-spin infinitely at base speed
    groupRef.current.rotation.y -= delta * 0.25; 

    // Phase 2: Add mouse scroll momentum on top! (When scrolling, it spins way faster)
    const currentScroll = scrollProgress.get();
    const scrollDelta = currentScroll - lastScrollProgress.current;
    
    // Only apply scroll momentum if we are still scrolling into the section
    if (currentScroll < 0.99) {
      groupRef.current.rotation.y -= scrollDelta * Math.PI * 1.5;
    }

    lastScrollProgress.current = currentScroll;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Front Half: MANNE ACHUTH */}
      <mesh>
        <cylinderGeometry args={[4.5, 4.5, 2.2, 64, 1, true, 0, Math.PI]} />
        <meshBasicMaterial 
          map={tex1} 
          transparent={true} 
          side={THREE.FrontSide} 
          depthWrite={false}
        />
      </mesh>
      
      {/* Back Half: BUILD. BREAK. DEBUG. DEPLOY. */}
      <mesh>
        <cylinderGeometry args={[4.5, 4.5, 2.2, 64, 1, true, Math.PI, Math.PI]} />
        <meshBasicMaterial 
          map={tex2} 
          transparent={true} 
          side={THREE.FrontSide} 
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function BentLogo({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <div className="w-[350px] h-[100px] md:w-[600px] md:h-[150px] lg:w-[900px] lg:h-[200px] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 35 }}>
        <ContinuousRing scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
