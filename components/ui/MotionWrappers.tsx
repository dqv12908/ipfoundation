"use client";

import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn, useReducedMotion } from "@/lib/utils";

type RevealVariant = "up" | "left" | "right" | "scale" | "wipe";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  once?: boolean;
}

function Reveal({
  children,
  delay = 0,
  variant = "up",
  once = true,
  className,
  style,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    setMounted(true);

    if (!node || reducedMotion || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let frame = 0;

    const reveal = () => {
      setVisible(true);
      if (once) observer?.disconnect();
    };

    frame = window.requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      if (rect.top < viewportHeight - 64 && rect.bottom > 64) {
        reveal();
      }
    });

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.01,
      }
    );

    observer.observe(node);

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [once, reducedMotion]);

  const revealStyle = {
    "--motion-delay": `${delay}s`,
    ...style,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      style={revealStyle}
      className={cn(
        "motion-reveal",
        `motion-reveal--${variant}`,
        mounted && !visible && "motion-pending",
        visible && "is-visible",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface FadeInUpProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
}

export function FadeInUp({
  children,
  delay = 0,
  className,
  ...props
}: FadeInUpProps) {
  return (
    <Reveal delay={delay} variant="up" className={className} {...props}>
      {children}
    </Reveal>
  );
}

interface StaggerContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  stagger?: number;
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.1,
  style,
  ...props
}: StaggerContainerProps) {
  return (
    <div
      className={className}
      style={{ "--motion-stagger": `${stagger}s`, ...style } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}

interface StaggerItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
}

export function StaggerItem({
  children,
  className,
  delay = 0,
  ...props
}: StaggerItemProps) {
  return (
    <Reveal delay={delay} variant="up" className={className} {...props}>
      {children}
    </Reveal>
  );
}

export function ScaleIn({
  children,
  delay = 0,
  className,
  ...props
}: FadeInUpProps) {
  return (
    <Reveal delay={delay} variant="scale" className={className} {...props}>
      {children}
    </Reveal>
  );
}

export function SlideFromLeft({
  children,
  delay = 0,
  className,
  ...props
}: FadeInUpProps) {
  return (
    <Reveal delay={delay} variant="left" className={className} {...props}>
      {children}
    </Reveal>
  );
}

export function SlideFromRight({
  children,
  delay = 0,
  className,
  ...props
}: FadeInUpProps) {
  return (
    <Reveal delay={delay} variant="right" className={className} {...props}>
      {children}
    </Reveal>
  );
}

export function TextReveal({
  children,
  delay = 0,
  className,
  ...props
}: FadeInUpProps) {
  return (
    <Reveal delay={delay} variant="wipe" className={className} {...props}>
      {children}
    </Reveal>
  );
}

export function WipeIn({
  children,
  delay = 0,
  className,
  ...props
}: FadeInUpProps) {
  return (
    <Reveal delay={delay} variant="wipe" className={className} {...props}>
      {children}
    </Reveal>
  );
}
