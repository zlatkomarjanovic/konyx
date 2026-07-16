"use client";

import { useId, useState } from "react";
import { faqItems } from "@/lib/faq";

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={`relative flex h-5 w-5 shrink-0 items-center justify-center transition-transform duration-300 ease-out ${
        open ? "rotate-45" : ""
      }`}
    >
      <span className="absolute h-px w-3 rounded-full bg-foreground/30 dark:bg-foreground/40" />
      <span className="absolute h-3 w-px rounded-full bg-foreground/30 dark:bg-foreground/40" />
    </span>
  );
}

export function FaqAccordion() {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="faq-shell rounded-3xl p-3">
      <div className="flex flex-col gap-3" data-reveal="rise-stagger">
        {faqItems.map((item) => {
          const open = openId === item.id;
          const panelId = `${baseId}-${item.id}-panel`;
          const triggerId = `${baseId}-${item.id}-trigger`;

          return (
            <div
              key={item.id}
              data-reveal-item
              className="faq-row overflow-hidden rounded-[20px] border bg-white dark:bg-[#0f0f0f]"
            >
              <button
                id={triggerId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-surface/60 dark:hover:bg-white/[0.03] sm:py-[1.125rem]"
              >
                <span className="text-sm font-medium leading-snug text-foreground sm:text-[0.9375rem]">
                  {item.question}
                </span>
                <PlusIcon open={open} />
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-4 text-sm leading-relaxed text-muted/90 sm:pb-5">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
