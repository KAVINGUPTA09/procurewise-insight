import { cn } from "@/lib/utils";
import type { DecisionTone } from "@/lib/analysis";

const toneStyles: Record<DecisionTone, string> = {
  approved: "bg-success/10 text-success border-success/25",
  review: "bg-warning/15 text-warning-foreground border-warning/40",
  rejected: "bg-destructive/10 text-destructive border-destructive/25",
  neutral: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: DecisionTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        toneStyles[tone],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
