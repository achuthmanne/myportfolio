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
        
        vec3 pos = mix(randomPos, originalPos, uProgress);
        
        pos.y += sin(uTime * 2.0 + pos.x * 10.0) * 0.02 * uProgress;
        pos.z += cos(uTime * 1.5 + pos.y * 10.0) * 0.03 * uProgress;
        
        float dist = distance(uMouse, pos.xy);
        if(dist < 0.8) {
          pos.z += (0.8 - dist) * 1.5 * uProgress;
          pos.x += (pos.x - uMouse.x) * 0.2 * (0.8 - dist) * uProgress;
        }

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        
        // Smaller points to look like tiny distinct particles!
        gl_PointSize = (5.0 / -mvPosition.z); 
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        vec2 xy = gl_PointCoord.xy - vec2(0.5);
        float ll = length(xy);
        if(ll > 0.5) discard; 
        
        // Make the colors EXTREMELY bright and clear so the white shirt pops!
        vec3 brightColor = min(vColor * 1.5, vec3(1.0));
        
        gl_FragColor = vec4(brightColor, 1.0 - (ll * 2.0));
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }), []);

  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = '/images/hologram-body.png';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Extremely high resolution for clear face shape
      const width = 280;
      const aspect = img.height / img.width;
      const height = aspect * width;
      
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      const imgData = ctx.getImageData(0, 0, width, height).data;
      
      // PASS 1: Find the exact bounding box of the non-white pixels
      let minX = width, maxX = 0, minY = height, maxY = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          const r = imgData[i], g = imgData[i + 1], b = imgData[i + 2], a = imgData[i + 3];
          if (a < 128 || (r > 240 && g > 240 && b > 240)) continue;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
      
      const cropW = maxX - minX;
      const cropH = maxY - minY;
      const cropAspect = cropH / cropW; // True aspect ratio of just the body!
      
      const positions = [];
      const originalPos = [];
      const randomPos = [];
      const colors = [];
      
      // PASS 2: Generate particles relative to the Bounding Box!
      for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
          const i = (y * width + x) * 4;
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];
          
          if (a < 128 || (r > 240 && g > 240 && b > 240)) continue;
          
          // Map exact body bounds: Y goes from 1 (head) to -1 (feet). X goes proportional to aspect.
          const px = ((x - minX) / cropW) * 2 - 1; // -1 to 1
          const py = -((y - minY) / cropH) * 2 + 1; // 1 to -1
          
          // Correct aspect ratio distortion (scale X based on true body proportions)
          const finalPx = px * (1 / cropAspect);
          const finalPy = py;
          
          const brightness = (r + g + b) / 3;
          const pz = (brightness / 255) * 0.8; 
          
          positions.push(finalPx, finalPy, pz);
          originalPos.push(finalPx, finalPy, pz);
          
          randomPos.push(
            (Math.random() - 0.5) * 15,
            (Math.random() * 15) + 5,
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
      
      const mouseX = (state.pointer.x * state.viewport.width) / 2;
      const mouseY = (state.pointer.y * state.viewport.height) / 2;
      
      shaderMaterial.uniforms.uMouse.value.x += (mouseX - shaderMaterial.uniforms.uMouse.value.x) * 0.1;
      shaderMaterial.uniforms.uMouse.value.y += (mouseY - shaderMaterial.uniforms.uMouse.value.y) * 0.1;
      
      const targetRotationX = -(state.pointer.y * 0.15);
      const targetRotationY = (state.pointer.x * 0.25);
      
      pointsRef.current.rotation.x += (targetRotationX - pointsRef.current.rotation.x) * 0.1;
      pointsRef.current.rotation.y += (targetRotationY + ((1.0 - progress) * Math.PI) - pointsRef.current.rotation.y) * 0.1;
    }
  });

  if (!geometry) return null;

  // Scale decreased slightly as requested so it's not overwhelmingly large!
  // Lifted the model up slightly so the feet rest cleanly on top of the text without sinking in!
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
