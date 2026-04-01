import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "About",
  description: "About LLAbdul - Challenger Rank 16 Yasuo & Yone player.",
};

const socials = [
  { name: "Discord", href: "#" },
  { name: "YouTube", href: "#" },
  { name: "Twitch", href: "#" },
  { name: "Twitter / X", href: "#" },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl space-y-8 py-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">About</h1>
        <p className="text-muted-foreground mt-1">
          Challenger Rank 16 Yasuo &amp; Yone player.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Peak Rank", value: "#16 Challenger" },
          { label: "Champions", value: "Yasuo & Yone" },
          { label: "Region", value: "NA" },
          { label: "Role", value: "Mid / Top" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="text-center py-2">
              <div className="font-bold">{stat.value}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Story */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">My Journey</h2>
        <Card>
          <CardContent className="space-y-3 text-sm leading-relaxed">
            <p>
              I&apos;ve been playing League for years, focusing almost exclusively on Yasuo and Yone.
              I hit Challenger and peaked at Rank 16 — learning every matchup the hard way through
              thousands of games and replays.
            </p>
            <p>
              This website is my way of giving back. Every guide comes from real experience
              at the highest level of solo queue.
            </p>
            <p>
              I&apos;m planning to collaborate with other top Yasuo and Yone players around
              the world to make this the most comprehensive resource for our champions.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Socials */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Connect</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {socials.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">
              <Card className="transition-colors hover:bg-muted/30">
                <CardContent className="flex items-center justify-between">
                  <span className="font-medium text-sm">{s.name}</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
