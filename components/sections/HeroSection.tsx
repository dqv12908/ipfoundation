"use client";

import { useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { getContent } from "@/lib/constants";
import SharpButton from "@/components/ui/GlowButton";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { FadeInUp, TextReveal } from "@/components/ui/MotionWrappers";

export default function HeroSection() {
  const router = useRouter();
  const { locale } = useLang();
  const HERO = getContent(locale).HERO;
  const thesis =
    locale === "vi"
      ? {
          label: "Luồng vốn cho IP khoa học",
          items: ["Thẩm định", "Escrow", "Token hóa", "Quyết toán"],
          caption: "Một hành trình minh bạch từ hồ sơ IP đến vốn thử nghiệm.",
        }
      : {
          label: "Capital rail for scientific IP",
          items: ["Verify", "Escrow", "Tokenize", "Settle"],
          caption: "One transparent path from IP dossier to prototype capital.",
        };

  return (
    <section
      id="gioi-thieu"
      className="relative min-h-screen overflow-hidden bg-black pt-28 sm:pt-32 pb-10"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-accent-blue/[0.08] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <FadeInUp>
            <p className="font-heading text-xs font-medium uppercase tracking-[0.28em] text-accent-blue">
              {HERO.tagline}
            </p>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <div className="flex flex-wrap gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/45">
              {thesis.items.map((item) => (
                <span key={item} className="border border-white/10 px-3 py-1.5">
                  {item}
                </span>
              ))}
            </div>
          </FadeInUp>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8 min-w-0">
            <TextReveal>
              <h1 className="font-heading text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[6.25rem] xl:text-[7.4rem] font-black text-white leading-[0.92] tracking-tighter py-[0.1em]">
                {HERO.heroLines.map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {line.outline ? (
                      <span className="text-outline">{line.text}</span>
                    ) : (
                      line.text
                    )}
                  </span>
                ))}
              </h1>
            </TextReveal>
          </div>

          <div className="lg:col-span-4 space-y-6 pb-4 lg:border-l lg:border-white/10 lg:pl-8">
            <FadeInUp delay={0.4}>
              <p className="font-heading text-lg text-white font-medium leading-snug">
                {HERO.subheading}
              </p>
            </FadeInUp>

            <FadeInUp delay={0.5}>
              <p className="text-text-secondary text-sm leading-relaxed">
                {HERO.description}
              </p>
            </FadeInUp>

            <FadeInUp delay={0.6}>
              <div className="flex flex-wrap gap-3 pt-2">
                <SharpButton
                  variant="primary"
                  onClick={() => router.push("/launchpad")}
                >
                  {HERO.ctaPrimary}
                </SharpButton>
                <SharpButton
                  variant="outline"
                  onClick={() => router.push("/launchpad")}
                >
                  {HERO.ctaSecondary}
                </SharpButton>
              </div>
            </FadeInUp>
          </div>
        </div>

        <FadeInUp delay={0.7}>
          <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-3">
            {HERO.stats.map((stat, i) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden bg-black px-6 py-5"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-accent-blue/0 transition-colors duration-300 group-hover:bg-accent-blue" />
                <p className="mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/35">
                  0{i + 1}
                </p>
                <AnimatedCounter value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
        </FadeInUp>

        <FadeInUp delay={0.8}>
          <div className="mt-5 flex flex-col gap-3 border border-white/10 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-heading text-sm font-bold text-white">
                {thesis.label}
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                {thesis.caption}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {thesis.items.map((item, i) => (
                <div key={item} className="flex items-center gap-1">
                  <span className="h-2 w-2 bg-accent-blue" />
                  {i < thesis.items.length - 1 && (
                    <span className="h-px w-8 bg-white/15" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
