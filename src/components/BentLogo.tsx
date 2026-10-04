"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

function ContinuousRing() {
  const [tex1, tex2] = useTexture([
    '/images/manne-achuth-logo.png',
    '/images/build.png'
  ]);
  
  tex1.generateMipmaps = true;
  tex1.minFilter = THREE.LinearMipmapLinearFilter;
  tex2.generateMipmaps = true;
  tex2.minFilter = THREE.LinearMipmapLinearFilter;
  
  const groupRef = useRef<THREE.Group>(null);

  // Spin continuously in one direction (left to right)
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.25; // Perfect goldilocks speed
    }
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

export default function BentLogo() {
  return (
    <div className="w-[350px] h-[100px] md:w-[600px] md:h-[150px] lg:w-[900px] lg:h-[200px] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 35 }}>
        <ContinuousRing />
      </Canvas>
    </div>
  );
}
