import dynamic from "next/dynamic";

export const DynamicHeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-[rgba(37,99,235,0.3)] border-t-[#2563EB] animate-spin" />
    </div>
  ),
});

export const DynamicRoadmapIslands = dynamic(() => import("./RoadmapIslands"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-[rgba(37,99,235,0.3)] border-t-[#2563EB] animate-spin" />
    </div>
  ),
});
