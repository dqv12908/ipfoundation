"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { getContent } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import IPadDemo from "@/components/ui/IPadDemo";
import { FadeInUp } from "@/components/ui/MotionWrappers";
import { cn } from "@/lib/utils";

export default function SolutionSection() {
  const { locale } = useLang();
  const SOLUTION = getContent(locale).SOLUTION;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pinMode, setPinMode] = useState<"before" | "active" | "after">(
    "before"
  );

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (rect.top > 0) {
        setPinMode("before");
      } else if (rect.bottom <= window.innerHeight) {
        setPinMode("after");
      } else {
        setPinMode("active");
      }

      if (scrollable <= 0) {
        setActiveIndex(0);
        return;
      }

      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const next = Math.min(
        SOLUTION.pillars.length - 1,
        Math.floor(progress * SOLUTION.pillars.length)
      );
      setActiveIndex(next);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [SOLUTION.pillars.length, locale]);

  const scrollToPillar = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section) return;

      const top = section.getBoundingClientRect().top + window.scrollY;
      const scrollable = section.offsetHeight - window.innerHeight;
      const denominator = Math.max(1, SOLUTION.pillars.length - 1);
      window.scrollTo({
        top: top + scrollable * (index / denominator),
        behavior: "smooth",
      });
    },
    [SOLUTION.pillars.length]
  );

  const activePillar = SOLUTION.pillars[activeIndex] || SOLUTION.pillars[0];

  return (
    <section
      ref={sectionRef}
      id="giai-phap"
      className="relative overflow-visible bg-black py-20 md:py-28 lg:h-[420vh] lg:py-0"
    >
      <div className="absolute inset-0 bg-glow-top pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:hidden lg:px-8">
        <SectionTitle
          title={SOLUTION.sectionTitle}
          subtitle={SOLUTION.sectionSubtitle}
          align="left"
        />

        <div className="space-y-12">
          {SOLUTION.pillars.map((pillar, i) => (
            <FadeInUp key={pillar.title} delay={i * 0.05}>
              <div className="border border-white/10 bg-white/[0.03] p-6">
                <span className="mb-4 block font-heading text-4xl font-black text-outline leading-none">
                  0{i + 1}
                </span>
                <p className="mb-2 font-heading text-xs font-medium uppercase tracking-widest text-accent-blue">
                  {pillar.subtitle}
                </p>
                <h3 className="mb-3 font-heading text-2xl font-black text-white">
                  {pillar.title}
                </h3>
                <p className="mb-4 leading-relaxed text-text-secondary">
                  {pillar.description}
                </p>
                <ul className="space-y-2">
                  {pillar.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-white">
                      <span className="h-1.5 w-1.5 flex-shrink-0 bg-accent-blue" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "relative hidden lg:flex lg:min-h-screen lg:items-center lg:overflow-hidden",
          pinMode === "before" &&
            "lg:absolute lg:left-0 lg:right-0 lg:top-0",
          pinMode === "active" &&
            "lg:fixed lg:inset-x-0 lg:top-0 lg:z-20",
          pinMode === "after" &&
            "lg:absolute lg:bottom-0 lg:left-0 lg:right-0"
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-8">
          <SectionTitle
            title={SOLUTION.sectionTitle}
            subtitle={SOLUTION.sectionSubtitle}
            align="left"
            className="mb-10"
          />

          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="mb-8 flex gap-3">
                {SOLUTION.pillars.map((pillar, i) => {
                  const isActive = activeIndex === i;

                  return (
                    <button
                      key={pillar.title}
                      type="button"
                      onClick={() => scrollToPillar(i)}
                      className={cn(
                        "h-1 flex-1 transition-colors duration-300",
                        isActive ? "bg-accent-blue" : "bg-white/12 hover:bg-white/30"
                      )}
                      aria-label={pillar.title}
                    />
                  );
                })}
              </div>

              <div key={activePillar.title} className="tab-panel-enter">
                <p className="mb-6 font-heading text-sm font-semibold uppercase tracking-[0.28em] text-white/35">
                  0{activeIndex + 1} / 04
                </p>
                <p className="mb-3 font-heading text-xs font-medium uppercase tracking-widest text-accent-blue">
                  {activePillar.subtitle}
                </p>
                <h3 className="max-w-xl font-heading text-5xl font-black leading-[0.96] tracking-tight text-white">
                  {activePillar.title}
                </h3>
                <p className="mt-6 max-w-xl text-lg leading-8 text-text-secondary">
                  {activePillar.description}
                </p>
                <ul className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
                  {activePillar.features.map((feature) => (
                    <li
                      key={feature}
                      className="border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/82"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-center lg:col-span-6">
              <IPadDemo activeScreen={activeIndex} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
