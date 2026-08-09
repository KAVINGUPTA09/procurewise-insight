import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

import { getHistory } from "@/api/history";
import { downloadReport } from "@/api/reports";
import { AppShell } from "@/components/app/AppShell";
import { EmptyState } from "@/components/app/EmptyState";
import { ErrorState } from "@/components/app/ErrorState";
import { StatusBadge } from "@/components/app/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { decisionTone, formatDate } from "@/lib/analysis";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Procurement Reports — ProcureMind AI" },
      {
        name: "description",
        content: "Download PDF procurement reports for every completed vendor comparison.",
      },
      { property: "og:title", content: "Procurement Reports — ProcureMind AI" },
      {
        property: "og:description",
        content: "Audit-ready PDF reports for each AI procurement analysis.",
      },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
  });
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  async function handleDownload(id: number) {
    setDownloadingId(id);
    try {
      await downloadReport(id);
    } catch (caught) {
      toast.error(caught instanceof Error ? caught.message : "The report could not be downloaded.");
    } finally {
      setDownloadingId(null);
    }
  }

  const items = data?.history ?? [];

  return (
    <AppShell
      title="Procurement Reports"
      description="Download audit-ready PDF reports for completed analyses"
    >
      {isError ? (
        <ErrorState
          title="Couldn't load your reports"
          message={error instanceof Error ? error.message : undefined}
          onRetry={() => void refetch()}
        />
      ) : isPending ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-40 rounded-xl" />
          ))}
        </div>
      ) : items.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <Card key={item.analysis_id} className="shadow-card">
              <CardContent className="space-y-4 p-5">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <div className="min-w-0">
                    <p className="num text-xs font-medium text-muted-foreground">
                      Analysis #{item.analysis_id}
                    </p>
                    <h3 className="mt-1 truncate text-sm font-semibold">
                      {item.rfq_title ?? item.filename ?? "Procurement analysis"}
                    </h3>
                    <p className="truncate text-xs text-muted-foreground">
                      {item.department ?? "—"} · {formatDate(item.created_at)}
                    </p>
                  </div>
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <FileText className="size-4" />
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    Best vendor
                  </p>
                  <p className="truncate text-sm font-medium">{item.best_vendor ?? "—"}</p>
                </div>

                <StatusBadge
                  tone={decisionTone(item.final_decision, item.requires_manual_review)}
                >
                  {item.requires_manual_review
                    ? "Manual Review"
                    : (item.final_decision ?? "Pending")}
                </StatusBadge>

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    disabled={downloadingId === item.analysis_id}
                    onClick={() => void handleDownload(item.analysis_id)}
                  >
                    <Download className="size-4" />
                    {downloadingId === item.analysis_id ? "Preparing…" : "Download report"}
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link
                      to="/analysis/$analysisId"
                      params={{ analysisId: String(item.analysis_id) }}
                    >
                      View analysis
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No reports available yet"
          description="Reports become available once a procurement analysis has been completed."
          action={
            <Button asChild size="sm">
              <Link to="/new-analysis">Start an analysis</Link>
            </Button>
          }
        />
      )}
    </AppShell>
  );
}
