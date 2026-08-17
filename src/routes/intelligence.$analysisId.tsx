import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Bot, BrainCircuit, GitBranch, Mail, ShieldAlert, SlidersHorizontal } from "lucide-react";

import { askCopilot, getAgentPipeline, getExplainability, getNegotiation, getRiskAnalysis, runWhatIf } from "@/api/b2b";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export const Route = createFileRoute("/intelligence/$analysisId")({ component: IntelligencePage });

const defaults = { price: 35, delivery: 20, compliance: 25, warranty: 10, past_rating: 10 };

function IntelligencePage() {
  const { analysisId } = Route.useParams();
  const [weights, setWeights] = useState(defaults);
  const [question, setQuestion] = useState("Why was the winning vendor selected?");
  const risk = useQuery({ queryKey: ["risk", analysisId], queryFn: () => getRiskAnalysis(analysisId) });
  const explain = useQuery({ queryKey: ["explain", analysisId], queryFn: () => getExplainability(analysisId) });
  const negotiation = useQuery({ queryKey: ["negotiation", analysisId], queryFn: () => getNegotiation(analysisId) });
  const pipeline = useQuery({ queryKey: ["pipeline", analysisId], queryFn: () => getAgentPipeline(analysisId) });
  const whatIf = useMutation({ mutationFn: () => runWhatIf(analysisId, weights) });
  const copilot = useMutation({ mutationFn: () => askCopilot(analysisId, question) });

  return <AppShell title={`Decision Intelligence #${analysisId}`} description="What-if simulation, explainable scoring, risk signals and AI copilot"><div className="grid gap-6 xl:grid-cols-2">
    <Card><CardHeader><CardTitle className="flex items-center gap-2"><SlidersHorizontal className="size-5" /> What-if scoring simulator</CardTitle></CardHeader><CardContent className="space-y-5">{Object.entries(weights).map(([key, value]) => <div key={key}><div className="mb-2 flex justify-between text-sm"><span className="capitalize">{key.replace("_", " ")}</span><span>{value}%</span></div><Slider value={[value]} max={100} step={1} onValueChange={([v]) => setWeights((w) => ({ ...w, [key]: v ?? 0 }))} /></div>)}<Button onClick={() => whatIf.mutate()}>Simulate ranking</Button>{whatIf.data && <div className="rounded-lg border p-3 text-sm"><p>Simulated winner: <b>{whatIf.data.best_vendor}</b></p><p>Winner changed: <b>{whatIf.data.winner_changed ? "Yes" : "No"}</b></p></div>}</CardContent></Card>
    <Card><CardHeader><CardTitle className="flex items-center gap-2"><Bot className="size-5" /> ProcureMind Copilot</CardTitle></CardHeader><CardContent className="space-y-3"><textarea value={question} onChange={(e) => setQuestion(e.target.value)} className="min-h-24 w-full rounded-lg border bg-background p-3 text-sm" placeholder="Ask why a vendor won, why another lost, or what the main risk is..." /><Button onClick={() => copilot.mutate()} disabled={copilot.isPending}>Ask analysis</Button>{copilot.data?.answer && <div className="rounded-lg border bg-muted/30 p-4 text-sm leading-6">{copilot.data.answer}</div>}</CardContent></Card>
    <Card><CardHeader><CardTitle className="flex items-center gap-2"><ShieldAlert className="size-5" /> Risk & fraud signals</CardTitle></CardHeader><CardContent className="space-y-3"><p className="text-sm text-muted-foreground">{risk.data?.note}</p>{(risk.data?.flags ?? []).map((f, i) => <div key={i} className="rounded-lg border p-3"><div className="flex justify-between gap-3"><b className="text-sm">{f.vendor}</b><span className="text-xs uppercase">{f.severity}</span></div><p className="mt-1 text-sm text-muted-foreground">{f.message}</p></div>)}{risk.data && risk.data.risk_count === 0 && <p className="text-sm text-muted-foreground">No rule-based risk flags found.</p>}</CardContent></Card>
    <Card><CardHeader><CardTitle className="flex items-center gap-2"><Mail className="size-5" /> Negotiation AI</CardTitle></CardHeader><CardContent className="space-y-3"><p className="font-medium">{negotiation.data?.vendor}</p><ul className="space-y-2 text-sm">{(negotiation.data?.suggestions ?? []).map((s) => <li key={s}>• {s}</li>)}</ul>{negotiation.data?.email_draft && <pre className="whitespace-pre-wrap rounded-lg border bg-muted/30 p-3 text-xs">{negotiation.data.email_draft}</pre>}</CardContent></Card>
    <Card className="xl:col-span-2"><CardHeader><CardTitle className="flex items-center gap-2"><GitBranch className="size-5" /> Visible agent pipeline</CardTitle></CardHeader><CardContent><div className="grid gap-3 md:grid-cols-3 xl:grid-cols-7">{(pipeline.data?.pipeline ?? []).map((step, index) => <div key={step.id} className="relative rounded-xl border p-3"><p className="text-xs text-primary">0{index + 1}</p><p className="mt-1 text-sm font-semibold">{step.name}</p><p className="mt-2 text-xs text-muted-foreground">{step.output}</p></div>)}</div></CardContent></Card>
    <Card className="xl:col-span-2"><CardHeader><CardTitle className="flex items-center gap-2"><BrainCircuit className="size-5" /> Explainable AI score drivers</CardTitle></CardHeader><CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{(explain.data?.vendors ?? []).map((v: any) => <div key={v.vendor_name} className="rounded-xl border p-4"><div className="flex justify-between"><b>{v.vendor_name}</b><span>#{v.rank}</span></div><p className="mt-2 text-sm">Final score: <b>{v.final_score}</b></p><div className="mt-3 space-y-2">{(v.contributions ?? []).map((c: any) => <div key={c.factor} className="flex justify-between text-xs"><span>{c.label} ({c.weight_percent}%)</span><span>{c.contribution}</span></div>)}</div></div>)}</CardContent></Card>
  </div></AppShell>;
}
