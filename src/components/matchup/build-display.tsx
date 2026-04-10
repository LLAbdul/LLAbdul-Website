import Image from "next/image";
import type { BuildItem } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BuildDisplayProps {
  items: BuildItem[];
  label: string;
  showArrows?: boolean;
}

export function BuildDisplay({ items, label, showArrows = false }: BuildDisplayProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-[11px] uppercase tracking-widest font-semibold text-[#7B7F9E]">
        {label}
      </p>
      <div className="flex flex-wrap items-center">
        <TooltipProvider delay={0}>
          <div className="flex flex-wrap gap-1">
            {items.map((item, i) => (
              <div key={`${item.name}-${i}`} className="flex items-center gap-0.5 sm:gap-1">
                {showArrows && i > 0 && (
                  <ArrowRight className="w-2.5 h-2.5 text-[#7B7F9E] shrink-0" />
                )}
                <Tooltip>
                  <TooltipTrigger className="outline-none focus:outline-none">
                    {item.icon ? (
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={34}
                        height={34}
                        className="rounded-md border border-[#1E2A4A] shadow-md hover:border-white/20 transition-colors"
                      />
                    ) : (
                      <div className="w-[34px] h-[34px] rounded-md bg-[#1A2340] border border-[#1E2A4A] flex items-center justify-center text-[10px] text-[#7B7F9E] shadow-md hover:border-white/20 transition-colors">
                        {item.name.slice(0, 2)}
                      </div>
                    )}
                  </TooltipTrigger>
                  <TooltipContent 
                    side="top" 
                    sideOffset={8}
                    className="bg-[#09090B] border border-white/10 px-3 py-2 rounded-md shadow-2xl z-50"
                  >
                    <p className="text-[#3b82f6] text-[13px] font-medium leading-none">{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
}

