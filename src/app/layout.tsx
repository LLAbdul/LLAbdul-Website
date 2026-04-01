import type { Metadata } from "next";

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
    <html lang="en" className="dark">
      <body>
        {children}
      </body>
    </html>
  );
}
