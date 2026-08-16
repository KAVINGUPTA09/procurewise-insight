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


// =========================================================
// Helpers
// =========================================================

function asRecord(value: unknown): Record<string, unknown> {
  if (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value as Record<string, unknown>;
  }

  return {};
}


function asArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) {
    return value as T[];
  }

  return [];
}


// =========================================================
// Normalize Analysis
// Supports:
// 1. Live LangGraph response
// 2. History detail response
// =========================================================

export function normalizeAnalysis(
  raw: AnalysisResult | undefined | null
): NormalizedAnalysis {

  const data = asRecord(raw);

  const analysis = asRecord(
    data["analysis"]
  );

  const src: Record<string, unknown> = {
    ...analysis,
    ...data,
  };


  // -------------------------------------------------------
  // HISTORY NESTED OBJECTS
  // -------------------------------------------------------

  const rfqRecord = asRecord(
    src["rfq"]
  );

  const comparison = asRecord(
    src["comparison"]
  );


  // -------------------------------------------------------
  // RFQ
  //
  // Live:
  // structured_rfq
  //
  // History:
  // rfq.structured_data
  // -------------------------------------------------------

  const rfqData = asRecord(
    src["structured_rfq"] ??
    rfqRecord["structured_data"] ??
    src["rfq"]
  );


  const rfq = rfqData as StructuredRfq;


  // -------------------------------------------------------
  // SCORING
  // -------------------------------------------------------

  const scoringData = asRecord(
    src["scoring_result"] ??
    src["scoring"] ??
    comparison["scoring_result"]
  );

  const scoring =
    scoringData as ScoringResult;


  // -------------------------------------------------------
  // AI RECOMMENDATION
  // -------------------------------------------------------

  const recommendationData = asRecord(
    src["ai_recommendation"] ??
    src["recommendation"] ??
    comparison["ai_recommendation"]
  );

  const recommendation =
    recommendationData as AiRecommendation;


  // -------------------------------------------------------
  // VENDORS
  //
  // History response stores useful vendor fields inside:
  // structured_data
  // -------------------------------------------------------

  const rawVendors =
    asArray<Record<string, unknown>>(
      src["vendors"]
    );


  const vendors: Vendor[] =
    rawVendors.map((vendorRecord) => {

      const structuredData = asRecord(
        vendorRecord["structured_data"]
      );


      // HISTORY RESPONSE
      if (
        Object.keys(structuredData).length > 0
      ) {

        return {
          ...structuredData,

          subtotal:
            vendorRecord["subtotal"],

          final_score:
            vendorRecord["final_score"],

          rank:
            vendorRecord["rank"],

          filename:
            vendorRecord["filename"],

        } as unknown as Vendor;
      }


      // LIVE LANGGRAPH RESPONSE
      return vendorRecord as unknown as Vendor;
    });


  // -------------------------------------------------------
  // COMPLIANCE REPORTS
  // -------------------------------------------------------

  let complianceReports =
    asArray<ComplianceReport>(
      src["compliance_reports"] ??
      src["compliance"] ??
      comparison["compliance_reports"]
    );


  // History response may store compliance
  // inside every vendor record.
  if (complianceReports.length === 0) {

    const rebuiltReports: ComplianceReport[] = [];


    rawVendors.forEach(
      (vendorRecord, index) => {

        const report = asRecord(
          vendorRecord["compliance_report"]
        );

        if (
          Object.keys(report).length === 0
        ) {
          return;
        }


        const structuredData = asRecord(
          vendorRecord["structured_data"]
        );


        const vendorName =
          typeof structuredData["vendor_name"] === "string"
            ? structuredData["vendor_name"]
            : `Vendor ${index + 1}`;


        rebuiltReports.push(
          {
            vendor_name: vendorName,
            report: report,
          } as unknown as ComplianceReport
        );
      }
    );


    complianceReports =
      rebuiltReports;
  }


  // -------------------------------------------------------
  // RANKINGS
  // -------------------------------------------------------

  const scoringRecord =
    scoring as unknown as Record<
      string,
      unknown
    >;

  const rankings =
    asArray<Record<string, unknown>>(
      scoringRecord["rankings"]
    );


  // -------------------------------------------------------
  // BEST VENDOR
  // -------------------------------------------------------

  let bestVendor:
    string | undefined;


  if (
    typeof scoringRecord["best_vendor"] ===
    "string"
  ) {

    bestVendor =
      scoringRecord["best_vendor"];
  }

  else if (
    typeof recommendationData[
      "best_vendor"
    ] === "string"
  ) {

    bestVendor =
      recommendationData[
        "best_vendor"
      ] as string;
  }

  else if (
    typeof comparison[
      "best_vendor"
    ] === "string"
  ) {

    bestVendor =
      comparison[
        "best_vendor"
      ] as string;
  }

  else if (
    typeof src["best_vendor"] === "string"
  ) {

    bestVendor =
      src["best_vendor"] as string;
  }

else {
  const firstRanking = rankings[0];

  if (
    firstRanking &&
    typeof firstRanking["vendor_name"] === "string"
  ) {
    bestVendor = firstRanking["vendor_name"];
  }
}

  // -------------------------------------------------------
  // FINAL DECISION
  // -------------------------------------------------------

  let finalDecision:
    string | undefined;


  if (
    typeof recommendationData[
      "final_decision"
    ] === "string"
  ) {

    finalDecision =
      recommendationData[
        "final_decision"
      ] as string;
  }

  else if (
    typeof comparison[
      "final_decision"
    ] === "string"
  ) {

    finalDecision =
      comparison[
        "final_decision"
      ] as string;
  }

  else if (
    typeof src[
      "final_decision"
    ] === "string"
  ) {

    finalDecision =
      src[
        "final_decision"
      ] as string;
  }


  // -------------------------------------------------------
  // SIMPLE VALUES
  // -------------------------------------------------------

  const analysisId =
    (
      src["analysis_id"] ??
      src["id"] ??
      rfqRecord["id"]
    ) as number | string | undefined;


  const rfqFilename =
    (
      src["rfq_filename"] ??
      src["filename"] ??
      rfqRecord["filename"]
    ) as string | undefined;


  const createdAt =
    (
      src["created_at"] ??
      rfqRecord["created_at"] ??
      comparison["created_at"]
    ) as string | undefined;


  const vendorCount =
    typeof src["vendor_count"] === "number"
      ? src["vendor_count"]
      : vendors.length > 0
        ? vendors.length
        : undefined;


  // -------------------------------------------------------
  // FINAL NORMALIZED RESULT
  // -------------------------------------------------------

  return {
    analysisId,
    rfqFilename,
    createdAt,
    vendorCount,

    requiresManualReview:
      Boolean(
        src["requires_manual_review"]
      ),

    reviewReason:
      src["review_reason"] as
        | string
        | undefined,

    dataComplete:
      src["data_complete"] as
        | boolean
        | undefined,

    missingDataReason:
      src["missing_data_reason"] as
        | string
        | undefined,

    compliancePassed:
      src["compliance_passed"] as
        | boolean
        | undefined,

    complianceReason:
      src["compliance_reason"] as
        | string
        | undefined,

    rfq,
    vendors,
    complianceReports,
    scoring,
    recommendation,
    bestVendor,
    finalDecision,
  };
}


