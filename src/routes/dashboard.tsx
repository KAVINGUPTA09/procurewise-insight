import { useQuery } from "@tanstack/react-query";

import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  BarChart3,
  BrainCircuit,
  Code2,
  ExternalLink,
  FilePlus2,
  FlaskConical,
  Gavel,
  Github,
  Linkedin,
  Network,
  Rocket,
  ShieldAlert,
  Sparkles,
  Trophy,
  UserRound,
  Workflow,
} from "lucide-react";

import { getHistory } from "@/api/history";

import { AppShell } from "@/components/app/AppShell";
import { EmptyState } from "@/components/app/EmptyState";
import { ErrorState } from "@/components/app/ErrorState";
import { HistoryTable } from "@/components/app/HistoryTable";
import { MetricCard } from "@/components/app/MetricCard";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";


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
  createFileRoute("/dashboard")({

    head: () => ({
      meta: [

        {
          title:
            "Procurement Intelligence Dashboard — ProcureMind AI",
        },

        {
          name: "description",
          content:
            "Track procurement analyses, recommended vendors and decisions across your organisation.",
        },

        {
          property: "og:title",
          content:
            "Procurement Intelligence Dashboard — ProcureMind AI",
        },

        {
          property: "og:description",
          content:
            "Vendor scoring, compliance outcomes and AI procurement decisions at a glance.",
        },

      ],
    }),

    component: DashboardPage,
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

      <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
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
// DASHBOARD
// =========================================================

function DashboardPage() {

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({

    queryKey: ["history"],

    queryFn: getHistory,

  });


  const items =
    data?.history ?? [];


  const latest =
    items[0];


  const manualReviewCount =
    items.filter(
      (item) =>
        item.requires_manual_review ||
        (
          item.final_decision ??
          ""
        )
          .toLowerCase()
          .includes("review")
    ).length;


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
    "JWT",
    "React",
    "TypeScript",
    "TanStack Query",
    "Tailwind CSS",
  ];


  return (

    <AppShell

      title="Procurement Intelligence Dashboard"

      description="Vendor comparisons, compliance outcomes and AI recommendations"

      actions={

        <Button
          asChild
          className="shadow-[0_0_25px_rgba(168,85,247,0.20)]"
        >

          <Link to="/new-analysis">

            <FilePlus2 className="size-4" />

            New Procurement Analysis

          </Link>

        </Button>

      }
    >

      <div className="space-y-10">


        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {isError ? (

          <ErrorState

            title="Couldn't load your procurement history"

            message={
              error instanceof Error
                ? error.message
                : undefined
            }

            onRetry={() =>
              void refetch()
            }

          />

        ) : null}


        {/* ================================================= */}
        {/* KPI CARDS */}
        {/* ================================================= */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {isPending ? (

            Array
              .from({
                length: 4,
              })
              .map(
                (
                  _,
                  index
                ) => (

                  <Skeleton
                    key={index}
                    className="h-[104px] rounded-xl"
                  />

                )
              )

          ) : (

            <>

              <MetricCard

                label="Total Analyses"

                value={
                  data?.total_analyses ??
                  items.length
                }

                icon={
                  BarChart3
                }

              />


              <MetricCard

                label="Latest Best Vendor"

                value={
                  latest?.best_vendor ??
                  "—"
                }

                hint={
                  latest
                    ? `Analysis #${latest.analysis_id}`
                    : undefined
                }

                icon={
                  Trophy
                }

                tone="success"

              />


              <MetricCard

                label="Latest Decision"

                value={
                  latest?.final_decision ??
                  "—"
                }

                hint={
                  latest?.rfq_title ??
                  undefined
                }

                icon={
                  Gavel
                }

              />


              <MetricCard

                label="Manual Review"

                value={
                  manualReviewCount
                }

                hint="Analyses awaiting human approval"

                icon={
                  ShieldAlert
                }

                tone={
                  manualReviewCount
                    ? "warning"
                    : "default"
                }

              />

            </>

          )}

        </div>


        {/* ================================================= */}
        {/* RECENT PROCUREMENT */}
        {/* ================================================= */}

        <section className="space-y-4">

          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">

            <h2 className="truncate text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Recent Procurement Analyses
            </h2>


            <Button
              asChild
              variant="outline"
              size="sm"
            >

              <Link to="/history">
                View all
              </Link>

            </Button>

          </div>


          {isPending ? (

            <Skeleton className="h-64 rounded-xl" />

          ) : items.length ? (

            <HistoryTable
              items={
                items.slice(
                  0,
                  8
                )
              }
              compact
            />

          ) : (

            <EmptyState

              title="No procurement analyses yet"

              description="Upload an RFQ and at least two vendor quotations to generate your first AI procurement recommendation."

              action={

                <Button
                  asChild
                  size="sm"
                >

                  <Link to="/new-analysis">

                    Start an analysis

                  </Link>

                </Button>

              }

            />

          )}

        </section>


        {/* ================================================= */}
        {/* QUICK ACCESS */}
        {/* ================================================= */}

        <section className="space-y-5">

          <SectionHeader

            eyebrow="Explore ProcureMind"

            title="Demo & Architecture"

            description="Quickly explore a completed procurement analysis or inspect the system architecture behind ProcureMind AI."

          />


          <div className="grid gap-5 md:grid-cols-2">


            {/* ================================================= */}
            {/* SAMPLE DEMO */}
            {/* ================================================= */}

            <Card className="relative overflow-hidden border-primary/25">

              <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/15 blur-3xl" />


              <CardContent className="relative p-6">

                <div className="flex items-start justify-between gap-4">

                  <div className="flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">

                    <FlaskConical className="size-5" />

                  </div>


                  <span className="rounded-md border border-success/20 bg-success/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-success">

                    Demo Ready

                  </span>

                </div>


                <h3 className="mt-5 text-lg font-semibold">

                  Sample Procurement Analysis

                </h3>


                <p className="mt-2 text-sm leading-6 text-muted-foreground">

                  Explore a completed RFQ evaluation with vendor ranking,
                  compliance results, AI recommendation and final procurement
                  decision without uploading new documents.

                </p>


                <div className="mt-5 flex flex-wrap gap-3">

                  <Button asChild>

                    <Link to="/sample-analysis">

                      <FlaskConical className="size-4" />

                      Open Sample Demo

                    </Link>

                  </Button>


                  <Button
                    asChild
                    variant="outline"
                  >

                    <Link to="/new-analysis">

                      Run Live Analysis

                    </Link>

                  </Button>

                </div>

              </CardContent>

            </Card>


            {/* ================================================= */}
            {/* ARCHITECTURE */}
            {/* ================================================= */}

            <Card className="relative overflow-hidden border-primary/25">

              <div className="pointer-events-none absolute -bottom-24 -left-24 size-64 rounded-full bg-violet-600/10 blur-3xl" />


              <CardContent className="relative p-6">

                <div className="flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">

                  <Network className="size-5" />

                </div>


                <h3 className="mt-5 text-lg font-semibold">

                  System Architecture

                </h3>


                <p className="mt-2 text-sm leading-6 text-muted-foreground">

                  Understand how React, FastAPI, LangGraph, LLM services,
                  PostgreSQL and PDF reporting work together inside the
                  ProcureMind platform.

                </p>


                <Button
                  asChild
                  variant="outline"
                  className="mt-5"
                >

                  <Link to="/architecture">

                    <Network className="size-4" />

                    View Architecture

                  </Link>

                </Button>

              </CardContent>

            </Card>

          </div>

        </section>


        {/* ================================================= */}
        {/* DIVIDER */}
        {/* ================================================= */}

        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />


        {/* ================================================= */}
        {/* ABOUT THE BUILDER */}
        {/* ================================================= */}

        <section className="space-y-5">

          <SectionHeader

            eyebrow="About the Builder"

            title="AI Engineering & Intelligent Automation"

            description="The engineering profile behind ProcureMind AI and the technologies used to build intelligent decision-support systems."

          />


          <Card className="relative overflow-hidden border-primary/30 shadow-lift">

            <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-primary/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 right-0 size-80 rounded-full bg-violet-600/10 blur-3xl" />


            <CardContent className="relative grid gap-8 p-6 md:p-8 lg:grid-cols-[1.4fr_0.8fr]">


              {/* ================================================= */}
              {/* INTRO */}
              {/* ================================================= */}

              <div className="space-y-5">

                <div className="flex items-center gap-4">

                  <div className="flex size-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/15 text-primary shadow-[0_0_25px_rgba(168,85,247,0.20)]">

                    <UserRound className="size-7" />

                  </div>


                  <div>

                    <p className="text-sm text-muted-foreground">
                      Developer
                    </p>

                    <h3 className="text-2xl font-bold tracking-tight">
                      Kavin Gupta
                    </h3>

                    <p className="text-sm text-primary">
                      B.Tech CSE · AI/ML & Agentic AI
                    </p>

                  </div>

                </div>


                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">

                  I build AI-powered applications focused on intelligent
                  automation, LLM workflows, agentic systems and real-world
                  decision-support platforms.

                  ProcureMind AI explores how AI agents, structured data
                  extraction and automated reasoning can make complex
                  procurement decisions faster and more explainable.

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


                  <Button
                    asChild
                    variant="ghost"
                  >

                    <Link to="/builder">

                      Builder Profile

                    </Link>

                  </Button>

                </div>

              </div>


              {/* ================================================= */}
              {/* AI INTERESTS */}
              {/* ================================================= */}

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
                    (
                      interest
                    ) => (

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

            description="An agentic procurement intelligence platform designed to transform raw business documents into explainable procurement decisions."

          />


          <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">


            {/* ================================================= */}
            {/* PROJECT DESCRIPTION */}
            {/* ================================================= */}

            <Card className="border-primary/25">

              <CardHeader>

                <div className="flex items-center gap-3">

                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">

                    <Sparkles className="size-5" />

                  </div>


                  <div>

                    <CardTitle>
                      Project Overview
                    </CardTitle>

                    <p className="mt-1 text-sm text-muted-foreground">

                      AI-powered procurement decision support

                    </p>

                  </div>

                </div>

              </CardHeader>


              <CardContent className="space-y-5">

                <p className="text-sm leading-7 text-muted-foreground">

                  ProcureMind AI automatically analyses an RFQ and
                  multiple vendor quotation PDFs.

                  It extracts structured procurement requirements,
                  validates vendor compliance, compares pricing and
                  commercial terms, ranks suppliers and generates an
                  AI-assisted final procurement recommendation.

                </p>


                <p className="text-sm leading-7 text-muted-foreground">

                  The workflow is orchestrated using LangGraph with
                  conditional validation, compliance checks, risk
                  evaluation, manual-review paths and persistent
                  PostgreSQL storage.

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

                      View Source

                    </a>

                  </Button>

                </div>

              </CardContent>

            </Card>


            {/* ================================================= */}
            {/* PROJECT CAPABILITIES */}
            {/* ================================================= */}

            <Card className="border-primary/20">

              <CardHeader>

                <CardTitle className="flex items-center gap-2">

                  <Network className="size-5 text-primary" />

                  Core Capabilities

                </CardTitle>

              </CardHeader>


              <CardContent>

                <div className="space-y-3">

                  {[
                    "RFQ PDF extraction",
                    "Vendor quotation parsing",
                    "Technical compliance validation",
                    "Weighted vendor scoring",
                    "AI procurement recommendation",
                    "Conditional risk routing",
                    "Procurement history",
                    "Automated PDF reports",
                  ].map(
                    (
                      capability
                    ) => (

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

            title="Technology Stack"

            description="Core technologies used across ProcureMind's AI orchestration, API layer, persistence and frontend."

          />


          <Card>

            <CardContent className="p-6">

              <div className="flex flex-wrap gap-3">

                {techStack.map(
                  (
                    tech
                  ) => (

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
        {/* AGENT WORKFLOW */}
        {/* ================================================= */}

        <section className="space-y-5">

          <SectionHeader

            eyebrow="Agentic Workflow"

            title="How ProcureMind Thinks"

            description="The complete procurement decision pipeline is managed as a stateful LangGraph workflow."

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

                    Stateful conditional orchestration

                  </p>

                </div>

              </div>


              {/* ================================================= */}
              {/* FLOW */}
              {/* ================================================= */}

              <div className="grid gap-3 md:grid-cols-4 xl:grid-cols-8">

                {[
                  "RFQ Extraction",
                  "Vendor Extraction",
                  "Data Validation",
                  "Compliance",
                  "Scoring",
                  "AI Recommendation",
                  "Risk Check",
                  "Database",
                ].map(
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


                      {index < 7 ? (

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

                    Upload one RFQ and multiple vendor quotations to run the complete LangGraph workflow.

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
        {/* FOOTER MESSAGE */}
        {/* ================================================= */}

        <div className="pb-4 text-center">

          <p className="text-xs text-muted-foreground">

            ProcureMind AI · Agentic Procurement Intelligence Platform

          </p>

        </div>


      </div>

    </AppShell>
  );
}