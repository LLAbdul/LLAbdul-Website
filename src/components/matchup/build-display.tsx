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
      <div className="flex items-center gap-1 flex-wrap">
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
                  width={34}
                  height={34}
                  className="rounded-md border border-[#1E2A4A]"
                />
              ) : (
                <div className="w-[34px] h-[34px] rounded-md bg-[#1A2340] border border-[#1E2A4A] flex items-center justify-center text-[10px] text-[#7B7F9E]">
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
