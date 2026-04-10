import Image from "next/image";
import type { ResolvedRunePage, RuneTree, PerkInfo, RuneTreeTier } from "@/lib/rune-trees";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger
          className={`rounded-full flex items-center justify-center transition-all ${
            selected
              ? "ring-2 ring-[#0070F3] ring-offset-2 ring-offset-[#030509]" // u.gg blue ring
              : "opacity-20 grayscale hover:grayscale-0 hover:opacity-100 cursor-pointer"
          }`}
        >
          <Image
            src={perk.icon}
            alt={perk.name}
            width={size}
            height={size}
            className="rounded-full"
          />
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="max-w-xs bg-[#030509]/95 backdrop-blur-xl border border-white/10 text-[#E8E8ED] p-3 rounded-xl shadow-2xl z-50"
        >
          <p className="font-bold text-white mb-1.5">{perk.name}</p>
          <div 
            className="text-xs text-[#7B7F9E] leading-relaxed [&_scaleLevel]:text-white [&_gold]:text-[#FFD700] [&_truedamage]:text-white [&_hr]:border-white/10 [&_hr]:my-2" 
            dangerouslySetInnerHTML={{ __html: (perk.shortDesc || perk.longDesc || "").replace(/<br>\s*<hr>\s*<br>/g, '<hr>') }} 
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function RuneRow({ perks, selectedNames, size }: { perks: PerkInfo[], selectedNames: Set<string>, size: number }) {
  const hasSelection = perks.some((p) => selectedNames.has(p.name.toLowerCase()));
  
  return (
    <div className="flex items-center py-1">
      {/* Left indicator dot */}
      <div className="w-8 sm:w-12 flex justify-center shrink-0">
        <div className={`w-2 h-2 rounded-full ${hasSelection ? "bg-[#E8E8ED]" : "bg-white/10"}`} />
      </div>
      
      {/* Icons container */}
      <div className="flex gap-4">
        {perks.map((p) => (
          <div key={p.id} className="w-9 sm:w-10 flex justify-center items-center">
            <PerkIcon
              perk={p}
              selected={selectedNames.has(p.name.toLowerCase())}
              size={size}
            />
          </div>
        ))}
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
    <div className="flex flex-col xl:flex-row gap-8 xl:gap-16 pt-2 pb-4 items-stretch">
      {/* Left Column: Primary Tree */}
      <div className="flex flex-col justify-between h-full min-h-[340px]">
        {/* Header */}
        <div className="flex items-center">
          <div className="w-8 sm:w-12 shrink-0" />
          <div className="flex items-center gap-3 px-2">
            <Image src={primaryTree.icon} alt={primaryTree.name} width={28} height={28} className="rounded-full" />
            <span className="font-serif text-xl font-bold text-[#E8E8ED] tracking-wide">{primaryTree.name}</span>
          </div>
        </div>
        
        {/* Keystones */}
        <RuneRow perks={primaryTree.keystones} selectedNames={allSelected} size={40} />
        
        
        {/* Primary Tiers */}
        {primaryTree.tiers.map((tier, i) => (
          <RuneRow key={i} perks={tier.perks} selectedNames={allSelected} size={32} />
        ))}
      </div>

      {/* Right Column: Secondary Tree & Shards */}
      <div className="flex flex-col justify-between h-full min-h-[340px]">
        {secondaryTree && (
          <>
            {/* Header */}
            <div className="flex items-center">
              <div className="w-8 sm:w-12 shrink-0" />
              <div className="flex items-center gap-3 px-2">
                <Image src={secondaryTree.icon} alt={secondaryTree.name} width={28} height={28} className="rounded-full" />
                <span className="font-serif text-xl font-bold text-[#E8E8ED] tracking-wide">{secondaryTree.name}</span>
              </div>
            </div>

            {/* Secondary Tiers */}
            {secondaryTree.tiers.map((tier, i) => (
              <RuneRow key={i} perks={tier.perks} selectedNames={allSelected} size={32} />
            ))}
            
          </>
        )}

        {/* Shards */}
        {primaryTree.shards && primaryTree.shards.map((tier, i) => (
          <RuneRow key={i} perks={tier.perks} selectedNames={allSelected} size={24} />
        ))}
      </div>
    </div>
  );
}
