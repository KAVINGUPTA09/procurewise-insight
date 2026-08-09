import { Trophy } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { VendorRanking } from "@/api/types";
import { formatMoney, formatScore } from "@/lib/analysis";
import { cn } from "@/lib/utils";

function ScoreCell({ value }: { value: unknown }) {
  const num = Number(value);
  const pct = Number.isFinite(num) ? Math.max(0, Math.min(100, num)) : 0;
  return (
    <div className="min-w-[86px]">
      <span className="num text-xs font-medium">{formatScore(value)}</span>
      <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-muted">
        <span
          className={cn(
            "block h-full rounded-full",
            pct >= 90 ? "bg-success" : pct >= 70 ? "bg-primary" : "bg-warning",
          )}
          style={{ width: `${pct}%` }}
        />
      </span>
    </div>
  );
}

export function VendorRankingTable({
  rankings,
  currency,
}: {
  rankings: VendorRanking[];
  currency?: string | undefined;
}) {
  const sorted = [...rankings].sort(
    (a, b) => (a.rank ?? 99) - (b.rank ?? 99) || (b.final_score ?? 0) - (a.final_score ?? 0),
  );
  const max = Math.max(...sorted.map((r) => Number(r.final_score) || 0), 1);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-base">Vendor Ranking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="w-full overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="whitespace-nowrap">Rank</TableHead>
                <TableHead className="whitespace-nowrap">Vendor</TableHead>
                <TableHead className="whitespace-nowrap">Subtotal</TableHead>
                <TableHead className="whitespace-nowrap">Price</TableHead>
                <TableHead className="whitespace-nowrap">Delivery</TableHead>
                <TableHead className="whitespace-nowrap">Compliance</TableHead>
                <TableHead className="whitespace-nowrap">Rating</TableHead>
                <TableHead className="whitespace-nowrap">Warranty</TableHead>
                <TableHead className="whitespace-nowrap text-right">Final Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((row, index) => {
                const isTop = (row.rank ?? index + 1) === 1;
                return (
                  <TableRow key={`${row.vendor_name}-${index}`} className={cn(isTop && "bg-success/5")}>
                    <TableCell className="num whitespace-nowrap font-semibold">
                      {isTop ? (
                        <span className="inline-flex items-center gap-1.5 text-success">
                          <Trophy className="size-4" />#{row.rank ?? 1}
                        </span>
                      ) : (
                        `#${row.rank ?? index + 1}`
                      )}
                    </TableCell>
                    <TableCell className="max-w-[220px] truncate font-medium">
                      {row.vendor_name ?? "—"}
                    </TableCell>
                    <TableCell className="num whitespace-nowrap">
                      {formatMoney(row.subtotal, currency)}
                    </TableCell>
                    <TableCell>
                      <ScoreCell value={row.price_score} />
                    </TableCell>
                    <TableCell>
                      <ScoreCell value={row.delivery_score} />
                    </TableCell>
                    <TableCell>
                      <ScoreCell value={row.compliance_score} />
                    </TableCell>
                    <TableCell>
                      <ScoreCell value={row.past_rating_score} />
                    </TableCell>
                    <TableCell>
                      <ScoreCell value={row.warranty_score} />
                    </TableCell>
                    <TableCell className="num whitespace-nowrap text-right text-sm font-semibold">
                      {formatScore(row.final_score)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Final score comparison
          </p>
          {sorted.map((row, index) => {
            const score = Number(row.final_score) || 0;
            const isTop = (row.rank ?? index + 1) === 1;
            return (
              <div
                key={`bar-${row.vendor_name}-${index}`}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:grid-cols-[180px_minmax(0,1fr)_auto]"
              >
                <span className="truncate text-sm font-medium">{row.vendor_name ?? "—"}</span>
                <span className="order-3 h-2.5 overflow-hidden rounded-full bg-muted sm:order-none">
                  <span
                    className={cn("block h-full rounded-full", isTop ? "bg-success" : "bg-primary/70")}
                    style={{ width: `${(score / max) * 100}%` }}
                  />
                </span>
                <span className="num text-sm font-semibold">{formatScore(score)}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
