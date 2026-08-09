import type {
  AiRecommendation,
  AnalysisResult,
  ComplianceReport,
  ScoringResult,
  StructuredRfq,
  Vendor,
} from "@/api/types";

export interface NormalizedAnalysis {
  analysisId: number | string | undefined;
  rfqFilename: string | undefined;
  createdAt: string | undefined;
  vendorCount: number | undefined;
  requiresManualReview: boolean;
  reviewReason: string | undefined;
  dataComplete: boolean | undefined;
  missingDataReason: string | undefined;
  compliancePassed: boolean | undefined;
  complianceReason: string | undefined;
  rfq: StructuredRfq;
  vendors: Vendor[];
  complianceReports: ComplianceReport[];
  scoring: ScoringResult;
  recommendation: AiRecommendation;
  bestVendor: string | undefined;
  finalDecision: string | undefined;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export function normalizeAnalysis(raw: AnalysisResult | undefined | null): NormalizedAnalysis {
  const data = asRecord(raw);
  const nested = asRecord(data["analysis"]);
  const src: Record<string, unknown> = { ...nested, ...data };

  const rfq = asRecord(src["structured_rfq"] ?? src["rfq"]) as StructuredRfq;
  const scoring = asRecord(src["scoring_result"] ?? src["scoring"]) as ScoringResult;
  const recommendation = asRecord(
    src["ai_recommendation"] ?? src["recommendation"],
  ) as AiRecommendation;
  const comparison = asRecord(src["comparison"]);

  const vendors = asArray<Vendor>(src["vendors"] ?? comparison["vendors"]);
  const complianceReports = asArray<ComplianceReport>(
    src["compliance_reports"] ?? src["compliance"] ?? comparison["compliance_reports"],
  );

  const rankings = asArray<Record<string, unknown>>(scoring.rankings);
  const bestVendor =
    (scoring.best_vendor as string | undefined) ??
    (recommendation.best_vendor as string | undefined) ??
    (src["best_vendor"] as string | undefined) ??
    (rankings[0]?.["vendor_name"] as string | undefined);

  return {
    analysisId: (src["analysis_id"] ?? src["id"]) as number | string | undefined,
    rfqFilename: (src["rfq_filename"] ?? src["filename"]) as string | undefined,
    createdAt: src["created_at"] as string | undefined,
    vendorCount: (src["vendor_count"] as number | undefined) ?? vendors.length || undefined,
    requiresManualReview: Boolean(src["requires_manual_review"]),
    reviewReason: src["review_reason"] as string | undefined,
    dataComplete: src["data_complete"] as boolean | undefined,
    missingDataReason: src["missing_data_reason"] as string | undefined,
    compliancePassed: src["compliance_passed"] as boolean | undefined,
    complianceReason: src["compliance_reason"] as string | undefined,
    rfq,
    vendors,
    complianceReports,
    scoring,
    recommendation,
    bestVendor,
    finalDecision:
      (recommendation.final_decision as string | undefined) ??
      (src["final_decision"] as string | undefined),
  };
}

export function toList(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((entry) =>
        typeof entry === "string" ? entry : typeof entry === "object" ? formatEntry(entry) : "",
      )
      .filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(/\n+|(?:^|\s)[-•]\s+/)
      .map((line) => line.trim())
      .filter(Boolean);
  }
  if (typeof value === "object") return [formatEntry(value)];
  return [];
}

function formatEntry(entry: unknown): string {
  const rec = asRecord(entry);
  const keys = Object.keys(rec);
  if (!keys.length) return "";
  return keys.map((key) => `${prettifyKey(key)}: ${String(rec[key])}`).join(" · ");
}

export function prettifyKey(key: string): string {
  return key
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

export function formatSpecs(specs: unknown): { label: string; value: string }[] {
  const rec = asRecord(specs);
  return Object.entries(rec).map(([key, value]) => ({
    label: prettifyKey(key),
    value:
      value === null || value === undefined
        ? "—"
        : typeof value === "object"
          ? JSON.stringify(value)
          : String(value),
  }));
}

export function formatMoney(value: unknown, currency?: string): string {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return "—";
  const formatted = num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  return currency ? `${currency} ${formatted}` : formatted;
}

export function formatScore(value: unknown): string {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return "—";
  return num.toFixed(2);
}

export function formatPercent(value: unknown): string {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return "—";
  return `${num.toFixed(num % 1 === 0 ? 0 : 1)}%`;
}

export function formatDate(value: unknown): string {
  if (typeof value !== "string" || !value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function vendorName(vendor: Vendor, index: number): string {
  return (vendor.vendor_name ?? vendor.name ?? `Vendor ${index + 1}`) as string;
}

export function itemName(item: { item_name?: string; item?: string; name?: string }): string {
  return item.item_name ?? item.item ?? item.name ?? "Item";
}

export type DecisionTone = "approved" | "review" | "rejected" | "neutral";

export function decisionTone(decision: string | undefined, manualReview?: boolean): DecisionTone {
  if (manualReview) return "review";
  const value = (decision ?? "").toLowerCase();
  if (!value) return "neutral";
  if (value.includes("reject")) return "rejected";
  if (value.includes("review") || value.includes("hold")) return "review";
  if (value.includes("approve") || value.includes("accept")) return "approved";
  return "neutral";
}
