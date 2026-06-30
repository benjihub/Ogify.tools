import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { PaperCard } from "@/components/ui/card";
import { PaddleCheckout } from "@/components/PaddleCheckout";
import type { PlanId } from "@/lib/paddle";

const PLANS: {
  id: PlanId;
  tier: string;
  price: string;
  period?: string;
  renders: string;
  features: string[];
  free?: boolean;
}[] = [
  {
    id: "starter",
    tier: "Free",
    price: "$0",
    renders: "100 renders / month",
    features: ["All templates", "URL screenshot mode", "Watermark included"],
    free: true,
  },
  {
    id: "starter",
    tier: "Starter",
    price: "$10",
    period: "/mo",
    renders: "500 renders / month",
    features: ["No watermark", "Priority support"],
  },
  {
    id: "pro",
    tier: "Pro",
    price: "$29",
    period: "/mo",
    renders: "2,000 renders / month",
    features: ["Everything in Starter", "White-label option", "Higher rate limit"],
  },
  {
    id: "business",
    tier: "Business",
    price: "$99",
    period: "/mo",
    renders: "10,000 renders / month",
    features: ["Advanced API access", "Custom templates", "Dedicated support"],
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <section className="mx-auto max-w-6xl px-7 py-24">
        <div className="mb-14 max-w-[620px]">
          <div className="mb-3.5 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-gold">
            <span className="h-px w-[18px] bg-gold" />
            Pricing
          </div>
          <h1 className="text-[34px] leading-tight text-paper">
            Start free. Upgrade when you outgrow it.
          </h1>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan, i) => (
            <PaperCard
              key={plan.tier}
              className={i === 1 ? "outline outline-2 outline-cinnabar" : ""}
            >
              <div className="font-mono text-[11.5px] uppercase tracking-wider text-cinnabar">
                {plan.tier}
              </div>
              <div className="mt-2.5 font-display text-4xl">
                {plan.price}
                {plan.period && (
                  <span className="font-mono text-[13px] font-normal text-[#5b5b55]">
                    {plan.period}
                  </span>
                )}
              </div>
              <div className="mt-1.5 font-mono text-xs text-[#5b5b55]">
                {plan.renders}
              </div>

              <ul className="mt-[18px] flex flex-col gap-2">
                {plan.features.map((f) => (
                  <li key={f} className="relative pl-3.5 text-[13px]">
                    <span className="absolute left-0 text-cinnabar">—</span>
                    {f}
                  </li>
                ))}
              </ul>

              {plan.free ? (
                <a
                  href="/signup"
                  className="mt-[22px] block rounded bg-ink py-2.5 text-center font-mono text-[12.5px] uppercase tracking-wide text-paper"
                >
                  Get started
                </a>
              ) : (
                <PaddleCheckout
                  plan={plan.id}
                  className="mt-[22px] w-full justify-center !bg-ink !border-ink !text-paper"
                >
                  Upgrade
                </PaddleCheckout>
              )}
            </PaperCard>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-[12.5px] text-muted">
          All plans include Paddle&apos;s tax handling — no surprise forms.
        </p>
      </section>
      <Footer />
    </>
  );
}
