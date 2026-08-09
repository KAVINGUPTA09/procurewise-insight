import { Link } from "@tanstack/react-router";
import { Download, Eye, Trash2 } from "lucide-react";

import { StatusBadge } from "@/components/app/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { HistoryItem } from "@/api/types";
import { decisionTone, formatDate } from "@/lib/analysis";

export function HistoryTable({
  items,
  compact = false,
  onDownload,
  onDelete,
  downloadingId,
}: {
  items: HistoryItem[];
  compact?: boolean | undefined;
  onDownload?: ((id: number) => void) | undefined;
  onDelete?: ((item: HistoryItem) => void) | undefined;
  downloadingId?: number | null | undefined;
}) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border bg-surface shadow-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="whitespace-nowrap">Analysis</TableHead>
            <TableHead className="whitespace-nowrap">RFQ</TableHead>
            {compact ? null : <TableHead className="whitespace-nowrap">File</TableHead>}
            <TableHead className="whitespace-nowrap">Department</TableHead>
            <TableHead className="whitespace-nowrap">Best Vendor</TableHead>
            <TableHead className="whitespace-nowrap">Decision</TableHead>
            <TableHead className="whitespace-nowrap">Created</TableHead>
            <TableHead className="whitespace-nowrap text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.analysis_id}>
              <TableCell className="num whitespace-nowrap font-medium">
                #{item.analysis_id}
              </TableCell>
              <TableCell className="max-w-[220px] truncate">{item.rfq_title ?? "—"}</TableCell>
              {compact ? null : (
                <TableCell className="max-w-[180px] truncate text-muted-foreground">
                  {item.filename ?? "—"}
                </TableCell>
              )}
              <TableCell className="whitespace-nowrap">{item.department ?? "—"}</TableCell>
              <TableCell className="max-w-[200px] truncate font-medium">
                {item.best_vendor ?? "—"}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <StatusBadge
                  tone={decisionTone(item.final_decision, item.requires_manual_review)}
                >
                  {item.requires_manual_review
                    ? "Manual Review"
                    : (item.final_decision ?? "Pending")}
                </StatusBadge>
              </TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">
                {formatDate(item.created_at)}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1.5">
                  <Button asChild variant="outline" size="sm">
                    <Link
                      to="/analysis/$analysisId"
                      params={{ analysisId: String(item.analysis_id) }}
                    >
                      <Eye className="size-3.5" />
                      View
                    </Link>
                  </Button>
                  {onDownload ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Download report"
                      disabled={downloadingId === item.analysis_id}
                      onClick={() => onDownload(item.analysis_id)}
                    >
                      <Download className="size-4" />
                    </Button>
                  ) : null}
                  {onDelete ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Delete analysis"
                      className="text-destructive hover:text-destructive"
                      onClick={() => onDelete(item)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  ) : null}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
