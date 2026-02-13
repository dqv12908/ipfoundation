"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useInView, useReducedMotion } from "@/lib/utils";

interface AnimatedCounterProps {
  value: string;
  label: string;
}

const SCRAMBLE_CHARS = "0123456789";

export default function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  const scramble = useCallback(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }

    const chars = value.split("");
    const duration = 1200;
    const steps = 20;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const result = chars.map((char, i) => {
        if (!/\d/.test(char)) return char;
        const settleAt = (i + 1) / chars.length;
        if (progress >= settleAt) return char;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      });
      setDisplay(result.join(""));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, reduced]);

  useEffect(() => {
    if (!inView) return;
    return scramble();
  }, [inView, scramble]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-2xl md:text-3xl font-black text-accent-blue tabular-nums">
        {display}
      </div>
      <div className="text-text-secondary text-xs uppercase tracking-widest mt-1">
        {label}
      </div>
    </div>
  );
}
