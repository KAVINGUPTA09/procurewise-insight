import {
  AlertTriangle,
  Building2,
  CalendarDays,
  CheckCircle2,
  Download,
  FileText,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

import { AIRecommendationCard } from "@/components/analysis/AIRecommendationCard";
import { ComplianceCard } from "@/components/analysis/ComplianceCard";
import { RfqSummary } from "@/components/analysis/RfqSummary";
import { VendorCard } from "@/components/analysis/VendorCard";
import { VendorRankingTable } from "@/components/analysis/VendorRankingTable";

import { StatusBadge } from "@/components/app/StatusBadge";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  decisionTone,
  formatDate,
  vendorName,
  type NormalizedAnalysis,
} from "@/lib/analysis";


// =========================================================
// Small KPI Card
// =========================================================

function MetricCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  description?: string;
}) {
  return (
    <Card className="border-border/70 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">

      <CardContent className="flex items-start gap-4 p-5">

        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>

          <p className="mt-1 truncate text-xl font-semibold tracking-tight">
            {value}
          </p>

          {description ? (
            <p className="mt-1 text-xs text-muted-foreground">
              {description}
            </p>
          ) : null}

        </div>

      </CardContent>

    </Card>
  );
}


// =========================================================
// Manual Review Panel
// =========================================================

function ManualReviewPanel({
  analysis,
}: {
  analysis: NormalizedAnalysis;
}) {

  const rows: {
    label: string;
    value: string;
  }[] = [

    {
      label: "Review reason",
      value:
        analysis.reviewReason ||
        "Not specified",
    },

    {
      label: "Data complete",
      value:
        analysis.dataComplete
          ? "Yes"
          : "No",
    },

    {
      label: "Missing data reason",
      value:
        analysis.missingDataReason ||
        "—",
    },

    {
      label: "Compliance passed",
      value:
        analysis.compliancePassed
          ? "Yes"
          : "No",
    },

    {
      label: "Compliance reason",
      value:
        analysis.complianceReason ||
        "—",
    },
  ];


  return (

    <Card className="overflow-hidden border-amber-300/60 bg-amber-50/50 shadow-sm dark:bg-amber-950/10">

      <CardContent className="p-0">

        <div className="flex items-start gap-4 border-b border-amber-200/60 p-6">

          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
            <AlertTriangle className="size-5" />
          </div>

          <div>

            <h2 className="text-base font-semibold text-amber-900 dark:text-amber-200">
              Manual Review Required
            </h2>

            <p className="mt-1 text-sm text-amber-800/80 dark:text-amber-300/80">
              This procurement workflow requires human review before final approval.
            </p>

          </div>

        </div>


        <div className="grid gap-px bg-amber-200/40 sm:grid-cols-2 xl:grid-cols-5">

          {rows.map(
            (row) => (

              <div
                key={row.label}
                className="bg-background/80 p-4"
              >

                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {row.label}
                </p>

                <p className="mt-1 text-sm font-medium">
                  {row.value}
                </p>

              </div>

            )
          )}

        </div>

      </CardContent>

    </Card>
  );
}


// =========================================================
// Main Analysis Result View
// =========================================================

