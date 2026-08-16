import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Database,
  FileSearch,
  FlaskConical,
  Network,
  Rocket,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";


// =========================================================
// ROUTE
// =========================================================

export const Route =
  createFileRoute("/")({

    head: () => ({
      meta: [
        {
          title:
            "ProcureMind AI — Agentic Procurement Intelligence",
        },
        {
          name: "description",
          content:
            "ProcureMind AI analyses RFQs and vendor quotations, validates compliance, ranks suppliers and generates AI-assisted procurement decisions.",
        },
        {
          property: "og:title",
          content:
            "ProcureMind AI — Agentic Procurement Intelligence",
        },
        {
          property: "og:description",
          content:
            "Transform procurement documents into explainable AI-assisted vendor decisions.",
        },
      ],
    }),

    component: LandingPage,
  });


// =========================================================
// FEATURES
// =========================================================

const features = [
  {
    icon: FileSearch,
    title: "Document Intelligence",
    description:
      "Extract structured RFQ requirements and vendor quotation data directly from procurement PDFs.",
  },

  {
    icon: BrainCircuit,
    title: "Compliance Intelligence",
    description:
      "Automatically validate delivery, warranty, quantities and technical specifications.",
  },

  {
    icon: BarChart3,
    title: "Vendor Scoring",
    description:
      "Compare price, delivery, compliance, rating and warranty using transparent weighted scoring.",
  },

  {
    icon: Bot,
    title: "AI Recommendation",
    description:
      "Generate explainable vendor recommendations, strengths, risks and negotiation suggestions.",
  },
];


// =========================================================
// WORKFLOW
// =========================================================

const workflow = [
  "Upload RFQ",
  "Upload Vendors",
  "Extract Data",
  "Validate",
  "Compliance",
  "Score",
  "Recommend",
  "Report",
];


// =========================================================
// TECH STACK
// =========================================================

const stack = [
  "React",
  "TypeScript",
  "FastAPI",
  "LangGraph",
  "PostgreSQL",
  "SQLAlchemy",
  "PyMuPDF",
  "LLM APIs",
];


// =========================================================
// LANDING PAGE
// =========================================================

