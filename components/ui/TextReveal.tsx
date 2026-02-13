"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/utils";

interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function TextRevealBlock({ children, delay = 0, className }: TextRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className}>
      <motion.div
        initial={{ clipPath: "inset(-20% 100% -20% 0)" }}
        whileInView={{ clipPath: "inset(-20% 0% -20% 0)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 1,
          delay,
          ease: [0.77, 0, 0.175, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
