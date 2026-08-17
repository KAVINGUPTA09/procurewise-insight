import { request } from "./client";

export type DashboardAnalytics = {
  role: string;
  analysis_count: number;
  vendor_quotes_evaluated: number;
  total_evaluated_spend: number;
  recommended_spend: number;
  pending_approvals: number;
  decision_counts: Record<string, number>;
  spend_by_department: { department: string; amount: number }[];
  spend_by_vendor: { vendor: string; amount: number }[];
};

export type ApprovalItem = {
  approval_id: number;
  analysis_id: number;
  buyer_user_id: number;
  rfq_title: string;
  department: string;
  best_vendor?: string;
  ai_decision?: string;
  status: string;
  comment?: string;
  created_at?: string;
  decided_at?: string;
};

export const getB2BDashboard = () => request<DashboardAnalytics>("/b2b/dashboard");
export const getSupplierPerformance = () => request<{ suppliers: Record<string, unknown>[] }>("/b2b/supplier-performance");
export const getApprovals = () => request<{ approvals: ApprovalItem[] }>("/b2b/approvals");
export const decideApproval = (analysisId: number, decision: "approved" | "rejected" | "changes_requested", comment?: string) =>
  request(`/b2b/approvals/${analysisId}/decision`, { method: "POST", body: { decision, comment } });

export const runWhatIf = (analysisId: number | string, weights: Record<string, number>) =>
  request<{ best_vendor?: string; winner_changed: boolean; rankings: Record<string, unknown>[] }>(`/b2b/analysis/${analysisId}/what-if`, { method: "POST", body: weights });

export const getExplainability = (analysisId: number | string) =>
  request<{ vendors: Record<string, unknown>[] }>(`/b2b/analysis/${analysisId}/explainability`);

export const getRiskAnalysis = (analysisId: number | string) =>
  request<{ risk_count: number; high_risk_count: number; flags: { vendor: string; severity: string; type: string; message: string }[]; note: string }>(`/b2b/analysis/${analysisId}/risk`);

export const getNegotiation = (analysisId: number | string) =>
  request<{ vendor: string; suggestions: string[]; email_subject: string; email_draft: string }>(`/b2b/analysis/${analysisId}/negotiation`);

export const askCopilot = (analysisId: number | string, question: string) =>
  request<{ answer: string }>(`/b2b/analysis/${analysisId}/copilot`, { method: "POST", body: { question } });

export const getAgentPipeline = (analysisId: number | string) =>
  request<{ pipeline: { id: string; name: string; status: string; output: string }[] }>(`/b2b/analysis/${analysisId}/agent-pipeline`);

export const getAdminUsers = () => request<{ users: { id: number; name: string; email: string; role: string; is_active: boolean }[] }>("/b2b/admin/users");
export const updateUserRole = (userId: number, role: "buyer" | "approver" | "admin") =>
  request(`/b2b/admin/users/${userId}/role`, { method: "PATCH", body: { role } });

export const getContracts = () => request<{ contracts: { id: number; vendor_name: string; title: string; value: number; currency: string; status: string; start_date?: string; end_date?: string; expires_within_60_days: boolean; terms: Record<string, unknown> }[] }>("/b2b/contracts");
export const createContract = (payload: Record<string, unknown>) => request("/b2b/contracts", { method: "POST", body: payload });
export const getSpendForecast = () => request<{ history_months: { month: string; recommended_spend: number }[]; forecast: { period: string; projected_spend: number }[]; method: string; warning?: string }>("/b2b/forecast");
