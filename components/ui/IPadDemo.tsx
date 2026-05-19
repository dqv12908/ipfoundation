"use client";

import { type CSSProperties, useCallback, useState } from "react";
import { cn, useReducedMotion } from "@/lib/utils";

const screens = [
  {
    label: "Marketplace",
    title: "IP Marketplace",
    eyebrow: "Live opportunities",
    metric: "$2.4M",
    metricLabel: "Target raise",
    progress: 78,
    action: "Browse IP",
    rows: [
      { name: "AI Drug Discovery", tag: "BioTech", value: "$2.4M", pct: 78 },
      { name: "Solar Cell v3", tag: "Energy", value: "$1.8M", pct: 63 },
      { name: "Nano Filter System", tag: "EnvTech", value: "$950K", pct: 42 },
    ],
    bars: [42, 58, 50, 68, 61, 76, 72, 84, 78, 88],
  },
  {
    label: "Verification",
    title: "IP Verification",
    eyebrow: "Legal review",
    metric: "67%",
    metricLabel: "Checklist complete",
    progress: 67,
    action: "Continue Review",
    rows: [
      { name: "Ownership verified", tag: "Complete", value: "Done", pct: 100 },
      { name: "Dispute check", tag: "Complete", value: "Done", pct: 100 },
      { name: "Legal standardization", tag: "In review", value: "4h", pct: 38 },
    ],
    bars: [30, 46, 44, 55, 62, 60, 68, 72, 70, 76],
  },
  {
    label: "Tokenize",
    title: "Tokenization",
    eyebrow: "RWA issuance",
    metric: "1,800",
    metricLabel: "IP tokens",
    progress: 84,
    action: "Issue Tokens",
    rows: [
      { name: "Creator reserve", tag: "40%", value: "720", pct: 40 },
      { name: "Investor pool", tag: "30%", value: "540", pct: 30 },
      { name: "Research fund", tag: "20%", value: "360", pct: 20 },
    ],
    bars: [55, 44, 70, 62, 84, 76, 58, 66, 74, 80],
  },
  {
    label: "Settle",
    title: "Investor Settlement",
    eyebrow: "Escrow outcome",
    metric: "100%",
    metricLabel: "On-chain escrow",
    progress: 100,
    action: "Settle Campaign",
    rows: [
      { name: "Accepted capital", tag: "Committed", value: "$1.8M", pct: 100 },
      { name: "Token allocation", tag: "Ready", value: "1,800", pct: 94 },
      { name: "Refund buffer", tag: "Available", value: "$220K", pct: 28 },
    ],
    bars: [38, 52, 64, 68, 74, 82, 80, 86, 90, 96],
  },
];

export default function IPadDemo({ activeScreen }: { activeScreen: number }) {
  const reduced = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const screen = screens[activeScreen] || screens[0];

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      setTilt({ x: -y, y: x });
    },
    [reduced]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const shellStyle = {
    transform: reduced
      ? "rotateY(-28deg) rotateX(-3deg)"
      : `rotateY(${-35 + tilt.y}deg) rotateX(${-3 + tilt.x}deg)`,
  } as CSSProperties;

  return (
    <div
      className="relative select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1500px" }}
    >
      <div className="ipad-shell" style={shellStyle}>
        <div className="relative w-[260px] h-[360px] lg:w-[300px] lg:h-[420px] xl:w-[340px] xl:h-[470px] bg-[#1a1a1a] border border-white/[0.15] shadow-2xl">
          <div className="h-4 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white/[0.08]" />
          </div>

          <div className="mx-1.5 h-[calc(100%-32px)] bg-[#050508] overflow-hidden">
            <div className="flex items-center justify-between px-2 py-1 text-[7px] text-white/25 border-b border-white/[0.04]">
              <span className="font-mono">9:41</span>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-1 bg-white/20" />
                  <div className="w-0.5 h-1.5 bg-white/20" />
                  <div className="w-0.5 h-2 bg-white/20" />
                  <div className="w-0.5 h-2.5 bg-white/30" />
                </div>
                <div className="w-3.5 h-1.5 border border-white/20">
                  <div className="h-full w-3/4 bg-white/20" />
                </div>
              </div>
            </div>

            <div key={screen.label} className="h-[calc(100%-20px)] p-3 tab-panel-enter">
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-accent-blue text-[8px] uppercase tracking-wider mb-1">
                      {screen.eyebrow}
                    </div>
                    <div className="text-white font-bold text-[12px] leading-tight">
                      {screen.title}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-[12px] font-mono font-bold">
                      {screen.metric}
                    </div>
                    <div className="text-white/30 text-[7px]">
                      {screen.metricLabel}
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.04] border border-white/10 p-2.5 mb-3">
                  <div className="flex items-center justify-between text-[8px] mb-2">
                    <span className="text-white/45">Campaign readiness</span>
                    <span className="text-accent-blue font-mono">{screen.progress}%</span>
                  </div>
                  <div className="h-1 bg-white/[0.06]">
                    <div
                      className="h-full bg-accent-blue transition-[width] duration-500 ease-out"
                      style={{ width: `${screen.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mb-3 h-12 flex items-end gap-px">
                  {screen.bars.map((height, index) => (
                    <div
                      key={`${screen.label}-${index}`}
                      className="flex-1 bg-accent-blue/35 transition-[height] duration-500 ease-out"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>

                <div className="flex-1 space-y-0">
                  {screen.rows.map((row) => (
                    <div
                      key={row.name}
                      className="py-2 border-b border-white/[0.04] last:border-b-0"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div>
                          <div className="text-white/90 text-[9px] font-medium leading-tight">
                            {row.name}
                          </div>
                          <div className="text-accent-blue text-[7px] mt-0.5">
                            {row.tag}
                          </div>
                        </div>
                        <div className="text-white/50 text-[9px] font-mono">
                          {row.value}
                        </div>
                      </div>
                      <div className="h-1 bg-white/[0.04]">
                        <div
                          className="h-full bg-white/35 transition-[width] duration-500 ease-out"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-2 h-6 bg-accent-blue flex items-center justify-center">
                  <span className="text-white text-[8px] font-medium tracking-wider">
                    {screen.action}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-4 flex items-center justify-center">
            <div className="w-8 h-[2px] bg-white/[0.1]" />
          </div>

          <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/[0.15] via-white/[0.08] to-transparent" />
        </div>

        <div
          className="absolute inset-[-80px] blur-3xl -z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(37,99,235,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="mt-12 flex items-center justify-center gap-3">
        {screens.map((item, i) => (
          <div
            key={item.label}
            className={cn(
              "text-[9px] font-mono transition-colors duration-300",
              i === activeScreen ? "text-accent-blue" : "text-white/15"
            )}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
