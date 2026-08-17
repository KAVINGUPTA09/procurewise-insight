import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Users } from "lucide-react";
import { toast } from "sonner";

import { getAdminUsers, getB2BDashboard, updateUserRole } from "@/api/b2b";
import { AppShell } from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/admin-dashboard")({ component: AdminDashboard });

function AdminDashboard() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const users = useQuery({ queryKey: ["admin-users"], queryFn: getAdminUsers, enabled: user?.role === "admin" });
  const metrics = useQuery({ queryKey: ["b2b-dashboard"], queryFn: getB2BDashboard, enabled: user?.role === "admin" });
  const roleMutation = useMutation({ mutationFn: ({ id, role }: { id: number; role: "buyer" | "approver" | "admin" }) => updateUserRole(id, role), onSuccess: async () => { toast.success("User role updated"); await qc.invalidateQueries({ queryKey: ["admin-users"] }); } });

  if (user?.role !== "admin") return <AppShell title="Admin Console"><Card><CardContent className="p-8 text-center">Admin access is required.</CardContent></Card></AppShell>;

  return <AppShell title="Admin Dashboard" description="User governance, role control and organisation-wide procurement visibility"><div className="space-y-6"><div className="grid gap-4 md:grid-cols-3"><Card><CardContent className="p-5"><Users className="size-5 text-primary" /><p className="mt-3 text-sm text-muted-foreground">Users</p><p className="text-3xl font-semibold">{users.data?.users.length ?? 0}</p></CardContent></Card><Card><CardContent className="p-5"><ShieldCheck className="size-5 text-primary" /><p className="mt-3 text-sm text-muted-foreground">Procurement analyses</p><p className="text-3xl font-semibold">{metrics.data?.analysis_count ?? 0}</p></CardContent></Card><Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Pending approvals</p><p className="mt-3 text-3xl font-semibold">{metrics.data?.pending_approvals ?? 0}</p></CardContent></Card></div><Card><CardHeader><CardTitle>User & role management</CardTitle></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-muted-foreground"><th className="py-3">Name</th><th>Email</th><th>Role</th><th>Active</th></tr></thead><tbody>{(users.data?.users ?? []).map((row) => <tr key={row.id} className="border-b border-border/50"><td className="py-3 font-medium">{row.name}</td><td>{row.email}</td><td><select value={row.role} onChange={(e) => roleMutation.mutate({ id: row.id, role: e.target.value as "buyer" | "approver" | "admin" })} className="rounded-md border bg-background px-2 py-1"><option value="buyer">buyer</option><option value="approver">approver</option><option value="admin">admin</option></select></td><td>{row.is_active ? "Yes" : "No"}</td></tr>)}</tbody></table></div></CardContent></Card></div></AppShell>;
}
