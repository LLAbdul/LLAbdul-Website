import Image from "next/image";
import type { BuildItem } from "@/lib/data";

interface BuildDisplayProps {
  items: BuildItem[];
  label: string;
}

export function BuildDisplay({ items, label }: BuildDisplayProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)]"
          >
            {item.icon && (
              <Image
                src={item.icon}
                alt={item.name}
                width={32}
                height={32}
                className="rounded"
              />
            )}
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
