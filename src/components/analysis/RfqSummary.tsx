import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { StructuredRfq } from "@/api/types";
import { formatSpecs, itemName } from "@/lib/analysis";

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="num mt-1 truncate text-sm font-semibold">{value}</p>
    </div>
  );
}

export function RfqSummary({ rfq }: { rfq: StructuredRfq }) {
  const items = Array.isArray(rfq.items) ? rfq.items : [];

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-base">RFQ Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="RFQ Title" value={rfq.rfq_title ?? rfq.title ?? "—"} />
          <Field label="Department" value={rfq.department ?? "—"} />
          <Field label="Currency" value={rfq.currency ?? "—"} />
          <Field label="Required Delivery" value={`${rfq.required_delivery_days ?? "—"} days`} />
          <Field label="Required Warranty" value={`${rfq.required_warranty_months ?? "—"} months`} />
          <Field label="Line Items" value={items.length || "—"} />
        </div>

        {items.length ? (
          <div className="w-full overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Item</TableHead>
                  <TableHead className="whitespace-nowrap">Required Qty</TableHead>
                  <TableHead>Specifications</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="whitespace-nowrap font-medium">
                      {itemName(item)}
                    </TableCell>
                    <TableCell className="num">
                      {item.quantity ?? item.required_quantity ?? "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {formatSpecs(item.specifications).map((spec) => (
                          <span
                            key={spec.label}
                            className="rounded-md border bg-muted/50 px-2 py-0.5 text-xs"
                          >
                            <span className="text-muted-foreground">{spec.label}: </span>
                            {spec.value}
                          </span>
                        ))}
                        {formatSpecs(item.specifications).length === 0 ? (
                          <span className="text-xs text-muted-foreground">—</span>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
