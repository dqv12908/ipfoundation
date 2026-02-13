"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/lib/i18n";
import { getContent } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import { SlideFromLeft, SlideFromRight } from "@/components/ui/MotionWrappers";

function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
      <div className="absolute inset-0 bg-white/10" />
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute inset-0 bg-accent-blue"
      />
    </div>
  );
}

export default function TokenWorksSection() {
  const { locale } = useLang();
  const TOKEN_WORKS = getContent(locale).TOKEN_WORKS;

  return (
    <section id="token" className="section-light relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={TOKEN_WORKS.sectionTitle}
          subtitle={TOKEN_WORKS.sectionSubtitle}
          light
        />

        {/* Timeline */}
        <div className="relative">
          {/* Center line — desktop only */}
          <div className="hidden md:block">
            <TimelineLine />
          </div>

          {/* Mobile: left line */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-black/10" />

          <div className="space-y-12 md:space-y-20">
            {TOKEN_WORKS.steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              const Wrapper = isLeft ? SlideFromLeft : SlideFromRight;
              return (
                <div
                  key={step.number}
                  className="relative grid md:grid-cols-2 gap-6 md:gap-12 items-center"
                >
                  {/* Blue square node */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-4 h-4 bg-accent-blue" />
                  </div>

                  {/* Mobile node */}
                  <div className="md:hidden absolute left-4 top-6 -translate-x-1/2 z-10">
                    <div className="w-3 h-3 bg-[#2563EB]" />
                  </div>

                  {isLeft ? (
                    <>
                      <Wrapper delay={0.1} className="md:text-right md:pr-12 pl-10 md:pl-0">
                        <div className="inline-block">
                          <span className="font-heading text-5xl md:text-7xl font-black text-black/5">
                            {step.number}
                          </span>
                        </div>
                        <h3 className="font-heading text-xl md:text-2xl font-black text-black mb-3">
                          {step.title}
                        </h3>
                        <p className="text-zinc-600 leading-relaxed mb-3">
                          {step.description}
                        </p>
                        <span className="inline-block px-3 py-1 border border-[#2563EB]/20 text-[#2563EB] text-sm font-medium">
                          {step.detail}
                        </span>
                      </Wrapper>
                      <div className="hidden md:block" />
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block" />
                      <Wrapper delay={0.1} className="md:pl-12 pl-10">
                        <div className="inline-block">
                          <span className="font-heading text-5xl md:text-7xl font-black text-black/5">
                            {step.number}
                          </span>
                        </div>
                        <h3 className="font-heading text-xl md:text-2xl font-black text-black mb-3">
                          {step.title}
                        </h3>
                        <p className="text-zinc-600 leading-relaxed mb-3">
                          {step.description}
                        </p>
                        <span className="inline-block px-3 py-1 border border-[#2563EB]/20 text-[#2563EB] text-sm font-medium">
                          {step.detail}
                        </span>
                      </Wrapper>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
