import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, FileSignature, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { createContract, getContracts } from "@/api/b2b";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/contracts")({ component: ContractsPage });

function ContractsPage() {
  const qc = useQueryClient();
  const contracts = useQuery({ queryKey: ["contracts"], queryFn: getContracts });
  const [form, setForm] = useState({ vendor_name: "", title: "", value: "", currency: "INR", end_date: "" });
  const create = useMutation({
    mutationFn: () => createContract({ ...form, value: Number(form.value || 0), end_date: form.end_date ? new Date(form.end_date).toISOString() : null }),
    onSuccess: async () => { toast.success("Contract added"); setForm({ vendor_name: "", title: "", value: "", currency: "INR", end_date: "" }); await qc.invalidateQueries({ queryKey: ["contracts"] }); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Could not create contract"),
  });

  return <AppShell title="Contract Analytics" description="Track supplier agreements, commercial value and expiry risk"><div className="space-y-6"><Card><CardHeader><CardTitle className="flex items-center gap-2"><Plus className="size-5" /> Add contract</CardTitle></CardHeader><CardContent className="grid gap-3 md:grid-cols-5"><input className="rounded-md border bg-background px-3 py-2 text-sm" placeholder="Vendor" value={form.vendor_name} onChange={(e) => setForm({ ...form, vendor_name: e.target.value })} /><input className="rounded-md border bg-background px-3 py-2 text-sm" placeholder="Contract title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /><input className="rounded-md border bg-background px-3 py-2 text-sm" placeholder="Value" type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} /><input className="rounded-md border bg-background px-3 py-2 text-sm" type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} /><Button onClick={() => create.mutate()} disabled={!form.vendor_name || !form.title}><Plus className="size-4" /> Add</Button></CardContent></Card><Card><CardHeader><CardTitle className="flex items-center gap-2"><FileSignature className="size-5" /> Active contracts</CardTitle></CardHeader><CardContent className="space-y-3">{(contracts.data?.contracts ?? []).map((c) => <div key={c.id} className="flex flex-col gap-2 rounded-xl border p-4 md:flex-row md:items-center md:justify-between"><div><div className="flex items-center gap-2"><p className="font-semibold">{c.title}</p>{c.expires_within_60_days && <span className="inline-flex items-center gap-1 text-xs text-warning-foreground"><AlertTriangle className="size-3" /> Expiring soon</span>}</div><p className="text-sm text-muted-foreground">{c.vendor_name} · {c.currency} {c.value.toLocaleString("en-IN")}</p></div><div className="text-sm text-muted-foreground">{c.end_date ? `Ends ${new Date(c.end_date).toLocaleDateString()}` : "No expiry date"}</div></div>)}{!contracts.isPending && !(contracts.data?.contracts ?? []).length && <p className="py-8 text-center text-muted-foreground">No contracts added yet.</p>}</CardContent></Card></div></AppShell>;
}
