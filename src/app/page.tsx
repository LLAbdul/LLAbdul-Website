import Link from "next/link";
import Image from "next/image";
import { Swords, BookOpen, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllMatchups } from "@/lib/data";
import { getChampion } from "@/lib/riot-api";
import { ChampionIcon } from "@/components/shared/champion-icon";
import { DifficultyBadge } from "@/components/shared/difficulty-badge";
import { RANK_EMBLEMS, POSITION_ICONS } from "@/lib/constants";

export default async function Home() {
  let matchups: Awaited<ReturnType<typeof getAllMatchups>> = [];
  let yasuoIcon = "";
  let yoneIcon = "";
  try {
    const [m, yasuo, yone] = await Promise.all([
      getAllMatchups(),
      getChampion("Yasuo"),
      getChampion("Yone"),
    ]);
    matchups = m;
    yasuoIcon = yasuo.icon;
    yoneIcon = yone.icon;
  } catch {}

  return (
    <div className="space-y-6 py-6">
      {/* Two-column: Profile + Featured matchups */}
      <div className="grid lg:grid-cols-[1fr_340px] gap-4">
        {/* Left: Profile + Nav */}
        <div className="space-y-4">
          {/* Profile card */}
          <Card>
            <CardContent className="flex items-center gap-5 py-5">
              <Image src={RANK_EMBLEMS.challenger} alt="Challenger" width={80} height={80} className="shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-extrabold text-[#E8E8ED]">LLAbdul</h1>
                  <Badge variant="outline" className="text-[10px] font-semibold uppercase tracking-widest" style={{ background: "rgba(184,127,216,0.12)", color: "#B87FD8", borderColor: "rgba(184,127,216,0.30)" }}>
                    Challenger #16
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-[#7B7F9E]">
                  <span className="flex items-center gap-1.5">
                    <Image src={POSITION_ICONS.mid} alt="Mid" width={14} height={14} className="opacity-60" />
                    Mid
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Image src={POSITION_ICONS.top} alt="Top" width={14} height={14} className="opacity-60" />
                    Top
                  </span>
                  <span className="text-[#1E2A4A]">|</span>
                  <span>NA</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  {yasuoIcon && <ChampionIcon src={yasuoIcon} name="Yasuo" size={28} />}
                  {yoneIcon && <ChampionIcon src={yoneIcon} name="Yone" size={28} />}
                  <span className="text-xs text-[#7B7F9E] ml-1">Yasuo & Yone</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nav cards */}
          <Link href="/matchups" className="group block">
            <Card className="transition-colors hover:bg-[#1A2340]">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(184,127,216,0.12)", color: "#B87FD8" }}>
                    <Swords className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#E8E8ED]">Matchup Guides</div>
                    <div className="text-xs text-[#7B7F9E] mt-0.5">{matchups.length > 0 ? `${matchups.length} guides · ` : ""}All champions · Runes & builds</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#7B7F9E] group-hover:text-[#B87FD8] transition-colors" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/guides" className="group block">
            <Card className="transition-colors hover:bg-[#1A2340]">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(10,200,185,0.12)", color: "#0AC8B9" }}>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#E8E8ED]">Champion Guides</div>
                    <div className="text-xs text-[#7B7F9E] mt-0.5">Mechanics, combos, advanced tech</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#7B7F9E] group-hover:text-[#0AC8B9] transition-colors" />
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Right: Featured matchups */}
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
            Recent Matchups
          </p>
          {matchups.length > 0 ? (
            <div className="space-y-2">
              {matchups.slice(0, 6).map((m) => (
                <Link key={m.enemyChampion} href={`/matchups/${encodeURIComponent(m.enemyChampion)}`} className="group block">
                  <Card className="transition-colors hover:bg-[#1A2340]">
                    <CardContent className="flex items-center gap-3 py-2">
                      {m.enemyIcon && <ChampionIcon src={m.enemyIcon} name={m.enemyChampion} size={32} />}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#E8E8ED]">vs {m.enemyChampion}</div>
                        <div className="text-[10px] text-[#7B7F9E]">{m.champion}</div>
                      </div>
                      <DifficultyBadge difficulty={m.difficulty} />
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {matchups.length > 6 && (
                <Link href="/matchups" className="block text-center text-xs text-[#B87FD8] font-medium hover:underline py-2">
                  View all {matchups.length} matchups
                </Link>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="py-6 text-center">
                <p className="text-sm text-[#7B7F9E]">No matchups yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
