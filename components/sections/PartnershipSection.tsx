"use client";

import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getContent } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import { FadeInUp } from "@/components/ui/MotionWrappers";

export default function PartnershipSection() {
  const { locale } = useLang();
  const PARTNERSHIP = getContent(locale).PARTNERSHIP;

  return (
    <section id="hop-tac" className="relative py-20 md:py-28 bg-black">
      {/* Top edge light bleed from white section above */}
      <div className="absolute inset-0 bg-glow-top pointer-events-none" />
      {/* Centered ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] bg-glow-blue" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={PARTNERSHIP.sectionTitle}
          subtitle={PARTNERSHIP.sectionSubtitle}
        />

        <div className="space-y-0">
          {PARTNERSHIP.models.map((model, i) => (
            <FadeInUp key={model.title} delay={i * 0.15}>
              <div className="border-t border-white/10 py-10 md:py-14 grid md:grid-cols-12 gap-6 md:gap-8 items-start group">
                {/* Number */}
                <div className="md:col-span-2">
                  <span className="font-heading text-6xl md:text-8xl font-black text-outline group-hover:text-accent-blue transition-colors duration-500 leading-none">
                    0{i + 1}
                  </span>
                </div>

                {/* Title + description */}
                <div className="md:col-span-4">
                  <h3 className="font-heading text-2xl font-black text-white mb-1">
                    {model.title}
                  </h3>
                  <p className="text-accent-blue text-sm mb-3">{model.subtitle}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {model.description}
                  </p>
                </div>

                {/* Steps as horizontal flow */}
                <div className="md:col-span-6 flex flex-wrap items-center gap-3">
                  {model.steps.map((step, j) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="text-white text-sm border border-white/10 px-4 py-2 group-hover:border-accent-blue/30 transition-colors">
                        {step}
                      </span>
                      {j < model.steps.length - 1 && (
                        <ArrowRight size={16} className="text-text-secondary" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeInUp>
          ))}
          {/* Final border */}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}
