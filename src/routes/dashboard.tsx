import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, FilePlus2, ShieldAlert, Trophy, Gavel } from "lucide-react";

import { getHistory } from "@/api/history";
import { AppShell } from "@/components/app/AppShell";
import { EmptyState } from "@/components/app/EmptyState";
import { ErrorState } from "@/components/app/ErrorState";
import { HistoryTable } from "@/components/app/HistoryTable";
import { MetricCard } from "@/components/app/MetricCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Procurement Intelligence Dashboard — ProcureMind AI" },
      {
        name: "description",
        content:
          "Track procurement analyses, recommended vendors and decisions across your organisation.",
      },
      { property: "og:title", content: "Procurement Intelligence Dashboard — ProcureMind AI" },
      {
        property: "og:description",
        content: "Vendor scoring, compliance outcomes and AI procurement decisions at a glance.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
  });

  const items = data?.history ?? [];
  const latest = items[0];
  const manualReviewCount = items.filter(
    (item) =>
      item.requires_manual_review ||
      (item.final_decision ?? "").toLowerCase().includes("review"),
  ).length;

  return (
    <AppShell
      title="Procurement Intelligence Dashboard"
      description="Vendor comparisons, compliance outcomes and AI recommendations"
      actions={
        <Button asChild>
          <Link to="/new-analysis">
            <FilePlus2 className="size-4" />
            New Procurement Analysis
          </Link>
        </Button>
      }
    >
      <div className="space-y-6">
        {isError ? (
          <ErrorState
            title="Couldn't load your procurement history"
            message={error instanceof Error ? error.message : undefined}
            onRetry={() => void refetch()}
          />
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {isPending ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-[104px] rounded-xl" />
            ))
          ) : (
            <>
              <MetricCard
                label="Total Analyses"
                value={data?.total_analyses ?? items.length}
                icon={BarChart3}
              />
              <MetricCard
                label="Latest Best Vendor"
                value={latest?.best_vendor ?? "—"}
                hint={latest ? `Analysis #${latest.analysis_id}` : undefined}
                icon={Trophy}
                tone="success"
              />
              <MetricCard
                label="Latest Decision"
                value={latest?.final_decision ?? "—"}
                hint={latest?.rfq_title ?? undefined}
                icon={Gavel}
              />
              <MetricCard
                label="Manual Review"
                value={manualReviewCount}
                hint="Analyses awaiting human approval"
                icon={ShieldAlert}
                tone={manualReviewCount ? "warning" : "default"}
              />
            </>
          )}
        </div>

        <section className="space-y-4">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <h2 className="truncate text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Recent Procurement Analyses
            </h2>
            <Button asChild variant="outline" size="sm">
              <Link to="/history">View all</Link>
            </Button>
          </div>

          {isPending ? (
            <Skeleton className="h-64 rounded-xl" />
          ) : items.length ? (
            <HistoryTable items={items.slice(0, 8)} compact />
          ) : (
            <EmptyState
              title="No procurement analyses yet"
              description="Upload an RFQ and at least two vendor quotations to generate your first AI procurement recommendation."
              action={
                <Button asChild size="sm">
                  <Link to="/new-analysis">Start an analysis</Link>
                </Button>
              }
            />
          )}
        </section>
      </div>
    </AppShell>
  );
}
