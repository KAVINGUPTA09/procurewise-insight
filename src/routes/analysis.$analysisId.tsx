import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BrainCircuit } from "lucide-react";
import { toast } from "sonner";

import { getAnalysis } from "@/api/history";
import { downloadReport } from "@/api/reports";
import { AnalysisResultView } from "@/components/analysis/AnalysisResultView";
import { AppShell } from "@/components/app/AppShell";
import { ErrorState } from "@/components/app/ErrorState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { normalizeAnalysis } from "@/lib/analysis";

export const Route = createFileRoute("/analysis/$analysisId")({
  head: () => ({ meta: [{ title: "Procurement Analysis Result — ProcureMind AI" }] }),
  component: AnalysisDetailPage,
});

function AnalysisDetailPage() {
  const { analysisId } = Route.useParams();
  const [downloading, setDownloading] = useState(false);
  const { data, isPending, isError, error, refetch } = useQuery({ queryKey: ["analysis", analysisId], queryFn: () => getAnalysis(analysisId) });

  async function handleDownload() {
    setDownloading(true);
    try { await downloadReport(analysisId); }
    catch (caught) { toast.error(caught instanceof Error ? caught.message : "The report could not be downloaded."); }
    finally { setDownloading(false); }
  }

  return (
    <AppShell
      title={`Analysis #${analysisId}`}
      description="Vendor comparison, compliance and AI recommendation"
      actions={<Button asChild><Link to="/intelligence/$analysisId" params={{ analysisId }}><BrainCircuit className="size-4" /> Decision Intelligence</Link></Button>}
    >
      {isError ? <ErrorState title="Couldn't load this analysis" message={error instanceof Error ? error.message : undefined} onRetry={() => void refetch()} /> : isPending ? <div className="space-y-4"><Skeleton className="h-40 rounded-xl" /><Skeleton className="h-64 rounded-xl" /><Skeleton className="h-64 rounded-xl" /></div> : <AnalysisResultView analysis={normalizeAnalysis(data)} onDownload={() => void handleDownload()} downloading={downloading} />}
    </AppShell>
  );
}
