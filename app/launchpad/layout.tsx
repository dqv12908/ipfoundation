import type { Metadata } from "next";
import { Header } from "@/components/platform/layout/Header";
import { AmbientBackground } from "@/components/platform/ui/AmbientBackground";
import { Providers as PlatformProviders } from "@/lib/platform/providers";

export const metadata: Metadata = {
  title: "IP Launchpad - Tokenized Intellectual Property",
  description:
    "The institutional-grade platform for tokenized IP fundraising on Ethereum",
};

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section lang="en" className="platform-shell">
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
