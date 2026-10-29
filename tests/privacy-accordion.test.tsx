import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PrivacyFaq } from "@/components/copper/privacy-faq";
import { getPrivacySummary } from "@/lib/copper/catalog";
import Home from "@/app/page";

describe("PrivacyFaq", () => {
  const points = ["First answer.", "Second answer.", "Third answer."];

  it("renders one item per point and keeps every answer on the page", () => {
    const { container } = render(<PrivacyFaq points={points} />);
    expect(container.querySelectorAll("details")).toHaveLength(3);
    for (const point of points) {
      expect(screen.getByText(point)).toBeInTheDocument();
    }
  });

  it("opens only the first item at the start", () => {
    const { container } = render(<PrivacyFaq points={points} />);
    const items = [...container.querySelectorAll("details")];
    expect(items.map((item) => item.open)).toEqual([true, false, false]);
  });

  it("groups the items so only one can be open at a time", () => {
    const { container } = render(<PrivacyFaq points={points} />);
    const names = [...container.querySelectorAll("details")].map((d) =>
      d.getAttribute("name"),
    );
    expect(new Set(names)).toEqual(new Set(["privacy-faq"]));
  });

  it("falls back to a numbered heading when there are extra points", () => {
    render(<PrivacyFaq points={[...points, "a", "b", "c"]} />);
    expect(screen.getByText("Privacy point 6")).toBeInTheDocument();
  });

  it("lets a reader open an item from its heading", () => {
    render(<PrivacyFaq points={points} />);
    const heading = screen.getByText("What gets saved?");
    const item = heading.closest("details")!;
    fireEvent.click(heading);
    expect(item.open).toBe(true);
  });
});

describe("Privacy section on the home page", () => {
  it("shows every catalog point, one per accordion item", () => {
    const { container } = render(<Home />);
    const privacy = within(
      container.querySelector<HTMLElement>('[data-testid="privacy-summary"]')!,
    );
    const { points } = getPrivacySummary();
    expect(privacy.getAllByText(/./, { selector: "summary" })).toHaveLength(
      points.length,
    );
    for (const point of points) {
      expect(privacy.getByText(point)).toBeInTheDocument();
    }
  });
});
