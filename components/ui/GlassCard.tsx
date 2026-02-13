"use client";

import { cn } from "@/lib/utils";

interface SharpCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "dark" | "light" | "none";
}

export default function SharpCard({
  children,
  className,
  hover = true,
  variant = "dark",
}: SharpCardProps) {
  return (
    <div
      className={cn(
        "p-6",
        variant === "dark" && "card-sharp",
        variant === "light" && "card-inverted",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:border-accent-blue/30",
        className
      )}
    >
      {children}
    </div>
  );
}
