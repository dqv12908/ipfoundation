"use client";

import { useLang } from "@/lib/i18n";
import { getContent } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import IconBox from "@/components/ui/IconBox";
import { StaggerContainer, StaggerItem } from "@/components/ui/MotionWrappers";

export default function ProblemSection() {
  const { locale } = useLang();
  const PROBLEM = getContent(locale).PROBLEM;

  return (
    <section id="van-de" className="section-light relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={PROBLEM.sectionTitle}
          subtitle={PROBLEM.sectionSubtitle}
          light
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROBLEM.cards.map((card, i) => (
            <StaggerItem key={i}>
              <div className="bg-black p-8">
                <IconBox
                  icon={card.icon}
                  size="sm"
                  className="bg-white/[0.08] border-white/[0.12] text-white mb-5"
                />
                <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
