import { request } from "./client";
import type { AnalysisResult, HistoryResponse } from "./types";

export async function getHistory(): Promise<HistoryResponse> {
  const data = await request<HistoryResponse | unknown[]>("/history");
  if (Array.isArray(data)) {
    return { history: data as HistoryResponse["history"], total_analyses: data.length };
  }
  return { ...data, history: data?.history ?? [] };
}

export async function getAnalysis(analysisId: number | string): Promise<AnalysisResult> {
  return request<AnalysisResult>(`/history/${analysisId}`);
}

export async function deleteAnalysis(analysisId: number | string): Promise<void> {
  await request<unknown>(`/history/${analysisId}`, { method: "DELETE" });
}
