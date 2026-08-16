import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Database,
  FileSearch,
  FileText,
  Network,
  ServerCog,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";

import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


// =========================================================
// ROUTE
// =========================================================

export const Route =
  createFileRoute("/architecture")({

    head: () => ({
      meta: [
        {
          title:
            "System Architecture — ProcureMind AI",
        },
        {
          name: "description",
          content:
            "Explore the ProcureMind AI architecture including React, FastAPI, LangGraph, LLM workflows, PostgreSQL and automated reporting.",
        },
      ],
    }),

    component: ArchitecturePage,
  });


// =========================================================
// DATA
// =========================================================

const layers = [
  {
    icon: Network,
    title: "React Frontend",
    subtitle: "User Experience Layer",
    description:
      "The React + TypeScript frontend handles authentication, document uploads, procurement dashboards, analysis results, history and reports.",
    technologies: [
      "React",
      "TypeScript",
      "TanStack Router",
      "TanStack Query",
      "Tailwind CSS",
    ],
  },

  {
    icon: Zap,
    title: "FastAPI Backend",
    subtitle: "API & Business Layer",
    description:
      "FastAPI exposes secure REST APIs for authentication, procurement analysis, history and report generation.",
    technologies: [
      "FastAPI",
      "Pydantic",
      "JWT",
      "Uvicorn",
    ],
  },

  {
    icon: Workflow,
    title: "LangGraph Workflow",
    subtitle: "Agentic Orchestration Layer",
    description:
      "LangGraph manages stateful procurement processing using independent nodes, conditional routing and manual-review paths.",
    technologies: [
      "StateGraph",
      "Conditional Edges",
      "State Persistence",
      "Risk Routing",
    ],
  },

  {
    icon: BrainCircuit,
    title: "AI Intelligence",
    subtitle: "Extraction & Reasoning Layer",
    description:
      "AI services transform unstructured RFQ and vendor documents into structured procurement data and decision-ready recommendations.",
    technologies: [
      "LLM Extraction",
      "Structured Output",
      "Recommendation",
      "Risk Analysis",
    ],
  },

  {
    icon: Database,
    title: "PostgreSQL",
    subtitle: "Persistence Layer",
    description:
      "Procurement analyses, vendor comparisons, user data and decision history are persisted for later retrieval and auditability.",
    technologies: [
      "PostgreSQL",
      "SQLAlchemy",
      "Analysis History",
      "Comparison Records",
    ],
  },

  {
    icon: FileText,
    title: "Reporting Layer",
    subtitle: "Decision Output",
    description:
      "Completed procurement analyses can be downloaded as structured PDF reports for review and documentation.",
    technologies: [
      "PDF Reports",
      "Vendor Rankings",
      "Compliance",
      "AI Recommendation",
    ],
  },
];


const workflowSteps = [
  {
    icon: FileSearch,
    title: "RFQ Extraction",
    text: "Extract procurement requirements from the uploaded RFQ.",
  },

  {
    icon: FileSearch,
    title: "Vendor Extraction",
    text: "Read and structure each vendor quotation.",
  },

  {
    icon: ShieldCheck,
    title: "Data Validation",
    text: "Check whether required procurement information is available.",
  },

  {
    icon: ShieldCheck,
    title: "Compliance",
    text: "Compare vendor terms and technical specifications against the RFQ.",
  },

  {
    icon: ServerCog,
    title: "Scoring",
    text: "Calculate weighted scores for price, delivery, compliance, rating and warranty.",
  },

  {
    icon: Bot,
    title: "Recommendation",
    text: "Generate an explainable AI-assisted vendor recommendation.",
  },

  {
    icon: Workflow,
    title: "Risk Routing",
    text: "Route risky or incomplete cases to manual review when required.",
  },

  {
    icon: Database,
    title: "Database & Report",
    text: "Persist the analysis and make the procurement report available.",
  },
];


// =========================================================
// PAGE
// =========================================================

