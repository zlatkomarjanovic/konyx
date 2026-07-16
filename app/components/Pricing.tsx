import { Container } from "./Container";

const plans = [
  {
    name: "Single page",
    price: 79,
    description: "One landing page, full kit",
    highlighted: false,
  },
  {
    name: "Full site",
    price: 149,
    description: "Full multi-page site",
    highlighted: true,
  },
  {
    name: "Agency license",
    price: 399,
    description: "Unlimited client projects",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-section-sm md:py-section">
      <Container>
        <div className="max-w-lg">
          <p className="text-sm text-muted">Simple pricing</p>
          <h2 className="mt-2 font-serif text-3xl tracking-tight text-foreground md:text-4xl">
            Pick what fits
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-lg border p-6 ${
                plan.highlighted ? "border-accent bg-surface" : "border-border"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-0.5 text-xs font-medium text-accent-foreground">
                  Most popular
                </span>
              )}
              <h3 className="font-serif text-xl text-foreground">{plan.name}</h3>
              <p className="mt-4 font-serif text-4xl tracking-tight text-foreground">
                ${plan.price}
              </p>
              <p className="mt-3 text-sm text-muted">{plan.description}</p>
              <button
                type="button"
                className={`mt-8 inline-flex h-10 w-full items-center justify-center rounded-md text-sm font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-accent text-accent-foreground hover:bg-accent/90"
                    : "border border-border text-foreground hover:border-foreground/20"
                }`}
              >
                Get started
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
