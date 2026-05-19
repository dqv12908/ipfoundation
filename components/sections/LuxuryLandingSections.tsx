"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { FadeInUp } from "@/components/ui/MotionWrappers";

const images = {
  lab: "https://images.unsplash.com/photo-1748281296151-b3209b37e1cb?auto=format&fit=crop&w=1600&q=88",
  electronics:
    "https://images.unsplash.com/photo-1705579609060-e10eda421073?auto=format&fit=crop&w=1300&q=86",
  robotics:
    "https://images.unsplash.com/photo-1647427060118-4911c9821b82?auto=format&fit=crop&w=1300&q=86",
  solar:
    "https://images.unsplash.com/photo-1680050977814-39ddd9330a2e?auto=format&fit=crop&w=1400&q=86",
  medtech:
    "https://images.unsplash.com/photo-1766297247287-9bf80d5f8281?auto=format&fit=crop&w=1300&q=86",
  materials:
    "https://images.unsplash.com/photo-1748261347902-451fb437e8fb?auto=format&fit=crop&w=1300&q=86",
  agriculture:
    "https://images.unsplash.com/photo-1769259047014-83149b3c9ca7?auto=format&fit=crop&w=1300&q=86",
  drone:
    "https://images.unsplash.com/photo-1773750923599-2434b82fdcd3?auto=format&fit=crop&w=1300&q=86",
  city: "https://images.unsplash.com/photo-1758533116847-3776b266cbdc?auto=format&fit=crop&w=1700&q=88",
  ai: "https://images.unsplash.com/photo-1665690399857-9de8bbbeb108?auto=format&fit=crop&w=1300&q=86",
};

const content = {
  vi: {
    heroKicker: "IP Foundation",
    heroTitle: "Ý tưởng Việt, vốn toàn cầu.",
    heroBody:
      "Một launchpad cho sáng chế khoa học, kỹ thuật và IP có khả năng thương mại hóa.",
    primary: "Mở Launchpad",
    secondary: "Liên hệ",
    statOne: "Scientific IP",
    statTwo: "Prototype capital",
    statThree: "Vietnam first",
    missionKicker: "Sứ mệnh",
    missionTitle:
      "Tăng tốc tiến bộ khoa học và kỹ thuật của Việt Nam.",
    missionBody:
      "Biến nghiên cứu, sáng chế và năng lực kỹ thuật thành tài sản có thể được tài trợ, kiểm chứng và mở rộng.",
    galleryKicker: "Từ phòng lab đến thị trường",
    galleryTitle: "Ít bước hơn. Rõ hơn. Đẹp hơn.",
    tiles: [
      ["01", "Verify", "Hồ sơ IP rõ ràng."],
      ["02", "Fund", "Vốn thử nghiệm minh bạch."],
      ["03", "Scale", "Ra thị trường toàn cầu."],
    ],
    ctaTitle: "Launchpad đang live.",
    ctaBody: "Khám phá các chiến dịch IP đầu tiên.",
  },
  en: {
    heroKicker: "IP Foundation",
    heroTitle: "Vietnamese ideas, global capital.",
    heroBody:
      "A launchpad for scientific, engineering, and commercially ready IP.",
    primary: "Open Launchpad",
    secondary: "Contact",
    statOne: "Scientific IP",
    statTwo: "Prototype capital",
    statThree: "Vietnam first",
    missionKicker: "Mission",
    missionTitle: "Accelerate Vietnam's scientific and engineering frontier.",
    missionBody:
      "Turn research, inventions, and technical capability into assets that can be funded, verified, and scaled.",
    galleryKicker: "From lab to market",
    galleryTitle: "Fewer steps. More clarity. Better capital.",
    tiles: [
      ["01", "Verify", "Clear IP dossiers."],
      ["02", "Fund", "Transparent prototype capital."],
      ["03", "Scale", "Global market readiness."],
    ],
    ctaTitle: "The launchpad is live.",
    ctaBody: "Explore the first IP-backed campaigns.",
  },
};

const rail = [
  ["Deeptech", images.lab],
  ["Electronics", images.electronics],
  ["AI", images.ai],
  ["Robotics", images.robotics],
  ["Energy", images.solar],
  ["Medtech", images.medtech],
  ["Materials", images.materials],
  ["Agri science", images.agriculture],
  ["Aerospace", images.drone],
  ["Vietnam IP", images.city],
];

