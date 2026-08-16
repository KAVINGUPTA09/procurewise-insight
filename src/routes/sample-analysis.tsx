import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Play,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";

import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";

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


// =========================================================
// ROUTE
// =========================================================

export const Route =
  createFileRoute("/sample-analysis")({

    head: () => ({
      meta: [
        {
          title:
            "Sample Procurement Analysis — ProcureMind AI",
        },
        {
          name: "description",
          content:
            "Explore a pre-built ProcureMind AI procurement demo with vendor ranking, compliance analysis and an AI-assisted recommendation.",
        },
      ],
    }),

    component: SampleAnalysisPage,
  });


// =========================================================
// SAMPLE DATA
//
// This is intentionally static demo data.
// It does NOT represent a live backend execution.
// =========================================================

const sampleVendors = [
  {
    rank: 1,
    name: "Lenovo Enterprise",
    subtotal: "INR 1,360,000",
    price: 97.06,
    delivery: 100,
    compliance: 100,
    rating: 94,
    warranty: 100,
    score: 98.37,
    deliveryDays: 10,
    warrantyMonths: 48,
    paymentTerms: "45 days",
    pastRating: 4.7,
  },

  {
    rank: 2,
    name: "Dell Technologies",
    subtotal: "INR 1,350,000",
    price: 97.78,
    delivery: 83.33,
    compliance: 100,
    rating: 90,
    warranty: 75,
    score: 92.39,
    deliveryDays: 12,
    warrantyMonths: 36,
    paymentTerms: "30 days",
    pastRating: 4.5,
  },

  {
    rank: 3,
    name: "HP Solutions",
    subtotal: "INR 1,320,000",
    price: 100,
    delivery: 71.43,
    compliance: 87.5,
    rating: 84,
    warranty: 50,
    score: 84.56,
    deliveryDays: 14,
    warrantyMonths: 24,
    paymentTerms: "30 days",
    pastRating: 4.2,
  },
];


// =========================================================
// PAGE
// =========================================================

