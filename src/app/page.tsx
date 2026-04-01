import Link from "next/link";
import { Swords, BookOpen, User, ArrowRight } from "lucide-react";

const navCards = [
  {
    href: "/matchups",
    icon: Swords,
    title: "Matchup Guides",
    description: "Learn how to play every matchup with detailed strategy for each phase of the game.",
    accent: "var(--primary)",
  },
  {
    href: "/guides",
    icon: BookOpen,
    title: "Champion Guides",
    description: "Master Yasuo & Yone with in-depth guides covering mechanics, combos, and gameplay.",
    accent: "var(--color-accent-gold)",
  },
  {
    href: "/about",
    icon: User,
    title: "About LLAbdul",
    description: "Learn more about me, my journey to Challenger, and connect on socials.",
    accent: "var(--color-accent-cyan)",
  },
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero */}
      <section className="text-center space-y-4 pt-8 md:pt-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium">
          Challenger Rank 16
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          LLAbdul
        </h1>
        <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
          Challenger-level Yasuo &amp; Yone knowledge. Matchup guides, builds, runes,
          and mechanics — everything you need to climb.
        </p>
      </section>

      {/* Nav Cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {navCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group flex flex-col gap-3 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)]/40 transition-all"
          >
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg"
              style={{ backgroundColor: `color-mix(in srgb, ${card.accent} 15%, transparent)` }}
            >
              <card.icon
                className="w-5 h-5"
                style={{ color: card.accent }}
              />
            </div>
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="text-sm text-[var(--muted-foreground)] flex-1">
              {card.description}
            </p>
            <span className="inline-flex items-center gap-1 text-sm text-[var(--primary)] font-medium group-hover:gap-2 transition-all">
              Explore <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4">
        {[
          { label: "Peak Rank", value: "#16" },
          { label: "Champions", value: "Yasuo & Yone" },
          { label: "Region", value: "NA" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]"
          >
            <div className="text-xl md:text-2xl font-bold text-[var(--color-accent-gold)]">
              {stat.value}
            </div>
            <div className="text-xs text-[var(--muted-foreground)] mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
