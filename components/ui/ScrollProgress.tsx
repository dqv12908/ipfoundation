"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/utils";

const SECTIONS = [
  { id: "gioi-thieu", label: "Hero" },
  { id: "van-de", label: "Problem" },
  { id: "giai-phap", label: "Solution" },
  { id: "token", label: "Token" },
  { id: "doi-tac", label: "Stakeholders" },
  { id: "loi-ich", label: "Benefits" },
  { id: "hop-tac", label: "Partnership" },
  { id: "lo-trinh", label: "Roadmap" },
  { id: "lien-he", label: "Contact" },
];

export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  if (reduced) return null;

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      {/* Progress line */}
      <div className="relative w-px h-40 bg-white/10">
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute inset-0 bg-accent-blue"
        />
      </div>
      {/* Section dots */}
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          title={section.label}
          className="group relative"
        >
          <div className="w-2 h-2 bg-white/20 group-hover:bg-accent-blue transition-colors" />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {section.label}
          </span>
        </a>
      ))}
    </div>
  );
}
