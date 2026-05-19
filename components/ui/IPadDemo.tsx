"use client";

import { type CSSProperties, useCallback, useState } from "react";
import { cn, useReducedMotion } from "@/lib/utils";

type Campaign = {
  name: string;
  symbol: string;
  status: "LIVE" | "APPROVED" | "SUCCESS" | "REVIEW";
  min: string;
  max: string;
  committed: string;
  progress: number;
  commitments: number;
};

const campaigns: Campaign[] = [
  {
    name: "Nano Battery IP",
    symbol: "NANO",
    status: "LIVE",
    min: "18 ETH",
    max: "45 ETH",
    committed: "31.2 ETH",
    progress: 69,
    commitments: 128,
  },
  {
    name: "AI Drug Discovery",
    symbol: "AIDD",
    status: "APPROVED",
    min: "22 ETH",
    max: "60 ETH",
    committed: "0 ETH",
    progress: 0,
    commitments: 0,
  },
];

const screens = [
  {
    label: "Explore",
    nav: "Khám phá",
    title: "IP Launchpad",
    eyebrow: "Tokenized IP fundraising",
    metric: "2",
    metricLabel: "Campaigns",
  },
  {
    label: "Review",
    nav: "Doanh nghiệp",
    title: "Hồ sơ chiến dịch",
    eyebrow: "Company submission",
    metric: "67%",
    metricLabel: "Profile complete",
  },
  {
    label: "Fund",
    nav: "Chiến dịch",
    title: "Nano Battery IP",
    eyebrow: "Live campaign",
    metric: "31.2",
    metricLabel: "ETH committed",
  },
  {
    label: "Settle",
    nav: "Danh mục",
    title: "Investor claims",
    eyebrow: "Portfolio",
    metric: "Ready",
    metricLabel: "Token claim",
  },
];

function StatusPill({ status }: { status: Campaign["status"] }) {
  const styles = {
    LIVE: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    APPROVED: "border-blue-400/20 bg-blue-400/10 text-blue-300",
    SUCCESS: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    REVIEW: "border-amber-300/20 bg-amber-300/10 text-amber-200",
  };

  const label = {
    LIVE: "Đang gọi vốn",
    APPROVED: "Sắp mở",
    SUCCESS: "Thành công",
    REVIEW: "Đang duyệt",
  };

  return (
    <span
      className={cn(
        "border px-1.5 py-0.5 text-[6px] font-semibold uppercase tracking-[0.12em]",
        styles[status]
      )}
    >
      {label[status]}
    </span>
  );
}

function Progress({ value }: { value: number }) {
  return (
    <div className="h-1 overflow-hidden bg-white/[0.06]">
      <div
        className="h-full bg-accent-blue transition-[width] duration-500 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function MiniCampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <div className="border border-white/[0.08] bg-white/[0.035] p-2.5">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[10px] font-bold leading-tight text-white">
            {campaign.name}
          </p>
          <p className="mt-0.5 text-[7px] font-semibold text-accent-blue">
            ${campaign.symbol}
          </p>
        </div>
        <StatusPill status={campaign.status} />
      </div>

      <div className="mb-2 grid grid-cols-2 gap-1.5">
        <div className="bg-white/[0.035] px-2 py-1.5">
          <p className="text-[6px] text-white/35">Tối thiểu</p>
          <p className="mt-0.5 text-[8px] font-semibold text-white">
            {campaign.min}
          </p>
        </div>
        <div className="bg-white/[0.035] px-2 py-1.5">
          <p className="text-[6px] text-white/35">Tối đa</p>
          <p className="mt-0.5 text-[8px] font-semibold text-white">
            {campaign.max}
          </p>
        </div>
      </div>

      <Progress value={campaign.progress} />

      <div className="mt-2 flex items-center justify-between text-[7px] text-white/42">
        <span>Đã góp {campaign.committed}</span>
        <span>{campaign.commitments} wallets</span>
      </div>
    </div>
  );
}

