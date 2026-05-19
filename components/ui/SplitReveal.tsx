"use client";

import {
  SlideFromLeft,
  SlideFromRight,
} from "@/components/ui/MotionWrappers";

interface SplitRevealProps {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}

export default function SplitReveal({ left, right, className }: SplitRevealProps) {
  return (
    <div className={`grid md:grid-cols-2 overflow-hidden ${className || ""}`}>
      <SlideFromLeft>{left}</SlideFromLeft>
      <SlideFromRight>{right}</SlideFromRight>
    </div>
  );
}
