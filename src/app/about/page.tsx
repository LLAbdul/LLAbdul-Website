import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "About - LLAbdul",
  description: "About LLAbdul - Challenger Rank 16 Yasuo & Yone player.",
};

const socials = [
  { name: "Discord", href: "#", color: "hsl(235, 85%, 65%)" },
  { name: "YouTube", href: "#", color: "hsl(0, 80%, 55%)" },
  { name: "Twitch", href: "#", color: "hsl(264, 100%, 64%)" },
  { name: "Twitter / X", href: "#", color: "hsl(200, 90%, 55%)" },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">About LLAbdul</h1>
        <p className="text-[var(--muted-foreground)] leading-relaxed">
          Challenger Rank 16 Yasuo &amp; Yone player. I created this site to share
          everything I&apos;ve learned across thousands of games — matchup knowledge,
          mechanics, builds, and strategies that helped me reach the top of the ladder.
        </p>
      </section>

      {/* Story */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">My Journey</h2>
        <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] space-y-3 text-sm leading-relaxed">
          <p>
            I&apos;ve been playing League of Legends for years, focusing almost exclusively
            on Yasuo and Yone. I hit Challenger and peaked at Rank 16, learning every matchup
            the hard way — through thousands of games, countless replays, and lots of trial and error.
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

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Peak Rank", value: "#16 Challenger" },
          { label: "Main Champions", value: "Yasuo & Yone" },
          { label: "Region", value: "NA" },
          { label: "Role", value: "Mid / Top" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] text-center"
          >
            <div className="text-lg font-bold text-[var(--color-accent-gold)]">
              {stat.value}
            </div>
            <div className="text-xs text-[var(--muted-foreground)] mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Socials */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Connect</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)]/40 transition-colors group"
            >
              <span className="font-medium" style={{ color: social.color }}>
                {social.name}
              </span>
              <ExternalLink className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
