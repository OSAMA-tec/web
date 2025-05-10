import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingObjectProps {
  position: [number, number, number];
  scale: number;
  rotationSpeed: number;
}

export default function FloatingObject({ position, scale, rotationSpeed }: FloatingObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Animation for floating effect
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const time = clock.getElapsedTime();
    
    // Rotate the object
    meshRef.current.rotation.x = time * rotationSpeed * 0.5;
    meshRef.current.rotation.y = time * rotationSpeed;
    
    // Slight floating motion
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2;
  });

  return (
    <RoundedBox
      ref={meshRef}
      args={[1, 1, 1]} // Width, height, depth
      radius={0.1} // Border radius
      smoothness={4} // Smoothness of the corners
      position={position}
      scale={scale}
    >
      <meshStandardMaterial 
        color="#64ffda" 
        transparent 
        opacity={0.4}
        metalness={0.5}
        roughness={0.2}
      />
    </RoundedBox>
  );
}
