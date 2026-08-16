import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Vendor } from "@/api/types";

import {
  formatMoney,
  formatPercent,
  formatSpecs,
  itemName,
  vendorName,
} from "@/lib/analysis";

import { cn } from "@/lib/utils";


function Stat({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-medium">
        {value}
      </p>
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
  isBest?: boolean;
}) {

  // -------------------------------------------------------
  // Vendor may come from live analysis OR history response.
  // Keep fallbacks for both formats.
  // -------------------------------------------------------

  const vendorData =
    vendor as Vendor & {
      line_items?: any[];
      payment_terms_days?: number;
      quoted_items?: any[];
      compliance_percentage?: number;
    };


  // -------------------------------------------------------
  // ITEMS
  // -------------------------------------------------------

  const items =
    Array.isArray(vendorData.line_items)
      ? vendorData.line_items
      : Array.isArray(vendorData.items)
        ? vendorData.items
        : Array.isArray(vendorData.quoted_items)
          ? vendorData.quoted_items
          : [];


  // -------------------------------------------------------
  // BASIC VALUES
  // -------------------------------------------------------

  const currency =
    vendorData.currency;


  const compliance =
    vendorData.technical_compliance ??
    vendorData.technical_compliance_percent ??
    vendorData.compliance_percentage;


  // -------------------------------------------------------
  // PAYMENT TERMS
  // -------------------------------------------------------

  let paymentTerms: string = "—";


  if (
    vendorData.payment_terms_days !== undefined &&
    vendorData.payment_terms_days !== null
  ) {
    paymentTerms =
      `${vendorData.payment_terms_days} days`;
  }

  else if (
    vendorData.payment_terms !== undefined &&
    vendorData.payment_terms !== null
  ) {
    paymentTerms =
      String(vendorData.payment_terms);
  }


  return (
    <Card
      className={cn(
        "shadow-card",
        isBest &&
          "border-success/40 ring-1 ring-success/20"
      )}
    >

      <CardHeader>

        <div className="flex items-center justify-between gap-3">

          <CardTitle className="text-base">
            {vendorName(vendorData, index)}
          </CardTitle>


          {isBest ? (
            <Badge>
              Recommended
            </Badge>
          ) : null}

        </div>

      </CardHeader>


      <CardContent className="space-y-5">

        {/* ============================================= */}
        {/* Vendor Stats */}
        {/* ============================================= */}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">

          <Stat
            label="Currency"
            value={currency ?? "—"}
          />


          <Stat
            label="Delivery"
            value={
              vendorData.delivery_days !== undefined
                ? `${vendorData.delivery_days} days`
                : "—"
            }
          />


          <Stat
            label="Warranty"
            value={
              vendorData.warranty_months !== undefined
                ? `${vendorData.warranty_months} months`
                : "—"
            }
          />


          <Stat
            label="Payment Terms"
            value={paymentTerms}
          />


          <Stat
            label="Technical Compliance"
            value={
              compliance !== undefined
                ? formatPercent(compliance)
                : "—"
            }
          />


          <Stat
            label="Past Rating"
            value={
              vendorData.past_rating ??
              "—"
            }
          />

        </div>


        {/* ============================================= */}
        {/* Vendor Items */}
        {/* ============================================= */}

        {items.length > 0 ? (

          <div className="w-full overflow-x-auto rounded-lg border">

            <Table>

              <TableHeader>

                <TableRow className="bg-muted/50">

                  <TableHead>
                    Item
                  </TableHead>

                  <TableHead className="whitespace-nowrap">
                    Qty
                  </TableHead>

                  <TableHead className="whitespace-nowrap">
                    Unit Price
                  </TableHead>

                  <TableHead>
                    Specifications
                  </TableHead>

                </TableRow>

              </TableHeader>


              <TableBody>

                {items.map(
                  (item: any, itemIndex: number) => {

                    const quantity =
                      item.quoted_quantity ??
                      item.quantity ??
                      "—";


                    return (

                      <TableRow key={itemIndex}>

                        <TableCell className="whitespace-nowrap font-medium">

                          {itemName(item)}

                        </TableCell>


                        <TableCell className="num">

                          {quantity}

                        </TableCell>


                        <TableCell className="num whitespace-nowrap">

                          {formatMoney(
                            item.unit_price,
                            currency
                          )}

                        </TableCell>


                        <TableCell>

                          <div className="flex flex-wrap gap-1.5">

                            {formatSpecs(
                              item.specifications
                            ).map((spec) => (

                              <span
                                key={spec.label}
                                className="rounded-md border bg-muted/50 px-2 py-0.5 text-xs"
                              >

                                <span className="text-muted-foreground">
                                  {spec.label}:{" "}
                                </span>

                                {spec.value}

                              </span>

                            ))}

                          </div>

                        </TableCell>

                      </TableRow>

                    );
                  }
                )}

              </TableBody>

            </Table>

          </div>

        ) : null}


        {/* ============================================= */}
        {/* Subtotal */}
        {/* ============================================= */}

        {vendorData.subtotal !== undefined ? (

          <p className="text-sm text-muted-foreground">

            Quotation subtotal:{" "}

            <span className="num font-semibold text-foreground">

              {formatMoney(
                vendorData.subtotal,
                currency
              )}

            </span>

          </p>

        ) : null}

      </CardContent>

    </Card>
  );
}