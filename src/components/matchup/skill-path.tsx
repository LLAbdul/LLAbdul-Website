import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { AbilityKey, SkillOrder } from "@/lib/data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const abilityRows: AbilityKey[] = ["Q", "W", "E", "R"];

function AbilityChip({
  ability,
  abilities,
  className = "",
}: {
  ability: AbilityKey;
  abilities?: Record<string, { name: string; icon: string; description?: string }>;
  className?: string;
}) {
  const info = abilities?.[ability];

  if (!info?.icon) {
    return (
      <div
        className={`w-8 h-8 rounded-md border border-white/20 bg-white/5 text-white text-xs font-bold flex items-center justify-center ${className}`}
      >
        {ability}
      </div>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger className="outline-none focus:outline-none">
        <Image
          src={info.icon}
          alt={info.name}
          width={32}
          height={32}
          className={`rounded-md border border-white/20 object-contain ${className}`}
        />
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        className="max-w-[300px] bg-[#09090B] border border-white/10 p-3 rounded-md shadow-2xl z-50 font-sans"
      >
        <div className="flex flex-col items-start">
          <div className="mb-2">
            <p className="text-[#3b82f6] text-[14px] font-medium leading-none">
              {info.name}
            </p>
          </div>
          {info.description && (
            <div
              className="text-[12.5px] text-white font-medium leading-relaxed [&_hr]:hidden"
              dangerouslySetInnerHTML={{ __html: info.description }}
            />
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export function SkillPath({
  skillOrder,
  abilities,
}: {
  skillOrder: SkillOrder | null;
  abilities?: Record<string, { name: string; icon: string; description?: string }>;
}) {
  if (!skillOrder) return null;

  return (
    <TooltipProvider delay={0}>
      <section className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <h2 className="font-serif text-xl font-bold text-white tracking-wide">
          Skill Priority
        </h2>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 space-y-5">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#7B7F9E] font-semibold">
            Priority
          </p>
          <div className="flex items-center gap-2.5 flex-wrap">
            {skillOrder.priority.map((ability, i) => (
              <div key={`${ability}-${i}`} className="flex items-center gap-2.5">
                <AbilityChip ability={ability} abilities={abilities} />
                {i < skillOrder.priority.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-[#7B7F9E]" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#7B7F9E] font-semibold">
            Leveling Path
          </p>

          <div className="overflow-x-auto">
            <div className="min-w-[760px] space-y-2">
              <div className="grid grid-cols-[70px_repeat(18,minmax(0,1fr))] gap-1.5">
                <div />
                {Array.from({ length: 18 }).map((_, i) => (
                  <div
                    key={`level-${i + 1}`}
                    className="text-[10px] text-center text-[#7B7F9E] font-medium"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              {abilityRows.map((ability) => (
                <div
                  key={ability}
                  className="grid grid-cols-[70px_repeat(18,minmax(0,1fr))] gap-1.5 items-center"
                >
                  <div className="flex items-center gap-2">
                    <AbilityChip ability={ability} abilities={abilities} className="w-7 h-7" />
                    <span className="text-xs text-[#E8E8ED] font-semibold">{ability}</span>
                  </div>

                  {Array.from({ length: 18 }).map((_, levelIdx) => {
                    const isFilled = skillOrder.levels[levelIdx] === ability;
                    return (
                      <div
                        key={`${ability}-${levelIdx + 1}`}
                        className={`h-8 rounded-md border text-[11px] font-semibold flex items-center justify-center ${
                          isFilled
                            ? "bg-[#2563EB]/70 border-[#60A5FA]/70 text-white"
                            : "bg-white/[0.03] border-white/10 text-white/25"
                        }`}
                      >
                        {isFilled ? levelIdx + 1 : ""}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </section>
    </TooltipProvider>
  );
}
