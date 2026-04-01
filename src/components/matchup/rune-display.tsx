import Image from "next/image";
import type { ResolvedRunePage } from "@/lib/rune-trees";
import type { RuneTree, PerkInfo } from "@/lib/rune-trees";

function PerkIcon({ perk, selected, size = 28 }: { perk: PerkInfo; selected: boolean; size?: number }) {
  return (
    <div
      className={`rounded-full ${selected ? "ring-1 ring-primary" : "opacity-30 grayscale"}`}
      title={perk.name}
    >
      <Image
        src={perk.icon}
        alt={perk.name}
        width={size}
        height={size}
        className="rounded-full"
      />
    </div>
  );
}

function TreeColumn({ tree, selectedNames, isSecondary }: {
  tree: RuneTree;
  selectedNames: Set<string>;
  isSecondary?: boolean;
}) {
  return (
    <div className="space-y-3">
      {/* Tree header */}
      <div className="flex items-center gap-2">
        <Image src={tree.icon} alt={tree.name} width={20} height={20} />
        <span className="text-xs font-semibold">{tree.name}</span>
      </div>

      {/* Keystones (only for primary) */}
      {!isSecondary && (
        <div className="flex gap-1.5">
          {tree.keystones.map((k) => (
            <PerkIcon key={k.id} perk={k} selected={selectedNames.has(k.name.toLowerCase())} size={32} />
          ))}
        </div>
      )}

      {/* Tier rows */}
      {tree.tiers.map((tier, i) => (
        <div key={i} className="flex gap-1.5 items-center">
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30 shrink-0" />
          <div className="flex gap-1.5">
            {tier.perks.map((p) => (
              <PerkIcon key={p.id} perk={p} selected={selectedNames.has(p.name.toLowerCase())} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function RuneDisplay({ runes }: { runes: ResolvedRunePage | null }) {
  if (!runes) return null;

  const { primaryTree, secondaryTree, selectedPerkNames, shardNames } = runes;
  if (!primaryTree) return null;

  // Build selected set including shard names
  const allSelected = new Set(selectedPerkNames);
  for (const s of shardNames) allSelected.add(s.toLowerCase());

  return (
    <div className="flex gap-8 flex-wrap">
      {/* Primary tree */}
      <TreeColumn tree={primaryTree} selectedNames={allSelected} />

      {/* Secondary tree */}
      {secondaryTree && (
        <TreeColumn tree={secondaryTree} selectedNames={allSelected} isSecondary />
      )}

      {/* Shards (from the primary tree's shard data) */}
      {primaryTree.shards.length > 0 && (
        <div className="space-y-3">
          <div className="text-xs font-semibold text-muted-foreground">Shards</div>
          {primaryTree.shards.map((tier, i) => (
            <div key={i} className="flex gap-1.5 items-center">
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30 shrink-0" />
              <div className="flex gap-1.5">
                {tier.perks.map((p) => (
                  <PerkIcon key={p.id} perk={p} selected={allSelected.has(p.name.toLowerCase())} size={20} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
