"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";
import SharpButton from "@/components/ui/GlowButton";
import { FadeInUp, TextReveal } from "@/components/ui/MotionWrappers";

const copy = {
  vi: {
    eyebrow: "IP Foundation",
    title: "Ý tưởng Việt. Vốn toàn cầu.",
    body: "Launchpad cho sáng chế, nghiên cứu và tài sản trí tuệ có khả năng thương mại hóa.",
    primary: "Mở Launchpad",
    secondary: "Đưa IP lên nền tảng",
  },
  en: {
    eyebrow: "IP Foundation",
    title: "Vietnamese ideas. Global capital.",
    body: "A launchpad for inventions, research, and commercially ready intellectual property.",
    primary: "Open Launchpad",
    secondary: "Submit IP",
  },
};

export default function HeroSection() {
  const router = useRouter();
  const { locale } = useLang();
  const hero = copy[locale];

  return (
    <section
      id="gioi-thieu"
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[28%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.74)_0%,rgba(0,0,0,0.28)_38%,rgba(0,0,0,0.68)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_34%,rgba(37,99,235,0.18),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/55 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 pb-16 pt-32 sm:px-8 lg:justify-end">
        <div className="w-full max-w-3xl lg:ml-auto">
          <FadeInUp>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.42em] text-white/55">
              {hero.eyebrow}
            </p>
          </FadeInUp>

          <div className="mt-8">
            <TextReveal>
              <h1 className="font-heading text-5xl font-black leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
                {hero.title}
              </h1>
            </TextReveal>
          </div>

          <FadeInUp delay={0.18}>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/72 md:text-xl">
              {hero.body}
            </p>
          </FadeInUp>

          <FadeInUp delay={0.26}>
            <div className="mt-10 flex flex-wrap gap-3">
              <SharpButton
                variant="primary"
                onClick={() => router.push("/launchpad")}
              >
                {hero.primary}
              </SharpButton>
              <SharpButton
                variant="outline"
                onClick={() => router.push("/launchpad/company")}
              >
                {hero.secondary}
              </SharpButton>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
