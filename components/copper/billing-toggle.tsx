"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type BillingToggleProps = {
  /** Prices and savings arrive already formatted, e.g. "$7.99". */
  monthly: string;
  annual: string;
  savings?: string;
};

// Monthly/Annual switch for the Copper Plus price. The other price always stays
// on the page as a smaller line, so a shopper sees both whichever tab is open.
export function BillingToggle({
  monthly,
  annual,
  savings,
}: BillingToggleProps) {
  const [billing, setBilling] = useState("monthly");

  return (
    <Tabs value={billing} onValueChange={setBilling}>
      <TabsList aria-label="Billing period">
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
        <TabsTrigger value="annual">Annual</TabsTrigger>
      </TabsList>
      <TabsContent value="monthly" className="flex flex-col gap-1">
        <p className="text-3xl font-bold">
          {monthly}
          <span className="text-muted-foreground text-base font-normal">
            /month
          </span>
        </p>
        <p className="text-muted-foreground">or {annual}/year</p>
      </TabsContent>
      <TabsContent value="annual" className="flex flex-col gap-1">
        <p className="text-3xl font-bold">
          {annual}
          <span className="text-muted-foreground text-base font-normal">
            /year
          </span>
        </p>
        <p className="text-muted-foreground">or {monthly}/month</p>
        {savings && (
          <p className="text-primary font-semibold">Save {savings} a year</p>
        )}
      </TabsContent>
    </Tabs>
  );
}
