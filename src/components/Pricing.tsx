import { CalendlyButton } from "@/components/CalendlyButton";
import { PriceCounter } from "@/components/PriceCounter";
import { Reveal } from "@/components/Reveal";
import { WeekTimeline } from "@/components/WeekTimeline";

const included = [
  "Strategy, design, and development in one fast lane",
  "AI-accelerated build workflows for speed and cost",
  "Expert review on every deliverable before launch",
  "You stay in the loop — final products reviewed with you",
] as const;

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 border-t border-white/10 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--volt)]">
                Pricing
              </p>
            </Reveal>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              <Reveal mode="words">Modern build. Fair price.</Reveal>
            </h2>
            <Reveal delay={0.08}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                A lot of agencies are still living in the past — quoting{" "}
                <span className="text-white">$5,000+</span> for a website like
                it&apos;s 2012. We&apos;re not. Our team uses AI workflows that
                cut cost and cycle time dramatically, while every final product
                is reviewed by professional experts before it goes live.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                You get the same craft and accountability. We just make the
                building process a lot faster — most sites designed and built in
                less than a week.
              </p>
            </Reveal>
            <WeekTimeline />
          </div>

          <Reveal delay={0.1}>
            <div className="border-t border-white/15 pt-8 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-white/45">
                Starting at
              </p>
              <PriceCounter />
              <p className="mt-3 text-sm text-white/55">
                Base website package — designed and built in under a week,
                scoped to your goals.
              </p>

              <ul className="mt-8 space-y-3">
                {included.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-white/70 sm:text-base"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--volt)]"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <CalendlyButton className="mt-8 inline-flex rounded-full bg-[color:var(--volt)] px-6 py-3 text-sm font-semibold text-[color:var(--ink)] transition-transform hover:-translate-y-0.5">
                Book a discovery call
              </CalendlyButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
