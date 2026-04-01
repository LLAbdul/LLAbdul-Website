import { Card, CardContent } from "@/components/ui/card";

type Phase = "early" | "mid" | "late";

const phaseConfig: Record<Phase, { label: string; dotColor: string; labelColor: string }> = {
  early: {
    label: "Early Game",
    dotColor: "#0AC8B9",
    labelColor: "#0AC8B9",
  },
  mid: {
    label: "Mid Game",
    dotColor: "#C8AA6E",
    labelColor: "#C8AA6E",
  },
  late: {
    label: "Late Game",
    dotColor: "#E8E8ED",
    labelColor: "#E8E8ED",
  },
};

export function PhaseStrategy({ phase, content }: { phase: Phase; content: string }) {
  if (!content) return null;
  const { label, dotColor, labelColor } = phaseConfig[phase];

  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-2 mb-2.5">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: dotColor }}
          />
          <h3
            className="text-[11px] uppercase tracking-widest font-semibold"
            style={{ color: labelColor }}
          >
            {label}
          </h3>
        </div>
        <p className="text-sm leading-relaxed whitespace-pre-wrap text-[#E8E8ED]">{content}</p>
      </CardContent>
    </Card>
  );
}
