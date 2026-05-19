import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";
import "./platform-globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IP Foundation - Launchpad Mã hóa Sáng chế & IP Khoa học",
  description:
    "Nền tảng mã hóa sáng chế và phát minh khoa học công nghệ theo mô hình RWA, kết nối tài sản trí tuệ với nguồn vốn prototype, cộng đồng đầu tư và thanh khoản thứ cấp.",
  keywords: [
    "IP Foundation",
    "tài sản trí tuệ",
    "RWA tokenization",
    "IP launchpad",
    "sáng chế",
    "phát minh khoa học",
    "blockchain",
    "DEX",
    "token hóa",
  ],
  authors: [{ name: "IP Foundation" }],
  openGraph: {
    title: "IP Foundation - Launchpad Mã hóa Sáng chế & IP Khoa học",
    description:
      "Nền tảng mã hóa sáng chế và phát minh khoa học công nghệ theo mô hình RWA.",
    url: "https://ip-foundation.com",
    siteName: "IP Foundation",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IP Foundation - Launchpad Mã hóa Sáng chế & IP Khoa học",
    description:
      "Nền tảng mã hóa sáng chế và phát minh khoa học công nghệ theo mô hình RWA.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "IP Foundation",
              url: "https://ip-foundation.com",
              description:
                "Nền tảng mã hóa sáng chế và phát minh khoa học công nghệ theo mô hình RWA.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+84-968-813-228",
                contactType: "customer service",
                availableLanguage: "Vietnamese",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
