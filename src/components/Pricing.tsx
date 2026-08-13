import { CalendlyButton } from "@/components/CalendlyButton";
import { SkylineBand } from "@/components/CityNight";
import { PriceCounter } from "@/components/PriceCounter";
import { Reveal } from "@/components/Reveal";
import { WeekTimeline } from "@/components/WeekTimeline";
import { carePlan, pricingPackages } from "@/lib/pricing";
import { siteConfig } from "@/lib/site";

export function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-24 py-24 sm:py-32">
      <SkylineBand id="pricing" flip className="opacity-45" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--volt)]">
                Pricing
              </p>
            </Reveal>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              <Reveal mode="words">No fluff. Clear packs. Sharp price.</Reveal>
            </h2>
            <Reveal delay={0.08}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                No hidden fees. No agency theatre. Just high-quality custom
                websites — scoped, priced, and shipped fast. Most local shops
                still quote{" "}
                <span className="text-white">$1,900–$3,700</span> for the same
                work. We undercut that, include year-one hosting on site packs,
                and build in under a week.
              </p>
            </Reveal>
            <WeekTimeline />
          </div>

          <Reveal delay={0.1}>
            <div className="border-t border-white/15 pt-8 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-white/45">
                Packages from
              </p>
              <PriceCounter />
              <p className="mt-3 text-sm text-white/55">
                Pick a pack below — or book a call and we&apos;ll tailor scope
                to your goals.
              </p>
              <CalendlyButton className="mt-8 inline-flex rounded-full bg-[color:var(--volt)] px-6 py-3 text-sm font-semibold text-[color:var(--ink)] transition-transform hover:-translate-y-0.5">
                Get my custom quote
              </CalendlyButton>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-0 border-t border-white/10 lg:mt-20 lg:grid-cols-3">
          {pricingPackages.map((pack, index) => (
            <Reveal key={pack.id} delay={0.06 + index * 0.06}>
              <article
                className={`relative h-full border-t border-white/10 py-10 lg:border-l lg:border-t-0 lg:px-8 lg:py-12 lg:first:border-l-0 lg:first:pl-0 ${
                  pack.featured ? "lg:-my-3 lg:bg-white/[0.03] lg:px-9 lg:py-14" : ""
                }`}
              >
                <p
                  className={`mb-4 min-h-[1.25rem] text-xs font-semibold uppercase tracking-[0.18em] ${
                    pack.featured
                      ? "text-[color:var(--volt)]"
                      : "text-transparent"
                  }`}
                >
                  {pack.featured ? "Most chosen" : "Pack"}
                </p>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {pack.name}
                </h3>
                <p className="mt-2 text-sm text-white/55">{pack.bestFor}</p>
                <p className="mt-6 flex items-baseline gap-2">
                  <span className="text-sm uppercase tracking-[0.14em] text-white/45">
                    Starting at
                  </span>
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  {pack.priceLabel}
                </p>
                <ul className="mt-8 space-y-3">
                  {pack.includes.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-white/70"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--volt)]"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <CalendlyButton
                  className={`mt-8 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                    pack.featured
                      ? "bg-[color:var(--volt)] text-[color:var(--ink)]"
                      : "border border-white/20 text-white"
                  }`}
                >
                  Book this pack
                </CalendlyButton>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-12 border-t border-white/10 pt-10 sm:mt-16 sm:pt-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--volt)]">
                  After launch
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {carePlan.name}
                </h3>
                <p className="mt-2 text-base text-white/60">
                  Peace-of-mind hosting and light edits — without the padded
                  retainer.
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                  {carePlan.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-white/70"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--signal)]"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0 lg:text-right">
                <p className="text-sm uppercase tracking-[0.14em] text-white/45">
                  {carePlan.period}
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight text-white">
                  {carePlan.priceLabel}
                </p>
                <CalendlyButton className="mt-5 inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
                  Add Steady Care
                </CalendlyButton>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-10 text-sm text-white/45">
            Questions? Email{" "}
            <a
              href={`mailto:${siteConfig.email}?subject=Pricing%20inquiry%20-%20SimplTech`}
              className="text-white/70 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
            >
              {siteConfig.email}
            </a>{" "}
            or book a discovery call — we&apos;ll send a clear quote, no
            pressure.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