function ArchitecturePage() {

  return (

    <AppShell
      title="System Architecture"
      description="How ProcureMind AI connects frontend, APIs, LangGraph, AI services and persistence"
      actions={
        <Button asChild>
          <Link to="/new-analysis">
            Run Live Analysis
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      }
    >

      <div className="space-y-10">


        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <Card className="relative overflow-hidden border-primary/30 shadow-lift">

          <div className="pointer-events-none absolute -left-28 -top-28 size-80 rounded-full bg-primary/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 right-0 size-96 rounded-full bg-violet-600/10 blur-3xl" />


          <CardContent className="relative grid gap-8 p-6 md:p-8 lg:grid-cols-[1fr_auto] lg:items-center">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                End-to-End Architecture
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                ProcureMind AI System Design
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                ProcureMind AI is designed as a complete procurement
                intelligence platform. The frontend sends procurement
                documents to FastAPI, LangGraph coordinates the analysis,
                AI services extract and reason over procurement data, and
                PostgreSQL stores the final decision history.
              </p>

            </div>


            <div className="flex size-20 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_0_35px_rgba(168,85,247,0.22)]">

              <img
                src="/procuremind-logo.png"
                alt="ProcureMind AI Logo"
                className="h-full w-full object-contain"
              />

            </div>

          </CardContent>

        </Card>


        {/* ================================================= */}
        {/* HIGH-LEVEL PIPELINE */}
        {/* ================================================= */}

        <section className="space-y-5">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Platform Flow
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              High-Level Architecture
            </h2>

          </div>


          <Card>

            <CardContent className="p-6">

              <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-11">

                <ArchitectureBox
                  icon={Network}
                  title="React"
                  subtitle="Frontend"
                />

                <Arrow />

                <ArchitectureBox
                  icon={Zap}
                  title="FastAPI"
                  subtitle="REST APIs"
                />

                <Arrow />

                <ArchitectureBox
                  icon={Workflow}
                  title="LangGraph"
                  subtitle="Workflow"
                />

                <Arrow />

                <ArchitectureBox
                  icon={BrainCircuit}
                  title="AI / LLM"
                  subtitle="Intelligence"
                />

                <Arrow />

                <ArchitectureBox
                  icon={Database}
                  title="PostgreSQL"
                  subtitle="Storage"
                />

                <Arrow />

                <ArchitectureBox
                  icon={FileText}
                  title="Reports"
                  subtitle="Output"
                />

              </div>

            </CardContent>

          </Card>

        </section>


        {/* ================================================= */}
        {/* ARCHITECTURE LAYERS */}
        {/* ================================================= */}

        <section className="space-y-5">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Architecture Layers
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              Major System Components
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Each layer has a separate responsibility in the procurement workflow.
            </p>

          </div>


          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {layers.map(
              (layer) => (

                <Card
                  key={layer.title}
                  className="border-primary/20"
                >

                  <CardHeader>

                    <div className="flex items-start gap-3">

                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">

                        <layer.icon className="size-5" />

                      </div>


                      <div>

                        <CardTitle className="text-base">
                          {layer.title}
                        </CardTitle>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {layer.subtitle}
                        </p>

                      </div>

                    </div>

                  </CardHeader>


                  <CardContent className="space-y-5">

                    <p className="text-sm leading-6 text-muted-foreground">
                      {layer.description}
                    </p>


                    <div className="flex flex-wrap gap-2">

                      {layer.technologies.map(
                        (tech) => (

                          <span
                            key={tech}
                            className="rounded-lg border border-primary/15 bg-primary/[0.06] px-2.5 py-1 text-xs font-medium"
                          >
                            {tech}
                          </span>

                        )
                      )}

                    </div>

                  </CardContent>

                </Card>

              )
            )}

          </div>

        </section>


        {/* ================================================= */}
        {/* LANGGRAPH WORKFLOW */}
        {/* ================================================= */}

        <section className="space-y-5">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Stateful Agent Workflow
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              LangGraph Procurement Pipeline
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Independent nodes perform specialised procurement tasks while conditional edges decide the next step.
            </p>

          </div>


          <Card className="relative overflow-hidden border-primary/30">

            <div className="pointer-events-none absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full bg-primary/12 blur-3xl" />


            <CardContent className="relative p-6 md:p-8">

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                {workflowSteps.map(
                  (
                    step,
                    index
                  ) => (

                    <div
                      key={step.title}
                      className="relative rounded-xl border border-primary/20 bg-background/35 p-4"
                    >

                      <div className="flex items-center gap-3">

                        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">

                          <step.icon className="size-4" />

                        </div>


                        <div>

                          <p className="text-xs text-muted-foreground">
                            Step {index + 1}
                          </p>

                          <p className="text-sm font-semibold">
                            {step.title}
                          </p>

                        </div>

                      </div>


                      <p className="mt-3 text-xs leading-5 text-muted-foreground">
                        {step.text}
                      </p>

                    </div>

                  )
                )}

              </div>

            </CardContent>

          </Card>

        </section>


        {/* ================================================= */}
        {/* DECISION ROUTING */}
        {/* ================================================= */}

        <section className="space-y-5">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Conditional Intelligence
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              Decision Routing
            </h2>

          </div>


          <div className="grid gap-5 md:grid-cols-3">

            <InfoCard
              title="Incomplete Data"
              text="If required procurement information is missing, the workflow can route the analysis toward manual review instead of blindly scoring vendors."
            />

            <InfoCard
              title="Compliance Failure"
              text="Vendors that fail important RFQ conditions can be identified before recommendation and final procurement approval."
            />

            <InfoCard
              title="Final Risk Check"
              text="The workflow performs a final risk decision before saving the procurement analysis and producing the result."
            />

          </div>

        </section>


        {/* ================================================= */}
        {/* CTA */}
        {/* ================================================= */}

        <Card className="relative overflow-hidden border-primary/30">

          <div className="pointer-events-none absolute right-0 top-0 size-72 rounded-full bg-primary/15 blur-3xl" />


          <CardContent className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h3 className="font-semibold">
                See the architecture in action
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Run a real procurement comparison or open the pre-built sample analysis.
              </p>

            </div>


            <div className="flex flex-wrap gap-3">

              <Button asChild>
                <Link to="/new-analysis">
                  Run Analysis
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
              >
                <Link to="/sample-analysis">
                  View Sample Demo
                </Link>
              </Button>

            </div>

          </CardContent>

        </Card>

      </div>

    </AppShell>
  );
}


// =========================================================
// SMALL COMPONENTS
// =========================================================

function ArchitectureBox({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}) {

  return (

    <div className="flex min-h-28 flex-col items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.04] p-4 text-center">

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


function Arrow() {

  return (

    <div className="hidden items-center justify-center text-primary xl:flex">

      <ArrowRight className="size-4" />

    </div>
  );
}


function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {

  return (

    <Card>

      <CardContent className="p-5">

        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {text}
        </p>

      </CardContent>

    </Card>
  );
}