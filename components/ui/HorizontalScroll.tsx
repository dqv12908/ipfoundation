"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/utils";

interface HorizontalScrollProps {
  children: React.ReactNode;
  panelCount: number;
}

export default function HorizontalScroll({
  children,
  panelCount,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) return;

    const update = () => {
      const node = containerRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const next = distance > 0 ? -rect.top / distance : 0;
      setProgress(Math.min(1, Math.max(0, next)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduced]);

  if (reduced) {
    return <div>{children}</div>;
  }

  return (
    <div ref={containerRef} style={{ height: `${panelCount * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          style={{
            transform: `translate3d(-${progress * (panelCount - 1) * 100}%, 0, 0)`,
          }}
          className="flex h-full transition-transform duration-75 ease-linear"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
