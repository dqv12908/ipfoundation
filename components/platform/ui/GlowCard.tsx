'use client'

import { useRef, useCallback, type ReactNode, type CSSProperties } from 'react'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  style?: CSSProperties
}

export function GlowCard({
  children,
  className = '',
  glowColor = 'rgba(201,168,76,0.06)',
  style,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    card.style.transform = 'scale(1.01)'
    card.style.borderColor = 'rgba(255,255,255,0.1)'
    glow.style.opacity = '1'
    glow.style.background = `radial-gradient(400px circle at ${x}px ${y}px, ${glowColor}, transparent 60%)`
  }, [glowColor])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    card.style.transform = 'scale(1)'
    card.style.borderColor = 'rgba(255,255,255,0.06)'
    glow.style.opacity = '0'
  }, [])

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl border border-border bg-surface-card transition-all duration-300 ease-out ${className}`}
      style={{ ...style, willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
      <div className="relative z-20">{children}</div>
    </div>
  )
}
