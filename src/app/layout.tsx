import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#0A0E21",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "LLAbdul — Challenger Yasuo & Yone Guides",
    template: "%s | LLAbdul",
  },
  description:
    "Matchup guides, builds, runes, and mechanics tutorials from a Challenger Rank 16 Yasuo & Yone player.",
  keywords: ["Yasuo", "Yone", "League of Legends", "Challenger", "matchup guide", "builds", "runes", "mechanics", "LoL"],
  authors: [{ name: "LLAbdul" }],
  openGraph: {
    type: "website",
    title: "LLAbdul — Challenger Yasuo & Yone Guides",
    description: "Matchup guides, builds, and mechanics tutorials from Challenger Rank 16.",
    siteName: "LLAbdul",
  },
  twitter: {
    card: "summary_large_image",
    title: "LLAbdul — Challenger Yasuo & Yone Guides",
    description: "Matchup guides, builds, and mechanics tutorials from Challenger Rank 16.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="w-full max-w-6xl mx-auto px-4 py-6 md:px-8 md:py-8 lg:px-12">
          {children}
        </main>
      </body>
    </html>
  );
}