export function AnalysisResultView({
  analysis,
  onDownload,
  downloading = false,
}: {
  analysis: NormalizedAnalysis;
  onDownload?: (() => void) | undefined;
  downloading?: boolean | undefined;
}) {

  const rankings =
    Array.isArray(
      analysis.scoring.rankings
    )
      ? analysis.scoring.rankings
      : [];


  const tone =
    decisionTone(
      analysis.finalDecision,
      analysis.requiresManualReview
    );


  const statusLabel =
    analysis.requiresManualReview
      ? "Manual Review"
      : (
          analysis.finalDecision ??
          "Completed"
        );


  const topRanking =
    rankings.length > 0
      ? rankings[0]
      : undefined;


  const topScore =
    topRanking?.final_score;


  return (

    <div className="space-y-8">


      {/* ================================================= */}
      {/* HERO / EXECUTIVE SUMMARY */}
      {/* ================================================= */}

      <Card className="relative overflow-hidden border-primary/20 shadow-lg">

        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-emerald-500/[0.06]" />

        <CardContent className="relative p-6 md:p-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="space-y-4">

              <div className="flex flex-wrap items-center gap-3">

                <span className="text-sm font-medium text-muted-foreground">
                  Procurement Analysis #{analysis.analysisId ?? "—"}
                </span>

                <StatusBadge
                  label={statusLabel}
                  tone={tone}
                />

              </div>


              <div>

                <p className="text-sm text-muted-foreground">
                  Recommended Vendor
                </p>

                <div className="mt-2 flex items-center gap-3">

                  <div className="flex size-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">

                    <Trophy className="size-5" />

                  </div>

                  <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                    {analysis.bestVendor ?? "No vendor selected"}
                  </h1>

                </div>

              </div>


              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                AI-assisted vendor evaluation based on technical compliance,
                delivery, pricing, warranty, supplier performance and overall
                procurement suitability.
              </p>


              <div className="flex flex-wrap gap-3">

                {onDownload ? (

                  <Button
                    onClick={onDownload}
                    disabled={downloading}
                    size="lg"
                  >

                    <Download className="size-4" />

                    {downloading
                      ? "Preparing report…"
                      : "Download Procurement Report"}

                  </Button>

                ) : null}


                <div className="flex items-center gap-2 rounded-lg border bg-background/80 px-4 py-2 text-sm">

                  <CheckCircle2 className="size-4 text-emerald-600" />

                  <span className="text-muted-foreground">
                    Final Decision:
                  </span>

                  <span className="font-semibold">
                    {analysis.finalDecision ?? "—"}
                  </span>

                </div>

              </div>

            </div>


            {/* Score block */}

            <div className="flex min-w-[220px] flex-col items-center justify-center rounded-2xl border bg-background/80 p-6 text-center shadow-sm backdrop-blur">

              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Winning Score
              </span>

              <span className="mt-3 text-5xl font-bold tracking-tight text-primary">
                {topScore !== undefined
                  ? Number(topScore).toFixed(2)
                  : "—"}
              </span>

              <span className="mt-2 text-sm text-muted-foreground">
                Procurement Score
              </span>

            </div>

          </div>

        </CardContent>

      </Card>


      {/* ================================================= */}
      {/* KPI CARDS */}
      {/* ================================================= */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <MetricCard
          icon={
            <Building2 className="size-5" />
          }
          label="Best Vendor"
          value={
            analysis.bestVendor ?? "—"
          }
          description="Top-ranked supplier"
        />


        <MetricCard
          icon={
            <Users className="size-5" />
          }
          label="Vendors Compared"
          value={
            analysis.vendorCount ??
            analysis.vendors.length
          }
          description="Qualified quotations"
        />


        <MetricCard
          icon={
            <FileText className="size-5" />
          }
          label="RFQ File"
          value={
            analysis.rfqFilename ?? "—"
          }
          description={
            analysis.rfq.department
              ? `${analysis.rfq.department} procurement`
              : "Procurement request"
          }
        />


        <MetricCard
          icon={
            <CalendarDays className="size-5" />
          }
          label="Analysis Date"
          value={
            analysis.createdAt
              ? formatDate(
                  analysis.createdAt
                )
              : "—"
          }
          description="Saved in procurement history"
        />

      </section>


      {/* ================================================= */}
      {/* MANUAL REVIEW */}
      {/* ================================================= */}

      {analysis.requiresManualReview ? (

        <ManualReviewPanel
          analysis={analysis}
        />

      ) : null}


      {/* ================================================= */}
      {/* RFQ SUMMARY */}
      {/* ================================================= */}

      <section className="space-y-4">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Procurement Request
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight">
            RFQ Requirements
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Requirements extracted from the uploaded RFQ document.
          </p>

        </div>


        <RfqSummary
          rfq={analysis.rfq}
        />

      </section>


      {/* ================================================= */}
      {/* VENDOR RANKING */}
      {/* ================================================= */}

      {rankings.length > 0 ? (

        <section className="space-y-4">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Comparative Evaluation
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              Vendor Ranking
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Weighted comparison across price, delivery, compliance,
              supplier rating and warranty.
            </p>

          </div>


          <VendorRankingTable
            rankings={rankings}
            currency={
              analysis.rfq.currency
            }
          />

        </section>

      ) : null}


      {/* ================================================= */}
      {/* VENDOR DETAILS */}
      {/* ================================================= */}

      {analysis.vendors.length > 0 ? (

        <section className="space-y-4">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Supplier Quotations
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              Vendor Details
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Commercial and technical quotation details for each supplier.
            </p>

          </div>


          <div className="grid gap-5 xl:grid-cols-2">

            {analysis.vendors.map(
              (
                vendor,
                index
              ) => (

                <VendorCard
                  key={index}
                  vendor={vendor}
                  index={index}
                  isBest={
                    vendorName(
                      vendor,
                      index
                    ) ===
                    analysis.bestVendor
                  }
                />

              )
            )}

          </div>

        </section>

      ) : null}


      {/* ================================================= */}
      {/* COMPLIANCE */}
      {/* ================================================= */}

      {analysis.complianceReports.length > 0 ? (

        <section className="space-y-4">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Requirement Validation
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              Technical Compliance
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Vendor quotations checked against RFQ delivery,
              warranty, quantity and specification requirements.
            </p>

          </div>


          <div className="grid gap-5 xl:grid-cols-3">

            {analysis.complianceReports.map(
              (
                report,
                index
              ) => (

                <ComplianceCard
                  key={index}
                  report={report}
                />

              )
            )}

          </div>

        </section>

      ) : null}


      {/* ================================================= */}
      {/* AI RECOMMENDATION */}
      {/* ================================================= */}

      <section className="space-y-4">

        <div className="flex items-center gap-3">

          <div className="flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300">

            <Sparkles className="size-5" />

          </div>


          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-400">
              AI Decision Intelligence
            </p>

            <h2 className="text-xl font-semibold tracking-tight">
              Procurement Recommendation
            </h2>

          </div>

        </div>


        <div className="rounded-2xl border border-violet-200/60 bg-gradient-to-br from-violet-50/60 via-background to-background p-1 shadow-sm dark:border-violet-900/40 dark:from-violet-950/10">

          <AIRecommendationCard
            recommendation={
              analysis.recommendation
            }
            manualReview={
              analysis.requiresManualReview
            }
          />

        </div>

      </section>

    </div>
  );
}