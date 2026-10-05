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
      uProgress: { value: 0 }
    },
    vertexShader: `
      uniform float uProgress;
      
      attribute vec3 originalPos;
      attribute vec3 randomPos;
      attribute vec3 color;
      
      varying vec3 vColor;
      
      void main() {
        vColor = color;
        
        // Assembles neatly from chaotic positions to a perfectly flat, clean grid
        vec3 pos = mix(randomPos, originalPos, uProgress);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        
        // Fixed, crisp point size for that clean "tiny dots" look
        gl_PointSize = (2.5 / -mvPosition.z); 
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        vec2 xy = gl_PointCoord.xy - vec2(0.5);
        float ll = length(xy);
        if(ll > 0.5) discard; // Keep them as perfect tiny circles
        
        // Pure true color, no glowing/blurring
        gl_FragColor = vec4(vColor, 1.0);
      }
    `,
    transparent: true,
    depthWrite: true,
  }), []);

  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = '/images/hologram-body-transparent.png';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Extremely high resolution base for a dense, highly detailed dot mosaic
      const width = 500;
      const aspect = img.height / img.width;
      const height = aspect * width;
      
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      const imgData = ctx.getImageData(0, 0, width, height).data;
      
      // PASS 1: Find the exact bounding box
      let minX = width, maxX = 0, minY = height, maxY = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          const a = imgData[i + 3];
          if (a < 128) continue;

          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
      
      const cropW = maxX - minX;
      const cropH = maxY - minY;
      const cropAspect = cropH / cropW;
      
      const positions = [];
      const originalPos = [];
      const randomPos = [];
      const colors = [];
      
      // PASS 2: Generate perfectly spaced tiny dots!
      // We skip every other pixel (+= 2) to create physical gaps between the dots, making the "dot formation" extremely clear!
      for (let y = minY; y <= maxY; y += 2) {
        for (let x = minX; x <= maxX; x += 2) {
          const i = (y * width + x) * 4;
          const a = imgData[i + 3];
          if (a < 128) continue;
          
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          
          const px = ((x - minX) / cropW) * 2 - 1;
          const py = -((y - minY) / cropH) * 2 + 1;
          
          const finalPx = px * (1 / cropAspect);
          const finalPy = py;
          
          // PERFECTLY FLAT. No Z-distortion. It's just a clean 2D image made of dots.
          const pz = 0; 
          
          positions.push(finalPx, finalPy, pz);
          originalPos.push(finalPx, finalPy, pz);
          
          // They fly out from the INSIDE (center point)!
          randomPos.push(
            (Math.random() - 0.5) * 0.2, // Very tight cluster in the center
            (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 0.2
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
      const progress = progressSpring.get();
      shaderMaterial.uniforms.uProgress.value = progress;
    }
  });

  if (!geometry) return null;

  // Scale decreased back to the balanced size without zooming in!
  return (
    <points ref={pointsRef} geometry={geometry} material={shaderMaterial} scale={[1.45, 1.45, 1.45]} position={[0, 0.05, 0]} />
  );
}

export default function HologramBody({ isInView }: { isInView: boolean }) {
  // Removed pointer-events-none so the 3D mouse interaction actually works!
  return (
    <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <Particles isInView={isInView} />
      </Canvas>
    </div>
  );
}