// =========================================================
// AI Lists
// =========================================================

export function toList(
  value: unknown
): string[] {

  if (!value) {
    return [];
  }


  if (Array.isArray(value)) {

    return value
      .map((entry) => {

        if (
          typeof entry === "string"
        ) {
          return entry;
        }

        if (
          typeof entry === "object"
        ) {
          return formatEntry(entry);
        }

        return "";
      })
      .filter(Boolean);
  }


  if (
    typeof value === "string"
  ) {

    return value
      .split(
        /\n+|(?:^|\s)[-•]\s+/
      )
      .map(
        (line) => line.trim()
      )
      .filter(Boolean);
  }


  if (
    typeof value === "object"
  ) {

    return [
      formatEntry(value)
    ];
  }


  return [];
}


// =========================================================
// Format Object Entry
// =========================================================

function formatEntry(
  entry: unknown
): string {

  const rec =
    asRecord(entry);

  const keys =
    Object.keys(rec);


  if (keys.length === 0) {
    return "";
  }


  return keys
    .map(
      (key) =>
        `${prettifyKey(key)}: ${String(
          rec[key]
        )}`
    )
    .join(" · ");
}


// =========================================================
// Pretty Key
// =========================================================

export function prettifyKey(
  key: string
): string {

  return key
    .replace(
      /[_-]+/g,
      " "
    )
    .replace(
      /\b\w/g,
      (char) =>
        char.toUpperCase()
    )
    .trim();
}


