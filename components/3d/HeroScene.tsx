"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import FloatingIcon from "./FloatingIcon";
import TokenParticles from "./TokenParticles";

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00D4FF" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#FFB800" />

      {/* Central token shape */}
      <FloatingIcon
        position={[0, 0, 0]}
        shape="octahedron"
        color="#00D4FF"
        scale={1.5}
        speed={0.5}
        floatIntensity={0.5}
      />

      {/* Surrounding shapes */}
      <FloatingIcon position={[-2.2, 1.2, -1]} shape="sphere" color="#00FFA3" scale={0.6} speed={0.8} />
      <FloatingIcon position={[2, -1, -0.5]} shape="torus" color="#FFB800" scale={0.7} speed={0.6} />
      <FloatingIcon position={[-1.5, -1.5, 0.5]} shape="box" color="#00D4FF" scale={0.5} speed={1} />
      <FloatingIcon position={[1.8, 1.5, -1.5]} shape="box" color="#FFB800" scale={0.4} speed={0.7} />

      {/* Particles */}
      <TokenParticles count={150} radius={4} color="#00D4FF" />
      <TokenParticles count={50} radius={3} color="#00FFA3" />

      <Environment preset="night" />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-accent-cyan/30 border-t-accent-cyan animate-spin" />
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
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
