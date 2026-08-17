import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Building2, IndianRupee, PackageCheck, Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { getB2BDashboard, getSpendForecast, getSupplierPerformance } from "@/api/b2b";
import { AppShell } from "@/components/app/AppShell";
import { ErrorState } from "@/components/app/ErrorState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/analytics")({ component: AnalyticsPage });

function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value || 0);
}

function AnalyticsPage() {
  const dashboard = useQuery({ queryKey: ["b2b-dashboard"], queryFn: getB2BDashboard });
  const suppliers = useQuery({ queryKey: ["supplier-performance"], queryFn: getSupplierPerformance });
  const forecast = useQuery({ queryKey: ["spend-forecast"], queryFn: getSpendForecast });

  if (dashboard.isError) return <AppShell title="Procurement Analytics"><ErrorState title="Analytics unavailable" message={(dashboard.error as Error)?.message} /></AppShell>;
  const data = dashboard.data;

  return (
    <AppShell title="Procurement Analytics" description="Spend visibility, supplier performance and decision intelligence">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Analyses", data?.analysis_count ?? 0, BarChart3],
            ["Quotes evaluated", data?.vendor_quotes_evaluated ?? 0, PackageCheck],
            ["Recommended spend", money(data?.recommended_spend ?? 0), IndianRupee],
            ["Pending approvals", data?.pending_approvals ?? 0, Users],
          ].map(([label, value, Icon]) => (
            <Card key={String(label)}><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-muted-foreground">{label as string}</p><p className="mt-2 text-2xl font-semibold">{String(value)}</p></div><Icon className="size-5 text-primary" /></CardContent></Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card><CardHeader><CardTitle>Spend by department</CardTitle></CardHeader><CardContent className="h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={data?.spend_by_department ?? []}><CartesianGrid strokeDasharray="3 3" opacity={0.2} /><XAxis dataKey="department" /><YAxis /><Tooltip formatter={(v) => money(Number(v))} /><Bar dataKey="amount" fill="currentColor" className="text-primary" radius={[6,6,0,0]} /></BarChart></ResponsiveContainer></CardContent></Card>
          <Card><CardHeader><CardTitle>Spend by recommended vendor</CardTitle></CardHeader><CardContent className="h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={data?.spend_by_vendor ?? []}><CartesianGrid strokeDasharray="3 3" opacity={0.2} /><XAxis dataKey="vendor" hide /><YAxis /><Tooltip formatter={(v) => money(Number(v))} /><Bar dataKey="amount" fill="currentColor" className="text-primary" radius={[6,6,0,0]} /></BarChart></ResponsiveContainer></CardContent></Card>
        </div>

        <Card><CardHeader><CardTitle>Predictive spend forecast</CardTitle></CardHeader><CardContent><p className="mb-4 text-sm text-muted-foreground">{forecast.data?.method}{forecast.data?.warning ? ` · ${forecast.data.warning}` : ""}</p><div className="grid gap-3 md:grid-cols-3">{(forecast.data?.forecast ?? []).map((f) => <div key={f.period} className="rounded-lg border p-4"><p className="text-xs text-muted-foreground">{f.period}</p><p className="mt-1 text-xl font-semibold">{money(f.projected_spend)}</p></div>)}</div></CardContent></Card>

        <Card><CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="size-5" /> Supplier performance</CardTitle></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-muted-foreground"><th className="py-3">Vendor</th><th>Quotes</th><th>Wins</th><th>Win rate</th><th>Avg score</th><th>Compliance</th><th>Delivery</th></tr></thead><tbody>{(suppliers.data?.suppliers ?? []).map((row: any) => <tr key={row.vendor} className="border-b border-border/50"><td className="py-3 font-medium">{row.vendor}</td><td>{row.quotations}</td><td>{row.wins}</td><td>{row.win_rate}%</td><td>{row.average_final_score}</td><td>{row.average_compliance}%</td><td>{row.average_delivery_days} days</td></tr>)}</tbody></table></div></CardContent></Card>
      </div>
    </AppShell>
  );
}
