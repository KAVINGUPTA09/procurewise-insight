import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type {
  ComplianceReport,
} from "@/api/types";

import {
  formatPercent,
  itemName,
  prettifyKey,
} from "@/lib/analysis";

import {
  cn,
} from "@/lib/utils";


// =========================================================
// Check Row
// =========================================================

function CheckRow({
  label,
  passed,
}: {
  label: string;
  passed: boolean;
}) {

  return (

    <li className="flex items-center gap-2 text-sm">

      {passed ? (

        <CheckCircle2 className="size-4 shrink-0 text-success" />

      ) : (

        <XCircle className="size-4 shrink-0 text-destructive" />

      )}


      <span>
        {label}
      </span>

    </li>

  );
}


// =========================================================
// Compliance Card
// =========================================================

export function ComplianceCard({
  report,
}: {
  report: ComplianceReport;
}) {

  // -------------------------------------------------------
  // Allow extra backend fields safely
  // -------------------------------------------------------

  const data =
    report as ComplianceReport & {

      compliance_percentage?: number;

      technical_compliance_percent?: number;

      passed?: number;

      total?: number;

      checks_passed?: number;

      checks_total?: number;

      report?: Record<string, unknown>;

      checks?: Record<string, unknown>;
    };


  // -------------------------------------------------------
  // Some history responses wrap actual report inside
  // report.report
  // -------------------------------------------------------

  const nested =
    data.report &&
    typeof data.report === "object"
      ? data.report
      : {};


  // -------------------------------------------------------
  // OVERALL COMPLIANCE
  // -------------------------------------------------------

  const overall =
    data.overall_compliance ??
    data.compliance_percent ??
    data.compliance_percentage ??
    data.technical_compliance_percent ??
    nested["overall_compliance"] ??
    nested["compliance_percent"] ??
    nested["compliance_percentage"];


  const pct =
    Number(overall);


  const safePct =
    Number.isFinite(pct)
      ? Math.max(
          0,
          Math.min(
            100,
            pct
          )
        )
      : 0;


  // -------------------------------------------------------
  // DELIVERY
  // -------------------------------------------------------

  const deliveryMatch =
    data.delivery_match ??
    nested["delivery_match"] ??
    false;


  // -------------------------------------------------------
  // WARRANTY
  // -------------------------------------------------------

  const warrantyMatch =
    data.warranty_match ??
    nested["warranty_match"] ??
    false;


  // -------------------------------------------------------
  // ITEM COMPLIANCE
  // -------------------------------------------------------

  const nestedItemCompliance =
    nested["item_compliance"];


  const nestedItems =
    nested["items"];


  const itemChecks =
    Array.isArray(data.item_compliance)
      ? data.item_compliance

      : Array.isArray(data.items)
        ? data.items

        : Array.isArray(nestedItemCompliance)
          ? nestedItemCompliance

          : Array.isArray(nestedItems)
            ? nestedItems

            : [];


  // -------------------------------------------------------
  // PASSED / TOTAL CHECKS
  // -------------------------------------------------------

  let passedChecks =
    data.passed_checks ??
    data.checks_passed ??
    data.passed ??
    nested["passed_checks"] ??
    nested["checks_passed"] ??
    nested["passed"];


  let totalChecks =
    data.total_checks ??
    data.checks_total ??
    data.total ??
    nested["total_checks"] ??
    nested["checks_total"] ??
    nested["total"];


  // -------------------------------------------------------
  // If backend did not explicitly provide passed/total,
  // calculate from available checks.
  // -------------------------------------------------------

  if (
    passedChecks === undefined ||
    totalChecks === undefined
  ) {

    let passed = 0;
    let total = 0;


    // Delivery
    total++;

    if (
      Boolean(deliveryMatch)
    ) {
      passed++;
    }


    // Warranty
    total++;

    if (
      Boolean(warrantyMatch)
    ) {
      passed++;
    }


    // Item-level checks
    itemChecks.forEach(
      (entry: any) => {

        const checks =
          entry?.checks &&
          typeof entry.checks === "object"
            ? entry.checks
            : {};


        Object.values(
          checks
        ).forEach(
          (value) => {

            total++;

            if (
              Boolean(value)
            ) {
              passed++;
            }

          }
        );

      }
    );


    passedChecks =
      passed;


    totalChecks =
      total;
  }


  // -------------------------------------------------------
  // Vendor Name
  // -------------------------------------------------------

  const vendorName =
    data.vendor_name ??
    (
      typeof nested["vendor_name"] === "string"
        ? nested["vendor_name"]
        : "Vendor"
    );


  // =========================================================
  // UI
  // =========================================================

  return (

    <Card className="shadow-card">

      <CardHeader>

        <div className="flex items-center justify-between gap-4">

          <CardTitle className="text-base">

            {vendorName}

          </CardTitle>


          <span
            className={cn(
              "num text-sm font-semibold",

              safePct >= 95
                ? "text-success"

                : safePct >= 80
                  ? "text-primary"

                  : "text-destructive"
            )}
          >

            {formatPercent(
              overall
            )}

          </span>

        </div>


        {/* ============================================= */}
        {/* Compliance Progress */}
        {/* ============================================= */}

        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">

          <span
            className={cn(
              "block h-full rounded-full",

              safePct >= 95
                ? "bg-success"

                : safePct >= 80
                  ? "bg-primary"

                  : "bg-destructive"
            )}
            style={{
              width: `${safePct}%`,
            }}
          />

        </div>

      </CardHeader>


      <CardContent className="space-y-4">

        {/* ============================================= */}
        {/* Main Checks */}
        {/* ============================================= */}

        <ul className="space-y-2">

          <CheckRow
            label="Delivery requirement met"
            passed={
              Boolean(
                deliveryMatch
              )
            }
          />


          <CheckRow
            label="Warranty requirement met"
            passed={
              Boolean(
                warrantyMatch
              )
            }
          />

        </ul>


        {/* ============================================= */}
        {/* Passed / Total */}
        {/* ============================================= */}

        <p className="text-sm text-muted-foreground">

          Checks passed:{" "}

          <span className="num font-semibold text-foreground">

            {String(
              passedChecks ?? "—"
            )}

            {" / "}

            {String(
              totalChecks ?? "—"
            )}

          </span>

        </p>


        {/* ============================================= */}
        {/* Item-Level Compliance */}
        {/* ============================================= */}

        {itemChecks.length > 0 ? (

          <Accordion
            type="single"
            collapsible
            className="border-t pt-1"
          >

            {itemChecks.map(
              (
                entry: any,
                index: number
              ) => {

                const checks =
                  entry?.checks &&
                  typeof entry.checks ===
                    "object"

                    ? entry.checks as
                        Record<
                          string,
                          unknown
                        >

                    : {};


                const rows =
                  Object.entries(
                    checks
                  );


                return (

                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                  >

                    <AccordionTrigger className="text-sm">

                      {itemName(
                        entry
                      )}

                    </AccordionTrigger>


                    <AccordionContent>

                      <ul className="space-y-2">

                        {rows.length > 0 ? (

                          rows.map(
                            (
                              [key, value]
                            ) => (

                              <CheckRow
                                key={key}
                                label={
                                  prettifyKey(
                                    key
                                  )
                                }
                                passed={
                                  Boolean(
                                    value
                                  )
                                }
                              />

                            )
                          )

                        ) : (

                          <li className="text-sm text-muted-foreground">

                            No item-level checks reported.

                          </li>

                        )}

                      </ul>

                    </AccordionContent>

                  </AccordionItem>

                );

              }
            )}

          </Accordion>

        ) : null}

      </CardContent>

    </Card>

  );
}