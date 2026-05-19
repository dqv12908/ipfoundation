"use client";

import { useRef, useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { getContent } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import IPadDemo from "@/components/ui/IPadDemo";
import { FadeInUp } from "@/components/ui/MotionWrappers";
import { cn } from "@/lib/utils";

export default function SolutionSection() {
  const { locale } = useLang();
  const SOLUTION = getContent(locale).SOLUTION;
  const [activeIndex, setActiveIndex] = useState(0);
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    pillarRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        {
          // Collapse the viewport to a narrow horizontal band in the upper-middle.
          // Any pillar crossing this band becomes "active" — reliable scroll-spy.
          rootMargin: "-30% 0px -60% 0px",
          threshold: 0,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [locale]);

  return (
    <section id="giai-phap" className="relative bg-black py-20 md:py-28">
      {/* Top edge light bleed from white section above */}
      <div className="absolute inset-0 bg-glow-top pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={SOLUTION.sectionTitle}
          subtitle={SOLUTION.sectionSubtitle}
          align="left"
        />

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Left: scrollable pillars */}
          <div className="lg:col-span-6 relative">
            {/* Vertical progress connector */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/[0.06] hidden lg:block" />

            <div className="space-y-16 lg:space-y-32">
              {SOLUTION.pillars.map((pillar, i) => {
                const isActive = activeIndex === i;

                return (
                  <div
                    key={pillar.title}
                    ref={(el) => {
                      pillarRefs.current[i] = el;
                    }}
                  >
                    <FadeInUp delay={i * 0.05}>
                      <div className="flex gap-5">
                        {/* Step indicator */}
                        <div className="flex-shrink-0 hidden lg:flex flex-col items-center">
                          <div
                            className={cn(
                              "w-10 h-10 border flex items-center justify-center font-heading font-black text-sm relative z-10 transition-colors duration-400",
                              isActive
                                ? "bg-accent-blue border-accent-blue"
                                : "bg-transparent border-white/15"
                            )}
                          >
                            <span
                              className={cn(
                                "transition-colors duration-400",
                                isActive ? "text-white" : "text-white/30"
                              )}
                            >
                              0{i + 1}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div
                          className={cn(
                            "transition-opacity duration-500",
                            isActive ? "opacity-100" : "lg:opacity-40"
                          )}
                        >
                          {/* Mobile number */}
                          <span className="lg:hidden font-heading text-4xl font-black text-outline leading-none block mb-3">
                            0{i + 1}
                          </span>

                          <p className="text-accent-blue text-xs font-heading font-medium uppercase tracking-widest mb-2">
                            {pillar.subtitle}
                          </p>
                          <h3 className="font-heading text-2xl md:text-3xl font-black text-white mb-3">
                            {pillar.title}
                          </h3>
                          <p className="text-text-secondary leading-relaxed mb-4 max-w-lg">
                            {pillar.description}
                          </p>
                          <ul className="space-y-2">
                            {pillar.features.map((f) => (
                              <li
                                key={f}
                                className="flex items-center gap-2.5 text-white text-sm"
                              >
                                <span className="w-1.5 h-1.5 bg-accent-blue flex-shrink-0" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </FadeInUp>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: sticky 3D iPad demo (desktop only) */}
          <div className="hidden lg:flex lg:col-span-6 items-start justify-center">
            <div className="sticky top-28">
              <IPadDemo activeScreen={activeIndex} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
