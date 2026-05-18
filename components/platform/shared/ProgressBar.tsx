'use client'

import { useEffect, useRef, useState } from 'react'

export function ProgressBar({ percent, label }: { percent: number; label?: string }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setWidth(Math.min(percent, 100)), 80)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [percent])

  const isOversubscribed = percent > 100

  return (
    <div ref={ref}>
      {label && (
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-text-secondary">{label}</span>
          <span className={`font-semibold tabular-nums ${isOversubscribed ? 'text-caution' : 'text-text-primary'}`}>
            {percent.toFixed(1)}%
            {isOversubscribed && ' (oversubscribed)'}
          </span>
        </div>
      )}
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            background: isOversubscribed
              ? 'linear-gradient(90deg, #C9A84C, #F5A623)'
              : 'linear-gradient(90deg, #C9A84C, #D4B35C)',
          }}
        />
      </div>
    </div>
  )
}
