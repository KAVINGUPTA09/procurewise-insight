import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  BarChart3,
  FileSearch,
  Workflow,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ProcureMind AI — Smarter Procurement, Faster Decisions" },
      {
        name: "description",
        content:
          "ProcureMind AI compares vendor quotations against your RFQ, checks compliance, ranks vendors and delivers AI-assisted procurement recommendations.",
      },
      { property: "og:title", content: "ProcureMind AI — Smarter Procurement, Faster Decisions" },
      {
        property: "og:description",
        content:
          "Upload an RFQ and vendor quotations to get compliance checks, vendor scoring and an AI procurement recommendation.",
      },
    ],
  }),
  component: LandingPage,
});

const features = [
  {
    icon: FileSearch,
    title: "Document intelligence",
    description:
      "RFQ and vendor quotation PDFs are parsed into structured requirements, line items and specifications.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance checking",
    description:
      "Item-level technical, delivery and warranty checks highlight exactly where a vendor falls short.",
  },
  {
    icon: BarChart3,
    title: "Vendor scoring",
    description:
      "Price, delivery, compliance, warranty and past performance combine into a transparent final score.",
  },
  {
    icon: Workflow,
    title: "Workflow orchestration",
    description:
      "A LangGraph workflow routes incomplete or non-compliant submissions into manual review.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-surface/80 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">ProcureMind AI</span>
              <span className="block truncate text-xs text-muted-foreground">
                Procurement Intelligence
              </span>
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/signup">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-success" />
              AI-assisted vendor evaluation
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Smarter Procurement. Faster Decisions.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Compare vendors, evaluate compliance, and generate AI-assisted procurement
              recommendations — from raw RFQ and quotation PDFs to a defensible award decision.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/signup">
                  Create an account
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/login">Sign in to dashboard</Link>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["RFQ extraction", "Compliance scoring", "Vendor ranking", "PDF reports"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-success" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </section>

        <section className="border-t bg-surface/60">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              A complete procurement decision workflow
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-xl border bg-surface p-5 shadow-card">
                  <span className="grid size-10 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <feature.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold">{feature.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <p className="mx-auto max-w-6xl px-4 text-xs text-muted-foreground sm:px-6">
          ProcureMind AI — AI procurement decision support.
        </p>
      </footer>
    </div>
  );
}
