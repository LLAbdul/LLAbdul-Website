import { cn } from "@/lib/utils";

const phaseConfig = {
  early: { label: "Early Game", accentClass: "text-accent-cyan", dotClass: "bg-accent-cyan" },
  mid: { label: "Mid Game", accentClass: "text-accent-gold", dotClass: "bg-accent-gold" },
  late: { label: "Late Game", accentClass: "text-accent-purple", dotClass: "bg-accent-purple" },
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
    <div className={cn("p-5 rounded-xl bg-surface border border-border", className)}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className={cn("w-2 h-2 rounded-full", config.dotClass)} />
        <h3 className={cn("text-xs font-display font-bold uppercase tracking-[0.15em]", config.accentClass)}>
          {config.label}
        </h3>
      </div>
      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}
