import { ExternalLink, Trophy, Gamepad2, MapPin, Crosshair } from "lucide-react";

export const metadata = {
  title: "About - LLAbdul",
  description: "About LLAbdul - Challenger Rank 16 Yasuo & Yone player.",
};

const socials = [
  { name: "Discord", href: "#", icon: "discord", color: "oklch(0.62 0.18 275)" },
  { name: "YouTube", href: "#", icon: "youtube", color: "oklch(0.62 0.22 25)" },
  { name: "Twitch", href: "#", icon: "twitch", color: "oklch(0.58 0.24 290)" },
  { name: "Twitter / X", href: "#", icon: "twitter", color: "oklch(0.75 0.12 200)" },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-10 py-4">
      {/* Header */}
      <section className="space-y-4 animate-in-up">
        <h1 className="text-3xl font-display font-bold tracking-wide">
          About <span className="gradient-text">LLAbdul</span>
        </h1>
        <p className="text-foreground-muted leading-relaxed">
          Challenger Rank 16 Yasuo &amp; Yone player. I built this site to share
          everything I&apos;ve learned across thousands of games at the highest
          level of solo queue.
        </p>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-in-up" style={{ animationDelay: "0.1s" }}>
        {[
          { icon: Trophy, label: "Peak Rank", value: "#16 Challenger", color: "text-accent-gold" },
          { icon: Gamepad2, label: "Champions", value: "Yasuo & Yone", color: "text-accent-purple" },
          { icon: MapPin, label: "Region", value: "NA", color: "text-accent-cyan" },
          { icon: Crosshair, label: "Role", value: "Mid / Top", color: "text-foreground" },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl bg-surface border border-border text-center">
            <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-2`} />
            <div className={`text-base font-display font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-[11px] text-foreground-subtle mt-1 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Story */}
      <section className="animate-in-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="section-heading text-sm text-foreground-muted tracking-widest mb-4">My Journey</h2>
        <div className="p-6 rounded-xl bg-surface border border-border space-y-4 text-sm text-foreground leading-relaxed">
          <p>
            I&apos;ve been playing League for years, focusing almost exclusively on Yasuo and Yone.
            I hit Challenger and peaked at Rank 16 — learning every matchup the hard way through
            thousands of games, countless replays, and a lot of trial and error.
          </p>
          <p>
            This website is my way of giving back. Every matchup guide, every build recommendation,
            every tip comes from real experience at the highest level of solo queue.
          </p>
          <p>
            In the future, I&apos;m planning to collaborate with other top Yasuo and Yone players
            around the world to make this the most comprehensive resource for our champions.
          </p>
        </div>
      </section>

      {/* Socials */}
      <section className="animate-in-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="section-heading text-sm text-foreground-muted tracking-widest mb-4">Connect</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="game-card flex items-center justify-between p-4 group"
            >
              <span className="font-display font-semibold tracking-wide" style={{ color: social.color }}>
                {social.name}
              </span>
              <ExternalLink className="w-4 h-4 text-foreground-subtle group-hover:text-foreground transition-colors" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
