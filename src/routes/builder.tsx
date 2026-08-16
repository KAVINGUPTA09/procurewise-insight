import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  BrainCircuit,
  Code2,
  ExternalLink,
  Github,
  Linkedin,
  Network,
  Rocket,
  Sparkles,
  UserRound,
  Workflow,
} from "lucide-react";

import { AppShell } from "@/components/app/AppShell";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


// =========================================================
// SOCIAL LINKS
// =========================================================

const GITHUB_URL =
  "https://github.com/KAVINGUPTA09";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/kavin-gupta-509b8a321/";


// =========================================================
// ROUTE
// =========================================================

export const Route =
  createFileRoute("/builder")({

    head: () => ({
      meta: [

        {
          title:
            "Builder — ProcureMind AI",
        },

        {
          name: "description",
          content:
            "Developer profile, AI interests, ProcureMind AI project overview and agentic workflow.",
        },

      ],
    }),

    component: BuilderPage,
  });


// =========================================================
// SECTION HEADER
// =========================================================

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {

  return (

    <div>

      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </p>

      <h2 className="mt-1 text-xl font-semibold tracking-tight">
        {title}
      </h2>

      {description ? (

        <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>

      ) : null}

    </div>
  );
}


// =========================================================
// BUILDER PAGE
// =========================================================

