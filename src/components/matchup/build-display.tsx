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
      <h3 className="text-xs font-medium text-muted-foreground">{label}</h3>
      <div className="flex items-center gap-1.5 flex-wrap">
        {items.map((item, i) => (
          <div key={`${item.name}-${i}`} className="flex items-center gap-1.5">
            {showArrows && i > 0 && (
              <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />
            )}
            <div className="relative group" title={item.name}>
              {item.icon ? (
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="rounded border border-border"
                />
              ) : (
                <div className="w-10 h-10 rounded bg-muted border border-border flex items-center justify-center text-[10px] text-muted-foreground">
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
