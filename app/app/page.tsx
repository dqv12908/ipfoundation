"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, CheckCircle, Globe } from "lucide-react";
import { useLang } from "@/lib/i18n";

const content = {
  vi: {
    home: "Trang chủ",
    badge: "Đang phát triển",
    headingLines: ["SẮP", "RA MẮT"],
    description:
      "Nền tảng giao dịch & token hóa tài sản trí tuệ đang được xây dựng. Đăng ký để nhận thông báo khi ra mắt.",
    success: "Cảm ơn! Chúng tôi sẽ thông báo khi ra mắt.",
    placeholder: "Email của bạn",
    cta: "Nhận thông báo",
    features: [
      { label: "Token hóa IP", desc: "RWA Tokenization" },
      { label: "Marketplace", desc: "Giao dịch IP" },
      { label: "Thẩm định AI", desc: "AI Verification" },
      { label: "Smart Contract", desc: "Hợp đồng thông minh" },
    ],
  },
  en: {
    home: "Home",
    badge: "In Development",
    headingLines: ["COMING", "SOON"],
    description:
      "The intellectual property trading & tokenization platform is under development. Sign up to be notified at launch.",
    success: "Thank you! We'll notify you when we launch.",
    placeholder: "Your email",
    cta: "Get Notified",
    features: [
      { label: "IP Tokenization", desc: "RWA Tokenization" },
      { label: "Marketplace", desc: "IP Trading" },
      { label: "AI Verification", desc: "AI-Powered Review" },
      { label: "Smart Contract", desc: "Digital Agreements" },
    ],
  },
};

export default function ComingSoonPage() {
  const { locale, toggleLocale } = useLang();
  const t = content[locale];
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-glow-blue-strong pointer-events-none" />
      <div className="absolute inset-0 bg-glow-top pointer-events-none" />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          {t.home}
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-heading font-medium uppercase tracking-wider transition-colors"
          >
            <Globe size={14} />
            {locale === "vi" ? "EN" : "VI"}
          </button>
          <span className="font-heading font-black text-lg text-white tracking-tight flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center w-8 h-8 text-sm font-black bg-white/10">
              IP
            </span>
            <span className="hidden sm:inline">FOUNDATION</span>
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-accent-blue/30 bg-accent-blue/5 px-4 py-2 mb-10"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 bg-accent-blue"
            />
            <span className="text-accent-blue text-xs font-heading font-medium uppercase tracking-widest">
              {t.badge}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-[3rem] sm:text-[5rem] md:text-[7rem] font-black text-white leading-[0.95] tracking-tighter mb-6 py-[0.1em]"
          >
            {t.headingLines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-white/50 text-lg sm:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
          >
            {t.description}
          </motion.p>

          {/* Email signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            {submitted ? (
              <div className="inline-flex items-center gap-3 border border-green-500/30 bg-green-500/5 px-6 py-4">
                <CheckCircle size={20} className="text-green-400" />
                <span className="text-green-400 text-sm font-medium">
                  {t.success}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder={t.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-accent-blue transition-colors text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-accent-blue text-white px-6 py-3 font-heading font-medium text-sm hover:bg-white hover:text-accent-blue transition-all duration-300 active:scale-95"
                >
                  <Bell size={14} />
                  {t.cta}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </main>

      {/* Feature preview strip */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 border-t border-white/[0.06] py-8 px-6"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {t.features.map((feature) => (
            <div key={feature.label}>
              <div className="text-white text-sm font-heading font-bold mb-1">
                {feature.label}
              </div>
              <div className="text-white/25 text-xs">{feature.desc}</div>
            </div>
          ))}
        </div>
      </motion.footer>
    </div>
  );
}
