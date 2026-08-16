import { Trophy } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { VendorRanking } from "@/api/types";

import {
  formatMoney,
  formatScore,
} from "@/lib/analysis";


// =========================================================
// VENDOR RANKING TABLE
// IMPORTANT: NAMED EXPORT
// =========================================================

export function VendorRankingTable({
  rankings,
  currency,
}: {
  rankings: VendorRanking[];
  currency?: string;
}) {

  const sorted = [...rankings].sort(
    (a, b) =>
      (a.rank ?? 99) - (b.rank ?? 99) ||
      (b.final_score ?? 0) - (a.final_score ?? 0)
  );

  return (

    <Card className="overflow-hidden border-primary/20">

      <CardHeader>

        <CardTitle className="flex items-center gap-2">

          <Trophy className="size-5 text-primary" />

          Vendor Ranking

        </CardTitle>

      </CardHeader>


      <CardContent>

        <div className="overflow-x-auto">

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>
                  Rank
                </TableHead>

                <TableHead>
                  Vendor
                </TableHead>

                <TableHead>
                  Subtotal
                </TableHead>

                <TableHead>
                  Price
                </TableHead>

                <TableHead>
                  Delivery
                </TableHead>

                <TableHead>
                  Compliance
                </TableHead>

                <TableHead>
                  Rating
                </TableHead>

                <TableHead>
                  Warranty
                </TableHead>

                <TableHead>
                  Final Score
                </TableHead>

              </TableRow>

            </TableHeader>


            <TableBody>

              {sorted.map((row, index) => {

                const rank =
                  row.rank ?? index + 1;

                return (

                  <TableRow
                    key={`${row.vendor_name ?? "vendor"}-${index}`}
                    className={
                      rank === 1
                        ? "bg-success/[0.04]"
                        : undefined
                    }
                  >

                    <TableCell className="font-semibold">

                      #{rank}

                    </TableCell>


                    <TableCell>

                      <div className="flex items-center gap-2">

                        <span className="font-semibold">

                          {row.vendor_name ?? "—"}

                        </span>


                        {rank === 1 ? (

                          <span className="rounded-md border border-success/20 bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">

                            BEST

                          </span>

                        ) : null}

                      </div>

                    </TableCell>


                    <TableCell className="whitespace-nowrap">

                      {formatMoney(
                        row.subtotal,
                        currency
                      )}

                    </TableCell>


                    <TableCell>

                      {formatScore(
                        row.price_score
                      )}

                    </TableCell>


                    <TableCell>

                      {formatScore(
                        row.delivery_score
                      )}

                    </TableCell>


                    <TableCell>

                      {formatScore(
                        row.compliance_score
                      )}

                    </TableCell>


                    <TableCell>

                      {formatScore(
                        row.past_rating_score
                      )}

                    </TableCell>


                    <TableCell>

                      {formatScore(
                        row.warranty_score
                      )}

                    </TableCell>


                    <TableCell
                      className={
                        rank === 1
                          ? "font-bold text-success"
                          : "font-bold text-primary"
                      }
                    >

                      {formatScore(
                        row.final_score
                      )}

                    </TableCell>

                  </TableRow>

                );
              })}

            </TableBody>

          </Table>

        </div>


        {/* ================================================= */}
        {/* SCORE COMPARISON */}
        {/* ================================================= */}

        <div className="mt-7 border-t border-border/50 pt-6">

          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">

            Final Score Comparison

          </p>


          <div className="mt-5 space-y-4">

            {sorted.map((row, index) => {

              const score =
                Number(row.final_score) || 0;

              const rank =
                row.rank ?? index + 1;

              return (

                <div
                  key={`score-${row.vendor_name ?? "vendor"}-${index}`}
                  className="grid grid-cols-[150px_minmax(0,1fr)_60px] items-center gap-3"
                >

                  <span className="truncate text-sm font-medium">

                    {row.vendor_name ?? "—"}

                  </span>


                  <div className="h-3 overflow-hidden rounded-full bg-muted">

                    <div
                      className={
                        rank === 1
                          ? "h-full rounded-full bg-success"
                          : "h-full rounded-full bg-primary"
                      }
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(
                            100,
                            score
                          )
                        )}%`,
                      }}
                    />

                  </div>


                  <span
                    className={
                      rank === 1
                        ? "text-right text-sm font-bold text-success"
                        : "text-right text-sm font-bold text-primary"
                    }
                  >

                    {formatScore(score)}

                  </span>

                </div>

              );
            })}

          </div>

        </div>

      </CardContent>

    </Card>

  );
}