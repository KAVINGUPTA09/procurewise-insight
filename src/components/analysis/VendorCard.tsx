import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Vendor } from "@/api/types";
import { formatMoney, formatPercent, formatSpecs, itemName, vendorName } from "@/lib/analysis";
import { cn } from "@/lib/utils";

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="num mt-1 truncate text-sm font-semibold">{value}</p>
    </div>
  );
}

export function VendorCard({
  vendor,
  index,
  isBest = false,
}: {
  vendor: Vendor;
  index: number;
  isBest?: boolean | undefined;
}) {
  const items = Array.isArray(vendor.items) ? vendor.items : [];
  const currency = vendor.currency;
  const compliance = vendor.technical_compliance ?? vendor.technical_compliance_percent;

  return (
    <Card className={cn("shadow-card", isBest && "border-success/40 ring-1 ring-success/20")}>
      <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <CardTitle className="min-w-0 truncate text-base">{vendorName(vendor, index)}</CardTitle>
        {isBest ? (
          <Badge className="border-success/25 bg-success/10 text-success" variant="outline">
            Recommended
          </Badge>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Stat label="Currency" value={currency ?? "—"} />
          <Stat label="Delivery" value={`${vendor.delivery_days ?? "—"} days`} />
          <Stat label="Warranty" value={`${vendor.warranty_months ?? "—"} months`} />
          <Stat label="Payment Terms" value={vendor.payment_terms ?? "—"} />
          <Stat label="Technical Compliance" value={formatPercent(compliance)} />
          <Stat label="Past Rating" value={vendor.past_rating ?? "—"} />
        </div>

        {items.length ? (
          <div className="w-full overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Item</TableHead>
                  <TableHead className="whitespace-nowrap">Qty</TableHead>
                  <TableHead className="whitespace-nowrap">Unit Price</TableHead>
                  <TableHead>Specifications</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, itemIndex) => (
                  <TableRow key={itemIndex}>
                    <TableCell className="whitespace-nowrap font-medium">
                      {itemName(item)}
                    </TableCell>
                    <TableCell className="num">{item.quantity ?? "—"}</TableCell>
                    <TableCell className="num whitespace-nowrap">
                      {formatMoney(item.unit_price, currency)}
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
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : null}

        {vendor.subtotal !== undefined ? (
          <p className="text-sm text-muted-foreground">
            Quotation subtotal:{" "}
            <span className="num font-semibold text-foreground">
              {formatMoney(vendor.subtotal, currency)}
            </span>
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
