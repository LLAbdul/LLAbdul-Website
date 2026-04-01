import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
      <body>
        {children}
      </body>
    </html>
  );
}
