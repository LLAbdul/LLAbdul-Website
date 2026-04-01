import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getChampion } from "@/lib/riot-api";
import { Card, CardContent } from "@/components/ui/card";
import { ChampionIcon } from "@/components/shared/champion-icon";

export const metadata = {
  title: "Champion Guides",
  description: "In-depth Yasuo & Yone guides covering mechanics, combos, and gameplay strategy.",
};

export default async function GuidesPage() {
  const champData = await Promise.all(
    ["Yasuo", "Yone"].map(async (name) => {
      try { return await getChampion(name); }
      catch { return { icon: "", title: "", name, alias: name }; }
    })
  );

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Champion Guides</h1>
        <p className="text-muted-foreground text-sm mt-1">In-depth guides for Yasuo and Yone.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {champData.map((champ) => (
          <Link key={champ.alias} href={`/guides/${champ.alias}`} className="group">
            <Card className="h-full transition-colors hover:bg-muted/30">
              <CardContent className="flex items-center gap-4">
                {champ.icon && <ChampionIcon src={champ.icon} name={champ.name} size={64} />}
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold">{champ.name}</h2>
                  {champ.title && <p className="text-sm text-muted-foreground truncate">{champ.title}</p>}
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-1 group-hover:gap-2 transition-all">
                    View Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
