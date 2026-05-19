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

  return (
    <section
      id="gioi-thieu"
      className="relative min-h-screen flex items-center pt-28 sm:pt-32 pb-8 bg-black"
    >
      {/* Background grid — confined so it can't clip section content */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-50" />
      </div>

      {/* Ambient blue glow behind heading */}
      <div className="absolute top-1/3 left-1/4 w-[800px] h-[600px] bg-glow-blue pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          {/* Left: massive typography */}
          <div className="lg:col-span-8 min-w-0">
            <TextReveal>
              <h1 className="font-heading text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[6.5rem] xl:text-[8rem] font-black text-white leading-[0.95] tracking-tighter py-[0.1em]">
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

          {/* Right: description column */}
          <div className="lg:col-span-4 space-y-6 pb-4">
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

        {/* Stats bar */}
        <FadeInUp delay={0.7}>
          <div className="mt-16 border-t border-b border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            {HERO.stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6">
                <AnimatedCounter value={stat.value} label={stat.label} />
                {i < HERO.stats.length - 1 && (
                  <div className="hidden sm:block w-px h-10 bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
