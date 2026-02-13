"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { getContent, type Content } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import { FadeInUp } from "@/components/ui/MotionWrappers";
import { cn } from "@/lib/utils";

function DesktopTimeline({ phases }: { phases: Content["ROADMAP"]["phases"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="hidden md:block">
      <div className="relative mb-20">
        <div className="h-px w-full bg-white/10" />
        <motion.div
          style={{ scaleX, transformOrigin: "left" }}
          className="absolute inset-0 h-px bg-accent-blue"
        />
        <div className="absolute inset-0 flex justify-between">
          {phases.map((phase) => (
            <div key={phase.phase} className="relative -top-2">
              <div
                className={cn(
                  "w-4 h-4",
                  phase.status === "active" ? "bg-accent-blue" : "bg-white/20"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {phases.map((phase, i) => (
          <FadeInUp key={phase.phase} delay={i * 0.15}>
            <div>
              <span className="text-accent-blue text-xs font-heading font-medium uppercase tracking-widest">
                {phase.phase}
              </span>
              <h3 className="font-heading text-xl font-black text-white mb-4 mt-1">
                {phase.title}
              </h3>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-text-secondary text-sm">
                    <span className="w-1.5 h-1.5 bg-white/30 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>
        ))}
      </div>
    </div>
  );
}

function MobileTimeline({ phases }: { phases: Content["ROADMAP"]["phases"] }) {
  return (
    <div className="md:hidden relative pl-8">
      <div className="absolute left-2 top-0 bottom-0 w-px bg-white/10" />
      <div className="space-y-12">
        {phases.map((phase) => (
          <FadeInUp key={phase.phase}>
            <div className="relative">
              <div
                className={cn(
                  "absolute -left-[22px] top-1 w-3 h-3",
                  phase.status === "active" ? "bg-accent-blue" : "bg-white/20"
                )}
              />
              <span className="text-accent-blue text-xs font-heading font-medium uppercase tracking-widest">
                {phase.phase}
              </span>
              <h3 className="font-heading text-xl font-black text-white mb-3 mt-1">
                {phase.title}
              </h3>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-text-secondary text-sm">
                    <span className="w-1.5 h-1.5 bg-white/30 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>
        ))}
      </div>
    </div>
  );
}

export default function RoadmapSection() {
  const { locale } = useLang();
  const ROADMAP = getContent(locale).ROADMAP;

  return (
    <section id="lo-trinh" className="section-light relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={ROADMAP.sectionTitle}
          subtitle={ROADMAP.sectionSubtitle}
          light
        />

        <div className="[&_.text-white]:text-black [&_.text-text-secondary]:text-zinc-600 [&_.bg-white\\/10]:bg-black/10 [&_.bg-white\\/20]:bg-black/20 [&_.bg-white\\/30]:bg-black/30">
          <DesktopTimeline phases={ROADMAP.phases} />
          <MobileTimeline phases={ROADMAP.phases} />
        </div>
      </div>
    </section>
  );
}
