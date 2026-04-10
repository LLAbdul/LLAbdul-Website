import Image from "next/image";
import type { ResolvedRunePage, RuneTree, PerkInfo, RuneTreeTier } from "@/lib/rune-trees";

function PerkIcon({
  perk,
  selected,
  size = 32,
}: {
  perk: PerkInfo;
  selected: boolean;
  size?: number;
}) {
  return (
    <div
      className={`rounded-full flex items-center justify-center transition-all ${
        selected
          ? "ring-2 ring-[#0070F3] ring-offset-2 ring-offset-[#030509]" // u.gg blue ring
          : "opacity-30 grayscale hover:grayscale-0 hover:opacity-100 cursor-pointer"
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

function RuneRow({ perks, selectedNames, size, isShard = false }: { perks: PerkInfo[], selectedNames: Set<string>, size: number, isShard?: boolean }) {
  const hasSelection = perks.some((p) => selectedNames.has(p.name.toLowerCase()));
  
  return (
    <div className="flex items-center gap-4 w-full">
      {/* Left indicator dot */}
      <div className={`w-2 h-2 rounded-full shrink-0 ${hasSelection ? "bg-white" : "bg-white/20"}`} />
      
      {/* Icons container */}
      <div className="flex flex-1 justify-between items-center px-4">
        {perks.map((p) => (
          <PerkIcon
            key={p.id}
            perk={p}
            selected={selectedNames.has(p.name.toLowerCase())}
            size={size}
          />
        ))}
        {/* Placeholder if row only has 3 perks but needs to align with 4 (like keystone row) */}
        {!isShard && perks.length === 3 && (
          <div style={{ width: size }} className="opacity-0 pointer-events-none" />
        )}
      </div>
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 p-4">
      {/* Left Column: Primary Tree */}
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-center gap-3">
          <Image src={primaryTree.icon} alt={primaryTree.name} width={28} height={28} className="rounded-full" />
          <span className="font-serif text-lg font-bold text-[#E8E8ED] tracking-wide">{primaryTree.name}</span>
        </div>
        
        {/* Keystones */}
        <RuneRow perks={primaryTree.keystones} selectedNames={allSelected} size={40} />
        
        <div className="h-px w-full bg-white/10 my-2" />
        
        {/* Primary Tiers */}
        {primaryTree.tiers.map((tier, i) => (
          <RuneRow key={i} perks={tier.perks} selectedNames={allSelected} size={32} />
        ))}
      </div>

      {/* Right Column: Secondary Tree & Shards */}
      <div className="flex flex-col space-y-4">
        {secondaryTree && (
          <>
            {/* Header */}
            <div className="flex items-center justify-center gap-3">
              <Image src={secondaryTree.icon} alt={secondaryTree.name} width={28} height={28} className="rounded-full" />
              <span className="font-serif text-lg font-bold text-[#E8E8ED] tracking-wide">{secondaryTree.name}</span>
            </div>

            {/* Secondary Tiers */}
            {secondaryTree.tiers.map((tier, i) => (
              <RuneRow key={i} perks={tier.perks} selectedNames={allSelected} size={32} />
            ))}
            
            <div className="h-px w-full bg-white/10 my-2" />
          </>
        )}

        {/* Shards */}
        {primaryTree.shards && primaryTree.shards.length > 0 && (
          <div className="flex flex-col space-y-4 pt-1">
            {primaryTree.shards.map((tier, i) => (
              <RuneRow key={i} perks={tier.perks} selectedNames={allSelected} size={24} isShard />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
