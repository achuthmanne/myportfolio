"use client";

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpring } from 'framer-motion';

function Particles({ isInView }: { isInView: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Use a Framer Motion spring to smoothly drive the assembly progress from 0 to 1
  const progressSpring = useSpring(0, { stiffness: 40, damping: 20 });
  
  useEffect(() => {
    if (isInView) {
      progressSpring.set(1);
    } else {
      progressSpring.set(0);
    }
  }, [isInView, progressSpring]);

  // Custom shader material for the 3D code matrix look
  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uProgress;
      uniform vec2 uMouse;
      
      attribute vec3 originalPos;
      attribute vec3 randomPos;
      attribute vec3 color;
      
      varying vec3 vColor;
      
      void main() {
        vColor = color;
        
        // Assemble animation based on uProgress spring
        vec3 pos = mix(randomPos, originalPos, uProgress);
        
        // Add subtle floating sine-wave motion to make it feel alive
        pos.y += sin(uTime * 2.0 + pos.x * 10.0) * 0.02 * uProgress;
        pos.z += cos(uTime * 1.5 + pos.y * 10.0) * 0.03 * uProgress;
        
        // Mouse interaction (repel particles slightly when mouse moves near)
        float dist = distance(uMouse, pos.xy);
        if(dist < 0.8) {
          pos.z += (0.8 - dist) * 1.5 * uProgress;
          pos.x += (pos.x - uMouse.x) * 0.2 * (0.8 - dist) * uProgress;
        }

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        
        // Make points bigger when they are close, smaller when far
        gl_PointSize = (12.0 / -mvPosition.z); 
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        // Create a soft glowing dot
        vec2 xy = gl_PointCoord.xy - vec2(0.5);
        float ll = length(xy);
        if(ll > 0.5) discard; // Make it circular
        
        // Enhance the glow and slightly tint with red for the cyberpunk vibe
        vec3 glowColor = mix(vColor, vec3(1.0, 0.2, 0.2), 0.2);
        gl_FragColor = vec4(glowColor, 1.0 - (ll * 2.0));
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }), []);

  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    // We load the 2D image onto a hidden canvas to extract the raw pixel data!
    const img = new window.Image();
    img.src = '/images/hologram-body.png';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Downscale for performance (120px wide grid = ~15,000 to 20,000 particles)
      const width = 140;
      const height = (img.height / img.width) * width;
      
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      const imgData = ctx.getImageData(0, 0, width, height).data;
      
      const positions = [];
      const originalPos = [];
      const randomPos = [];
      const colors = [];
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];
          
          // Discard pure white background and fully transparent pixels
          if (a < 128 || (r > 240 && g > 240 && b > 240)) continue;
          
          // Normalize coordinates so the model fits in a 3D unit space (-1 to 1)
          const px = (x / width) * 2 - 1;
          const py = -(y / height) * 2 + 1; // Invert Y so head is at top
          // Give it physical 3D depth based on pixel brightness (darker is further back, brighter is closer)
          const brightness = (r + g + b) / 3;
          const pz = (brightness / 255) * 0.8; 
          
          positions.push(px, py, pz);
          originalPos.push(px, py, pz);
          
          // Chaotic starting positions! (Matrix rain effect - they start high up and scattered)
          randomPos.push(
            (Math.random() - 0.5) * 15,
            (Math.random() * 15) + 5, // Start above the screen
            (Math.random() - 0.5) * 15
          );
          
          colors.push(r / 255, g / 255, b / 255);
        }
      }
      
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geo.setAttribute('originalPos', new THREE.Float32BufferAttribute(originalPos, 3));
      geo.setAttribute('randomPos', new THREE.Float32BufferAttribute(randomPos, 3));
      geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      
      setGeometry(geo);
    };
  }, []);

  useFrame((state) => {
    if (shaderMaterial && pointsRef.current) {
      const time = state.clock.elapsedTime;
      const progress = progressSpring.get();
      
      shaderMaterial.uniforms.uTime.value = time;
      shaderMaterial.uniforms.uProgress.value = progress;
      
      // Calculate mouse position relative to center for the repel effect
      const mouseX = (state.pointer.x * state.viewport.width) / 2;
      const mouseY = (state.pointer.y * state.viewport.height) / 2;
      
      // Smoothly follow mouse
      shaderMaterial.uniforms.uMouse.value.x += (mouseX - shaderMaterial.uniforms.uMouse.value.x) * 0.1;
      shaderMaterial.uniforms.uMouse.value.y += (mouseY - shaderMaterial.uniforms.uMouse.value.y) * 0.1;
      
      // The entire model slowly tracks the mouse cursor (Parallax 3D effect)
      // When assembling (progress < 1), spin it in wildly. When assembled, just subtle track.
      const targetRotationX = -(state.pointer.y * 0.2);
      const targetRotationY = (state.pointer.x * 0.3);
      
      pointsRef.current.rotation.x += (targetRotationX - pointsRef.current.rotation.x) * 0.1;
      pointsRef.current.rotation.y += (targetRotationY + ((1.0 - progress) * Math.PI) - pointsRef.current.rotation.y) * 0.1;
    }
  });

  if (!geometry) return null;

  return (
    <points ref={pointsRef} geometry={geometry} material={shaderMaterial} scale={[3, 3, 3]} position={[0, -0.5, 0]} />
  );
}

export default function HologramBody({ isInView }: { isInView: boolean }) {
  return (
    <div className="absolute inset-0 w-full h-[600px] pointer-events-none z-10 flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <Particles isInView={isInView} />
      </Canvas>
    </div>
  );
}