function LandingPage() {

  return (

    <div className="min-h-screen overflow-hidden bg-background text-foreground">


      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/75 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">


          {/* BRAND */}

          <div className="flex items-center gap-3">

            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-[0_0_28px_rgba(168,85,247,0.25)]">

              <img
                src="/procuremind-logo.png"
                alt="ProcureMind AI Logo"
                className="h-full w-full object-contain"
              />

            </div>


            <div>

              <p className="font-bold">
                ProcureMind AI
              </p>

              <p className="text-xs text-muted-foreground">
                Procurement Intelligence
              </p>

            </div>

          </div>


          {/* NAVIGATION */}

          <div className="hidden items-center gap-1 md:flex">

            <Button
              asChild
              variant="ghost"
              size="sm"
            >

              <Link to="/architecture">
                Architecture
              </Link>

            </Button>


            <Button
              asChild
              variant="ghost"
              size="sm"
            >

              <Link to="/sample-analysis">

                <FlaskConical className="size-4" />

                Sample Demo

              </Link>

            </Button>

          </div>


          {/* AUTH */}

          <div className="flex items-center gap-2">

            <Button
              asChild
              variant="ghost"
            >

              <Link to="/login">
                Sign in
              </Link>

            </Button>


            <Button asChild>

              <Link to="/signup">

                Get Started

                <ArrowRight className="size-4" />

              </Link>

            </Button>

          </div>

        </div>

      </header>


      <main>


        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section className="relative">

          <div className="pointer-events-none absolute left-1/2 top-0 size-[750px] -translate-x-1/2 rounded-full bg-primary/[0.12] blur-[150px]" />

          <div className="pointer-events-none absolute right-0 top-32 size-[450px] rounded-full bg-violet-600/[0.08] blur-[130px]" />


          <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">


            {/* HERO LEFT */}

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.08] px-4 py-2 text-xs font-medium text-primary">

                <Sparkles className="size-3.5" />

                Agentic AI Procurement Platform

              </div>


              <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">

                Smarter Procurement.

                <span className="block bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">

                  Faster Decisions.

                </span>

              </h1>


              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">

                Transform RFQs and vendor quotations into structured,
                explainable procurement decisions using LangGraph,
                automated compliance analysis, weighted vendor scoring
                and AI-assisted recommendations.

              </p>


              <div className="mt-8 flex flex-wrap gap-3">

                <Button
                  asChild
                  size="lg"
                >

                  <Link to="/signup">

                    <Rocket className="size-4" />

                    Launch ProcureMind

                  </Link>

                </Button>


                <Button
                  asChild
                  size="lg"
                  variant="outline"
                >

                  <Link to="/sample-analysis">

                    <FlaskConical className="size-4" />

                    View Sample Analysis

                  </Link>

                </Button>


                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                >

                  <Link to="/architecture">

                    <Network className="size-4" />

                    Architecture

                  </Link>

                </Button>

              </div>


              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">

                {[
                  "LangGraph orchestration",
                  "JWT authentication",
                  "PostgreSQL persistence",
                  "Automated PDF reports",
                ].map(
                  (item) => (

                    <span
                      key={item}
                      className="flex items-center gap-2"
                    >

                      <CheckCircle2 className="size-4 text-success" />

                      {item}

                    </span>

                  )
                )}

              </div>

            </div>


            {/* HERO DEMO CARD */}

            <div className="relative">

              <div className="absolute inset-0 rounded-[2rem] bg-primary/20 blur-3xl" />


              <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card/90 p-5 shadow-lift backdrop-blur-xl">

                <div className="flex items-center justify-between border-b border-border/50 pb-4">

                  <div>

                    <p className="text-xs text-muted-foreground">
                      Procurement Analysis
                    </p>

                    <p className="font-semibold">
                      RFQ Evaluation #7
                    </p>

                  </div>


                  <span className="rounded-lg border border-success/25 bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                    APPROVED
                  </span>

                </div>


                <div className="mt-6 rounded-2xl border border-primary/25 bg-primary/[0.06] p-5">

                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Recommended Vendor
                  </p>

                  <p className="mt-2 text-xl font-bold">
                    Lenovo Enterprise
                  </p>


                  <div className="mt-5 flex items-end justify-between">

                    <div>

                      <p className="text-xs text-muted-foreground">
                        Final Score
                      </p>

                      <p className="mt-1 text-4xl font-bold text-primary">
                        98.37
                      </p>

                    </div>


                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">

                      <BarChart3 className="size-6" />

                    </div>

                  </div>

                </div>


                <div className="mt-4 grid grid-cols-3 gap-3">

                  <MiniStat
                    label="Compliance"
                    value="100%"
                  />

                  <MiniStat
                    label="Delivery"
                    value="10 days"
                  />

                  <MiniStat
                    label="Vendors"
                    value="3"
                  />

                </div>


                <Button
                  asChild
                  variant="outline"
                  className="mt-4 w-full"
                >

                  <Link to="/sample-analysis">

                    Explore Sample Result

                    <ArrowRight className="size-4" />

                  </Link>

                </Button>

              </div>

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* FEATURES */}
        {/* ================================================= */}

        <section className="border-y border-border/50 bg-card/20">

          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">

            <div className="max-w-2xl">

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Procurement Intelligence
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                From raw PDFs to a defensible procurement decision
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">

                ProcureMind turns unstructured procurement documents into
                structured evaluations, transparent scoring and explainable
                AI-assisted recommendations.

              </p>

            </div>


            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {features.map(
                (feature) => (

                  <div
                    key={feature.title}
                    className="group rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-lift"
                  >

                    <div className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">

                      <feature.icon className="size-5" />

                    </div>


                    <h3 className="mt-5 font-semibold">
                      {feature.title}
                    </h3>


                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {feature.description}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* HOW IT WORKS */}
        {/* ================================================= */}

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">

          <div className="text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Agentic Workflow
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              How ProcureMind Thinks
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">

              LangGraph coordinates every stage of procurement analysis
              while preserving workflow state and conditional routing.

            </p>

          </div>


          <div className="mt-10 grid gap-3 md:grid-cols-4 xl:grid-cols-8">

            {workflow.map(
              (
                step,
                index
              ) => (

                <div
                  key={step}
                  className="relative rounded-xl border border-primary/20 bg-card p-4 text-center transition-all duration-200 hover:border-primary/45 hover:bg-primary/[0.04]"
                >

                  <div className="mx-auto flex size-8 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">

                    {index + 1}

                  </div>


                  <p className="mt-3 text-xs font-medium">
                    {step}
                  </p>


                  {index <
                  workflow.length - 1 ? (

                    <ArrowRight className="absolute -right-3 top-1/2 hidden size-4 -translate-y-1/2 text-primary xl:block" />

                  ) : null}

                </div>

              )
            )}

          </div>

        </section>


        {/* ================================================= */}
        {/* ARCHITECTURE PREVIEW */}
        {/* ================================================= */}

        <section className="border-y border-border/50 bg-card/20">

          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">

            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">


              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  System Architecture
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  Built like a real AI product
                </h2>


                <p className="mt-4 text-sm leading-7 text-muted-foreground">

                  ProcureMind combines a React frontend, FastAPI API layer,
                  LangGraph orchestration, LLM-powered document intelligence
                  and PostgreSQL persistence in one end-to-end procurement
                  platform.

                </p>


                <Button
                  asChild
                  variant="outline"
                  className="mt-6"
                >

                  <Link to="/architecture">

                    View Full Architecture

                    <ArrowRight className="size-4" />

                  </Link>

                </Button>

              </div>


              <div className="grid gap-3 sm:grid-cols-5">

                <ArchitectureNode
                  icon={Network}
                  title="React"
                  subtitle="Frontend"
                />

                <ArchitectureArrow />

                <ArchitectureNode
                  icon={Zap}
                  title="FastAPI"
                  subtitle="API Layer"
                />

                <ArchitectureArrow />

                <ArchitectureNode
                  icon={Workflow}
                  title="LangGraph"
                  subtitle="Orchestrator"
                />

                <ArchitectureArrow />

                <ArchitectureNode
                  icon={Bot}
                  title="LLM"
                  subtitle="AI Engine"
                />

                <ArchitectureArrow />

                <ArchitectureNode
                  icon={Database}
                  title="PostgreSQL"
                  subtitle="Persistence"
                />

              </div>

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* SAMPLE ANALYSIS CTA */}
        {/* ================================================= */}

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">

          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-7 shadow-lift sm:p-10">

            <div className="pointer-events-none absolute right-0 top-0 size-80 rounded-full bg-primary/15 blur-3xl" />


            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Demo Mode
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  Explore a completed procurement analysis
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">

                  View a sample RFQ comparison with vendor ranking,
                  compliance evaluation and AI procurement recommendation
                  without uploading new documents.

                </p>

              </div>


              <Button
                asChild
                size="lg"
              >

                <Link to="/sample-analysis">

                  <FlaskConical className="size-4" />

                  Open Sample Demo

                </Link>

              </Button>

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* TECH STACK */}
        {/* ================================================= */}

        <section className="border-y border-border/50 bg-card/20">

          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">

            <div className="text-center">

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Engineering Stack
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Technologies powering ProcureMind
              </h2>

            </div>


            <div className="mx-auto mt-9 flex max-w-4xl flex-wrap justify-center gap-3">

              {stack.map(
                (tech) => (

                  <span
                    key={tech}
                    className="rounded-xl border border-primary/20 bg-primary/[0.06] px-4 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10"
                  >

                    {tech}

                  </span>

                )
              )}

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* FINAL CTA */}
        {/* ================================================= */}

        <section className="px-4 py-20 sm:px-6">

          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-primary/30 bg-card p-8 text-center shadow-lift sm:p-12">

            <div className="pointer-events-none absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />


            <div className="relative">

              <div className="mx-auto flex size-16 items-center justify-center overflow-hidden rounded-2xl bg-white p-1 shadow-[0_0_30px_rgba(168,85,247,0.20)]">

                <img
                  src="/procuremind-logo.png"
                  alt="ProcureMind AI Logo"
                  className="h-full w-full object-contain"
                />

              </div>


              <h2 className="mt-5 text-3xl font-bold">
                Ready to run an AI procurement analysis?
              </h2>


              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">

                Upload an RFQ and multiple vendor quotations and let
                ProcureMind generate a complete vendor recommendation.

              </p>


              <div className="mt-7 flex flex-wrap justify-center gap-3">

                <Button
                  asChild
                  size="lg"
                >

                  <Link to="/signup">

                    Start ProcureMind

                    <ArrowRight className="size-4" />

                  </Link>

                </Button>


                <Button
                  asChild
                  size="lg"
                  variant="outline"
                >

                  <Link to="/sample-analysis">

                    View Sample First

                  </Link>

                </Button>

              </div>

            </div>

          </div>

        </section>

      </main>


      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <footer className="border-t border-border/50 py-8">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">


          <div className="flex items-center gap-2">

            <img
              src="/procuremind-logo.png"
              alt=""
              className="size-7 rounded-md bg-white object-contain p-0.5"
            />

            <span>
              ProcureMind AI · Agentic Procurement Intelligence
            </span>

          </div>


          <span>
            Built with LangGraph + FastAPI + React
          </span>

        </div>

      </footer>

    </div>
  );
}


// =========================================================
// MINI STAT
// =========================================================

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (

    <div className="rounded-xl border border-border/60 bg-background/30 p-3">

      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>

    </div>
  );
}


// =========================================================
// ARCHITECTURE NODE
// =========================================================

function ArchitectureNode({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}) {

  return (

    <div className="flex min-h-28 flex-col items-center justify-center rounded-2xl border border-primary/20 bg-card p-4 text-center">

      <Icon className="size-5 text-primary" />

      <p className="mt-2 text-sm font-semibold">
        {title}
      </p>

      <p className="mt-1 text-[10px] text-muted-foreground">
        {subtitle}
      </p>

    </div>
  );
}


// =========================================================
// ARCHITECTURE ARROW
// =========================================================

function ArchitectureArrow() {

  return (

    <div className="hidden items-center justify-center text-primary sm:flex">

      <ArrowRight className="size-4" />

    </div>
  );
}