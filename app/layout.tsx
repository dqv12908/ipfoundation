import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

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
  title: "IP Foundation - Nền tảng Số hóa Tài sản Trí tuệ",
  description:
    "Nền tảng giao dịch và chuyển giao khoa học công nghệ theo mô hình IP & RWA tokenization. Số hóa tài sản trí tuệ, kết nối nhà khoa học với doanh nghiệp.",
  keywords: [
    "IP Foundation",
    "tài sản trí tuệ",
    "RWA tokenization",
    "chuyển giao công nghệ",
    "blockchain",
    "sở hữu trí tuệ",
    "token hóa",
  ],
  authors: [{ name: "IP Foundation" }],
  openGraph: {
    title: "IP Foundation - Số hóa Tài sản Trí tuệ",
    description:
      "Nền tảng giao dịch và chuyển giao khoa học công nghệ theo mô hình IP & RWA tokenization.",
    url: "https://ip-foundation.com",
    siteName: "IP Foundation",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IP Foundation - Số hóa Tài sản Trí tuệ",
    description:
      "Nền tảng giao dịch và chuyển giao khoa học công nghệ theo mô hình IP & RWA tokenization.",
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
                "Nền tảng giao dịch và chuyển giao khoa học công nghệ theo mô hình IP & RWA tokenization.",
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
