import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "About",
  description: "About LLAbdul — Challenger Rank 16 Yasuo & Yone player.",
};

const stats = [
  { label: "Peak Rank", value: "#16 Challenger" },
  { label: "Champions", value: "Yasuo & Yone" },
  { label: "Region", value: "NA" },
  { label: "Role", value: "Mid / Top" },
];

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
        <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E] mb-1">
          Profile
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-[#E8E8ED]">About</h1>
        <p className="text-sm text-[#7B7F9E] mt-1">
          Challenger Rank 16 Yasuo &amp; Yone player.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="text-center py-3">
              <div className="font-bold text-sm text-[#C8AA6E]">{stat.value}</div>
              <div className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E] mt-1">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Story */}
      <div className="space-y-3">
        <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
          My Journey
        </p>
        <Card>
          <CardContent className="space-y-3 text-sm leading-relaxed text-[#E8E8ED]">
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
        <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
          Connect
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="transition-colors hover:bg-[#1A2340]">
                <CardContent className="flex items-center justify-between py-3">
                  <span className="font-medium text-sm text-[#E8E8ED]">{s.name}</span>
                  <ExternalLink className="w-4 h-4 text-[#7B7F9E] group-hover:text-[#B87FD8] transition-colors" />
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
