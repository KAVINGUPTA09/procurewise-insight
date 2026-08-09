import { CheckCircle2, XCircle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ComplianceReport } from "@/api/types";
import { formatPercent, itemName, prettifyKey } from "@/lib/analysis";
import { cn } from "@/lib/utils";

function CheckRow({ label, passed }: { label: string; passed: boolean }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      {passed ? (
        <CheckCircle2 className="size-4 shrink-0 text-success" />
      ) : (
        <XCircle className="size-4 shrink-0 text-destructive" />
      )}
      <span className="min-w-0 truncate">{label}</span>
    </li>
  );
}

export function ComplianceCard({ report }: { report: ComplianceReport }) {
  const overall = report.overall_compliance ?? report.compliance_percent;
  const itemChecks = Array.isArray(report.item_compliance)
    ? report.item_compliance
    : Array.isArray(report.items)
      ? report.items
      : [];
  const pct = Number(overall);
  const safePct = Number.isFinite(pct) ? Math.max(0, Math.min(100, pct)) : 0;

  return (
    <Card className="shadow-card">
      <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <CardTitle className="min-w-0 truncate text-base">
          {report.vendor_name ?? "Vendor"}
        </CardTitle>
        <span
          className={cn(
            "num text-sm font-semibold",
            safePct >= 95 ? "text-success" : safePct >= 80 ? "text-primary" : "text-destructive",
          )}
        >
          {formatPercent(overall)}
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        <span className="block h-2 overflow-hidden rounded-full bg-muted">
          <span
            className={cn(
              "block h-full rounded-full",
              safePct >= 95 ? "bg-success" : safePct >= 80 ? "bg-primary" : "bg-destructive",
            )}
            style={{ width: `${safePct}%` }}
          />
        </span>

        <ul className="space-y-2">
          <CheckRow label="Delivery requirement met" passed={Boolean(report.delivery_match)} />
          <CheckRow label="Warranty requirement met" passed={Boolean(report.warranty_match)} />
        </ul>

        <p className="text-sm text-muted-foreground">
          Checks passed:{" "}
          <span className="num font-semibold text-foreground">
            {report.passed_checks ?? "—"} / {report.total_checks ?? "—"}
          </span>
        </p>

        {itemChecks.length ? (
          <Accordion type="single" collapsible className="border-t pt-1">
            {itemChecks.map((entry, index) => {
              const checks = (entry.checks ?? {}) as Record<string, unknown>;
              const rows = Object.entries(checks);
              return (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-sm">{itemName(entry)}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {rows.length ? (
                        rows.map(([key, value]) => (
                          <CheckRow key={key} label={prettifyKey(key)} passed={Boolean(value)} />
                        ))
                      ) : (
                        <li className="text-sm text-muted-foreground">
                          No item-level checks reported.
                        </li>
                      )}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : null}
      </CardContent>
    </Card>
  );
}
