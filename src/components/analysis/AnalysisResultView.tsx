import { AlertTriangle, Download } from "lucide-react";

import { AIRecommendationCard } from "@/components/analysis/AIRecommendationCard";
import { ComplianceCard } from "@/components/analysis/ComplianceCard";
import { RfqSummary } from "@/components/analysis/RfqSummary";
import { VendorCard } from "@/components/analysis/VendorCard";
import { VendorRankingTable } from "@/components/analysis/VendorRankingTable";
import { StatusBadge } from "@/components/app/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { decisionTone, formatDate, vendorName, type NormalizedAnalysis } from "@/lib/analysis";

function ManualReviewPanel({ analysis }: { analysis: NormalizedAnalysis }) {
  const rows: { label: string; value: string }[] = [
    { label: "Review reason", value: analysis.reviewReason || "Not specified" },
    { label: "Data complete", value: analysis.dataComplete ? "Yes" : "No" },
    { label: "Missing data reason", value: analysis.missingDataReason || "—" },
    { label: "Compliance passed", value: analysis.compliancePassed ? "Yes" : "No" },
    { label: "Compliance reason", value: analysis.complianceReason || "—" },
  ];

  return (
    <Card className="border-warning/50 bg-warning/10 shadow-card">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-warning/25 text-warning-foreground">
            <AlertTriangle className="size-5" />
          </span>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-warning-foreground">
              Manual Review Required
            </h2>
            <p className="mt-1 text-sm text-warning-foreground/80">
              This procurement workflow requires human review before final approval.
            </p>
          </div>
        </div>
        <dl className="grid gap-3 sm:grid-cols-2">
          {rows.map((row) => (
            <div key={row.label} className="rounded-lg border border-warning/30 bg-surface/70 p-3">
              <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {row.label}
              </dt>
              <dd className="mt-1 text-sm font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

export function AnalysisResultView({
  analysis,
  onDownload,
  downloading = false,
}: {
  analysis: NormalizedAnalysis;
  onDownload?: (() => void) | undefined;
  downloading?: boolean | undefined;
}) {
  const rankings = Array.isArray(analysis.scoring.rankings) ? analysis.scoring.rankings : [];
  const tone = decisionTone(analysis.finalDecision, analysis.requiresManualReview);
  const statusLabel = analysis.requiresManualReview
    ? "Manual Review"
    : (analysis.finalDecision ?? "Completed");

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardContent className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="min-w-0 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold">
                Analysis #{analysis.analysisId ?? "—"}
              </h2>
              <StatusBadge tone={tone}>{statusLabel}</StatusBadge>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Best Vendor
                </p>
                <p className="truncate text-sm font-semibold">{analysis.bestVendor ?? "—"}</p>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Final Decision
                </p>
                <p className="truncate text-sm font-semibold">{analysis.finalDecision ?? "—"}</p>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  RFQ File
                </p>
                <p className="truncate text-sm font-semibold">{analysis.rfqFilename ?? "—"}</p>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Vendors Compared
                </p>
                <p className="num truncate text-sm font-semibold">
                  {analysis.vendorCount ?? analysis.vendors.length}
                </p>
              </div>
            </div>
            {analysis.createdAt ? (
              <p className="text-xs text-muted-foreground">
                Created {formatDate(analysis.createdAt)}
              </p>
            ) : null}
          </div>

          {onDownload ? (
            <Button onClick={onDownload} disabled={downloading} className="justify-self-start">
              <Download className="size-4" />
              {downloading ? "Preparing…" : "Download Procurement Report"}
            </Button>
          ) : null}
        </CardContent>
      </Card>

      {analysis.requiresManualReview ? <ManualReviewPanel analysis={analysis} /> : null}

      <RfqSummary rfq={analysis.rfq} />

      {rankings.length ? (
        <VendorRankingTable rankings={rankings} currency={analysis.rfq.currency} />
      ) : null}

      {analysis.vendors.length ? (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Vendor Details
          </h2>
          <div className="grid gap-4 xl:grid-cols-2">
            {analysis.vendors.map((vendor, index) => (
              <VendorCard
                key={index}
                vendor={vendor}
                index={index}
                isBest={vendorName(vendor, index) === analysis.bestVendor}
              />
            ))}
          </div>
        </section>
      ) : null}

      {analysis.complianceReports.length ? (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Compliance
          </h2>
          <div className="grid gap-4 xl:grid-cols-2">
            {analysis.complianceReports.map((report, index) => (
              <ComplianceCard key={index} report={report} />
            ))}
          </div>
        </section>
      ) : null}

      <AIRecommendationCard
        recommendation={analysis.recommendation}
        manualReview={analysis.requiresManualReview}
      />
    </div>
  );
}
