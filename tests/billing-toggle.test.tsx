import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BillingToggle } from "@/components/copper/billing-toggle";
import Home from "@/app/page";

// Radix tabs switch on mouse down, not on click.
function chooseAnnual() {
  fireEvent.mouseDown(screen.getByRole("tab", { name: "Annual" }), {
    button: 0,
  });
}

describe("BillingToggle", () => {
  it("starts on Monthly and keeps the annual price visible", () => {
    render(<BillingToggle monthly="$5" annual="$50" savings="$10" />);
    expect(screen.getByRole("tab", { name: "Monthly" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("$5")).toBeInTheDocument();
    expect(screen.getByText("or $50/year")).toBeInTheDocument();
    expect(screen.queryByText(/Save/)).not.toBeInTheDocument();
  });

  it("switches to the annual price and shows the savings", () => {
    render(<BillingToggle monthly="$5" annual="$50" savings="$10" />);
    chooseAnnual();
    expect(screen.getByRole("tab", { name: "Annual" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("$50")).toBeInTheDocument();
    expect(screen.getByText("or $5/month")).toBeInTheDocument();
    expect(screen.getByText("Save $10 a year")).toBeInTheDocument();
  });

  it("hides the savings line when there is no saving", () => {
    render(<BillingToggle monthly="$5" annual="$60" />);
    chooseAnnual();
    expect(screen.queryByText(/Save/)).not.toBeInTheDocument();
  });
});

describe("Copper Plus pricing on the home page", () => {
  it("shows both prices before and after switching, with the saving computed from the catalog", () => {
    const { container } = render(<Home />);
    const plus = within(
      container.querySelector<HTMLElement>('[data-testid="plus-pricing"]')!,
    );
    expect(plus.getByText("$7.99")).toBeInTheDocument();
    expect(plus.getByText("or $79/year")).toBeInTheDocument();

    chooseAnnual();
    expect(plus.getByText("$79")).toBeInTheDocument();
    expect(plus.getByText("or $7.99/month")).toBeInTheDocument();
    // 12 x $7.99 - $79 = $16.88
    expect(plus.getByText("Save $16.88 a year")).toBeInTheDocument();
  });
});