function Photo({
  src,
  label,
  className = "",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      aria-label={label}
      role="img"
      className={`relative overflow-hidden bg-zinc-900 ${className}`}
    >
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-700 hover:scale-110"
        style={{ backgroundImage: `url(${src})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
    </div>
  );
}

function ActionButton({
  children,
  onClick,
  variant = "solid",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "solid" | "ghost";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        variant === "solid"
          ? "inline-flex items-center gap-3 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent-blue hover:text-white"
          : "inline-flex items-center gap-3 border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white hover:text-white"
      }
    >
      {children}
      <ArrowUpRight size={16} />
    </button>
  );
}

export function LuxuryHeroSection() {
  const router = useRouter();
  const { locale } = useLang();
  const copy = content[locale];

  return (
    <section
      id="gioi-thieu"
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0">
        <Photo
          src={images.city}
          label="Ho Chi Minh City skyline"
          className="h-full w-full opacity-80"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9),rgba(0,0,0,0.42),rgba(0,0,0,0.1))]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-5 pb-10 pt-32 sm:px-8 md:pb-16">
        <FadeInUp>
          <p className="mb-8 font-heading text-xs font-semibold uppercase tracking-[0.42em] text-white/55">
            {copy.heroKicker}
          </p>
        </FadeInUp>
        <FadeInUp delay={0.08}>
          <h1 className="max-w-5xl font-heading text-6xl font-black leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-[8.75rem]">
            {copy.heroTitle}
          </h1>
        </FadeInUp>
        <FadeInUp delay={0.16}>
          <div className="mt-8 flex max-w-4xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-lg leading-8 text-white/72 md:text-xl">
              {copy.heroBody}
            </p>
            <div className="flex flex-wrap gap-3">
              <ActionButton onClick={() => router.push("/launchpad")}>
                {copy.primary}
              </ActionButton>
              <ActionButton
                variant="ghost"
                onClick={() => {
                  document.getElementById("lien-he")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {copy.secondary}
              </ActionButton>
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.24}>
          <div className="mt-16 grid max-w-3xl gap-px bg-white/10 sm:grid-cols-3">
            {[copy.statOne, copy.statTwo, copy.statThree].map((item) => (
              <div key={item} className="bg-black/55 px-5 py-4 backdrop-blur-xl">
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

export function LuxuryMissionSection() {
  const { locale } = useLang();
  const copy = content[locale];
  const doubledRail = [...rail, ...rail];

  return (
    <section id="giai-phap" className="section-light relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <FadeInUp>
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.36em] text-black/35">
                {copy.missionKicker}
              </p>
              <h2 className="mt-8 max-w-2xl font-heading text-5xl font-black leading-[0.96] tracking-tight text-black md:text-7xl">
                {copy.missionTitle}
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-8 text-black/58">
                {copy.missionBody}
              </p>
            </FadeInUp>
          </div>

          <FadeInUp delay={0.12} className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <Photo src={images.lab} label="Scientific laboratory" className="h-[34rem]" />
              <div className="grid gap-4">
                <Photo src={images.electronics} label="Electronics research" className="h-64" />
                <div className="relative h-64 overflow-hidden bg-black text-white">
                  <div className="mission-image-rail grid gap-3 p-3">
                    {doubledRail.map(([label, src], index) => (
                      <Photo
                        key={`${label}-${index}`}
                        src={src}
                        label={label}
                        className="h-36"
                      />
                    ))}
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}

export function LuxuryGallerySection() {
  const { locale } = useLang();
  const copy = content[locale];
  const tileImages = [images.robotics, images.solar, images.drone];

  return (
    <section id="doi-tac" className="relative overflow-hidden bg-black py-28 text-white md:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeInUp>
          <div className="mb-16 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.36em] text-white/35">
                {copy.galleryKicker}
              </p>
              <h2 className="mt-7 max-w-3xl font-heading text-5xl font-black leading-[0.98] tracking-tight md:text-7xl">
                {copy.galleryTitle}
              </h2>
            </div>
          </div>
        </FadeInUp>

        <div className="grid gap-5 lg:grid-cols-3">
          {copy.tiles.map(([number, title, body], index) => (
            <FadeInUp key={title} delay={index * 0.08}>
              <div className="group relative h-[34rem] overflow-hidden">
                <Photo
                  src={tileImages[index]}
                  label={title}
                  className="absolute inset-0 h-full w-full"
                />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
                    {number}
                  </p>
                  <h3 className="font-heading text-4xl font-black">{title}</h3>
                  <p className="mt-3 text-base text-white/68">{body}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LuxuryLaunchpadSection() {
  const router = useRouter();
  const { locale } = useLang();
  const copy = content[locale];

  return (
    <section
      id="lien-he"
      className="section-light relative overflow-hidden bg-[#f5f3ed] py-28 md:py-40"
    >
      <div id="lo-trinh" className="absolute -top-24" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center">
        <FadeInUp className="lg:col-span-5">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.36em] text-black/35">
            IP Launchpad
          </p>
          <h2 className="mt-7 max-w-xl font-heading text-5xl font-black leading-[0.96] tracking-tight text-black md:text-7xl">
            {copy.ctaTitle}
          </h2>
          <p className="mt-7 max-w-md text-lg leading-8 text-black/58">
            {copy.ctaBody}
          </p>
          <button
            type="button"
            onClick={() => router.push("/launchpad")}
            className="mt-10 inline-flex items-center gap-3 bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-accent-blue"
          >
            {copy.primary}
            <ArrowUpRight size={16} />
          </button>
        </FadeInUp>

        <FadeInUp delay={0.1} className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-5">
            <Photo src={images.materials} label="Materials science" className="h-[32rem] sm:col-span-2" />
            <Photo src={images.agriculture} label="Agricultural science" className="h-[32rem] sm:col-span-3" />
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
