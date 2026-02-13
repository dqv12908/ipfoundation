"use client";

import { Shield, Scale, Landmark } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getContent } from "@/lib/constants";
import { WipeIn } from "@/components/ui/MotionWrappers";

const icons = [Shield, Scale, Landmark];

export default function LegalBanner() {
  const { locale } = useLang();
  const LEGAL = getContent(locale).LEGAL;

  return (
    <section className="relative">
      <WipeIn>
        <div className="bg-accent-blue py-8 md:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
              {LEGAL.items.map((item, i) => {
                const Icon = icons[i];
                return (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-center md:text-left"
                  >
                    {i > 0 && (
                      <div className="hidden md:block w-px h-8 bg-white/30 mr-6" />
                    )}
                    <Icon size={20} className="text-white flex-shrink-0" />
                    <span className="text-white text-sm md:text-base font-medium">
                      {item}
                    </span>
                    {i < LEGAL.items.length - 1 && (
                      <div className="hidden md:block ml-6" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </WipeIn>
    </section>
  );
}