function SampleAnalysisPage() {

  return (

    <AppShell
      title="Sample Procurement Analysis"
      description="Pre-built demonstration of the ProcureMind AI decision workflow"
      actions={
        <Button asChild>
          <Link to="/new-analysis">
            <Play className="size-4" />
            Run Live Analysis
          </Link>
        </Button>
      }
    >

      <div className="space-y-8">


        {/* ================================================= */}
        {/* DEMO NOTICE */}
        {/* ================================================= */}

        <Card className="border-primary/30 bg-primary/[0.04]">

          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">

            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">

              <FlaskConical className="size-5" />

            </div>


            <div>

              <p className="font-semibold">
                Sample / Demonstration Analysis
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                This page uses pre-built demonstration data so ProcureMind can be presented even when no new documents are uploaded. For a real analysis, use New Analysis.
              </p>

            </div>

          </CardContent>

        </Card>


        {/* ================================================= */}
        {/* HERO RESULT */}
        {/* ================================================= */}

        <Card className="relative overflow-hidden border-primary/35 shadow-lift">

          <div className="pointer-events-none absolute -left-28 -top-28 size-80 rounded-full bg-primary/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 right-0 size-96 rounded-full bg-violet-600/10 blur-3xl" />


          <CardContent className="relative grid gap-8 p-6 md:p-8 lg:grid-cols-[1fr_auto] lg:items-center">

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <span className="rounded-lg border border-success/25 bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                  APPROVED
                </span>

                <span className="text-xs text-muted-foreground">
                  Demo Analysis #7
                </span>

              </div>


              <p className="mt-6 text-sm text-muted-foreground">
                Recommended Vendor
              </p>


              <div className="mt-2 flex items-center gap-3">

                <div className="flex size-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">

                  <Trophy className="size-6" />

                </div>


                <div>

                  <h2 className="text-3xl font-bold tracking-tight">
                    Lenovo Enterprise
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Highest weighted procurement score
                  </p>

                </div>

              </div>


              <div className="mt-6 flex flex-wrap gap-3">

                <Button asChild>
                  <Link to="/new-analysis">
                    Run Your Own Analysis
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                >
                  <Link to="/architecture">
                    View Architecture
                  </Link>
                </Button>

              </div>

            </div>


            <div className="min-w-[220px] rounded-2xl border border-primary/25 bg-background/35 p-6 text-center">

              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Final Score
              </p>

              <p className="mt-3 text-5xl font-black text-primary">
                98.37
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Procurement Score
              </p>

            </div>

          </CardContent>

        </Card>


        {/* ================================================= */}
        {/* RFQ SUMMARY */}
        {/* ================================================= */}

        <section className="space-y-4">

          <SectionTitle
            eyebrow="Sample RFQ"
            title="Procurement Requirements"
          />


          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <MiniMetric
              label="Department"
              value="IT"
            />

            <MiniMetric
              label="Currency"
              value="INR"
            />

            <MiniMetric
              label="Required Delivery"
              value="15 days"
            />

            <MiniMetric
              label="Required Warranty"
              value="36 months"
            />

          </div>


          <Card>

            <CardHeader>
              <CardTitle className="text-base">
                RFQ Line Items
              </CardTitle>
            </CardHeader>


            <CardContent>

              <div className="overflow-x-auto">

                <Table>

                  <TableHeader>

                    <TableRow>

                      <TableHead>
                        Item
                      </TableHead>

                      <TableHead>
                        Required Qty
                      </TableHead>

                      <TableHead>
                        Specifications
                      </TableHead>

                    </TableRow>

                  </TableHeader>


                  <TableBody>

                    <TableRow>

                      <TableCell className="font-medium">
                        Laptop
                      </TableCell>

                      <TableCell>
                        20
                      </TableCell>

                      <TableCell>
                        16 GB RAM · 512 GB SSD · Intel i7
                      </TableCell>

                    </TableRow>


                    <TableRow>

                      <TableCell className="font-medium">
                        Monitor
                      </TableCell>

                      <TableCell>
                        20
                      </TableCell>

                      <TableCell>
                        24 Inch
                      </TableCell>

                    </TableRow>

                  </TableBody>

                </Table>

              </div>

            </CardContent>

          </Card>

        </section>


        {/* ================================================= */}
        {/* VENDOR RANKING */}
        {/* ================================================= */}

        <section className="space-y-4">

          <SectionTitle
            eyebrow="Demo Comparison"
            title="Vendor Ranking"
          />


          <Card className="overflow-hidden">

            <CardContent className="p-0">

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
                        Final
                      </TableHead>

                    </TableRow>

                  </TableHeader>


                  <TableBody>

                    {sampleVendors.map(
                      (vendor) => (

                        <TableRow
                          key={vendor.name}
                          className={
                            vendor.rank === 1
                              ? "bg-success/[0.04]"
                              : undefined
                          }
                        >

                          <TableCell className="font-semibold">
                            #{vendor.rank}
                          </TableCell>

                          <TableCell>

                            <div className="flex items-center gap-2">

                              <span className="font-semibold">
                                {vendor.name}
                              </span>


                              {vendor.rank === 1 ? (

                                <span className="rounded-md border border-success/20 bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                                  BEST
                                </span>

                              ) : null}

                            </div>

                          </TableCell>

                          <TableCell className="whitespace-nowrap">
                            {vendor.subtotal}
                          </TableCell>

                          <TableCell>
                            {vendor.price.toFixed(2)}
                          </TableCell>

                          <TableCell>
                            {vendor.delivery.toFixed(2)}
                          </TableCell>

                          <TableCell>
                            {vendor.compliance.toFixed(2)}
                          </TableCell>

                          <TableCell>
                            {vendor.rating.toFixed(2)}
                          </TableCell>

                          <TableCell>
                            {vendor.warranty.toFixed(2)}
                          </TableCell>

                          <TableCell className="font-bold text-primary">
                            {vendor.score.toFixed(2)}
                          </TableCell>

                        </TableRow>

                      )
                    )}

                  </TableBody>

                </Table>

              </div>


              <div className="border-t border-border/50 p-6">

                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Final Score Comparison
                </p>


                <div className="mt-5 space-y-4">

                  {sampleVendors.map(
                    (vendor) => (

                      <div
                        key={`score-${vendor.name}`}
                        className="grid grid-cols-[150px_minmax(0,1fr)_60px] items-center gap-3"
                      >

                        <span className="truncate text-sm font-medium">
                          {vendor.name}
                        </span>


                        <div className="h-3 overflow-hidden rounded-full bg-muted">

                          <div
                            className={
                              vendor.rank === 1
                                ? "h-full rounded-full bg-success"
                                : "h-full rounded-full bg-primary"
                            }
                            style={{
                              width: `${vendor.score}%`,
                            }}
                          />

                        </div>


                        <span className="text-right text-sm font-bold">
                          {vendor.score.toFixed(2)}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </div>

            </CardContent>

          </Card>

        </section>


        {/* ================================================= */}
        {/* VENDOR DETAILS */}
        {/* ================================================= */}

        <section className="space-y-4">

          <SectionTitle
            eyebrow="Supplier Quotations"
            title="Vendor Details"
          />


          <div className="grid gap-5 xl:grid-cols-3">

            {sampleVendors.map(
              (vendor) => (

                <Card
                  key={vendor.name}
                  className={
                    vendor.rank === 1
                      ? "border-success/40"
                      : undefined
                  }
                >

                  <CardHeader>

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <CardTitle className="text-base">
                          {vendor.name}
                        </CardTitle>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Rank #{vendor.rank}
                        </p>

                      </div>


                      {vendor.rank === 1 ? (

                        <span className="rounded-lg border border-success/20 bg-success/10 px-2 py-1 text-[10px] font-semibold text-success">
                          RECOMMENDED
                        </span>

                      ) : null}

                    </div>

                  </CardHeader>


                  <CardContent className="grid grid-cols-2 gap-4">

                    <Detail
                      label="Delivery"
                      value={`${vendor.deliveryDays} days`}
                    />

                    <Detail
                      label="Warranty"
                      value={`${vendor.warrantyMonths} months`}
                    />

                    <Detail
                      label="Payment Terms"
                      value={vendor.paymentTerms}
                    />

                    <Detail
                      label="Past Rating"
                      value={String(vendor.pastRating)}
                    />

                    <Detail
                      label="Compliance"
                      value={`${vendor.compliance}%`}
                    />

                    <Detail
                      label="Subtotal"
                      value={vendor.subtotal}
                    />

                  </CardContent>

                </Card>

              )
            )}

          </div>

        </section>


        {/* ================================================= */}
        {/* COMPLIANCE */}
        {/* ================================================= */}

        <section className="space-y-4">

          <SectionTitle
            eyebrow="Requirement Validation"
            title="Compliance Summary"
          />


          <div className="grid gap-5 md:grid-cols-3">

            <ComplianceDemo
              vendor="Lenovo Enterprise"
              percent="100%"
              checks="8 / 8"
            />

            <ComplianceDemo
              vendor="Dell Technologies"
              percent="100%"
              checks="8 / 8"
            />

            <ComplianceDemo
              vendor="HP Solutions"
              percent="87.5%"
              checks="7 / 8"
            />

          </div>

        </section>


        {/* ================================================= */}
        {/* AI RECOMMENDATION */}
        {/* ================================================= */}

        <section className="space-y-4">

          <SectionTitle
            eyebrow="AI Decision Intelligence"
            title="Sample Procurement Recommendation"
          />


          <Card className="relative overflow-hidden border-primary/35">

            <div className="pointer-events-none absolute right-0 top-0 size-72 rounded-full bg-primary/15 blur-3xl" />


            <CardContent className="relative space-y-6 p-6 md:p-8">

              <div className="flex items-start gap-4">

                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">

                  <Sparkles className="size-5" />

                </div>


                <div>

                  <p className="text-sm text-muted-foreground">
                    Recommended Vendor
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    Lenovo Enterprise
                  </h3>

                </div>

              </div>


              <div>

                <h4 className="font-semibold">
                  Executive Summary
                </h4>

                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Lenovo Enterprise ranks first in this sample procurement
                  analysis with a final score of 98.37. The vendor combines
                  strong delivery performance, complete compliance, extended
                  warranty coverage and a competitive commercial offer.
                </p>

              </div>


              <div className="grid gap-5 md:grid-cols-2">

                <RecommendationBlock
                  title="Why Selected"
                  items={[
                    "Perfect delivery and compliance scores",
                    "Strong warranty coverage",
                    "Competitive overall commercial score",
                  ]}
                />

                <RecommendationBlock
                  title="Potential Risks"
                  items={[
                    "Laptop unit pricing is not the lowest",
                    "45-day payment terms may require negotiation",
                  ]}
                />

                <RecommendationBlock
                  title="Strengths"
                  items={[
                    "Excellent technical compliance",
                    "Strong past vendor rating",
                    "48-month warranty",
                  ]}
                />

                <RecommendationBlock
                  title="Negotiation Suggestions"
                  items={[
                    "Request bulk-order discount",
                    "Discuss payment-term flexibility",
                    "Confirm extended support coverage",
                  ]}
                />

              </div>


              <div className="flex items-center gap-2 rounded-xl border border-success/20 bg-success/[0.06] p-4">

                <CheckCircle2 className="size-5 text-success" />

                <div>

                  <p className="font-semibold text-success">
                    Final Decision: Approve
                  </p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Demonstration decision only.
                  </p>

                </div>

              </div>

            </CardContent>

          </Card>

        </section>


        {/* ================================================= */}
        {/* FINAL CTA */}
        {/* ================================================= */}

        <Card>

          <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="font-semibold">
                Ready to analyse your own procurement documents?
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Replace the demo data with a real RFQ and vendor quotations.
              </p>

            </div>


            <Button asChild>
              <Link to="/new-analysis">
                Run Live Procurement Analysis
                <ArrowRight className="size-4" />
              </Link>
            </Button>

          </CardContent>

        </Card>

      </div>

    </AppShell>
  );
}


// =========================================================
// SMALL COMPONENTS
// =========================================================

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {

  return (

    <div>

      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </p>

      <h2 className="mt-1 text-xl font-semibold">
        {title}
      </h2>

    </div>
  );
}


function MiniMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (

    <Card>

      <CardContent className="p-5">

        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <p className="mt-2 text-lg font-semibold">
          {value}
        </p>

      </CardContent>

    </Card>
  );
}


function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (

    <div>

      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">
        {value}
      </p>

    </div>
  );
}


function ComplianceDemo({
  vendor,
  percent,
  checks,
}: {
  vendor: string;
  percent: string;
  checks: string;
}) {

  return (

    <Card>

      <CardContent className="space-y-4 p-5">

        <div className="flex items-center justify-between gap-3">

          <h3 className="font-semibold">
            {vendor}
          </h3>

          <span className="font-bold text-primary">
            {percent}
          </span>

        </div>


        <div className="h-2 overflow-hidden rounded-full bg-muted">

          <div
            className="h-full rounded-full bg-primary"
            style={{
              width: percent,
            }}
          />

        </div>


        <div className="space-y-2 text-sm">

          <div className="flex items-center gap-2">

            <ShieldCheck className="size-4 text-success" />

            Delivery requirement evaluated

          </div>

          <div className="flex items-center gap-2">

            <ShieldCheck className="size-4 text-success" />

            Warranty requirement evaluated

          </div>

        </div>


        <p className="text-xs text-muted-foreground">
          Checks passed:{" "}
          <span className="font-semibold text-foreground">
            {checks}
          </span>
        </p>

      </CardContent>

    </Card>
  );
}


function RecommendationBlock({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {

  return (

    <div className="rounded-xl border border-border/60 bg-background/25 p-4">

      <h4 className="text-sm font-semibold">
        {title}
      </h4>


      <ul className="mt-3 space-y-2">

        {items.map(
          (item) => (

            <li
              key={item}
              className="flex gap-2 text-sm text-muted-foreground"
            >

              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />

              <span>
                {item}
              </span>

            </li>

          )
        )}

      </ul>

    </div>
  );
}