import { Sparkles, ShieldAlert, ThumbsUp, Handshake, Users } from "lucide-react";

import { StatusBadge } from "@/components/app/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AiRecommendation } from "@/api/types";
import { decisionTone, prettifyKey, toList } from "@/lib/analysis";

function Block({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h3 className="flex items-center gap-2 text-sm font-semibold">
        <Icon className="size-4 shrink-0 text-primary" />
        {title}
      </h3>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (!items.length) return <p className="text-sm text-muted-foreground">Not provided.</p>;
  return (
    <ul className="space-y-1.5">
      {items.map((entry, index) => (
        <li key={index} className="flex gap-2 text-sm text-muted-foreground">
          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60" />
          <span className="min-w-0">{entry}</span>
        </li>
      ))}
    </ul>
  );
}

function OtherVendorAnalysis({ value }: { value: unknown }) {
  if (!value) return <p className="text-sm text-muted-foreground">Not provided.</p>;

  if (value && typeof value === "object" && !Array.isArray(value)) {
    const entries = Object.entries(value as Record<string, unknown>);
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {entries.map(([vendor, detail]) => (
          <div key={vendor} className="rounded-lg border bg-muted/30 p-3">
            <p className="truncate text-sm font-semibold">{prettifyKey(vendor)}</p>
            <div className="mt-1.5">
              <BulletList items={toList(detail)} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <BulletList items={toList(value)} />;
}

export function AIRecommendationCard({
  recommendation,
  manualReview,
}: {
  recommendation: AiRecommendation;
  manualReview?: boolean | undefined;
}) {
  const decision = recommendation.final_decision;

  return (
    <Card className="border-primary/25 shadow-lift">
      <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b bg-accent/40">
        <CardTitle className="flex min-w-0 items-center gap-2 text-base">
          <Sparkles className="size-4 shrink-0 text-primary" />
          AI Procurement Recommendation
        </CardTitle>
        {decision ? (
          <StatusBadge tone={decisionTone(decision, manualReview)}>{decision}</StatusBadge>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Recommended Vendor
          </p>
          <p className="mt-1 truncate text-lg font-semibold">
            {recommendation.best_vendor ?? "—"}
          </p>
        </div>

        <Block title="Executive Summary" icon={Sparkles}>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {recommendation.executive_summary ?? "Not provided."}
          </p>
        </Block>

        <Block title="Why Selected" icon={ThumbsUp}>
          <BulletList items={toList(recommendation.selection_reasons)} />
        </Block>

        <div className="grid gap-6 lg:grid-cols-2">
          <Block title="Strengths" icon={ThumbsUp}>
            <BulletList items={toList(recommendation.strengths)} />
          </Block>
          <Block title="Risks" icon={ShieldAlert}>
            <BulletList items={toList(recommendation.risks)} />
          </Block>
        </div>

        <Block title="Other Vendor Analysis" icon={Users}>
          <OtherVendorAnalysis value={recommendation.other_vendor_analysis} />
        </Block>

        <Block title="Negotiation Suggestions" icon={Handshake}>
          <BulletList items={toList(recommendation.negotiation_suggestions)} />
        </Block>

        <div className="rounded-lg border bg-surface p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Final Decision
          </p>
          <p className="mt-1 text-sm font-semibold">{decision ?? "—"}</p>
        </div>
      </CardContent>
    </Card>
  );
}
