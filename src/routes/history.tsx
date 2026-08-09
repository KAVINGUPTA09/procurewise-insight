import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { deleteAnalysis, getHistory } from "@/api/history";
import { downloadReport } from "@/api/reports";
import { AppShell } from "@/components/app/AppShell";
import { ConfirmDeleteDialog } from "@/components/app/ConfirmDeleteDialog";
import { EmptyState } from "@/components/app/EmptyState";
import { ErrorState } from "@/components/app/ErrorState";
import { HistoryTable } from "@/components/app/HistoryTable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { HistoryItem } from "@/api/types";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Procurement History — ProcureMind AI" },
      {
        name: "description",
        content:
          "Review every past procurement analysis, download reports and manage saved vendor comparisons.",
      },
      { property: "og:title", content: "Procurement History — ProcureMind AI" },
      {
        property: "og:description",
        content: "All of your saved RFQ comparisons, decisions and reports in one place.",
      },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const queryClient = useQueryClient();
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
  });
  const [target, setTarget] = useState<HistoryItem | null>(null);
  const [deleting, setDeleting] = useState(false);
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

  async function handleDelete() {
    if (!target) return;
    setDeleting(true);
    try {
      await deleteAnalysis(target.analysis_id);
      toast.success(`Analysis #${target.analysis_id} deleted.`);
      setTarget(null);
      await queryClient.invalidateQueries({ queryKey: ["history"] });
    } catch (caught) {
      toast.error(caught instanceof Error ? caught.message : "The analysis could not be deleted.");
    } finally {
      setDeleting(false);
    }
  }

  const items = data?.history ?? [];

  return (
    <AppShell
      title="Procurement History"
      description="Every saved analysis, decision and report"
      actions={
        <Button asChild variant="outline" size="sm">
          <Link to="/new-analysis">New analysis</Link>
        </Button>
      }
    >
      {isError ? (
        <ErrorState
          title="Couldn't load your procurement history"
          message={error instanceof Error ? error.message : undefined}
          onRetry={() => void refetch()}
        />
      ) : isPending ? (
        <Skeleton className="h-72 rounded-xl" />
      ) : items.length ? (
        <HistoryTable
          items={items}
          onDownload={(id) => void handleDownload(id)}
          onDelete={setTarget}
          downloadingId={downloadingId}
        />
      ) : (
        <EmptyState
          title="No procurement analyses yet"
          description="Run your first comparison to build up procurement history."
          action={
            <Button asChild size="sm">
              <Link to="/new-analysis">Start an analysis</Link>
            </Button>
          }
        />
      )}

      <ConfirmDeleteDialog
        open={Boolean(target)}
        onOpenChange={(open) => !open && setTarget(null)}
        onConfirm={() => void handleDelete()}
        pending={deleting}
      />
    </AppShell>
  );
}
