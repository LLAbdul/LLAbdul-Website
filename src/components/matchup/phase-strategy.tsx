export type Phase = "early" | "mid" | "late";

const phaseConfig: Record<Phase, { label: string; dotColor: string; labelColor: string }> = {
  early: {
    label: "Early Game",
    dotColor: "#C9082A",
    labelColor: "#C9082A",
  },
  mid: {
    label: "Mid Game",
    dotColor: "#FFD700",
    labelColor: "#FFD700",
  },
  late: {
    label: "Late Game",
    dotColor: "#A0A5C0",
    labelColor: "#A0A5C0",
  },
};

export function PhaseStrategy({ phase, content, isLast = false }: { phase: Phase; content: string; isLast?: boolean }) {
  if (!content) return null;
  const { label, dotColor, labelColor } = phaseConfig[phase];

  return (
    <div className="relative pl-8 pb-8">
      {/* Vertical Line */}
      {!isLast && (
        <div className="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-white/10" />
      )}
      
      {/* Dot */}
      <div 
        className="absolute left-0 top-[6px] w-6 h-6 rounded-full border-4 border-[#030509] flex items-center justify-center shadow-lg"
        style={{ backgroundColor: dotColor, boxShadow: `0 0 12px ${dotColor}60` }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-colors">
        <h3 
          className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold mb-3"
          style={{ color: labelColor }}
        >
          {label}
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-relaxed whitespace-pre-wrap text-[#E8E8ED]/90 font-light">
          {content}
        </p>
      </div>
    </div>
  );
}
