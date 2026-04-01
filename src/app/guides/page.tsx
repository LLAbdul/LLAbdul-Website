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
    <div className="space-y-6 py-6 max-w-2xl">
      <div>
        <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E] mb-1">
          Wind Champions
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-[#E8E8ED]">Champion Guides</h1>
        <p className="text-sm text-[#7B7F9E] mt-1">
          In-depth guides for Yasuo and Yone — mechanics, combos, and game strategy.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {champData.map((champ) => (
          <Link key={champ.alias} href={`/guides/${champ.alias}`} className="group">
            <Card className="h-full transition-colors hover:bg-[#1A2340]">
              <CardContent className="flex items-center gap-4 py-5">
                {champ.icon && (
                  <ChampionIcon src={champ.icon} name={champ.name} size={64} className="rounded-lg shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-bold text-[#E8E8ED]">{champ.name}</h2>
                  {champ.title && (
                    <p className="text-xs text-[#7B7F9E] truncate mt-0.5 italic">{champ.title}</p>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs text-[#C8AA6E] font-medium mt-2 group-hover:gap-1.5 transition-all">
                    View Guide <ArrowRight className="w-3 h-3" />
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
