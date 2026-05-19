"use client";

import { TextReveal } from "@/components/ui/MotionWrappers";

interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function TextRevealBlock({
  children,
  delay = 0,
  className,
}: TextRevealProps) {
  return (
    <TextReveal delay={delay} className={className}>
      {children}
    </TextReveal>
  );
}
