import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock3, ExternalLink, XCircle } from "lucide-react";
import { toast } from "sonner";

import { decideApproval, getApprovals, getB2BDashboard } from "@/api/b2b";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/approver-dashboard")({ component: ApproverDashboard });

function ApproverDashboard() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const approvals = useQuery({ queryKey: ["approvals"], queryFn: getApprovals, enabled: user?.role === "approver" || user?.role === "admin" });
  const metrics = useQuery({ queryKey: ["b2b-dashboard"], queryFn: getB2BDashboard });
  const mutation = useMutation({
    mutationFn: ({ id, decision }: { id: number; decision: "approved" | "rejected" | "changes_requested" }) => decideApproval(id, decision),
    onSuccess: async () => { toast.success("Approval decision saved"); await qc.invalidateQueries({ queryKey: ["approvals"] }); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Decision failed"),
  });

  if (user?.role !== "approver" && user?.role !== "admin") {
    return <AppShell title="Approver Workspace"><Card><CardContent className="p-8 text-center">Your account does not have approver access.</CardContent></Card></AppShell>;
  }

  const pending = (approvals.data?.approvals ?? []).filter((a) => a.status === "pending");
  return (
    <AppShell title="Approver Dashboard" description="Human-in-the-loop award governance and review queue">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Pending decisions</p><p className="mt-2 text-3xl font-semibold">{pending.length}</p></CardContent></Card>
          <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Analyses available</p><p className="mt-2 text-3xl font-semibold">{metrics.data?.analysis_count ?? 0}</p></CardContent></Card>
          <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Recommended spend</p><p className="mt-2 text-2xl font-semibold">₹{Math.round(metrics.data?.recommended_spend ?? 0).toLocaleString("en-IN")}</p></CardContent></Card>
        </div>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><Clock3 className="size-5" /> Approval queue</CardTitle></CardHeader><CardContent className="space-y-3">{(approvals.data?.approvals ?? []).map((item) => <div key={item.analysis_id} className="flex flex-col gap-3 rounded-xl border p-4 lg:flex-row lg:items-center lg:justify-between"><div><p className="font-semibold">{item.rfq_title}</p><p className="text-sm text-muted-foreground">#{item.analysis_id} · {item.department} · AI: {item.ai_decision ?? "—"} · Best: {item.best_vendor ?? "—"}</p><p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">Human status: {item.status}</p></div><div className="flex flex-wrap gap-2"><Button asChild variant="outline"><Link to="/analysis/$analysisId" params={{ analysisId: String(item.analysis_id) }}><ExternalLink className="size-4" /> Review</Link></Button>{item.status === "pending" && <><Button onClick={() => mutation.mutate({ id: item.analysis_id, decision: "approved" })}><CheckCircle2 className="size-4" /> Approve</Button><Button variant="outline" onClick={() => mutation.mutate({ id: item.analysis_id, decision: "changes_requested" })}>Request changes</Button><Button variant="destructive" onClick={() => mutation.mutate({ id: item.analysis_id, decision: "rejected" })}><XCircle className="size-4" /> Reject</Button></>}</div></div>)}{!approvals.isPending && !(approvals.data?.approvals ?? []).length && <p className="py-8 text-center text-muted-foreground">No analyses are waiting for review.</p>}</CardContent></Card>
      </div>
    </AppShell>
  );
}
