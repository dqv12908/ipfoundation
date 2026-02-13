"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/lib/utils";

/* ─── Mock screen: Marketplace ─── */
function MarketplaceScreen() {
  const listings = [
    { name: "AI Drug Discovery", cat: "BioTech", val: "2.4M" },
    { name: "Solar Cell v3", cat: "Energy", val: "1.8M" },
    { name: "Nano Filter System", cat: "EnvTech", val: "950K" },
    { name: "mRNA Platform", cat: "Pharma", val: "5.2M" },
  ];

  return (
    <div className="p-3 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-white font-bold text-[11px]">IP Marketplace</span>
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-accent-blue" />
          <div className="w-1 h-1 bg-accent-blue/50" />
          <div className="w-1 h-1 bg-accent-blue/25" />
        </div>
      </div>

      {/* Search */}
      <div className="h-6 bg-white/[0.04] border border-white/10 mb-2 px-2 flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 border border-white/30" />
        <span className="text-white/25 text-[9px]">Tìm kiếm tài sản IP...</span>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-3 mb-3 text-[8px]">
        <span className="text-accent-blue border-b border-accent-blue pb-0.5 font-medium">Tất cả</span>
        <span className="text-white/30 hover:text-white/50">BioTech</span>
        <span className="text-white/30 hover:text-white/50">Energy</span>
        <span className="text-white/30 hover:text-white/50">AI</span>
      </div>

      {/* Listings */}
      <div className="flex-1 space-y-0">
        {listings.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.4 }}
            className="flex items-center justify-between py-2 border-b border-white/[0.04]"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center">
                <div className="w-2 h-2 bg-accent-blue/40" />
              </div>
              <div>
                <div className="text-white/90 text-[9px] font-medium leading-tight">{item.name}</div>
                <div className="text-accent-blue text-[7px] mt-0.5">{item.cat}</div>
              </div>
            </div>
            <span className="text-white/50 text-[9px] font-mono">${item.val}</span>
          </motion.div>
        ))}
      </div>

      {/* Bottom action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-2 h-6 bg-accent-blue flex items-center justify-center"
      >
        <span className="text-white text-[8px] font-medium tracking-wider">BROWSE ALL →</span>
      </motion.div>
    </div>
  );
}

/* ─── Mock screen: Verification ─── */
function VerificationScreen() {
  const steps = [
    { label: "Xác minh quyền sở hữu", done: true },
    { label: "Kiểm tra tranh chấp", done: true },
    { label: "Chuẩn hóa pháp lý", done: false },
  ];

  return (
    <div className="p-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-bold text-[11px]">IP Verification</span>
        <span className="text-accent-blue text-[8px] font-mono">67%</span>
      </div>

      {/* Asset being verified */}
      <div className="bg-white/[0.04] border border-white/10 p-2.5 mb-3">
        <div className="text-[8px] text-white/40 uppercase tracking-wider mb-1">Đang thẩm định</div>
        <div className="text-white text-[10px] font-medium">AI Drug Discovery Protocol</div>
        <div className="text-accent-blue text-[8px] mt-0.5">BioTech • Submitted 2h ago</div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/[0.06] mb-4">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0.67 }}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          className="h-full bg-accent-blue origin-left"
        />
      </div>

      {/* Verification steps */}
      <div className="flex-1 space-y-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.2 }}
            className="flex items-start gap-2.5"
          >
            <div className="mt-0.5 flex-shrink-0">
              {step.done ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.25, type: "spring" }}
                  className="w-4 h-4 bg-accent-blue flex items-center justify-center"
                >
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" />
                  </svg>
                </motion.div>
              ) : (
                <div className="w-4 h-4 border border-accent-blue/40 flex items-center justify-center">
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-1.5 h-1.5 bg-accent-blue/60"
                  />
                </div>
              )}
            </div>
            <div>
              <div className={`text-[9px] font-medium ${step.done ? "text-white/80" : "text-accent-blue"}`}>
                {step.label}
              </div>
              <div className="text-[7px] text-white/30 mt-0.5">
                {step.done ? "Hoàn thành" : "Đang xử lý..."}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Status */}
      <div className="border-t border-white/[0.06] pt-2 flex items-center justify-between">
        <span className="text-[8px] text-white/30">Estimated: 4h remaining</span>
        <div className="flex items-center gap-1">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-1.5 bg-accent-blue"
          />
          <span className="text-[8px] text-accent-blue font-medium">LIVE</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Mock screen: Tokenization ─── */
