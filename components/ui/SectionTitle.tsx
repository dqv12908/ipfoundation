"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  overline?: string;
  className?: string;
  align?: "center" | "left";
  light?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  overline,
  className,
  align = "center",
  light = false,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {overline && (
        <p className="text-accent-blue text-xs font-heading font-medium uppercase tracking-widest mb-4">
          {overline}
        </p>
      )}
      <h2
        className={cn(
          "font-heading text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4",
          light ? "text-black" : "text-text-primary"
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          "h-px w-12 bg-accent-blue mb-4",
          align === "center" && "mx-auto"
        )}
      />
      {subtitle && (
        <p
          className={cn(
            "text-lg max-w-2xl",
            align === "center" && "mx-auto",
            light ? "text-zinc-600" : "text-text-secondary"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
