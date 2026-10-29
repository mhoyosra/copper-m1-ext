import { ChevronDownIcon } from "lucide-react";

// One short heading per privacy point, in the same order as the catalog.
const HEADINGS = [
  "What does Copper hear?",
  "What gets saved?",
  "How does Copper Notes work?",
  "Can I delete my data?",
  "Is my data sold?",
];

// Native details/summary keeps closed answers on the page (so the text is always
// there for readers and tests) and works from the keyboard with no extra JavaScript.
// Giving every item the same name makes only one open at a time.
export function PrivacyFaq({ points }: { points: string[] }) {
  return (
    <div className="bg-card text-card-foreground divide-y rounded-xl">
      {points.map((point, index) => (
        <details
          key={point}
          name="privacy-faq"
          open={index === 0}
          className="group px-6 py-4 md:px-8"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {HEADINGS[index] ?? `Privacy point ${index + 1}`}
            <ChevronDownIcon
              aria-hidden="true"
              className="text-accent size-5 shrink-0 transition-transform group-open:rotate-180"
            />
          </summary>
          <p className="text-muted-foreground mt-3">{point}</p>
        </details>
      ))}
    </div>
  );
}
