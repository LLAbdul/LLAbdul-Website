import { Card, CardContent } from "@/components/ui/card";

const phaseConfig = {
  early: { label: "Early Game", color: "text-accent-cyan" },
  mid: { label: "Mid Game", color: "text-accent-gold" },
  late: { label: "Late Game", color: "text-primary" },
} as const;

export function PhaseStrategy({ phase, content }: { phase: "early" | "mid" | "late"; content: string }) {
  if (!content) return null;
  const { label, color } = phaseConfig[phase];

  return (
    <Card>
      <CardContent>
        <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${color}`}>{label}</h3>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </CardContent>
    </Card>
  );
}
