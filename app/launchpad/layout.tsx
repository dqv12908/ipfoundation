import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { Header } from "@/components/platform/layout/Header";
import { AmbientBackground } from "@/components/platform/ui/AmbientBackground";
import { Providers as PlatformProviders } from "@/lib/platform/providers";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
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
    <section lang="vi" className={`platform-shell ${syne.variable} ${dmSans.variable}`}>
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
