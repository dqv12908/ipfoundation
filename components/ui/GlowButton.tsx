"use client";

import { cn } from "@/lib/utils";

interface SharpButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function SharpButton({
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled = false,
}: SharpButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative px-6 py-3 font-heading font-medium text-sm transition-all duration-300",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" && [
          "bg-accent-blue text-white",
          "hover:bg-white hover:text-accent-blue",
          "active:scale-95",
        ],
        variant === "outline" && [
          "border border-white text-white",
          "hover:border-accent-blue hover:text-accent-blue",
          "active:scale-95",
        ],
        className
      )}
    >
      {children}
    </button>
  );
}
