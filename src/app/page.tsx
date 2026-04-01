import Link from "next/link";
import { Swords, BookOpen, User, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMatchupCount } from "@/lib/data";

export default async function Home() {
  let matchupCount = 0;
  try { matchupCount = await getMatchupCount(); } catch {}

  return (
    <div className="space-y-10 py-8">
      {/* Hero — minimal, gets out of the way */}
      <section>
        <Badge variant="secondary" className="mb-3">Challenger #16 · NA</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
          LLAbdul
        </h1>
        <p className="text-muted-foreground mt-2 max-w-lg leading-relaxed">
          Challenger Yasuo &amp; Yone matchup guides — runes, builds, and phase-by-phase strategy from the top of the ladder.
        </p>
      </section>

      {/* Primary action — matchups */}
      <section>
        <Link href="/matchups" className="group block">
          <Card className="transition-colors hover:bg-muted/30">
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Swords className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Matchup Guides</h2>
                  <p className="text-sm text-muted-foreground">
                    {matchupCount} guides · Every champion · Runes, builds, strategy
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Secondary nav */}
      <section className="grid sm:grid-cols-2 gap-3">
        <Link href="/guides" className="group">
          <Card className="h-full transition-colors hover:bg-muted/30">
            <CardContent className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-accent-gold/10 flex items-center justify-center text-accent-gold shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">Champion Guides</div>
                <div className="text-xs text-muted-foreground">Mechanics, combos, advanced tech</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/about" className="group">
          <Card className="h-full transition-colors hover:bg-muted/30">
            <CardContent className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-accent-cyan/10 flex items-center justify-center text-accent-cyan shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">About</div>
                <div className="text-xs text-muted-foreground">My story, socials, contact</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </section>
    </div>
  );
}
