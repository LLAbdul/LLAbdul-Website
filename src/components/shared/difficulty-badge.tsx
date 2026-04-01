import { Badge } from "@/components/ui/badge";

const config: Record<string, { label: string; style: React.CSSProperties }> = {
  EASY: {
    label: "Easy",
    style: {
      background: "rgba(39,174,96,0.12)",
      color: "#27AE60",
      borderColor: "rgba(39,174,96,0.30)",
    },
  },
  SKILL: {
    label: "Skill",
    style: {
      background: "rgba(200,170,110,0.12)",
      color: "#C8AA6E",
      borderColor: "rgba(200,170,110,0.30)",
    },
  },
  HARD: {
    label: "Hard",
    style: {
      background: "rgba(231,76,60,0.12)",
      color: "#E74C3C",
      borderColor: "rgba(231,76,60,0.30)",
    },
  },
};

export function DifficultyBadge({
  difficulty,
  className,
}: {
  difficulty: string;
  className?: string;
}) {
  const c = config[difficulty.toUpperCase()] ?? config.HARD;

  return (
    <Badge
      variant="outline"
      className={`text-[10px] font-semibold uppercase tracking-widest ${className ?? ""}`}
      style={c.style}
    >
      {c.label}
    </Badge>
  );
}
