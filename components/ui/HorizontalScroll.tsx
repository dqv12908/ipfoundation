"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/utils";

interface HorizontalScrollProps {
  children: React.ReactNode;
  panelCount: number;
}

export default function HorizontalScroll({ children, panelCount }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(panelCount - 1) * 100}%`]
  );

  if (reduced) {
    return <div>{children}</div>;
  }

  return (
    <div ref={containerRef} style={{ height: `${panelCount * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex h-full"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
