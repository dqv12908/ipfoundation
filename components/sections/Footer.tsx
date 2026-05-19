"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { locale } = useLang();
  const copy =
    locale === "vi"
      ? {
          line: "Vietnamese ideas, global frontier.",
          launchpad: "Launchpad",
          contact: "Contact",
          copyright: "© 2026 IP Foundation.",
        }
      : {
          line: "Vietnamese ideas, global frontier.",
          launchpad: "Launchpad",
          contact: "Contact",
          copyright: "© 2026 IP Foundation.",
        };

  return (
    <footer className="relative border-t border-white/10 bg-black">
      <div className="absolute inset-0 bg-glow-top pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <a href="#" className="block">
            <Image
              src="/images/whitetextnobg.png"
              alt="IP Foundation"
              width={140}
              height={46}
              className="h-9 w-auto object-contain"
            />
          </a>

          <p className="max-w-sm text-sm text-white/45">{copy.line}</p>

          <div className="flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
            <a href="/launchpad" className="transition hover:text-white">
              {copy.launchpad}
            </a>
            <a href="mailto:contact@ip-foundation.com" className="transition hover:text-white">
              {copy.contact}
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs text-white/35">{copy.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
