"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, RoundedBox, Environment } from "@react-three/drei";

function Island({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
      <group position={position} scale={scale}>
        {/* Platform */}
        <RoundedBox args={[2, 0.3, 1.5]} radius={0.1} smoothness={4}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.6}
            roughness={0.3}
            metalness={0.7}
          />
        </RoundedBox>
        {/* Small structures on platform */}
        <RoundedBox args={[0.3, 0.5, 0.3]} radius={0.05} position={[-0.5, 0.4, 0]}>
          <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} />
        </RoundedBox>
        <RoundedBox args={[0.25, 0.7, 0.25]} radius={0.05} position={[0.3, 0.5, 0.2]}>
          <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} />
        </RoundedBox>
      </group>
    </Float>
  );
}

function ConnectingLine({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) {
  const midY = (start[1] + end[1]) / 2 + 0.3;
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={3}
          array={new Float32Array([...start, (start[0] + end[0]) / 2, midY, (start[2] + end[2]) / 2, ...end])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00D4FF" transparent opacity={0.3} />
    </line>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 5, 5]} intensity={0.6} color="#00D4FF" />
      <pointLight position={[5, 0, -3]} intensity={0.3} color="#FFB800" />

      <Island position={[-3.5, 0, 0]} color="#00D4FF" scale={0.8} />
      <Island position={[0, 0.3, -0.5]} color="#00FFA3" scale={0.9} />
      <Island position={[3.5, 0.1, 0]} color="#FFB800" scale={0.8} />

      <ConnectingLine start={[-2, 0, 0]} end={[-0.8, 0.3, -0.5]} />
      <ConnectingLine start={[0.8, 0.3, -0.5]} end={[2, 0.1, 0]} />

      <Environment preset="night" />
    </>
  );
}

export default function RoadmapIslands() {
  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-accent-cyan/30 border-t-accent-cyan animate-spin" />
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 2, 8], fov: 40 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
