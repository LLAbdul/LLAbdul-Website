import Link from "next/link";
import { Swords, BookOpen, User, ArrowRight, Trophy, Gamepad2, MapPin } from "lucide-react";
import { getMatchupCount } from "@/lib/data";

const navCards = [
  {
    href: "/matchups",
    icon: Swords,
    title: "Matchup Guides",
    description: "Detailed strategy for every lane opponent — phase by phase, rune by rune.",
    gradient: "from-accent-purple/20 to-transparent",
    iconColor: "text-accent-purple",
    borderHover: "hover:border-accent-purple/30",
  },
  {
    href: "/guides",
    icon: BookOpen,
    title: "Champion Guides",
    description: "Master Yasuo & Yone with mechanics breakdowns, combos, and advanced tech.",
    gradient: "from-accent-gold/15 to-transparent",
    iconColor: "text-accent-gold",
    borderHover: "hover:border-accent-gold/30",
  },
  {
    href: "/about",
    icon: User,
    title: "About Me",
    description: "My journey to Challenger, how I think about the game, and where to find me.",
    gradient: "from-accent-cyan/15 to-transparent",
    iconColor: "text-accent-cyan",
    borderHover: "hover:border-accent-cyan/30",
  },
];

export default async function Home() {
  let matchupCount = 0;
  try {
    matchupCount = await getMatchupCount();
  } catch {
    // fallback
  }

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-4 md:py-10">
      {/* Hero */}
      <section className="text-center space-y-6 relative">
        {/* Decorative glow behind hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-6 animate-in-up"
            style={{
              background: "oklch(0.65 0.27 285 / 0.08)",
              borderColor: "oklch(0.65 0.27 285 / 0.2)",
              color: "oklch(0.78 0.20 285)",
            }}
          >
            <Trophy className="w-3.5 h-3.5" />
            Challenger Rank #16
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight animate-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="gradient-text">LLAbdul</span>
          </h1>

          <p
            className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto mt-4 leading-relaxed animate-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Challenger-level Yasuo &amp; Yone knowledge. Matchups, builds, runes,
            and mechanics — everything to climb.
          </p>
        </div>
      </section>

      {/* Nav Cards */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {navCards.map((card, i) => (
          <Link
            key={card.href}
            href={card.href}
            className={`group relative flex flex-col gap-4 p-6 rounded-xl bg-surface border border-border ${card.borderHover} transition-all duration-300 hover:translate-y-[-2px] overflow-hidden animate-in-up`}
            style={{ animationDelay: `${0.3 + i * 0.1}s` }}
          >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="relative">
              <div className={`w-11 h-11 rounded-lg bg-surface-elevated flex items-center justify-center ${card.iconColor} mb-1`}>
                <card.icon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-display font-bold tracking-wide mt-3">
                {card.title}
              </h2>
              <p className="text-sm text-foreground-muted mt-1.5 leading-relaxed">
                {card.description}
              </p>
            </div>

            <span className={`relative inline-flex items-center gap-1.5 text-sm ${card.iconColor} font-medium group-hover:gap-2.5 transition-all mt-auto`}>
              Explore <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </section>

      {/* Stats */}
      <section
        className="grid grid-cols-3 gap-4 animate-in-up"
        style={{ animationDelay: "0.6s" }}
      >
        {[
          { icon: Trophy, label: "Peak Rank", value: "#16 Challenger", color: "text-accent-gold" },
          { icon: Gamepad2, label: "Matchup Guides", value: String(matchupCount), color: "text-accent-purple" },
          { icon: MapPin, label: "Region", value: "NA", color: "text-accent-cyan" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center p-5 rounded-xl bg-surface border border-border"
          >
            <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
            <div className={`text-xl md:text-2xl font-display font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-xs text-foreground-muted mt-1 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
