import Image from "next/image";
import type { ResolvedRunePage, RuneTree, PerkInfo } from "@/lib/rune-trees";

function PerkIcon({
  perk,
  selected,
  size = 28,
}: {
  perk: PerkInfo;
  selected: boolean;
  size?: number;
}) {
  return (
    <div
      className={`rounded-full transition-all ${
        selected
          ? "ring-1 ring-[#B87FD8] ring-offset-1 ring-offset-[#111833]"
          : "opacity-25 grayscale"
      }`}
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

function TreeColumn({
  tree,
  selectedNames,
  isSecondary = false,
}: {
  tree: RuneTree;
  selectedNames: Set<string>;
  isSecondary?: boolean;
}) {
  return (
    <div className="space-y-3 min-w-0">
      {/* Tree header */}
      <div className="flex items-center gap-2">
        <Image src={tree.icon} alt={tree.name} width={22} height={22} className="rounded-full" />
        <span className="text-xs font-semibold text-[#E8E8ED]">{tree.name}</span>
      </div>

      {/* Keystones — primary tree only */}
      {!isSecondary && (
        <div className="flex gap-2 flex-wrap">
          {tree.keystones.map((k) => (
            <PerkIcon
              key={k.id}
              perk={k}
              selected={selectedNames.has(k.name.toLowerCase())}
              size={36}
            />
          ))}
        </div>
      )}

      {/* Tier rows */}
      {tree.tiers.map((tier, i) => (
        <div key={i} className="flex gap-2 items-center flex-wrap">
          {tier.perks.map((p) => (
            <PerkIcon
              key={p.id}
              perk={p}
              selected={selectedNames.has(p.name.toLowerCase())}
              size={isSecondary ? 26 : 28}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function RuneDisplay({ runes }: { runes: ResolvedRunePage | null }) {
  if (!runes) return null;

  const { primaryTree, secondaryTree, selectedPerkNames, shardNames } = runes;
  if (!primaryTree) return null;

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

      {/* Shards */}
      {primaryTree.shards.length > 0 && (
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
            Shards
          </p>
          {primaryTree.shards.map((tier, i) => (
            <div key={i} className="flex gap-2 items-center flex-wrap">
              {tier.perks.map((p) => (
                <PerkIcon
                  key={p.id}
                  perk={p}
                  selected={allSelected.has(p.name.toLowerCase())}
                  size={20}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
