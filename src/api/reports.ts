import { requestBlob } from "./client";

export async function downloadReport(analysisId: number | string): Promise<void> {
  const blob = await requestBlob(`/reports/${analysisId}/pdf`);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ProcureMind_Report_${analysisId}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
