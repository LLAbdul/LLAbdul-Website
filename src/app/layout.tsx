import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar, MobileHeader } from "@/components/layout/sidebar";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "LLAbdul - Challenger Yasuo & Yone Guides",
  description:
    "Matchup guides, builds, and mechanics tutorials from a Challenger Yasuo & Yone player.",
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
