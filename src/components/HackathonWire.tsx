"use client";

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

function SparkleWire() {
  // Create a 3D arc that bows deeply into the screen (negative Z)
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-14, -2, 5),   // Far Left, close to camera
      new THREE.Vector3(-7, 0, -4),    // Middle-left, deeper
      new THREE.Vector3(0, 1.5, -12),  // Dead center, extremely deep in the screen
      new THREE.Vector3(7, 0, -4),     // Middle-right, deeper
      new THREE.Vector3(14, -2, 5),    // Far Right, close to camera
    ]);
  }, []);

  const tubeRef = useRef<THREE.Mesh>(null);
  
  return (
    <group>
      {/* The Core Lighting Wire - Thin, crisp, emissive */}
      <mesh ref={tubeRef}>
        <tubeGeometry args={[curve, 128, 0.03, 16, false]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#0ea5e9" // Deep cyan/blue crisp light
          emissiveIntensity={2}
          toneMapped={false}
          roughness={0.2}
          metalness={0.9} // High metalness gives it that physical "wire" look
        />
      </mesh>

      {/* Travelling Sparkles along the wire */}
      <TravelingSparkles curve={curve} count={80} />
    </group>
  );
}

function TravelingSparkles({ curve, count }: { curve: THREE.CatmullRomCurve3, count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create initial random positions along the curve's timeline (0 to 1)
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        t: Math.random(), // position along curve (0 to 1)
        speed: 0.001 + Math.random() * 0.002, // travel speed along the wire
        radius: 0.05 + Math.random() * 0.2, // distance floating away from the center wire
        angle: Math.random() * Math.PI * 2, // angle around the wire tube
        spinSpeed: (Math.random() - 0.5) * 0.05 // rotation around the wire as it travels
      });
    }
    return data;
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    particles.forEach((p, i) => {
      // Move particle forward along the curve
      p.t += p.speed;
      if (p.t > 1) p.t = 0; // Loop back to start

      // Spin particle around the wire
      p.angle += p.spinSpeed;

      // Get the exact center point on the curve at time t
      const curvePoint = curve.getPointAt(p.t);
      
      // Get the tangent (direction of the curve) at time t
      const tangent = curve.getTangentAt(p.t);
      
      // Calculate a perfectly perpendicular circle around the wire at this point
      const up = new THREE.Vector3(0, 1, 0);
      let right = new THREE.Vector3().crossVectors(tangent, up);
      if (right.lengthSq() < 0.001) {
          right = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(1, 0, 0));
      }
      right.normalize();
      const trueUp = new THREE.Vector3().crossVectors(right, tangent).normalize();

      // Apply radius and angle to find the exact floating position
      const offsetX = Math.cos(p.angle) * p.radius;
      const offsetY = Math.sin(p.angle) * p.radius;

      const finalPos = curvePoint.clone()
        .add(right.multiplyScalar(offsetX))
        .add(trueUp.multiplyScalar(offsetY));

      positions[i * 3] = finalPos.x;
      positions[i * 3 + 1] = finalPos.y;
      positions[i * 3 + 2] = finalPos.z;
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial 
        size={0.06}
        color="#ffffff"
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function HackathonWire() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        {/* Subtle ambient light so it doesn't wash out the emissive glow */}
        <ambientLight intensity={0.4} />
        {/* Directional light to cast clean, crisp reflections on the metallic wire */}
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <directionalLight position={[-5, -10, -5]} intensity={0.5} />
        
        {/* We use Float to give the entire wire network a very subtle, natural breathing movement */}
        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
          <SparkleWire />
        </Float>
      </Canvas>
    </div>
  );
}
