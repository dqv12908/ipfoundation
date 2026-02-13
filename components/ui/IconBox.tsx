import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

type IconName = keyof typeof LucideIcons;

interface IconBoxProps {
  icon: IconName;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function IconBox({
  icon,
  className,
  size = "md",
}: IconBoxProps) {
  const Icon = LucideIcons[icon] as LucideIcons.LucideIcon;
  if (!Icon) return null;

  const sizeMap = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-18 h-18",
  };

  const iconSize = { sm: 20, md: 28, lg: 36 };

  return (
    <div
      className={cn(
        "bg-accent-blue/5 border border-accent-blue/20 text-accent-blue flex items-center justify-center",
        sizeMap[size],
        className
      )}
    >
      <Icon size={iconSize[size]} />
    </div>
  );
}
