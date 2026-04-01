import Link from "next/link";
import { Swords, BookOpen, User, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMatchupCount } from "@/lib/data";

export default async function Home() {
  let matchupCount = 0;
  try {
    matchupCount = await getMatchupCount();
  } catch {}

  return (
    <div className="space-y-12 py-6">
      {/* Hero */}
      <section className="space-y-3">
        <Badge variant="secondary" className="mb-2">
          Challenger Rank #16
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          LLAbdul
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          Challenger Yasuo &amp; Yone matchup guides, builds, runes, and mechanics.
        </p>
      </section>

      {/* Navigation cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/matchups" className="group">
          <Card className="h-full transition-colors hover:bg-muted/30">
            <CardContent className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                <Swords className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold">Matchup Guides</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Strategy for every lane opponent — phase by phase.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                Browse <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guides" className="group">
          <Card className="h-full transition-colors hover:bg-muted/30">
            <CardContent className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-accent-gold/10 flex items-center justify-center text-accent-gold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold">Champion Guides</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Mechanics breakdowns, combos, and advanced tech.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm text-accent-gold font-medium group-hover:gap-2 transition-all">
                Browse <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/about" className="group">
          <Card className="h-full transition-colors hover:bg-muted/30">
            <CardContent className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-accent-cyan/10 flex items-center justify-center text-accent-cyan">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold">About</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  My journey to Challenger and where to find me.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm text-accent-cyan font-medium group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="text-center py-2">
            <div className="text-2xl font-bold text-accent-gold">#16</div>
            <div className="text-xs text-muted-foreground mt-1">Peak Rank</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-2">
            <div className="text-2xl font-bold text-primary">{matchupCount}</div>
            <div className="text-xs text-muted-foreground mt-1">Matchup Guides</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-2">
            <div className="text-2xl font-bold">NA</div>
            <div className="text-xs text-muted-foreground mt-1">Region</div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
