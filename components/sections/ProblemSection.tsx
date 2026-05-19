"use client";

import { useLang } from "@/lib/i18n";
import { getContent } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import IconBox from "@/components/ui/IconBox";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/MotionWrappers";

export default function ProblemSection() {
  const { locale } = useLang();
  const PROBLEM = getContent(locale).PROBLEM;
  const context =
    locale === "vi"
      ? {
          overline: "Nút thắt thương mại hóa",
          headline: "Vấn đề không nằm ở thiếu ý tưởng, mà ở thiếu cơ chế biến IP thành vốn thử nghiệm.",
          metrics: [
            { value: "01", label: "Khoảng trống sau nghiên cứu" },
            { value: "02", label: "Thiếu dữ liệu định giá" },
            { value: "03", label: "Không có thanh khoản sớm" },
          ],
        }
      : {
          overline: "Commercialization bottleneck",
          headline: "The issue is not a shortage of ideas, but the missing rail that turns IP into prototype capital.",
          metrics: [
            { value: "01", label: "Post-research gap" },
            { value: "02", label: "Limited valuation data" },
            { value: "03", label: "No early liquidity" },
          ],
        };

  return (
    <section id="van-de" className="section-light relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-black/10" />
      <div className="absolute right-0 top-0 hidden h-full w-1/3 bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.05))] lg:block" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={PROBLEM.sectionTitle}
          subtitle={PROBLEM.sectionSubtitle}
          light
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          <FadeInUp className="lg:col-span-4">
            <div className="h-full border border-black/10 bg-black p-7 text-white md:p-8">
              <p className="font-heading text-xs font-medium uppercase tracking-[0.22em] text-accent-blue">
                {context.overline}
              </p>
              <h3 className="mt-5 font-heading text-2xl font-black leading-tight md:text-3xl">
                {context.headline}
              </h3>
              <div className="mt-8 space-y-4">
                {context.metrics.map((metric) => (
                  <div
                    key={metric.value}
                    className="flex items-center justify-between border-t border-white/10 pt-4"
                  >
                    <span className="font-heading text-2xl font-black text-accent-blue">
                      {metric.value}
                    </span>
                    <span className="max-w-[12rem] text-right text-xs font-medium uppercase tracking-[0.14em] text-white/50">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid gap-px bg-black/10 md:grid-cols-3 lg:col-span-8">
            {PROBLEM.cards.map((card, i) => (
              <StaggerItem key={i}>
                <div className="group h-full bg-white p-7 transition-colors duration-300 hover:bg-black">
                  <div className="mb-8 flex items-center justify-between">
                    <IconBox
                      icon={card.icon}
                      size="sm"
                      className="border-black/10 bg-black/[0.03] text-black transition-colors duration-300 group-hover:border-white/[0.12] group-hover:bg-white/[0.08] group-hover:text-white"
                    />
                    <span className="font-heading text-5xl font-black leading-none text-black/[0.05] transition-colors duration-300 group-hover:text-white/[0.06]">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg md:text-xl font-bold text-black mb-3 transition-colors duration-300 group-hover:text-white">
                    {card.title}
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed transition-colors duration-300 group-hover:text-white/60">
                    {card.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
