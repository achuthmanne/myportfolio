"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

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
// 2. Slender Curved Iron Wire Sweeping Inwards in 3D Depth
// -------------------------------------------------------------
function CurvedIronWire() {
  const wireGroupRef = useRef<THREE.Group>(null);

  // Generate a smooth horizontal semicircle curving deep inwards into Z-depth
  const { curve, startPoint, endPoint, centerDeepPoint } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 64;
    const radiusX = 6.2; // Horizontal span across screen
    const radiusZ = 2.0; // Sleek, shallow curve depth so vertical height on screen is compact
    const wireY = 1.6;   // Positioned high up cleanly near the top

    for (let i = 0; i <= segments; i++) {
      const t = i / segments; // 0 to 1
      const angle = Math.PI * t; // 0 to PI
      const x = -Math.cos(angle) * radiusX;
      // Negative Z pulls the center gracefully into the 3D space
      const z = -Math.sin(angle) * radiusZ;
      // Slender level wire with minimal sag
      const y = wireY - Math.sin(angle) * 0.06;
      points.push(new THREE.Vector3(x, y, z));
    }

    const c = new THREE.CatmullRomCurve3(points);
    return {
      curve: c,
      startPoint: points[0],
      endPoint: points[points.length - 1],
      centerDeepPoint: points[Math.floor(segments / 2)]
    };
  }, []);

  return (
    <group ref={wireGroupRef}>
      {/* The Slender Iron Wire Tube */}
      <mesh>
        <tubeGeometry args={[curve, 128, 0.02, 16, false]} />
        <meshStandardMaterial
          color="#d1d5db" // Sleek metallic silver/iron
          metalness={0.94}
          roughness={0.22}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Subtle outer metallic ring caps at the wire ends */}
      <mesh position={[startPoint.x, startPoint.y, startPoint.z]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[endPoint.x, endPoint.y, endPoint.z]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.95} roughness={0.2} />
      </mesh>

      {/* Thin vertical ceiling anchor wires supporting the ends */}
      <mesh position={[startPoint.x, startPoint.y + 1.5, startPoint.z]}>
        <cylinderGeometry args={[0.008, 0.008, 3, 8]} />
        <meshStandardMaterial color="#6b7280" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[endPoint.x, endPoint.y + 1.5, endPoint.z]}>
        <cylinderGeometry args={[0.008, 0.008, 3, 8]} />
        <meshStandardMaterial color="#6b7280" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// 3. Full 3D Scene Viewport
// -------------------------------------------------------------
export default function HackathonGalleryWire() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 1.1, 7.5], fov: 45 }}
        style={{ pointerEvents: 'none', width: '100%', height: '100%' }}
      >
        {/* Clean studio lighting for crisp metallic specular highlights */}
        <ambientLight intensity={0.7} color="#ffffff" />
        <directionalLight position={[5, 8, 5]} intensity={2.0} color="#ffffff" />
        <directionalLight position={[-5, 4, 3]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[0, -3, 2]} intensity={0.5} color="#94a3b8" />

        {/* 3D Curved Iron Wire */}
        <CurvedIronWire />

        {/* Tiny Cosmic Particles Floating in the Ambient Background */}
        <TinyParticles />

        {/* Subtle Bloom */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.75} mipmapBlur intensity={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
