import type { PricingPlan } from "@/lib/pricing";
import { PrimaryButton } from "./PrimaryButton";

type PricingCardProps = {
  plan: PricingPlan;
};

export function PricingCard({ plan }: PricingCardProps) {
  const Icon = plan.icon;
  const highlighted = plan.highlighted;

  return (
    <article
      className={
        highlighted
          ? "flex h-full flex-col rounded-[20px] border border-accent bg-card p-1 shadow-[0_10px_40px_-8px_rgba(37,99,235,0.22)] dark:border-accent/70 dark:bg-[#141414] dark:shadow-[0_0_0_1px_rgba(37,99,235,0.25),0_12px_40px_-12px_rgba(37,99,235,0.35)]"
          : "flex h-full flex-col rounded-[20px] border border-border bg-card p-1 dark:border-white/10 dark:bg-[#141414]"
      }
    >
      <div
        className={
          highlighted
            ? "rounded-2xl border border-blue-200/70 bg-blue-50/90 p-5 sm:p-6 dark:border-[#363636] dark:bg-[#212121]"
            : "rounded-2xl border border-border bg-surface-secondary p-5 sm:p-6 dark:border-[#363636] dark:bg-[#212121]"
        }
      >
        <div className="flex items-start gap-4">
          <div
            className={
              highlighted
                ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 dark:bg-white/[0.08]"
                : "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/[0.06] dark:bg-white/[0.08]"
            }
          >
            <Icon
              className={
                highlighted
                  ? "h-5 w-5 text-accent dark:text-accent"
                  : "h-5 w-5 text-foreground dark:text-white"
              }
              strokeWidth={1.75}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-serif text-2xl tracking-tight text-foreground dark:text-white">
                {plan.name}
              </h3>
              {plan.badge && (
                <span className="inline-flex -rotate-2 items-center rounded-full border border-accent bg-accent px-2.5 py-0.5 text-[13px] font-medium text-white">
                  {plan.badge}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground dark:text-white/55">
              {plan.description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-end gap-1">
          <span className="font-serif text-4xl leading-none text-muted dark:text-white/50">
            $
          </span>
          <span className="font-serif text-5xl leading-none tracking-tight text-foreground dark:text-white">
            {plan.price}
          </span>
          <span className="mb-1 ml-1 text-lg font-medium text-muted-foreground dark:text-white/50">
            / {plan.priceSuffix}
          </span>
        </div>
      </div>

      <ul className="flex flex-1 flex-col gap-3 px-4 py-5 sm:px-5">
        {plan.features.map((feature) => {
          const FeatureIcon = feature.icon;
          return (
            <li key={feature.label} className="flex items-center gap-3">
              <div
                className={
                  highlighted
                    ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 dark:bg-[#242424]"
                    : "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-secondary dark:bg-[#242424]"
                }
              >
                <FeatureIcon
                  className={
                    highlighted
                      ? "h-4 w-4 text-accent dark:text-[#e8e8e8]"
                      : "h-4 w-4 text-foreground/70 dark:text-[#e8e8e8]"
                  }
                  strokeWidth={2}
                />
              </div>
              <span className="text-sm font-medium text-foreground/90 dark:text-white/90">
                {feature.label}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
        {highlighted ? (
          <PrimaryButton
            href="#"
            className="h-11 w-full px-4 text-sm font-medium"
          >
            Get started
          </PrimaryButton>
        ) : (
          <a
            href="#"
            className="btn-secondary inline-flex h-11 w-full items-center justify-center rounded-[0.625rem] border border-border px-4 text-sm font-medium text-foreground"
          >
            Get started
          </a>
        )}
      </div>
    </article>
  );
}
