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
    <div className="space-y-8 py-10 max-w-4xl mx-auto">
      <div className="text-center md:text-left">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#FFD700] mb-2">
          Wind Champions
        </p>
        <h1 className="font-serif text-5xl font-black text-white tracking-tight uppercase mb-3">
          Champion Guides
        </h1>
        <p className="text-base text-white/60 max-w-xl">
          In-depth guides for Yasuo and Yone — mechanics, combos, and game strategy.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {champData.map((champ) => (
          <Link key={champ.alias} href={`/guides/${champ.alias}`} className="group outline-none">
            <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-[#FFD700]/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="flex items-center gap-6 p-6 relative z-10">
                {champ.icon && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#FFD700] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    <ChampionIcon src={champ.icon} name={champ.name} size={80} className="rounded-xl shrink-0 border border-white/20 relative z-10" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h2 className="font-serif text-3xl font-black text-white uppercase tracking-wide">{champ.name}</h2>
                  {champ.title && (
                    <p className="text-sm text-white/60 truncate mt-1 italic font-light">{champ.title}</p>
                  )}
                  <span className="inline-flex items-center gap-2 text-sm text-[#FFD700] font-bold mt-4 group-hover:gap-3 transition-all duration-300 uppercase tracking-wider">
                    View Guide <ArrowRight className="w-4 h-4" />
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
