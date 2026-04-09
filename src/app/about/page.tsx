import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RANK_EMBLEMS, POSITION_ICONS } from "@/lib/constants";
import { getChampion } from "@/lib/riot-api";
import { ChampionIcon } from "@/components/shared/champion-icon";

export const metadata = {
  title: "About",
  description: "About LLAbdul — Challenger Rank 16 Yasuo & Yone player.",
};

const socials = [
  { name: "Discord", href: "#" },
  { name: "YouTube", href: "#" },
  { name: "Twitch", href: "#" },
  { name: "Twitter / X", href: "#" },
];

export default async function AboutPage() {
  let yasuoIcon = "";
  let yoneIcon = "";
  try {
    const [yasuo, yone] = await Promise.all([getChampion("Yasuo"), getChampion("Yone")]);
    yasuoIcon = yasuo.icon;
    yoneIcon = yone.icon;
  } catch {}

  return (
    <div className="space-y-6 py-6 bg-[#030509] min-h-screen text-[#E8E8ED]">
      <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">Profile</p>

      {/* Two-column: Profile + Stats */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
          <CardContent className="py-6">
            <div className="flex items-start gap-5">
              <Image src={RANK_EMBLEMS.challenger} alt="Challenger" width={100} height={100} className="shrink-0 drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl font-serif text-white">LLAbdul</h1>
                  <Badge variant="outline" className="text-[10px] font-semibold uppercase tracking-widest shadow-[0_0_10px_rgba(255,215,0,0.5)]" style={{ background: "rgba(255,215,0,0.1)", color: "#FFD700", borderColor: "rgba(255,215,0,0.3)" }}>
                    Challenger #16
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm text-[#7B7F9E]">
                  <div className="flex items-center gap-1.5">
                    <Image src={POSITION_ICONS.mid} alt="Mid" width={16} height={16} className="opacity-70" />
                    <span>Mid</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Image src={POSITION_ICONS.top} alt="Top" width={16} height={16} className="opacity-70" />
                    <span>Top</span>
                  </div>
                  <span className="text-white/20">|</span>
                  <span>NA</span>
                </div>
                <div className="flex items-center gap-2.5 mt-4">
                  {yasuoIcon && <ChampionIcon src={yasuoIcon} name="Yasuo" size={36} />}
                  {yoneIcon && <ChampionIcon src={yoneIcon} name="Yone" size={36} />}
                  <span className="text-xs text-[#7B7F9E]">Yasuo & Yone One Trick</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <CardContent className="text-center py-3">
                <div className="text-lg font-bold text-[#FFD700]">#16</div>
                <div className="text-[10px] uppercase tracking-widest font-semibold text-[#7B7F9E] mt-0.5">Peak Rank</div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <CardContent className="text-center py-3">
                <div className="text-lg font-bold text-[#C9082A]">NA</div>
                <div className="text-[10px] uppercase tracking-widest font-semibold text-[#7B7F9E] mt-0.5">Region</div>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
            <CardContent className="py-4">
              <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E] mb-3">Roles</p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <Image src={POSITION_ICONS.mid} alt="Mid" width={20} height={20} className="opacity-80" />
                  <div>
                    <div className="text-sm font-medium text-[#E8E8ED]">Mid Lane</div>
                    <div className="text-[10px] text-[#7B7F9E]">Primary</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Image src={POSITION_ICONS.top} alt="Top" width={20} height={20} className="opacity-80" />
                  <div>
                    <div className="text-sm font-medium text-[#E8E8ED]">Top Lane</div>
                    <div className="text-[10px] text-[#7B7F9E]">Secondary</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Story + Socials */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">My Journey</p>
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
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

        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">Connect</p>
          <div className="space-y-2">
            {socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="group block">
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl transition-colors hover:bg-white/10">
                  <CardContent className="flex items-center justify-between py-3">
                    <span className="font-medium text-sm text-[#E8E8ED]">{s.name}</span>
                    <ExternalLink className="w-4 h-4 text-[#7B7F9E] group-hover:text-[#C9082A] transition-colors" />
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
