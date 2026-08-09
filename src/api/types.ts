export interface StructuredRfqItem {
  item_name?: string;
  item?: string;
  name?: string;
  quantity?: number;
  required_quantity?: number;
  specifications?: Record<string, unknown> | null;
  [key: string]: unknown;
}

export interface StructuredRfq {
  rfq_title?: string;
  title?: string;
  department?: string;
  currency?: string;
  required_delivery_days?: number;
  required_warranty_months?: number;
  items?: StructuredRfqItem[];
  [key: string]: unknown;
}

export interface VendorQuoteItem {
  item_name?: string;
  item?: string;
  name?: string;
  quantity?: number;
  unit_price?: number;
  specifications?: Record<string, unknown> | null;
  [key: string]: unknown;
}

export interface Vendor {
  vendor_name?: string;
  name?: string;
  currency?: string;
  delivery_days?: number;
  warranty_months?: number;
  payment_terms?: string;
  technical_compliance?: number;
  technical_compliance_percent?: number;
  past_rating?: number;
  subtotal?: number;
  items?: VendorQuoteItem[];
  [key: string]: unknown;
}

export interface ComplianceItemCheck {
  item_name?: string;
  item?: string;
  checks?: Record<string, unknown> | null;
  [key: string]: unknown;
}

export interface ComplianceReport {
  vendor_name?: string;
  overall_compliance?: number;
  compliance_percent?: number;
  delivery_match?: boolean;
  warranty_match?: boolean;
  passed_checks?: number;
  total_checks?: number;
  item_compliance?: ComplianceItemCheck[];
  items?: ComplianceItemCheck[];
  [key: string]: unknown;
}

export interface VendorRanking {
  vendor_name?: string;
  subtotal?: number;
  price_score?: number;
  delivery_score?: number;
  compliance_score?: number;
  past_rating_score?: number;
  warranty_score?: number;
  final_score?: number;
  rank?: number;
  [key: string]: unknown;
}

export interface ScoringResult {
  best_vendor?: string;
  rankings?: VendorRanking[];
  [key: string]: unknown;
}

export interface AiRecommendation {
  best_vendor?: string;
  executive_summary?: string;
  selection_reasons?: string[] | string;
  strengths?: string[] | string;
  risks?: string[] | string;
  other_vendor_analysis?: unknown;
  negotiation_suggestions?: string[] | string;
  final_decision?: string;
  [key: string]: unknown;
}

export interface AnalysisResult {
  message?: string;
  workflow_status?: string;
  analysis_id?: number;
  comparison_id?: number;
  user_id?: number;
  rfq_filename?: string;
  vendor_count?: number;
  data_complete?: boolean;
  missing_data_reason?: string;
  compliance_passed?: boolean;
  compliance_reason?: string;
  requires_manual_review?: boolean;
  review_reason?: string;
  created_at?: string;
  structured_rfq?: StructuredRfq;
  rfq?: StructuredRfq;
  vendors?: Vendor[];
  compliance_reports?: ComplianceReport[];
  compliance?: ComplianceReport[];
  scoring_result?: ScoringResult;
  scoring?: ScoringResult;
  comparison?: Record<string, unknown>;
  ai_recommendation?: AiRecommendation;
  recommendation?: AiRecommendation;
  [key: string]: unknown;
}

export interface HistoryItem {
  analysis_id: number;
  filename?: string;
  rfq_title?: string;
  department?: string;
  created_at?: string;
  best_vendor?: string;
  final_decision?: string;
  requires_manual_review?: boolean;
  [key: string]: unknown;
}

export interface HistoryResponse {
  user_id?: number;
  total_analyses?: number;
  history: HistoryItem[];
}

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  role?: string;
  is_active?: boolean;
}
