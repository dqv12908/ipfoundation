'use client'

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Subtle gradient orbs */}
      <div
        className="absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          top: '-15%',
          right: '-8%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 65%)',
          animation: 'drift-1 25s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          bottom: '-8%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.025) 0%, transparent 65%)',
          animation: 'drift-2 30s ease-in-out infinite',
        }}
      />
      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  )
}
