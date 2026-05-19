"use client";

import { useState } from "react";
import { Users, Building2, Briefcase } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getContent } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import { FadeInUp } from "@/components/ui/MotionWrappers";
import { cn } from "@/lib/utils";

const tabIcons = [Users, Building2, Briefcase];

export default function StakeholdersSection() {
  const { locale } = useLang();
  const STAKEHOLDERS = getContent(locale).STAKEHOLDERS;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="doi-tac" className="relative py-20 md:py-28 bg-black">
      {/* Centered ambient glow behind tab content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[600px] bg-glow-blue" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={STAKEHOLDERS.sectionTitle}
          subtitle={STAKEHOLDERS.sectionSubtitle}
        />

        <FadeInUp>
          {/* Tabs — underline style */}
          <div className="flex flex-wrap justify-center gap-0 mb-10 border-b border-white/10">
            {STAKEHOLDERS.tabs.map((tab, i) => {
              const Icon = tabIcons[i];
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(i)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-4 font-heading font-medium text-sm transition-all duration-300 border-b-2 -mb-px",
                    activeTab === i
                      ? "border-accent-blue text-accent-blue"
                      : "border-transparent text-text-secondary hover:text-white"
                  )}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div key={activeTab} className="max-w-2xl mx-auto tab-panel-enter">
            <h3 className="font-heading text-2xl font-black text-white mb-2">
              {STAKEHOLDERS.tabs[activeTab].title}
            </h3>
            <p className="text-text-secondary mb-6">
              {STAKEHOLDERS.tabs[activeTab].description}
            </p>
            <ul className="space-y-0">
              {STAKEHOLDERS.tabs[activeTab].items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-white py-3 border-b border-white/5 last:border-b-0"
                >
                  <span className="w-2 h-2 bg-accent-blue flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
