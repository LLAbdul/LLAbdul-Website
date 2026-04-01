import { cn } from "@/lib/utils";

const difficultyConfig: Record<string, { label: string; className: string }> = {
  EASY: {
    label: "Easy",
    className: "bg-difficulty-easy/20 text-difficulty-easy border-difficulty-easy/30",
  },
  SKILL: {
    label: "Skill",
    className: "bg-difficulty-skill/20 text-difficulty-skill border-difficulty-skill/30",
  },
  HARD: {
    label: "Hard",
    className: "bg-difficulty-hard/20 text-difficulty-hard border-difficulty-hard/30",
  },
};

interface DifficultyBadgeProps {
  difficulty: string;
  className?: string;
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  const normalized = difficulty.toUpperCase();
  const config = difficultyConfig[normalized] ?? {
    label: difficulty,
    className: "bg-difficulty-hard/20 text-difficulty-hard border-difficulty-hard/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border uppercase tracking-wide",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
