"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FlaskConical, Building, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getContent } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

export default function BenefitsSection() {
  const { locale } = useLang();
  const BENEFITS = getContent(locale).BENEFITS;
  const groups = [
    { key: "scientists" as const, icon: FlaskConical, ...BENEFITS.scientists },
    { key: "enterprises" as const, icon: Building, ...BENEFITS.enterprises },
  ];
  const [activeGroup, setActiveGroup] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section
      id="loi-ich"
      ref={sectionRef}
      className="relative bg-black py-20 md:py-28 overflow-hidden"
    >
      {/* Subtle moving grid background */}
      <motion.div
        style={{ x: bgX }}
        className="absolute inset-0 bg-grid opacity-30 scale-110"
      />

      {/* Centered ambient blue glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[600px] bg-glow-blue" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={BENEFITS.sectionTitle}
          subtitle={BENEFITS.sectionSubtitle}
        />

        {/* Toggle tabs */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex border border-white/10">
            {groups.map((group, i) => {
              const Icon = group.icon;
              return (
                <button
                  key={group.key}
                  onClick={() => setActiveGroup(i)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 text-sm font-heading font-medium transition-all duration-300",
                    activeGroup === i
                      ? "bg-accent-blue text-white"
                      : "text-white/40 hover:text-white/70"
                  )}
                >
                  <Icon size={16} />
                  {group.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Benefit cards — animated grid */}
        <div className="grid md:grid-cols-3 gap-px bg-white/[0.06]">
          {groups[activeGroup].items.map((item, i) => (
            <motion.div
              key={`${activeGroup}-${item.title}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="group bg-black p-8 md:p-10 relative"
            >
              {/* Large faded index */}
              <span className="absolute top-4 right-5 font-heading text-6xl font-black text-white/[0.03] leading-none select-none">
                0{i + 1}
              </span>

              {/* Blue top accent line that grows on hover */}
              <div className="h-px w-8 bg-accent-blue mb-6 group-hover:w-16 transition-all duration-500" />

              <h4 className="font-heading text-lg font-black text-white mb-2">
                {item.title}
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {item.description}
              </p>

              <span className="inline-flex items-center gap-1.5 text-accent-blue text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {BENEFITS.learnMore} <ArrowRight size={12} />
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 border-t border-white/[0.06] pt-8 flex flex-wrap justify-center gap-10 md:gap-16"
        >
          {BENEFITS.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-2xl md:text-3xl font-black text-accent-blue">
                {stat.value}
              </div>
              <div className="text-text-secondary text-xs uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
