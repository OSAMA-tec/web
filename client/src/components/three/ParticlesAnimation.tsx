import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesAnimationProps {
  count: number;
}

export default function ParticlesAnimation({ count }: ParticlesAnimationProps) {
  const particles = useRef<THREE.Points>(null);
  
  // Create a set of particles with randomized positions
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Randomized positions (wider spread on X and Z axes)
      positions[i * 3] = (Math.random() - 0.5) * 10;  // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;  // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;  // z
    }
    
    return positions;
  }, [count]);
  
  // Colors for the particles
  const particleColors = useMemo(() => {
    const colors = new Float32Array(count * 3);
    const color1 = new THREE.Color('#64ffda');
    const color2 = new THREE.Color('#8b5cf6');
    
    for (let i = 0; i < count; i++) {
      // Mix between two colors
      const mixRatio = Math.random();
      const color = new THREE.Color().lerpColors(color1, color2, mixRatio);
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return colors;
  }, [count]);
  
  // Animation of particles
  useFrame(({ clock }) => {
    if (!particles.current) return;
    
    const positions = particles.current.geometry.attributes.position.array as Float32Array;
    const time = clock.getElapsedTime();
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Apply subtle sin/cos waves to create flowing motion
      const x = particlesPosition[i3];
      const y = particlesPosition[i3 + 1];
      const z = particlesPosition[i3 + 2];
      
      // Different particles move at different speeds
      const factor = 0.1 + (Math.sin(i) * 0.1);
      
      positions[i3] = x + Math.sin(time * factor) * 0.02;
      positions[i3 + 1] = y + Math.cos(time * factor) * 0.02;
      positions[i3 + 2] = z + Math.sin(time * factor) * 0.02;
    }
    
    particles.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particleColors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        vertexColors 
        transparent 
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}
