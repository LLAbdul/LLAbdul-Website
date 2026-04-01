import { cn } from "@/lib/utils";

const phaseConfig = {
  early: { label: "Early Game", color: "var(--color-accent-cyan)" },
  mid: { label: "Mid Game", color: "var(--color-accent-gold)" },
  late: { label: "Late Game", color: "var(--primary)" },
} as const;

interface PhaseStrategyProps {
  phase: "early" | "mid" | "late";
  content: string;
  className?: string;
}

export function PhaseStrategy({ phase, content, className }: PhaseStrategyProps) {
  const config = phaseConfig[phase];

  if (!content) return null;

  return (
    <div className={cn("p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]", className)}>
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: config.color }}
        />
        <h3
          className="text-sm font-semibold uppercase tracking-wide"
          style={{ color: config.color }}
        >
          {config.label}
        </h3>
      </div>
      <p className="text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}
