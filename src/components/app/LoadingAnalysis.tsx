import { useEffect, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const STEPS = [
  "Reading procurement documents",
  "Extracting RFQ requirements",
  "Analyzing vendor quotations",
  "Checking technical compliance",
  "Ranking vendors",
  "Running LangGraph workflow",
  "Generating AI recommendation",
  "Saving procurement analysis",
];

export function LoadingAnalysis() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1 < STEPS.length ? current + 1 : current));
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="border shadow-lift">
      <CardContent className="space-y-6 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <Loader2 className="size-5 shrink-0 animate-spin text-primary" />
          <div className="min-w-0">
            <h2 className="text-base font-semibold">Running AI procurement analysis</h2>
            <p className="text-sm text-muted-foreground">
              This can take a couple of minutes. Please keep this tab open.
            </p>
          </div>
        </div>

        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-label="Analysis in progress"
        >
          <div className="h-full w-1/3 animate-[pulse_1.6s_ease-in-out_infinite] rounded-full bg-primary" />
        </div>

        <ol className="space-y-2.5">
          {STEPS.map((step, i) => {
            const done = i < index;
            const active = i === index;
            return (
              <li
                key={step}
                className={
                  active
                    ? "flex items-center gap-2.5 text-sm font-medium text-foreground"
                    : done
                      ? "flex items-center gap-2.5 text-sm text-muted-foreground"
                      : "flex items-center gap-2.5 text-sm text-muted-foreground/60"
                }
              >
                {done ? (
                  <CheckCircle2 className="size-4 shrink-0 text-success" />
                ) : active ? (
                  <Loader2 className="size-4 shrink-0 animate-spin text-primary" />
                ) : (
                  <span className="size-4 shrink-0 rounded-full border" />
                )}
                <span className="min-w-0 truncate">{step}</span>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
