import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar, MobileHeader } from "@/components/layout/sidebar";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const viewport: Viewport = {
  themeColor: "#1a1533",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "LLAbdul - Challenger Yasuo & Yone Guides",
    template: "%s | LLAbdul",
  },
  description:
    "Matchup guides, builds, runes, and mechanics tutorials from a Challenger Rank 16 Yasuo & Yone player.",
  keywords: [
    "Yasuo",
    "Yone",
    "League of Legends",
    "Challenger",
    "matchup guide",
    "builds",
    "runes",
    "mechanics",
    "LoL",
  ],
  authors: [{ name: "LLAbdul" }],
  openGraph: {
    type: "website",
    title: "LLAbdul - Challenger Yasuo & Yone Guides",
    description:
      "Matchup guides, builds, and mechanics tutorials from Challenger Rank 16.",
    siteName: "LLAbdul",
  },
  twitter: {
    card: "summary_large_image",
    title: "LLAbdul - Challenger Yasuo & Yone Guides",
    description:
      "Matchup guides, builds, and mechanics tutorials from Challenger Rank 16.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(geist.variable, geistMono.variable)}>
      <body className="min-h-screen bg-mesh">
        <TooltipProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-screen">
              <MobileHeader />
              <main className="flex-1 px-4 py-6 md:px-10 md:py-8 lg:px-16">
                {children}
              </main>
            </div>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
