import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Play } from "lucide-react";

import { runComparison } from "@/api/procurement";
import { ApiError } from "@/api/client";
import { AppShell } from "@/components/app/AppShell";
import { ErrorState } from "@/components/app/ErrorState";
import { FileUploader } from "@/components/app/FileUploader";
import { LoadingAnalysis } from "@/components/app/LoadingAnalysis";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/new-analysis")({
  head: () => ({
    meta: [
      { title: "New Procurement Analysis — ProcureMind AI" },
      {
        name: "description",
        content:
          "Upload an RFQ and vendor quotation PDFs to run compliance checks, vendor scoring and an AI recommendation.",
      },
      { property: "og:title", content: "New Procurement Analysis — ProcureMind AI" },
      {
        property: "og:description",
        content: "Compare vendor quotations against your RFQ in a single AI-assisted workflow.",
      },
    ],
  }),
  component: NewAnalysisPage,
});

function Step({
  index,
  title,
  description,
  children,
}: {
  index: number;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-base">
          <span className="num grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {index}
          </span>
          <span className="min-w-0">
            <span className="block truncate">{title}</span>
            <span className="block truncate text-xs font-normal text-muted-foreground">
              {description}
            </span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function NewAnalysisPage() {
  const navigate = useNavigate();
  const [rfqFiles, setRfqFiles] = useState<File[]>([]);
  const [vendorFiles, setVendorFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  const rfqFile = rfqFiles[0];
  const canRun = Boolean(rfqFile) && vendorFiles.length >= 2;

  async function handleRun() {
    setError(null);
    if (!rfqFile) return setError("Upload the RFQ PDF to continue.");
    if (vendorFiles.length < 2)
      return setError("Upload at least two vendor quotation PDFs to run a comparison.");

    setRunning(true);
    try {
      const result = await runComparison(rfqFile, vendorFiles);
      const id = result.analysis_id;
      if (id === undefined || id === null) {
        setError("The analysis completed but no analysis reference was returned.");
        return;
      }
      await navigate({ to: "/analysis/$analysisId", params: { analysisId: String(id) } });
    } catch (caught) {
      setError(
        caught instanceof ApiError
          ? caught.message
          : "The procurement service could not be reached. Please try again.",
      );
    } finally {
      setRunning(false);
    }
  }

  return (
    <AppShell
      title="New Procurement Analysis"
      description="Upload your RFQ and vendor quotations to run the AI procurement workflow"
    >
      {running ? (
        <LoadingAnalysis />
      ) : (
        <div className="space-y-5">
          <Step
            index={1}
            title="Upload RFQ document"
            description="One RFQ PDF describing your requirements"
          >
            <FileUploader
              files={rfqFiles}
              onChange={setRfqFiles}
              label="Upload RFQ PDF"
              hint="Drag & drop the RFQ PDF here, or click to browse"
            />
          </Step>

          <Step
            index={2}
            title="Upload vendor quotations"
            description="At least two vendor quotation PDFs"
          >
            <FileUploader
              multiple
              files={vendorFiles}
              onChange={setVendorFiles}
              label="Upload vendor quotation PDFs"
              hint="Drag & drop multiple PDFs here, or click to browse"
            />
            {vendorFiles.length > 0 && vendorFiles.length < 2 ? (
              <p className="mt-3 text-sm text-warning-foreground">
                Add at least one more vendor quotation — comparisons need a minimum of two vendors.
              </p>
            ) : null}
          </Step>

          {error ? <ErrorState title="Analysis could not start" message={error} /> : null}

          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" disabled={!canRun} onClick={() => void handleRun()}>
              <Play className="size-4" />
              Run AI Procurement Analysis
            </Button>
            <p className="text-sm text-muted-foreground">
              {canRun
                ? `Comparing ${vendorFiles.length} vendors against your RFQ.`
                : "One RFQ and two or more vendor quotations are required."}
            </p>
          </div>
        </div>
      )}
    </AppShell>
  );
}
