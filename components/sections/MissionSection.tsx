"use client";

import { useLang } from "@/lib/i18n";
import { FadeInUp } from "@/components/ui/MotionWrappers";

const placeholders = [
  { code: "01", title: "Deeptech Lab", tone: "from-blue-600/50 to-white/10" },
  { code: "02", title: "Chip Design", tone: "from-white/20 to-blue-500/30" },
  { code: "03", title: "AI Systems", tone: "from-blue-500/40 to-slate-200/10" },
  { code: "04", title: "Robotics", tone: "from-cyan-300/30 to-blue-700/30" },
  { code: "05", title: "Clean Energy", tone: "from-emerald-300/20 to-blue-500/35" },
  { code: "06", title: "Medtech", tone: "from-white/15 to-sky-500/35" },
  { code: "07", title: "Materials", tone: "from-blue-300/20 to-zinc-100/10" },
  { code: "08", title: "Agri Science", tone: "from-lime-300/20 to-blue-600/30" },
  { code: "09", title: "Aerospace", tone: "from-indigo-400/35 to-white/10" },
  { code: "10", title: "Vietnam IP", tone: "from-red-500/20 to-blue-500/40" },
];

const content = {
  vi: {
    overline: "Sứ mệnh",
    headline:
      "Tăng tốc tiến bộ khoa học và kỹ thuật của Việt Nam bằng cách biến ý tưởng Việt thành tài sản có thể được tài trợ, kiểm chứng và mở rộng.",
    body:
      "IP Foundation tồn tại để mở một đường dẫn vốn minh bạch cho nhà khoa học, kỹ sư, trường đại học và doanh nghiệp công nghệ Việt Nam. Chúng tôi giúp các phát minh không dừng lại ở phòng lab: chúng có thể được chuẩn hóa, gọi vốn sớm, phát triển prototype và bước ra thị trường toàn cầu.",
    proof: [
      "Kết nối IP khoa học với nguồn vốn cộng đồng",
      "Giảm rào cản thương mại hóa cho nhà sáng tạo Việt",
      "Đưa dữ liệu, quyền lợi và dòng tiền lên hạ tầng minh bạch",
    ],
    railLabel: "10 lĩnh vực cần vốn thử nghiệm",
    kicker: "Vietnamese ideas, global frontier",
  },
  en: {
    overline: "Mission",
    headline:
      "Accelerate Vietnam's scientific and engineering advancement by turning Vietnamese ideas into fundable, verifiable, and scalable assets.",
    body:
      "IP Foundation exists to create a transparent capital rail for Vietnamese scientists, engineers, universities, and technology companies. We help inventions move beyond the lab: standardized, funded early, prototyped, and prepared for global markets.",
    proof: [
      "Connect scientific IP with community-backed capital",
      "Lower commercialization barriers for Vietnamese builders",
      "Move data, rights, and capital flows onto transparent rails",
    ],
    railLabel: "10 prototype-capital frontiers",
    kicker: "Vietnamese ideas, global frontier",
  },
};

function PlaceholderCard({
  item,
  duplicate,
}: {
  item: (typeof placeholders)[number];
  duplicate?: boolean;
}) {
  return (
    <div
      aria-hidden={duplicate ? true : undefined}
      aria-label={duplicate ? undefined : item.title}
      role={duplicate ? undefined : "img"}
      className="group relative h-40 overflow-hidden border border-white/10 bg-white/[0.035] p-4 sm:h-44"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${item.tone}`} />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="relative flex h-full flex-col justify-between">
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
          {item.code}
        </span>
        <div>
          <p className="font-heading text-xl font-black text-white">
            {item.title}
          </p>
          <div className="mt-3 h-1 w-12 bg-accent-blue transition-all duration-300 group-hover:w-20" />
        </div>
      </div>
    </div>
  );
}

export default function MissionSection() {
  const { locale } = useLang();
  const mission = content[locale];
  const railItems = [...placeholders, ...placeholders];

  return (
    <section id="su-menh" className="relative overflow-hidden bg-black py-20 md:py-28">
      <div className="absolute inset-0 bg-grid opacity-35" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <FadeInUp>
            <p className="font-heading text-xs font-medium uppercase tracking-[0.28em] text-accent-blue">
              {mission.overline}
            </p>
          </FadeInUp>

          <FadeInUp delay={0.08}>
            <h2 className="mt-6 max-w-4xl font-heading text-4xl font-black leading-[1.04] tracking-tight text-white md:text-6xl">
              {mission.headline}
            </h2>
          </FadeInUp>

          <FadeInUp delay={0.16}>
            <p className="mt-8 max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
              {mission.body}
            </p>
          </FadeInUp>

          <FadeInUp delay={0.24}>
            <div className="mt-10 grid gap-px bg-white/10 sm:grid-cols-3">
              {mission.proof.map((item, i) => (
                <div key={item} className="bg-black p-5">
                  <p className="mb-4 font-heading text-2xl font-black text-accent-blue">
                    0{i + 1}
                  </p>
                  <p className="text-sm font-medium leading-relaxed text-white/75">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </FadeInUp>
        </div>

        <FadeInUp delay={0.18} className="lg:col-span-5">
          <div className="relative h-[34rem] overflow-hidden border border-white/10 bg-white/[0.02] p-3 mission-rail-mask">
            <div className="absolute left-4 top-4 z-10 border border-white/10 bg-black/70 px-3 py-2 backdrop-blur-md">
              <p className="font-heading text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/55">
                {mission.railLabel}
              </p>
            </div>
            <div className="mission-image-rail grid gap-3">
              {railItems.map((item, index) => (
                <PlaceholderCard
                  key={`${item.code}-${index}`}
                  item={item}
                  duplicate={index >= placeholders.length}
                />
              ))}
            </div>
          </div>
          <p className="mt-4 font-heading text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
            {mission.kicker}
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}
