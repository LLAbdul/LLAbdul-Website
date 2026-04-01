import Image from "next/image";
import type { RuneItem, RuneSetup } from "@/lib/data";

interface RuneDisplayProps {
  runes: RuneItem[] | RuneSetup | null;
}

function RuneSetupDisplay({ runes }: { runes: RuneSetup }) {
  const hasData =
    runes.primary.length > 0 || runes.secondary.length > 0 || runes.shards.length > 0;
  if (!hasData) return null;

  return (
    <div className="space-y-4">
      {runes.primary.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-2">
            Primary
          </h4>
          <div className="flex flex-wrap gap-2">
            {runes.primary.map((name) => (
              <span
                key={name}
                className="px-3 py-1.5 rounded-lg bg-[var(--card)] border border-[var(--primary)]/20 text-sm"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}
      {runes.secondary.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-2">
            Secondary
          </h4>
          <div className="flex flex-wrap gap-2">
            {runes.secondary.map((name) => (
              <span
                key={name}
                className="px-3 py-1.5 rounded-lg bg-[var(--card)] border border-[var(--border)] text-sm"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}
      {runes.shards.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-2">
            Shards
          </h4>
          <div className="flex flex-wrap gap-2">
            {runes.shards.map((name) => (
              <span
                key={name}
                className="px-3 py-1.5 rounded-lg bg-[var(--card)] border border-[var(--border)] text-sm text-[var(--muted-foreground)]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RuneArrayDisplay({ runes }: { runes: RuneItem[] }) {
  if (runes.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {runes.map((rune, i) => (
        <div
          key={`${rune.name}-${i}`}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)]"
        >
          {rune.icon && (
            <Image
              src={rune.icon}
              alt={rune.name}
              width={24}
              height={24}
              className="rounded"
            />
          )}
          <div>
            <span className="text-sm">{rune.name}</span>
            {rune.tree && (
              <span className="text-xs text-[var(--muted-foreground)] ml-1.5">
                {rune.tree}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function RuneDisplay({ runes }: RuneDisplayProps) {
  if (!runes) return null;

  if (Array.isArray(runes)) {
    return <RuneArrayDisplay runes={runes} />;
  }

  return <RuneSetupDisplay runes={runes} />;
}
