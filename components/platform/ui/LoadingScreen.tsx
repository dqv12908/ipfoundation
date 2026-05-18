'use client'

import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  /** Optional status message below the animation */
  message?: string
}

/**
 * Full-screen loading animation — concentric rotating rings
 * with an "IP" monogram crystallizing at the center.
 * Nodes pulse along the ring paths like data traversing a network.
 */
export function LoadingScreen({ message = 'Loading' }: LoadingScreenProps) {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? '' : d + '.'))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface">
      {/* Radial glow behind the rings */}
      <div
        className="absolute"
        style={{
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          animation: 'loader-glow-pulse 3s ease-in-out infinite',
        }}
      />

      {/* SVG rings + nodes */}
      <svg
        width="220"
        height="220"
        viewBox="0 0 220 220"
        fill="none"
        className="absolute"
      >
        {/* Outer ring — dashed, slow CW rotation */}
        <g style={{ transformOrigin: '110px 110px', animation: 'loader-ring-outer 8s linear infinite' }}>
          <circle
            cx="110"
            cy="110"
            r="100"
            stroke="rgba(201,168,76,0.08)"
            strokeWidth="1"
            fill="none"
          />
          {/* Sweeping arc on outer ring */}
          <circle
            cx="110"
            cy="110"
            r="100"
            stroke="url(#gold-gradient)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="628"
            strokeDashoffset="440"
            strokeLinecap="round"
            style={{ animation: 'loader-arc-sweep 3s ease-in-out infinite' }}
          />
          {/* Outer nodes — 6 evenly spaced */}
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i * 60) * (Math.PI / 180)
            const cx = 110 + Math.cos(angle) * 100
            const cy = 110 + Math.sin(angle) * 100
            return (
              <circle
                key={`outer-${i}`}
                cx={cx}
                cy={cy}
                r="2"
                fill="#C9A84C"
                style={{
                  transformOrigin: `${cx}px ${cy}px`,
                  animation: `loader-node 2s ease-in-out ${i * 0.33}s infinite`,
                }}
              />
            )
          })}
        </g>

        {/* Mid ring — solid thin, CCW rotation */}
        <g style={{ transformOrigin: '110px 110px', animation: 'loader-ring-mid 6s linear infinite' }}>
          <circle
            cx="110"
            cy="110"
            r="72"
            stroke="rgba(201,168,76,0.06)"
            strokeWidth="0.75"
            fill="none"
          />
          {/* Dashed accent on mid ring */}
          <circle
            cx="110"
            cy="110"
            r="72"
            stroke="rgba(201,168,76,0.2)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="8 16"
            strokeLinecap="round"
          />
          {/* Mid nodes — 4 evenly spaced */}
          {Array.from({ length: 4 }).map((_, i) => {
            const angle = (i * 90 + 45) * (Math.PI / 180)
            const cx = 110 + Math.cos(angle) * 72
            const cy = 110 + Math.sin(angle) * 72
            return (
              <circle
                key={`mid-${i}`}
                cx={cx}
                cy={cy}
                r="1.5"
                fill="#C9A84C"
                style={{
                  transformOrigin: `${cx}px ${cy}px`,
                  animation: `loader-node 1.8s ease-in-out ${i * 0.45}s infinite`,
                }}
              />
            )
          })}
        </g>

        {/* Inner ring — thin, fast CW rotation */}
        <g style={{ transformOrigin: '110px 110px', animation: 'loader-ring-inner 4s linear infinite' }}>
          <circle
            cx="110"
            cy="110"
            r="44"
            stroke="rgba(201,168,76,0.04)"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="110"
            cy="110"
            r="44"
            stroke="rgba(201,168,76,0.15)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="4 24"
            strokeLinecap="round"
          />
          {/* Inner nodes — 3 */}
          {Array.from({ length: 3 }).map((_, i) => {
            const angle = (i * 120) * (Math.PI / 180)
            const cx = 110 + Math.cos(angle) * 44
            const cy = 110 + Math.sin(angle) * 44
            return (
              <circle
                key={`inner-${i}`}
                cx={cx}
                cy={cy}
                r="1.5"
                fill="#C9A84C"
                style={{
                  transformOrigin: `${cx}px ${cy}px`,
                  animation: `loader-node 1.5s ease-in-out ${i * 0.5}s infinite`,
                }}
              />
            )
          })}
        </g>

        {/* Connecting lines that trace between rings — decorative network edges */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i * 90 + 20) * (Math.PI / 180)
          const x1 = 110 + Math.cos(angle) * 46
          const y1 = 110 + Math.sin(angle) * 46
          const x2 = 110 + Math.cos(angle) * 70
          const y2 = 110 + Math.sin(angle) * 70
          return (
            <line
              key={`line-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(201,168,76,0.15)"
              strokeWidth="0.5"
              strokeDasharray="100"
              style={{ animation: `loader-line-trace 2.5s ease-in-out ${i * 0.6}s infinite` }}
            />
          )
        })}

        <defs>
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0" />
            <stop offset="40%" stopColor="#C9A84C" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#E8D08A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center monogram */}
      <div
        className="relative flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))',
          border: '1px solid rgba(201,168,76,0.15)',
          animation: 'loader-monogram 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
          boxShadow: '0 0 40px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        <span
          className="text-lg font-extrabold tracking-tight text-accent"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          IP
        </span>
      </div>

      {/* Status text */}
      <div
        className="absolute"
        style={{
          top: '50%',
          marginTop: 90,
          animation: 'loader-text-reveal 0.8s ease-out 0.8s both',
        }}
      >
        <span
          className="text-[0.6875rem] font-medium uppercase text-text-muted"
          style={{
            fontFamily: 'var(--font-body)',
            letterSpacing: '0.12em',
          }}
        >
          {message}
          <span className="inline-block w-4 text-left">{dots}</span>
        </span>
      </div>
    </div>
  )
}

/**
 * Inline loading spinner — smaller variant for use within components.
 * Renders the same aesthetic as LoadingScreen but compact.
 */
export function LoadingSpinner({ size = 32 }: { size?: number }) {
  const r = size * 0.4
  const strokeW = size > 24 ? 1.5 : 1

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className="inline-block"
    >
      <g style={{ transformOrigin: `${size / 2}px ${size / 2}px`, animation: 'loader-ring-outer 3s linear infinite' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(201,168,76,0.1)"
          strokeWidth={strokeW}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#C9A84C"
          strokeWidth={strokeW}
          fill="none"
          strokeDasharray={`${r * 1.2} ${r * 5}`}
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}
