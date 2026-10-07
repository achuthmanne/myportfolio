"use client";

import React, { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, useTexture } from '@react-three/drei';

// The Hanging Card component with gentle physics swinging
function HangingCard({ 
  position, 
  imageSrc,
  wireBaseColor = "#002244",
  wireEmissiveColor = "#0057B8",
  sparkleColor = "#ffffff"
}: { 
  position: THREE.Vector3, 
  imageSrc: string,
  wireBaseColor?: string,
  wireEmissiveColor?: string,
  sparkleColor?: string
}) {
  // Load the PNG as a 3D texture
  const texture = useTexture(imageSrc);
  const groupRef = useRef<THREE.Group>(null);

  // Create a strict local curve just for the short electric wire above the card
  const localWireCurve = useMemo(() => {
    return new THREE.LineCurve3(
      new THREE.Vector3(-1.6, 0, 0),
      new THREE.Vector3(1.6, 0, 0)
    );
  }, []);

  // Subtle wind swinging physics
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      // Gentle pendulum swing based on card's X position to offset the wave
      groupRef.current.rotation.z = Math.sin(time * 1.5 + position.x) * 0.04;
      groupRef.current.rotation.y = Math.sin(time * 0.8 + position.x) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* The Short Electric Wire (Stationary, slightly wider than the card) */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 3.2, 32]} />
        <meshStandardMaterial 
          color={wireBaseColor} 
          emissive={wireEmissiveColor} 
          emissiveIntensity={1.5} 
          toneMapped={false}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Traveling sparkles uniquely orbiting this short wire */}
      <TravelingSparkles curve={localWireCurve} count={40} color={sparkleColor} />

      {/* The Swinging Card (pivots from the wire) */}
      <group ref={groupRef}>
        {/* Pushed to Z = -0.1 so the card hangs BEHIND the electric wire! */}
        <group position={[0, -2.0, -0.1]}>
          <mesh>
            {/* Scaled down slightly to guarantee it fits on screen (Width is 2.3) */}
            <planeGeometry args={[2.3, 4.0]} />
            <meshBasicMaterial 
              map={texture} 
              side={THREE.DoubleSide} 
              transparent={true} 
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function SparkleWire() {
  return (
    <group position={[0, 1.5, 0]}>
      {/* Left side hackathon card (Trinetra) */}
      <HangingCard 
        position={new THREE.Vector3(-4, 0, 0)} 
        imageSrc="/images/trinetra-card-transparent.png" 
        wireBaseColor="#450a0a" // Very dark red base
        wireEmissiveColor="#dc2626" // Intense neon red
        sparkleColor="#fca5a5" // Light red sparkles
      />

      {/* Right side hackathon card (Gear Up) */}
      <HangingCard 
        position={new THREE.Vector3(4, 0, 0)} 
        imageSrc="/images/gear-up-card-transparent.png" 
      />
    </group>
  );
}

function TravelingSparkles({ curve, count, color = "#ffffff" }: { curve: THREE.Curve<THREE.Vector3>, count: number, color?: string }) {
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
        color={color}
        transparent
        opacity={1.0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function HackathonWire() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {/* Moved the camera significantly down and back to completely guarantee no cutoffs */}
      <Canvas camera={{ position: [0, -3, 20], fov: 45 }}>
        {/* Subtle ambient light so it doesn't wash out the emissive glow */}
        <ambientLight intensity={0.4} />
        {/* Directional light to cast clean, crisp reflections on the metallic wire */}
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <directionalLight position={[-5, -10, -5]} intensity={0.5} />
        
        {/* We use Float to give the entire wire network a very subtle, natural breathing movement */}
        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
          <Suspense fallback={null}>
            <SparkleWire />
          </Suspense>
        </Float>
      </Canvas>
    </div>
  );
}
