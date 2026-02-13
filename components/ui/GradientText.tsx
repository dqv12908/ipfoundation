import { cn } from "@/lib/utils";

interface AccentTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

export default function AccentText({
  children,
  className,
  as: Tag = "span",
}: AccentTextProps) {
  return (
    <Tag className={cn("text-accent-blue font-black", className)}>
      {children}
    </Tag>
  );
}
