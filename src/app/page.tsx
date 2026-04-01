import Link from "next/link";
import { Swords, BookOpen, User, ChevronRight, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMatchupCount } from "@/lib/data";

export default async function Home() {
  let matchupCount = 0;
  try { matchupCount = await getMatchupCount(); } catch {}

  return (
    <div className="space-y-10 py-8 max-w-2xl">
      {/* Hero */}
      <section className="space-y-3">
        <Badge
          variant="outline"
          className="border-[#C8AA6E]/40 text-[#C8AA6E] bg-[#C8AA6E]/10 gap-1.5"
        >
          <Trophy className="w-3 h-3" />
          Challenger #16 · NA
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-[#E8E8ED]">
          LLAbdul
        </h1>
        <p className="text-sm text-[#7B7F9E] leading-relaxed max-w-md">
          Challenger Yasuo &amp; Yone matchup guides — runes, builds, and phase-by-phase
          strategy from the top of the ladder.
        </p>
      </section>

      {/* Primary action */}
      <section>
        <Link href="/matchups" className="group block">
          <Card className="transition-colors hover:bg-[#1A2340]">
            <CardContent className="flex items-center justify-between py-5">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(200,170,110,0.12)", color: "#C8AA6E" }}
                >
                  <Swords className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-[#E8E8ED]">Matchup Guides</h2>
                  <p className="text-xs text-[#7B7F9E] mt-0.5">
                    {matchupCount > 0 ? `${matchupCount} guides` : "All champions"} · Runes, builds, strategy
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#7B7F9E] group-hover:text-[#C8AA6E] transition-colors" />
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Secondary nav */}
      <section className="grid sm:grid-cols-2 gap-3">
        <Link href="/guides" className="group">
          <Card className="h-full transition-colors hover:bg-[#1A2340]">
            <CardContent className="flex items-center gap-3 py-4">
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center shrink-0"
                style={{ background: "rgba(200,170,110,0.10)", color: "#C8AA6E" }}
              >
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-[#E8E8ED]">Champion Guides</div>
                <div className="text-xs text-[#7B7F9E]">Mechanics, combos, advanced tech</div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#7B7F9E] group-hover:text-[#C8AA6E] transition-colors" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/about" className="group">
          <Card className="h-full transition-colors hover:bg-[#1A2340]">
            <CardContent className="flex items-center gap-3 py-4">
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center shrink-0"
                style={{ background: "rgba(10,200,185,0.10)", color: "#0AC8B9" }}
              >
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-[#E8E8ED]">About</div>
                <div className="text-xs text-[#7B7F9E]">My story, socials, contact</div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#7B7F9E] group-hover:text-[#0AC8B9] transition-colors" />
            </CardContent>
          </Card>
        </Link>
      </section>
    </div>
  );
}
