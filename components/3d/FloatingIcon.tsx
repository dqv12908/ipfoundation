"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface FloatingIconProps {
  position?: [number, number, number];
  color?: string;
  shape?: "box" | "sphere" | "torus" | "octahedron";
  scale?: number;
  speed?: number;
  floatIntensity?: number;
}

export default function FloatingIcon({
  position = [0, 0, 0],
  color = "#00D4FF",
  shape = "box",
  scale = 1,
  speed = 1,
  floatIntensity = 1,
}: FloatingIconProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3 * speed;
      meshRef.current.rotation.x += delta * 0.1 * speed;
    }
  });

  const geometry = () => {
    switch (shape) {
      case "sphere":
        return <sphereGeometry args={[0.5, 32, 32]} />;
      case "torus":
        return <torusGeometry args={[0.4, 0.15, 16, 32]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.5]} />;
      default:
        return null;
    }
  };

  return (
    <Float speed={speed * 2} rotationIntensity={0.3} floatIntensity={floatIntensity}>
      <group position={position} scale={scale}>
        {shape === "box" ? (
          <RoundedBox ref={meshRef} args={[0.8, 0.8, 0.8]} radius={0.1} smoothness={4}>
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.7}
              roughness={0.2}
              metalness={0.8}
            />
          </RoundedBox>
        ) : (
          <mesh ref={meshRef}>
            {geometry()}
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.7}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}
