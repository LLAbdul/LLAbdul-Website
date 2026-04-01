import Image from "next/image";
import type { ResolvedRuneSetup } from "@/lib/data";

interface RuneDisplayProps {
  runes: ResolvedRuneSetup | null;
}

function RuneIcon({ icon, name, size = 32 }: { icon: string; name: string; size?: number }) {
  if (!icon) {
    return (
      <div
        className="rounded-full bg-muted flex items-center justify-center text-[10px] text-muted-foreground"
        style={{ width: size, height: size }}
        title={name}
      >
        ?
      </div>
    );
  }
  return (
    <Image
      src={icon}
      alt={name}
      width={size}
      height={size}
      className="rounded-full"
      title={name}
    />
  );
}

export function RuneDisplay({ runes }: RuneDisplayProps) {
  if (!runes) return null;

  const hasPrimary = runes.primary.length > 0;
  const hasSecondary = runes.secondary.length > 0;
  const hasShards = runes.shards.length > 0;

  if (!hasPrimary && !hasSecondary) return null;

  // Determine tree names from first rune in each group
  const primaryTree = runes.primary[0]?.tree || "Primary";
  const secondaryTree = runes.secondary[0]?.tree || "Secondary";

  return (
    <div className="flex gap-6 flex-wrap">
      {/* Primary tree */}
      {hasPrimary && (
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground">{primaryTree}</div>
          <div className="flex gap-1.5">
            {runes.primary.map((r, i) => (
              <RuneIcon key={`p-${i}`} icon={r.icon} name={r.name} size={i === 0 ? 36 : 28} />
            ))}
          </div>
        </div>
      )}

      {/* Secondary tree */}
      {hasSecondary && (
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground">{secondaryTree}</div>
          <div className="flex gap-1.5">
            {runes.secondary.map((r, i) => (
              <RuneIcon key={`s-${i}`} icon={r.icon} name={r.name} size={28} />
            ))}
          </div>
        </div>
      )}

      {/* Shards */}
      {hasShards && (
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground">Shards</div>
          <div className="flex gap-1.5">
            {runes.shards.map((shard, i) => (
              <div
                key={`sh-${i}`}
                className="px-2 py-1 rounded bg-muted text-[11px] text-muted-foreground"
                title={shard}
              >
                {shard}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
