import { CalendlyButton } from "@/components/CalendlyButton";
import { MagneticButton } from "@/components/MagneticButton";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-white/10 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(37,99,235,0.35),rgba(10,22,40,0.95)_45%,rgba(245,197,24,0.18))] px-6 py-14 sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(245,197,24,0.25),transparent_40%)]" />
            <div className="relative max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--volt)]">
                Contact
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                <Reveal mode="words">
                  Ready to build something people notice?
                </Reveal>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
                Book a short discovery call and we&apos;ll map the right path
                for your startup, product, or business site — scope, timeline,
                and next steps.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CalendlyButton className="inline-flex rounded-full bg-[color:var(--volt)] px-6 py-3 text-sm font-semibold text-[color:var(--ink)] transition-transform hover:-translate-y-0.5">
                  Book a discovery call
                </CalendlyButton>
                <MagneticButton
                  href={`mailto:${siteConfig.email}?subject=Project%20inquiry%20-%20SimplTech`}
                  className="inline-flex rounded-full border border-white/20 bg-black/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm"
                >
                  Email {siteConfig.email}
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
