import {
  useEffect,
  useState,
} from "react";

import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";

import {
  BrainCircuit,
  CheckCircle2,
  Database,
  FileSearch,
  Play,
  ShieldCheck,
  Sparkles,
  Trophy,
  Workflow,
} from "lucide-react";

import { runComparison } from "@/api/procurement";
import { ApiError } from "@/api/client";

import { AppShell } from "@/components/app/AppShell";
import { ErrorState } from "@/components/app/ErrorState";
import { FileUploader } from "@/components/app/FileUploader";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export const Route =
  createFileRoute("/new-analysis")({

    head: () => ({
      meta: [
        {
          title:
            "New Procurement Analysis — ProcureMind AI",
        },
        {
          name: "description",
          content:
            "Upload an RFQ and vendor quotation PDFs to run compliance checks, vendor scoring and an AI recommendation.",
        },
      ],
    }),

    component: NewAnalysisPage,
  });


const processingStages = [
  {
    title: "RFQ Extraction",
    description:
      "Reading procurement requirements",
    icon: FileSearch,
  },
  {
    title: "Vendor Extraction",
    description:
      "Structuring quotation data",
    icon: FileSearch,
  },
  {
    title: "Data Validation",
    description:
      "Checking document completeness",
    icon: ShieldCheck,
  },
  {
    title: "Compliance",
    description:
      "Matching RFQ requirements",
    icon: CheckCircle2,
  },
  {
    title: "Vendor Scoring",
    description:
      "Calculating weighted scores",
    icon: Trophy,
  },
  {
    title: "AI Recommendation",
    description:
      "Generating decision intelligence",
    icon: BrainCircuit,
  },
  {
    title: "Risk Validation",
    description:
      "Evaluating final decision risk",
    icon: Workflow,
  },
  {
    title: "Database",
    description:
      "Saving procurement analysis",
    icon: Database,
  },
];


function Step({
  index,
  title,
  description,
  completed = false,
  children,
}: {
  index: number;
  title: string;
  description: string;
  completed?: boolean;
  children: React.ReactNode;
}) {

  return (

    <Card className="relative overflow-hidden border-primary/20">

      <CardHeader>

        <div className="flex items-start gap-4">

          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 font-bold text-primary">

            {completed ? (
              <CheckCircle2 className="size-5" />
            ) : (
              index
            )}

          </div>


          <div>

            <CardTitle className="text-base">
              {title}
            </CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>

          </div>

        </div>

      </CardHeader>


      <CardContent>
        {children}
      </CardContent>

    </Card>
  );
}


function WorkflowLoading() {

  const [
    activeStage,
    setActiveStage,
  ] = useState(0);


  useEffect(() => {

    const timer =
      window.setInterval(
        () => {

          setActiveStage(
            (current) =>
              Math.min(
                current + 1,
                processingStages.length - 1
              )
          );

        },
        1600
      );


    return () =>
      window.clearInterval(
        timer
      );

  }, []);


  return (

    <div className="space-y-7">

      <Card className="relative overflow-hidden border-primary/35 shadow-lift">

        <div className="pointer-events-none absolute left-1/2 top-0 size-80 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />


        <CardContent className="relative p-7 text-center sm:p-10">

          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-[0_0_35px_rgba(168,85,247,0.25)]">

            <Sparkles className="size-7 animate-pulse" />

          </div>


          <h2 className="mt-5 text-2xl font-bold">
            ProcureMind AI is analysing your procurement documents
          </h2>


          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">

            LangGraph is coordinating extraction, validation,
            compliance evaluation, vendor scoring and AI-assisted
            recommendation.

          </p>

        </CardContent>

      </Card>


      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">

        {processingStages.map(
          (
            stage,
            index
          ) => {

            const complete =
              index < activeStage;

            const active =
              index === activeStage;

            return (

              <div
                key={stage.title}
                className={`rounded-xl border p-4 transition-all duration-300 ${
                  active
                    ? "border-primary/60 bg-primary/10 shadow-[0_0_22px_rgba(168,85,247,0.16)]"
                    : complete
                      ? "border-success/25 bg-success/[0.05]"
                      : "border-border/60 bg-card"
                }`}
              >

                <div className="flex items-center gap-3">

                  <div
                    className={`flex size-9 items-center justify-center rounded-lg ${
                      complete
                        ? "bg-success/10 text-success"
                        : "bg-primary/10 text-primary"
                    }`}
                  >

                    {complete ? (
                      <CheckCircle2 className="size-4" />
                    ) : (
                      <stage.icon className="size-4" />
                    )}

                  </div>


                  <div>

                    <p className="text-sm font-medium">
                      {stage.title}
                    </p>

                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {stage.description}
                    </p>

                  </div>

                </div>

              </div>

            );
          }
        )}

      </div>


      <p className="text-center text-xs text-muted-foreground">

        Workflow stages are visual indicators while the backend performs the complete analysis.

      </p>

    </div>
  );
}


