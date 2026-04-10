import { Card, CardContent } from "@/components/ui/card";

type Phase = "early" | "mid" | "late";

const phaseConfig: Record<Phase, { label: string; dotColor: string; labelColor: string; bgGlow: string }> = {
  early: {
    label: "Early Game & Laning",
    dotColor: "#C9082A",
    labelColor: "#C9082A",
    bgGlow: "from-[#C9082A]/20 to-transparent",
  },
  mid: {
    label: "Mid Game & Skirmishing",
    dotColor: "#FFD700",
    labelColor: "#FFD700",
    bgGlow: "from-[#FFD700]/20 to-transparent",
  },
  late: {
    label: "Late Game & Teamfights",
    dotColor: "#A0A5C0",
    labelColor: "#E8E8ED",
    bgGlow: "from-[#A0A5C0]/20 to-transparent",
  },
};

export function PhaseStrategy({ phase, content }: { phase: Phase; content: string }) {
  if (!content) return null;
  const { label, dotColor, labelColor, bgGlow } = phaseConfig[phase];

  return (
    <Card className="relative bg-white/5 backdrop-blur-xl border-white/10 rounded-2xl overflow-hidden shadow-xl group hover:bg-white/[0.07] transition-colors">
      <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r ${bgGlow}`} />
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${bgGlow} opacity-50`} />
      <CardContent className="p-6 sm:p-8 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
            style={{ background: dotColor, boxShadow: `0 0 12px ${dotColor}90` }}
          />
          <h3
            className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold"
            style={{ color: labelColor }}
          >
            {label}
          </h3>
        </div>
        <p className="text-[15px] sm:text-base leading-relaxed whitespace-pre-wrap text-[#E8E8ED]/90 font-light tracking-wide">{content}</p>
      </CardContent>
    </Card>
  );
}
