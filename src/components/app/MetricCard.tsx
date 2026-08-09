import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: React.ReactNode;
  hint?: string | undefined;
  icon?: React.ComponentType<{ className?: string }> | undefined;
  tone?: "default" | "success" | "warning" | undefined;
}) {
  return (
    <Card className="border shadow-card">
      <CardContent className="flex items-start justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p
            className={cn(
              "num mt-2 truncate text-2xl font-semibold",
              tone === "success" && "text-success",
              tone === "warning" && "text-warning-foreground",
            )}
            title={typeof value === "string" ? value : undefined}
          >
            {value}
          </p>
          {hint ? <p className="mt-1 truncate text-xs text-muted-foreground">{hint}</p> : null}
        </div>
        {Icon ? (
          <span
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground",
              tone === "success" && "bg-success/10 text-success",
              tone === "warning" && "bg-warning/15 text-warning-foreground",
            )}
          >
            <Icon className="size-5" />
          </span>
        ) : null}
      </CardContent>
    </Card>
  );
}
