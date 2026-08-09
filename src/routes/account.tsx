import { createFileRoute } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { API_BASE_URL } from "@/api/client";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Profile & Account — ProcureMind AI" },
      {
        name: "description",
        content: "Review your ProcureMind AI account details, role and session settings.",
      },
      { property: "og:title", content: "Profile & Account — ProcureMind AI" },
      {
        property: "og:description",
        content: "Manage your procurement workspace profile and sign out securely.",
      },
    ],
  }),
  component: AccountPage,
});

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-semibold">{value}</p>
    </div>
  );
}

function AccountPage() {
  const { user, signOut } = useAuth();

  return (
    <AppShell title="Profile & Account" description="Your ProcureMind AI workspace identity">
      <div className="max-w-3xl space-y-5">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Account details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Row label="Name" value={user?.name ?? "—"} />
            <Row label="Email" value={user?.email ?? "—"} />
            <Row label="Role" value={<span className="capitalize">{user?.role ?? "—"}</span>} />
            <Row
              label="Status"
              value={user?.is_active === false ? "Inactive" : "Active"}
            />
            <Row label="User ID" value={<span className="num">{user?.id ?? "—"}</span>} />
            <Row label="API endpoint" value={API_BASE_URL} />
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Session</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-4">
            <p className="min-w-0 flex-1 text-sm text-muted-foreground">
              Signing out clears your access token from this browser session.
            </p>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="size-4" />
              Log out
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