function NewAnalysisPage() {

  const navigate =
    useNavigate();


  const [
    rfqFiles,
    setRfqFiles,
  ] = useState<File[]>([]);


  const [
    vendorFiles,
    setVendorFiles,
  ] = useState<File[]>([]);


  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null
    );


  const [
    running,
    setRunning,
  ] = useState(false);


  const rfqFile =
    rfqFiles[0];


  const canRun =
    Boolean(rfqFile) &&
    vendorFiles.length >= 2;


  async function handleRun() {

    setError(null);


    if (!rfqFile) {

      setError(
        "Upload the RFQ PDF to continue."
      );

      return;
    }


    if (
      vendorFiles.length < 2
    ) {

      setError(
        "Upload at least two vendor quotation PDFs to run a comparison."
      );

      return;
    }


    setRunning(true);


    try {

      const result =
        await runComparison(
          rfqFile,
          vendorFiles
        );


      const id =
        result.analysis_id;


      if (
        id === undefined ||
        id === null
      ) {

        setError(
          "The analysis completed but no analysis reference was returned."
        );

        return;
      }


      await navigate({
        to: "/analysis/$analysisId",
        params: {
          analysisId:
            String(id),
        },
      });

    }

    catch (caught) {

      setError(

        caught instanceof ApiError
          ? caught.message
          : "The procurement service could not be reached. Please try again."

      );

    }

    finally {

      setRunning(false);

    }
  }


  return (

    <AppShell
      title="New Procurement Analysis"
      description="Upload procurement documents and run the complete LangGraph workflow"
    >

      {running ? (

        <WorkflowLoading />

      ) : (

        <div className="space-y-7">


          {/* Intro */}

          <Card className="relative overflow-hidden border-primary/30">

            <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/15 blur-3xl" />


            <CardContent className="relative grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  AI Procurement Agent
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  Compare vendors intelligently
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">

                  Upload one RFQ and at least two vendor quotation PDFs.
                  ProcureMind will extract, validate, score and recommend
                  the best vendor automatically.

                </p>

              </div>


              <div className="flex size-16 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">

                <BrainCircuit className="size-7" />

              </div>

            </CardContent>

          </Card>


          <div className="grid gap-5 xl:grid-cols-2">

            <Step
              index={1}
              title="Upload RFQ"
              description="Upload the procurement requirement PDF"
              completed={
                Boolean(rfqFile)
              }
            >

              <FileUploader
                files={rfqFiles}
                onChange={setRfqFiles}
                label="Upload RFQ PDF"
                hint="Drag & drop the RFQ here, or click to browse"
              />

            </Step>


            <Step
              index={2}
              title="Upload Vendor Quotations"
              description="At least two vendor quotation PDFs"
              completed={
                vendorFiles.length >= 2
              }
            >

              <FileUploader
                multiple
                files={vendorFiles}
                onChange={setVendorFiles}
                label="Upload vendor quotation PDFs"
                hint="Drag & drop multiple PDFs here, or click to browse"
              />


              {vendorFiles.length > 0 &&
              vendorFiles.length < 2 ? (

                <p className="mt-3 text-sm text-warning">

                  Add at least one more vendor quotation.

                </p>

              ) : null}

            </Step>

          </div>


          {/* Ready summary */}

          <Card className="border-primary/20">

            <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="font-semibold">
                  Analysis readiness
                </p>


                <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">

                  <span className="flex items-center gap-2">

                    <CheckCircle2
                      className={`size-4 ${
                        rfqFile
                          ? "text-success"
                          : "text-muted-foreground"
                      }`}
                    />

                    RFQ selected

                  </span>


                  <span className="flex items-center gap-2">

                    <CheckCircle2
                      className={`size-4 ${
                        vendorFiles.length >= 2
                          ? "text-success"
                          : "text-muted-foreground"
                      }`}
                    />

                    {vendorFiles.length} vendor quotations

                  </span>

                </div>

              </div>


              <Button
                size="lg"
                disabled={!canRun}
                onClick={() =>
                  void handleRun()
                }
              >

                <Play className="size-4" />

                Run AI Procurement Analysis

              </Button>

            </CardContent>

          </Card>


          {error ? (

            <ErrorState
              title="Analysis could not start"
              message={error}
            />

          ) : null}


          {/* Architecture preview */}

          <section>

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              LangGraph Workflow
            </p>


            <div className="grid gap-3 md:grid-cols-4">

              {processingStages
                .slice(
                  0,
                  4
                )
                .map(
                  (
                    stage,
                    index
                  ) => (

                    <div
                      key={stage.title}
                      className="rounded-xl border border-primary/15 bg-card p-4"
                    >

                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <stage.icon className="size-4" />
                      </div>

                      <p className="mt-3 text-sm font-medium">
                        {stage.title}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {stage.description}
                      </p>

                    </div>

                  )
                )}

            </div>

          </section>

        </div>

      )}

    </AppShell>
  );
}