// =========================================================
// Specifications
// =========================================================

export function formatSpecs(
  specs: unknown
): {
  label: string;
  value: string;
}[] {

  const rec =
    asRecord(specs);


  return Object.entries(
    rec
  ).map(
    ([key, value]) => ({

      label:
        prettifyKey(key),

      value:
        value === null ||
        value === undefined

          ? "—"

          : typeof value ===
              "object"

            ? JSON.stringify(value)

            : String(value),
    })
  );
}


// =========================================================
// Money
// =========================================================

export function formatMoney(
  value: unknown,
  currency?: string
): string {

  const num =
    typeof value === "number"
      ? value
      : Number(value);


  if (
    !Number.isFinite(num)
  ) {
    return "—";
  }


  const formatted =
    num.toLocaleString(
      undefined,
      {
        maximumFractionDigits: 2,
      }
    );


  if (currency) {
    return `${currency} ${formatted}`;
  }


  return formatted;
}


// =========================================================
// Score
// =========================================================

export function formatScore(
  value: unknown
): string {

  const num =
    typeof value === "number"
      ? value
      : Number(value);


  if (
    !Number.isFinite(num)
  ) {
    return "—";
  }


  return num.toFixed(2);
}


// =========================================================
// Percentage
// =========================================================

export function formatPercent(
  value: unknown
): string {

  const num =
    typeof value === "number"
      ? value
      : Number(value);


  if (
    !Number.isFinite(num)
  ) {
    return "—";
  }


  return `${num.toFixed(
    num % 1 === 0
      ? 0
      : 1
  )}%`;
}


// =========================================================
// Date
// =========================================================

export function formatDate(
  value: unknown
): string {

  if (
    typeof value !== "string" ||
    !value
  ) {
    return "—";
  }


  const date =
    new Date(value);


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }


  return date.toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}


// =========================================================
// Vendor Name
// =========================================================

export function vendorName(
  vendor: Vendor,
  index: number
): string {

  return (
    vendor.vendor_name ??
    vendor.name ??
    `Vendor ${index + 1}`
  ) as string;
}


// =========================================================
// Item Name
// =========================================================

export function itemName(
  item: {
    item_name?: string;
    item?: string;
    name?: string;
  }
): string {

  return (
    item.item_name ??
    item.item ??
    item.name ??
    "Item"
  );
}


// =========================================================
// Decision Tone
// =========================================================

export type DecisionTone =
  | "approved"
  | "review"
  | "rejected"
  | "neutral";


export function decisionTone(
  decision: string | undefined,
  manualReview?: boolean
): DecisionTone {

  if (manualReview) {
    return "review";
  }


  const value =
    (
      decision ?? ""
    ).toLowerCase();


  if (!value) {
    return "neutral";
  }


  if (
    value.includes("reject")
  ) {
    return "rejected";
  }


  if (
    value.includes("review") ||
    value.includes("hold")
  ) {
    return "review";
  }


  if (
    value.includes("approve") ||
    value.includes("accept")
  ) {
    return "approved";
  }


  return "neutral";
}