"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/utils";

interface SplitRevealProps {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}

export default function SplitReveal({ left, right, className }: SplitRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={`grid md:grid-cols-2 ${className || ""}`}>
        <div>{left}</div>
        <div>{right}</div>
      </div>
    );
  }

  return (
    <div className={`grid md:grid-cols-2 overflow-hidden ${className || ""}`}>
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
      >
        {left}
      </motion.div>
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
      >
        {right}
      </motion.div>
    </div>
  );
}