function TokenScreen() {
  const distribution = [
    { label: "Creator", pct: 40, color: "bg-accent-blue" },
    { label: "Investors", pct: 30, color: "bg-white/60" },
    { label: "R&D Fund", pct: 20, color: "bg-white/30" },
    { label: "Platform", pct: 10, color: "bg-white/15" },
  ];

  return (
    <div className="p-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-bold text-[11px]">Token hóa IP</span>
        <span className="text-[8px] text-white/30 font-mono">RWA</span>
      </div>

      {/* Asset */}
      <div className="bg-white/[0.04] border border-white/10 p-2.5 mb-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white text-[10px] font-medium">Solar Cell v3</div>
            <div className="text-accent-blue text-[8px] mt-0.5">Energy • Patent #VN-2024</div>
          </div>
          <div className="text-right">
            <div className="text-white/80 text-[10px] font-mono font-medium">$1.8M</div>
            <div className="text-[7px] text-white/30">Total value</div>
          </div>
        </div>
      </div>

      {/* Token split visual */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center py-3 mb-3 border border-white/[0.06]"
      >
        <div className="text-[8px] text-white/30 uppercase tracking-wider mb-1.5">Token Split</div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-white/60 text-[10px] font-mono">1 IP</span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="inline-block w-8 h-px bg-accent-blue origin-left"
          />
          <span className="text-accent-blue text-[12px] font-mono font-bold">1,800</span>
          <span className="text-white/40 text-[9px]">tokens</span>
        </div>
        <div className="text-[7px] text-white/25 mt-1">@ $1,000 per token</div>
      </motion.div>

      {/* Distribution bars */}
      <div className="flex-1 space-y-2">
        <div className="text-[8px] text-white/40 uppercase tracking-wider mb-1">Phân bổ</div>
        {distribution.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.15 }}
          >
            <div className="flex items-center justify-between text-[8px] mb-0.5">
              <span className="text-white/60">{d.label}</span>
              <span className="text-white/40 font-mono">{d.pct}%</span>
            </div>
            <div className="h-1.5 bg-white/[0.04]">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.8, ease: "easeOut" }}
                className={`h-full ${d.color} origin-left`}
                style={{ width: `${d.pct}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-2 h-6 bg-accent-blue flex items-center justify-center"
      >
        <span className="text-white text-[8px] font-medium tracking-wider">PHÁT HÀNH TOKEN</span>
      </motion.div>
    </div>
  );
}

/* ─── Mock screen: Trading ─── */
function TradingScreen() {
  const orders = [
    { type: "buy", price: "1,247", qty: "12" },
    { type: "buy", price: "1,245", qty: "8" },
    { type: "buy", price: "1,240", qty: "25" },
    { type: "sell", price: "1,250", qty: "15" },
    { type: "sell", price: "1,255", qty: "6" },
    { type: "sell", price: "1,260", qty: "20" },
  ];

  return (
    <div className="p-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-bold text-[11px]">Giao dịch</span>
        <div className="flex items-center gap-1">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-1 bg-green-400"
          />
          <span className="text-[7px] text-white/30">LIVE</span>
        </div>
      </div>

      {/* Ticker */}
      <div className="bg-white/[0.04] border border-white/10 p-2.5 mb-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[8px] text-white/40 mb-0.5">IP-SOL / USDT</div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white text-[16px] font-mono font-bold leading-none"
            >
              $1,247
            </motion.div>
          </div>
          <div className="text-right">
            <div className="text-green-400 text-[10px] font-mono font-medium">+3.2%</div>
            <div className="text-[7px] text-white/30">24h change</div>
          </div>
        </div>
        {/* Mini sparkline */}
        <div className="mt-2 h-6 flex items-end gap-px">
          {[30, 45, 35, 50, 42, 55, 48, 60, 52, 65, 58, 70, 62, 68, 75].map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.2 + i * 0.04, duration: 0.3 }}
              className="flex-1 bg-accent-blue/40 origin-bottom"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* Order book */}
      <div className="flex-1">
        <div className="text-[8px] text-white/40 uppercase tracking-wider mb-1.5">Order Book</div>
        <div className="grid grid-cols-2 gap-x-2 text-[8px]">
          <div className="text-accent-blue/60 font-medium mb-1">BUY</div>
          <div className="text-red-400/60 font-medium mb-1 text-right">SELL</div>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`buy-${i}`}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex justify-between py-0.5 border-b border-white/[0.03]"
            >
              <span className="text-white/50 font-mono">${orders[i].price}</span>
              <span className="text-accent-blue/60 font-mono">{orders[i].qty}</span>
            </motion.div>
          ))}
          {[3, 4, 5].map((i) => (
            <motion.div
              key={`sell-${i}`}
              initial={{ opacity: 0, x: 4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (i - 3) * 0.1 }}
              className="flex justify-between py-0.5 border-b border-white/[0.03]"
              style={{ gridColumn: 2, gridRow: i - 3 + 2 }}
            >
              <span className="text-white/50 font-mono">${orders[i].price}</span>
              <span className="text-red-400/50 font-mono">{orders[i].qty}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-2 grid grid-cols-2 gap-1.5"
      >
        <div className="h-6 bg-accent-blue flex items-center justify-center">
          <span className="text-white text-[8px] font-medium">MUA</span>
        </div>
        <div className="h-6 border border-white/20 flex items-center justify-center">
          <span className="text-white/60 text-[8px] font-medium">BÁN</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── iPad Demo Component ─── */
const screens = [MarketplaceScreen, VerificationScreen, TokenScreen, TradingScreen];
const screenLabels = ["Marketplace", "Thẩm định", "Token hóa", "Giao dịch"];

export default function IPadDemo({ activeScreen }: { activeScreen: number }) {
  const reduced = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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

  const ActiveScreen = screens[activeScreen] || screens[0];

  return (
    <div
      className="relative select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1500px" }}
    >
      <motion.div
        animate={{
          rotateY: -35 + tilt.y,
          rotateX: -3 + tilt.x,
        }}
        transition={
          reduced
            ? { duration: 0 }
            : { type: "spring", stiffness: 120, damping: 20 }
        }
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* iPad frame */}
        <div className="relative w-[260px] h-[360px] lg:w-[300px] lg:h-[420px] xl:w-[340px] xl:h-[470px] bg-[#1a1a1a] border border-white/[0.15] shadow-2xl">
          {/* Top bezel — camera */}
          <div className="h-4 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white/[0.08]" />
          </div>

          {/* Screen */}
          <div className="mx-1.5 h-[calc(100%-32px)] bg-[#050508] overflow-hidden">
            {/* Status bar */}
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

            {/* Active screen content */}
            <div className="h-[calc(100%-20px)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="h-full"
                >
                  <ActiveScreen />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom bezel — home indicator */}
          <div className="h-4 flex items-center justify-center">
            <div className="w-8 h-[2px] bg-white/[0.1]" />
          </div>

          {/* Edge highlight — left side catches light due to rotation */}
          <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/[0.15] via-white/[0.08] to-transparent" />
        </div>

        {/* Large blue radial glow behind iPad */}
        <div
          className="absolute inset-[-80px] blur-3xl -z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(37,99,235,0.15) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Screen label indicator */}
      <div className="mt-12 flex items-center justify-center gap-3">
        {screenLabels.map((label, i) => (
          <div
            key={label}
            className={`text-[9px] font-mono transition-all duration-300 ${
              i === activeScreen ? "text-accent-blue" : "text-white/15"
            }`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
