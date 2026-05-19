"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { getContent } from "@/lib/constants";

export default function Footer() {
  const { locale } = useLang();
  const FOOTER = getContent(locale).FOOTER;
  return (
    <footer className="relative border-t border-white/10 bg-black">
      {/* Faint top light bleed */}
      <div className="absolute inset-0 bg-glow-top pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top row: logo + links */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Logo */}
          <a href="#" className="block">
            <Image
              src="/images/whitetextnobg.png"
              alt="IP Foundation"
              width={140}
              height={46}
              className="h-9 w-auto object-contain"
            />
          </a>

          {/* Links */}
          <div className="flex flex-wrap gap-6">
            {FOOTER.columns.flatMap((col) =>
              col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-text-secondary uppercase tracking-widest text-xs hover:text-accent-blue transition-colors"
                >
                  {link.label}
                </a>
              ))
            )}
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-xs">{FOOTER.copyright}</p>

          <div className="flex items-center gap-6">
            {FOOTER.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-text-secondary text-xs uppercase tracking-widest hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
