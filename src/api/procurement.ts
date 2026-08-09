import { request } from "./client";
import type { AnalysisResult } from "./types";

export async function runComparison(
  rfqFile: File,
  vendorFiles: File[],
  signal?: AbortSignal,
): Promise<AnalysisResult> {
  const form = new FormData();
  form.append("rfq_file", rfqFile);
  vendorFiles.forEach((file) => form.append("vendor_files", file));

  return request<AnalysisResult>("/procurement/compare-multiple-pdfs", {
    method: "POST",
    body: form,
    signal,
  });
}
