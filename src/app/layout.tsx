import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar, MobileHeader } from "@/components/layout/sidebar";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body className="min-h-screen">
        <TooltipProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-screen">
              <MobileHeader />
              <main className="flex-1 p-6 md:p-8">{children}</main>
            </div>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