function BuilderPage() {

  const aiInterests = [
    "Agentic AI",
    "Large Language Models",
    "LangGraph",
    "RAG",
    "Multi-Agent Systems",
    "Machine Learning",
    "AI Automation",
  ];


  const techStack = [
    "Python",
    "FastAPI",
    "LangGraph",
    "PostgreSQL",
    "SQLAlchemy",
    "PyMuPDF",
    "LLM APIs",
    "JWT Authentication",
    "React",
    "TypeScript",
    "TanStack Router",
    "TanStack Query",
    "Tailwind CSS",
  ];


  const capabilities = [
    "RFQ PDF extraction",
    "Vendor quotation parsing",
    "Structured data extraction",
    "Technical compliance validation",
    "Weighted vendor scoring",
    "AI procurement recommendation",
    "Conditional risk routing",
    "Manual-review handling",
    "PostgreSQL persistence",
    "Automated PDF reports",
  ];


  const workflowSteps = [
    "RFQ Extraction",
    "Vendor Extraction",
    "Data Validation",
    "Compliance",
    "Scoring",
    "AI Recommendation",
    "Risk Check",
    "Database",
  ];


  return (

    <AppShell

      title="Builder"

      description="Developer profile, AI interests and ProcureMind architecture"

      actions={

        <Button asChild>

          <Link to="/new-analysis">

            <Rocket className="size-4" />

            Run Live Demo

          </Link>

        </Button>

      }
    >

      <div className="space-y-10">


        {/* ================================================= */}
        {/* BUILDER HERO */}
        {/* ================================================= */}

        <section className="space-y-5">

          <SectionHeader

            eyebrow="About the Builder"

            title="AI Engineering & Intelligent Automation"

            description="The engineering profile behind ProcureMind AI and the technologies used to build intelligent decision-support systems."

          />


          <Card className="relative overflow-hidden border-primary/30 shadow-lift">

            <div className="pointer-events-none absolute -left-28 -top-28 size-80 rounded-full bg-primary/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-36 right-0 size-96 rounded-full bg-violet-600/10 blur-3xl" />


            <CardContent className="relative grid gap-8 p-6 md:p-8 lg:grid-cols-[1.4fr_0.8fr]">


              {/* BUILDER INTRO */}

              <div className="space-y-6">

                <div className="flex items-center gap-4">

                  <div className="flex size-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/15 text-primary shadow-[0_0_28px_rgba(168,85,247,0.25)]">

                    <UserRound className="size-8" />

                  </div>


                  <div>

                    <p className="text-sm text-muted-foreground">
                      Developer
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight">
                      Kavin Gupta
                    </h1>

                    <p className="mt-1 text-sm text-primary">
                      B.Tech CSE · AI/ML & Agentic AI
                    </p>

                  </div>

                </div>


                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">

                  I build AI-powered applications focused on intelligent
                  automation, LLM workflows, agentic systems and real-world
                  decision-support platforms.

                  ProcureMind AI explores how AI agents, structured document
                  extraction and automated reasoning can transform complex
                  procurement workflows into faster, explainable and
                  data-driven decisions.

                </p>


                <div className="flex flex-wrap gap-3">

                  <Button
                    asChild
                    variant="outline"
                  >

                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noreferrer"
                    >

                      <Github className="size-4" />

                      GitHub

                      <ExternalLink className="size-3.5" />

                    </a>

                  </Button>


                  <Button
                    asChild
                    variant="outline"
                  >

                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noreferrer"
                    >

                      <Linkedin className="size-4" />

                      LinkedIn

                      <ExternalLink className="size-3.5" />

                    </a>

                  </Button>

                </div>

              </div>


              {/* AI INTERESTS */}

              <div className="rounded-2xl border border-primary/20 bg-background/30 p-5 backdrop-blur">

                <div className="flex items-center gap-3">

                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">

                    <BrainCircuit className="size-5" />

                  </div>


                  <div>

                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      Focus Areas
                    </p>

                    <h3 className="font-semibold">
                      AI Interests
                    </h3>

                  </div>

                </div>


                <div className="mt-5 flex flex-wrap gap-2">

                  {aiInterests.map(
                    (interest) => (

                      <Badge
                        key={interest}
                        variant="secondary"
                        className="border border-primary/15 bg-primary/10 px-3 py-1.5 text-primary"
                      >

                        {interest}

                      </Badge>

                    )
                  )}

                </div>

              </div>

            </CardContent>

          </Card>

        </section>


        {/* ================================================= */}
        {/* PROJECT OVERVIEW */}
        {/* ================================================= */}

        <section className="space-y-5">

          <SectionHeader

            eyebrow="Flagship AI Project"

            title="ProcureMind AI"

            description="An agentic procurement intelligence platform that transforms raw procurement documents into explainable purchasing decisions."

          />


          <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">


            <Card className="border-primary/25">

              <CardHeader>

                <div className="flex items-center gap-3">

                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">

                    <Sparkles className="size-5" />

                  </div>


                  <div>

                    <CardTitle>
                      Project Description
                    </CardTitle>

                    <p className="mt-1 text-sm text-muted-foreground">
                      AI-powered procurement decision support
                    </p>

                  </div>

                </div>

              </CardHeader>


              <CardContent className="space-y-5">

                <p className="text-sm leading-7 text-muted-foreground">

                  ProcureMind AI automatically analyses one RFQ and multiple
                  vendor quotation PDFs.

                  It extracts structured procurement data, evaluates
                  technical compliance, compares commercial parameters,
                  calculates weighted vendor scores and generates an
                  AI-assisted procurement recommendation.

                </p>


                <p className="text-sm leading-7 text-muted-foreground">

                  The workflow is orchestrated using LangGraph with
                  stateful nodes, conditional routing, compliance validation,
                  risk checks, manual-review paths and PostgreSQL persistence.

                </p>


                <div className="flex flex-wrap gap-3">

                  <Button asChild>

                    <Link to="/new-analysis">

                      <Rocket className="size-4" />

                      Run Live Demo

                    </Link>

                  </Button>


                  <Button
                    asChild
                    variant="outline"
                  >

                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noreferrer"
                    >

                      <Code2 className="size-4" />

                      View GitHub

                    </a>

                  </Button>

                </div>

              </CardContent>

            </Card>


            <Card className="border-primary/20">

              <CardHeader>

                <CardTitle className="flex items-center gap-2">

                  <Network className="size-5 text-primary" />

                  Core Capabilities

                </CardTitle>

              </CardHeader>


              <CardContent>

                <div className="space-y-3">

                  {capabilities.map(
                    (capability) => (

                      <div
                        key={capability}
                        className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/25 px-3 py-2.5"
                      >

                        <div className="size-2 rounded-full bg-primary shadow-[0_0_10px_rgba(168,85,247,0.8)]" />

                        <span className="text-sm">
                          {capability}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </CardContent>

            </Card>

          </div>

        </section>


        {/* ================================================= */}
        {/* TECH STACK */}
        {/* ================================================= */}

        <section className="space-y-5">

          <SectionHeader

            eyebrow="Engineering Stack"

            title="Skills & Technology Stack"

            description="Technologies used across AI orchestration, backend services, persistence and the ProcureMind frontend."

          />


          <Card>

            <CardContent className="p-6">

              <div className="flex flex-wrap gap-3">

                {techStack.map(
                  (tech) => (

                    <div
                      key={tech}
                      className="group flex items-center gap-2 rounded-xl border border-primary/15 bg-primary/[0.06] px-4 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:shadow-[0_0_18px_rgba(168,85,247,0.12)]"
                    >

                      <Code2 className="size-4 text-primary" />

                      <span className="text-sm font-medium">
                        {tech}
                      </span>

                    </div>

                  )
                )}

              </div>

            </CardContent>

          </Card>

        </section>


        {/* ================================================= */}
        {/* AGENT DEMO */}
        {/* ================================================= */}

        <section className="space-y-5">

          <SectionHeader

            eyebrow="AI Agent Demo"

            title="How ProcureMind Thinks"

            description="The complete procurement workflow is orchestrated as a stateful LangGraph decision pipeline."

          />


          <Card className="relative overflow-hidden border-primary/35">

            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />


            <CardContent className="relative space-y-7 p-6 md:p-8">


              <div className="flex items-center gap-3">

                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">

                  <Workflow className="size-5" />

                </div>


                <div>

                  <h3 className="font-semibold">
                    LangGraph Procurement Agent
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Stateful conditional procurement orchestration
                  </p>

                </div>

              </div>


              <div className="grid gap-3 md:grid-cols-4 xl:grid-cols-8">

                {workflowSteps.map(
                  (
                    step,
                    index
                  ) => (

                    <div
                      key={step}
                      className="relative rounded-xl border border-primary/20 bg-background/40 p-3 text-center"
                    >

                      <div className="mx-auto flex size-7 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">

                        {index + 1}

                      </div>


                      <p className="mt-2 text-xs font-medium leading-5">

                        {step}

                      </p>


                      {index <
                      workflowSteps.length - 1 ? (

                        <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-primary xl:block">

                          →

                        </span>

                      ) : null}

                    </div>

                  )
                )}

              </div>


              <div className="flex flex-col gap-4 rounded-xl border border-primary/20 bg-primary/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="font-semibold">
                    Experience the AI agent
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">

                    Upload one RFQ and multiple vendor quotation PDFs to run
                    the full procurement analysis workflow.

                  </p>

                </div>


                <Button
                  asChild
                  className="shrink-0"
                >

                  <Link to="/new-analysis">

                    <Sparkles className="size-4" />

                    Launch AI Analysis

                  </Link>

                </Button>

              </div>

            </CardContent>

          </Card>

        </section>


        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <div className="pb-4 text-center">

          <p className="text-xs text-muted-foreground">

            ProcureMind AI · Built by Kavin Gupta

          </p>

        </div>


      </div>

    </AppShell>

  );
}