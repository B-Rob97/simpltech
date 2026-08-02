import { services } from "@/lib/projects";
import { Reveal } from "@/components/Reveal";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-white/10 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--volt)]">
            Services
          </p>
        </Reveal>
        <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          <Reveal mode="words">Built for speed, clarity, and growth.</Reveal>
        </h2>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
            Whether you need a launch-ready marketing site, a quick prototype —
            including phone apps — or a custom web app, we keep the stack modern
            and the experience sharp. We can also build on top of any website
            builder — and for e-commerce, you&apos;re usually better off on
            Shopify. When you want brand-new, fully customized tech from the
            ground up, we ship that fast.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06}>
              <article>
                <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-[color:var(--signal)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold text-white sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                  {service.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
