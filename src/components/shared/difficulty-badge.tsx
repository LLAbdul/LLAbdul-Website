import { Badge } from "@/components/ui/badge";

const config: Record<string, { label: string; className: string }> = {
  EASY: { label: "Easy", className: "bg-difficulty-easy/15 text-difficulty-easy border-difficulty-easy/25 hover:bg-difficulty-easy/15" },
  SKILL: { label: "Skill", className: "bg-difficulty-skill/15 text-difficulty-skill border-difficulty-skill/25 hover:bg-difficulty-skill/15" },
  HARD: { label: "Hard", className: "bg-difficulty-hard/15 text-difficulty-hard border-difficulty-hard/25 hover:bg-difficulty-hard/15" },
};

export function DifficultyBadge({ difficulty, className }: { difficulty: string; className?: string }) {
  const c = config[difficulty.toUpperCase()] ?? {
    label: difficulty,
    className: "bg-difficulty-hard/15 text-difficulty-hard border-difficulty-hard/25 hover:bg-difficulty-hard/15",
  };

  return (
    <Badge variant="outline" className={`${c.className} text-[11px] font-semibold uppercase tracking-wide ${className ?? ""}`}>
      {c.label}
    </Badge>
  );
}
