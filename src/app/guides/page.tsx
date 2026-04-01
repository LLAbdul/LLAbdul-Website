import Link from "next/link";
import { getChampion } from "@/lib/riot-api";
import { ChampionIcon } from "@/components/shared/champion-icon";
import { ArrowRight } from "lucide-react";

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
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Champion Guides</h1>
        <p className="text-[var(--muted-foreground)] mt-1">
          In-depth guides for mastering Yasuo and Yone at the highest level.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {champData.map((champ) => (
          <Link
            key={champ.alias}
            href={`/guides/${champ.alias}`}
            className="group flex items-center gap-5 p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)]/40 transition-all"
          >
            {champ.icon && (
              <ChampionIcon
                src={champ.icon}
                name={champ.name}
                size={80}
                className="group-hover:scale-105 transition-transform"
              />
            )}
            <div className="flex-1 space-y-1">
              <h2 className="text-xl font-bold">{champ.name}</h2>
              {champ.title && (
                <p className="text-sm text-[var(--muted-foreground)]">{champ.title}</p>
              )}
              <span className="inline-flex items-center gap-1 text-sm text-[var(--primary)] font-medium group-hover:gap-2 transition-all mt-2">
                View Guide <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
