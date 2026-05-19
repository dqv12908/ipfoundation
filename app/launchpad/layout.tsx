import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { Header } from "@/components/platform/layout/Header";
import { AmbientBackground } from "@/components/platform/ui/AmbientBackground";
import { Providers as PlatformProviders } from "@/lib/platform/providers";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-platform",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IP Foundation Launchpad - Huy động vốn IP mã hóa",
  description:
    "Launchpad của IP Foundation dành cho sáng chế, tài sản trí tuệ khoa học và chiến dịch huy động vốn IP mã hóa.",
};

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section lang="vi" className={`platform-shell ${beVietnamPro.variable}`}>
      <PlatformProviders>
        <AmbientBackground />
        <div className="relative z-10">
          <Header />
          <main className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 lg:px-10">
            {children}
          </main>
        </div>
      </PlatformProviders>
    </section>
  );
}
