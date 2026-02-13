"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { cn } from "@/lib/utils";

interface Float3DSceneProps {
  children: React.ReactNode;
  className?: string;
  camera?: { position: [number, number, number]; fov: number };
}

function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-accent-blue/30 border-t-accent-blue animate-spin" />
    </div>
  );
}

export default function Float3DScene({
  children,
  className,
  camera = { position: [0, 0, 5], fov: 50 },
}: Float3DSceneProps) {
  return (
    <div className={cn("w-full h-full", className)}>
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          camera={camera}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}
