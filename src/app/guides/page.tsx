import Link from "next/link";
import { getChampion } from "@/lib/riot-api";
import { ChampionIcon } from "@/components/shared/champion-icon";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "Champion Guides - LLAbdul",
  description: "In-depth Yasuo & Yone guides covering mechanics, combos, and gameplay strategy.",
};

const champions = ["Yasuo", "Yone"];

export default async function GuidesPage() {
  const champData = await Promise.all(
    champions.map(async (name) => {
      try {
        return await getChampion(name);
      } catch {
        return { icon: "", title: "", name, alias: name };
      }
    })
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="animate-in-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-accent-gold/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-accent-gold" />
          </div>
          <h1 className="text-2xl font-display font-bold tracking-wide">Champion Guides</h1>
        </div>
        <p className="text-foreground-muted text-sm ml-[52px]">
          In-depth guides for mastering Yasuo and Yone at the highest level.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {champData.map((champ, i) => (
          <Link
            key={champ.alias}
            href={`/guides/${champ.alias}`}
            className="group game-card flex items-center gap-5 p-6 animate-in-up"
            style={{ animationDelay: `${0.15 + i * 0.1}s` }}
          >
            {champ.icon && (
              <ChampionIcon
                src={champ.icon}
                name={champ.name}
                size={80}
                className="group-hover:scale-105 transition-transform duration-200"
              />
            )}
            <div className="flex-1 min-w-0 space-y-1">
              <h2 className="text-xl font-display font-bold tracking-wide">{champ.name}</h2>
              {champ.title && (
                <p className="text-sm text-foreground-muted truncate">{champ.title}</p>
              )}
              <span className="inline-flex items-center gap-1.5 text-sm text-accent-purple font-medium group-hover:gap-2.5 transition-all mt-2">
                View Guide <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
