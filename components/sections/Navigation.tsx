"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { getContent } from "@/lib/constants";
import SharpButton from "@/components/ui/GlowButton";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const router = useRouter();
  const { locale, toggleLocale } = useLang();
  const NAV = getContent(locale).NAV;

  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const detect = useCallback(() => {
    setScrolled(window.scrollY > 50);

    const navEl = document.getElementById("main-nav");
    if (!navEl) return;
    const rect = navEl.getBoundingClientRect();
    const probeY = rect.bottom - 2;
    const probeX = rect.left + rect.width / 2;

    navEl.style.pointerEvents = "none";
    navEl.style.visibility = "hidden";
    const el = document.elementFromPoint(probeX, probeY);
    navEl.style.pointerEvents = "";
    navEl.style.visibility = "";

    if (!el) return;
    const light = el.closest(".section-light");
    setOnLight(!!light);
  }, []);

  useEffect(() => {
    detect();
    window.addEventListener("scroll", detect, { passive: true });
    window.addEventListener("resize", detect, { passive: true });
    return () => {
      window.removeEventListener("scroll", detect);
      window.removeEventListener("resize", detect);
    };
  }, [detect]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const textMuted = onLight ? "text-black/60" : "text-white/70";
  const hoverText = onLight ? "hover:text-black" : "hover:text-white";
  const hoverBg = onLight ? "hover:bg-black/[0.05]" : "hover:bg-white/[0.07]";
  const mobileBtnText = onLight
    ? "text-black/70 hover:text-black"
    : "text-white/80 hover:text-white";

  const ariaClose = locale === "vi" ? "Đóng menu" : "Close menu";
  const ariaOpen = locale === "vi" ? "Mở menu" : "Open menu";

  return (
    <>
      <motion.nav
        id="main-nav"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-4 left-4 right-4 z-50 mx-auto max-w-5xl",
          "transition-all duration-500 ease-out",
          "liquid-glass",
          scrolled && "liquid-glass-dense top-3 max-w-4xl",
          onLight && "liquid-glass-on-light"
        )}
      >
        <div
          className={cn(
            "relative z-10 flex items-center justify-between transition-all duration-500",
            scrolled ? "px-5 py-2.5" : "px-6 py-3.5"
          )}
        >
          {/* Logo */}
          <a
            href="#"
            className="relative flex items-center shrink-0"
          >
            <Image
              src="/images/whitetextnobg.png"
              alt="IP Foundation"
              width={120}
              height={40}
              priority
              className={cn(
                "h-8 w-auto object-contain transition-opacity duration-400",
                onLight ? "opacity-0" : "opacity-100"
              )}
            />
            <Image
              src="/images/blacktextnobg.png"
              alt="IP Foundation"
              width={120}
              height={40}
              priority
              className={cn(
                "absolute inset-0 h-8 w-auto object-contain transition-opacity duration-400",
                onLight ? "opacity-100" : "opacity-0"
              )}
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3.5 py-1.5 text-xs font-medium uppercase tracking-widest",
                  "transition-all duration-300",
                  textMuted,
                  hoverText,
                  hoverBg
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: lang toggle + CTA */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLocale}
              aria-label={locale === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-heading font-medium uppercase tracking-wider transition-all duration-300",
                textMuted,
                hoverText,
                hoverBg
              )}
            >
              <Globe size={14} />
              <span>{locale === "vi" ? "EN" : "VI"}</span>
            </button>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <SharpButton
                variant="primary"
                className="!py-2 !px-4 !text-xs"
                onClick={() => router.push("/app")}
              >
                {NAV.cta}
              </SharpButton>
            </div>

            {/* Mobile hamburger */}
            <button
              className={cn(
                "md:hidden p-2 transition-colors",
                mobileBtnText,
                hoverBg
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? ariaClose : ariaOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-black/70 backdrop-blur-3xl flex flex-col justify-center px-8"
            >
              {NAV.links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.08 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-white text-3xl font-heading font-black py-4 border-b border-white/10 hover:text-white/70 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Language toggle in mobile */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                onClick={() => {
                  toggleLocale();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 text-white/60 hover:text-white text-lg font-heading font-medium py-4 border-b border-white/10 transition-colors"
              >
                <Globe size={18} />
                {locale === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
              </motion.button>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <SharpButton
                  variant="primary"
                  onClick={() => {
                    setMobileOpen(false);
                    router.push("/app");
                  }}
                >
                  {NAV.cta}
                </SharpButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
