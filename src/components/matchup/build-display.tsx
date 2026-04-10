import Image from "next/image";
import type { BuildItem } from "@/lib/data";
import { ArrowRight } from "lucide-react";

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
      <div className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <div key={`${item.name}-${i}`} className="flex items-center gap-1">
            {showArrows && i > 0 && (
              <ArrowRight className="w-3 h-3 text-[#7B7F9E] shrink-0" />
            )}
            <div title={item.name}>
              {item.icon ? (
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={32}
                  height={32}
                  className="rounded-md border border-[#1E2A4A] shadow-md hover:border-white/20 transition-colors"
                />
              ) : (
                <div className="w-8 h-8 rounded-md bg-[#1A2340] border border-[#1E2A4A] flex items-center justify-center text-[10px] text-[#7B7F9E] shadow-md hover:border-white/20 transition-colors">
                  {item.name.slice(0, 2)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
