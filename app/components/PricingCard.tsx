import type { PricingPlan } from "@/lib/pricing";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";

type PricingCardProps = {
  plan: PricingPlan;
  compact?: boolean;
};

export function PricingCard({ plan, compact = false }: PricingCardProps) {
  const Icon = plan.icon;
  const highlighted = plan.highlighted;

  return (
    <article
      className={
        highlighted
          ? "flex h-full flex-col rounded-[20px] border border-foreground/20 bg-card p-1 dark:border-[#52525b] dark:bg-black"
          : "flex h-full flex-col rounded-[20px] border border-border bg-card p-1 dark:border-white/10 dark:bg-black"
      }
    >
      <div
        className={
          highlighted
            ? "rounded-2xl border border-border bg-[#f4f4f5] p-5 sm:p-6 dark:border-[#2a2a2a] dark:bg-[#0a0a0a]"
            : compact
              ? "rounded-2xl border border-border bg-surface-secondary p-4 sm:p-5 dark:border-[#2a2a2a] dark:bg-[#0a0a0a]"
              : "rounded-2xl border border-border bg-surface-secondary p-5 sm:p-6 dark:border-[#2a2a2a] dark:bg-[#0a0a0a]"
        }
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div
            className={
              compact
                ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-foreground/[0.06] dark:bg-white/[0.08]"
                : "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/[0.06] dark:bg-white/[0.08]"
            }
          >
            <Icon
              className={
                compact
                  ? "h-4 w-4 text-foreground/70 dark:text-[#e8e8e8]"
                  : highlighted
                    ? "h-5 w-5 text-foreground/70 dark:text-[#e8e8e8]"
                    : "h-5 w-5 text-foreground dark:text-white"
              }
              strokeWidth={1.75}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3
                className={
                  compact
                    ? "font-serif text-xl tracking-tight text-foreground dark:text-white"
                    : "font-serif text-2xl tracking-tight text-foreground dark:text-white"
                }
              >
                {plan.name}
              </h3>
              {plan.badge && (
                <span className="inline-flex -rotate-2 items-center rounded-full border border-foreground/20 bg-foreground px-2.5 py-0.5 text-[13px] font-medium text-background dark:border-[#52525b] dark:bg-[#52525b] dark:text-white">
                  {plan.badge}
                </span>
              )}
            </div>
            <p
              className={
                compact
                  ? "mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground dark:text-white/55"
                  : "mt-1.5 text-sm leading-relaxed text-muted-foreground dark:text-white/55"
              }
            >
              {plan.description}
            </p>
          </div>
        </div>

        <div className={compact ? "mt-4 flex items-end gap-1" : "mt-6 flex items-end gap-1"}>
          <span
            className={
              compact
                ? "font-serif text-3xl leading-none text-muted dark:text-white/50"
                : "font-serif text-4xl leading-none text-muted dark:text-white/50"
            }
          >
            $
          </span>
          <span
            className={
              compact
                ? "font-serif text-4xl leading-none tracking-tight text-foreground dark:text-white"
                : "font-serif text-5xl leading-none tracking-tight text-foreground dark:text-white"
            }
          >
            {plan.price}
          </span>
          <span
            className={
              compact
                ? "mb-0.5 ml-1 text-base font-medium text-muted-foreground dark:text-white/50"
                : "mb-1 ml-1 text-lg font-medium text-muted-foreground dark:text-white/50"
            }
          >
            / {plan.priceSuffix}
          </span>
        </div>
      </div>

      <ul
        className={
          compact
            ? "flex flex-1 flex-col gap-2.5 px-3.5 py-4 sm:px-4"
            : "flex flex-1 flex-col gap-3 px-4 py-5 sm:px-5"
        }
      >
        {plan.features.map((feature) => {
          const FeatureIcon = feature.icon;
          return (
            <li key={feature.label} className="flex items-center gap-2.5">
              <div
                className={
                  compact
                    ? "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground/[0.06] dark:bg-[#242424]"
                    : highlighted
                      ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground/[0.06] dark:bg-[#242424]"
                      : "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-secondary dark:bg-[#242424]"
                }
              >
                <FeatureIcon
                  className="h-3.5 w-3.5 text-foreground/70 dark:text-[#e8e8e8]"
                  strokeWidth={2}
                />
              </div>
              <span
                className={
                  compact
                    ? "text-[0.8125rem] font-medium text-foreground/90 dark:text-white/90"
                    : "text-sm font-medium text-foreground/90 dark:text-white/90"
                }
              >
                {feature.label}
              </span>
            </li>
          );
        })}
      </ul>

      <div className={compact ? "px-3.5 pb-3.5 sm:px-4 sm:pb-4" : "px-4 pb-4 sm:px-5 sm:pb-5"}>
        {highlighted ? (
          <PrimaryButton href="#" className="h-10 w-full px-4">
            Get started
          </PrimaryButton>
        ) : (
          <SecondaryButton
            href="#"
            className={compact ? "h-9 w-full px-4" : "h-10 w-full px-4"}
          >
            Get started
          </SecondaryButton>
        )}
      </div>
    </article>
  );
}