function ScreenHeader({ screen }: { screen: (typeof screens)[number] }) {
  const nav = ["Khám phá", "Bảng tin", "Danh mục", "Doanh nghiệp"];

  return (
    <>
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-black/45 px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="grid h-5 w-5 place-items-center bg-accent-blue text-[8px] font-black text-white">
            IP
          </div>
          <div>
            <p className="text-[8px] font-bold leading-none text-white">
              Launchpad
            </p>
            <p className="mt-0.5 text-[5px] uppercase tracking-[0.16em] text-white/32">
              Sepolia
            </p>
          </div>
        </div>
        <div className="bg-accent-blue px-2 py-1 text-[6px] font-semibold text-white">
          Kết nối ví
        </div>
      </div>

      <div className="flex gap-1 border-b border-white/[0.045] px-3 py-2">
        {nav.map((item) => (
          <span
            key={item}
            className={cn(
              "px-2 py-1 text-[6px] font-medium",
              item === screen.nav
                ? "bg-white/[0.07] text-white"
                : "text-white/36"
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </>
  );
}

function ExploreScreen() {
  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-2 gap-2">
        <MiniCampaignCard campaign={campaigns[0]} />
        <MiniCampaignCard campaign={campaigns[1]} />
      </div>

      <div className="grid grid-cols-3 gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08]">
        {[
          ["Tổng chiến dịch", "2"],
          ["Đang gọi vốn", "1"],
          ["Danh mục", "4"],
        ].map(([label, value]) => (
          <div key={label} className="bg-[#08090d] p-2">
            <p className="text-[6px] text-white/34">{label}</p>
            <p className="mt-1 text-[13px] font-bold text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewScreen() {
  return (
    <div className="space-y-2.5">
      <div className="border border-white/[0.08] bg-white/[0.035] p-3">
        <p className="mb-2 text-[7px] font-semibold uppercase tracking-[0.14em] text-white/38">
          New campaign
        </p>
        {[
          ["IP name", "Nano Battery IP"],
          ["Company", "Viet Deeptech Lab"],
          ["Raise range", "18 - 45 ETH"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between border-t border-white/[0.05] py-2 text-[8px]"
          >
            <span className="text-white/38">{label}</span>
            <span className="font-medium text-white">{value}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-1.5">
        {[
          ["Ownership", 100],
          ["Technical dossier", 72],
          ["Market brief", 48],
        ].map(([label, value]) => (
          <div key={label} className="bg-white/[0.025] p-2">
            <div className="mb-1 flex justify-between text-[7px]">
              <span className="text-white/45">{label}</span>
              <span className="text-accent-blue">{value}%</span>
            </div>
            <Progress value={Number(value)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FundScreen() {
  return (
    <div className="space-y-2.5">
      <MiniCampaignCard campaign={campaigns[0]} />
      <div className="border border-accent-blue/20 bg-accent-blue/[0.06] p-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[8px] font-semibold text-white">Commit capital</p>
          <p className="text-[7px] text-white/45">ETH</p>
        </div>
        <div className="mb-2 border border-white/[0.08] bg-black/35 px-2 py-2 text-[13px] font-bold text-white">
          2.50
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-center text-[7px] text-white/56">
          <span className="bg-white/[0.05] py-1">0.5</span>
          <span className="bg-white/[0.05] py-1">1.0</span>
          <span className="bg-white/[0.05] py-1">Max</span>
        </div>
        <div className="mt-2 bg-accent-blue py-2 text-center text-[8px] font-semibold text-white">
          Góp vốn
        </div>
      </div>
    </div>
  );
}

function SettleScreen() {
  return (
    <div className="space-y-2.5">
      <div className="border border-emerald-400/15 bg-emerald-400/[0.055] p-3">
        <p className="text-[7px] font-semibold uppercase tracking-[0.14em] text-emerald-200">
          Claim ready
        </p>
        <p className="mt-2 text-2xl font-black text-white">1,248 IPT</p>
        <p className="mt-1 text-[8px] text-white/45">
          Nano Battery IP allocation
        </p>
      </div>

      {[
        ["Committed", "2.50 ETH"],
        ["Accepted", "2.18 ETH"],
        ["Refund", "0.32 ETH"],
      ].map(([label, value]) => (
        <div
          key={label}
          className="flex justify-between border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[8px]"
        >
          <span className="text-white/42">{label}</span>
          <span className="font-semibold text-white">{value}</span>
        </div>
      ))}
    </div>
  );
}

function ScreenBody({ activeScreen }: { activeScreen: number }) {
  if (activeScreen === 1) return <ReviewScreen />;
  if (activeScreen === 2) return <FundScreen />;
  if (activeScreen === 3) return <SettleScreen />;
  return <ExploreScreen />;
}

export default function IPadDemo({ activeScreen }: { activeScreen: number }) {
  const reduced = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const screen = screens[activeScreen] || screens[0];

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      setTilt({ x: -y, y: x });
    },
    [reduced]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const shellStyle = {
    transform: reduced
      ? "rotateY(-18deg) rotateX(3deg)"
      : `rotateY(${-18 + tilt.y}deg) rotateX(${3 + tilt.x}deg)`,
  } as CSSProperties;

  return (
    <div
      className="relative select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1800px" }}
    >
      <div className="ipad-shell relative" style={shellStyle}>
        <div className="absolute -right-1 top-20 h-16 w-1 rounded-r bg-zinc-700/80" />
        <div className="absolute -left-1 top-28 h-11 w-1 rounded-l bg-zinc-700/80" />

        <div className="relative h-[430px] w-[310px] rounded-[34px] border border-white/[0.18] bg-[linear-gradient(145deg,#2e3038,#0d0e13_42%,#262832)] p-2.5 shadow-[0_42px_120px_rgba(0,0,0,0.58),inset_0_1px_1px_rgba(255,255,255,0.24)] lg:h-[500px] lg:w-[360px] xl:h-[550px] xl:w-[395px]">
          <div className="absolute inset-[5px] rounded-[29px] border border-black/60" />
          <div className="relative h-full overflow-hidden rounded-[26px] border border-black bg-[#05060a] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(115deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.06)_16%,transparent_34%,transparent_68%,rgba(255,255,255,0.05)_100%)]" />
            <div className="absolute left-1/2 top-2 z-30 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.12),inset_0_0_3px_rgba(37,99,235,0.8)]" />

            <div className="flex h-full flex-col bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.12),transparent_34%),#05060a]">
              <div className="flex items-center justify-between px-4 pb-1.5 pt-3 text-[7px] text-white/35">
                <span className="font-mono">9:41</span>
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    <span className="h-1 w-0.5 bg-white/25" />
                    <span className="h-1.5 w-0.5 bg-white/25" />
                    <span className="h-2 w-0.5 bg-white/25" />
                    <span className="h-2.5 w-0.5 bg-white/40" />
                  </div>
                  <div className="h-1.5 w-3.5 border border-white/25">
                    <div className="h-full w-3/4 bg-white/35" />
                  </div>
                </div>
              </div>

              <ScreenHeader screen={screen} />

              <div key={screen.label} className="flex-1 overflow-hidden p-3 tab-panel-enter">
                <div className="mb-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-accent-blue">
                      {screen.eyebrow}
                    </p>
                    <h4 className="mt-1 text-[14px] font-black leading-tight text-white">
                      {screen.title}
                    </h4>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[14px] font-bold text-white">
                      {screen.metric}
                    </p>
                    <p className="text-[6px] text-white/35">{screen.metricLabel}</p>
                  </div>
                </div>

                <ScreenBody activeScreen={activeScreen} />
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-[-90px] -z-10 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(37,99,235,0.18) 0%, transparent 68%)",
          }}
        />
      </div>

      <div className="mt-10 flex items-center justify-center gap-3">
        {screens.map((item, i) => (
          <div
            key={item.label}
            className={cn(
              "font-mono text-[9px] transition-colors duration-300",
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
