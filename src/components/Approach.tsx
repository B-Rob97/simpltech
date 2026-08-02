import { ApproachSteps } from "@/components/ApproachSteps";
import { Reveal } from "@/components/Reveal";

export function Approach() {
  return (
    <section id="approach" className="scroll-mt-24 border-t border-white/10 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--volt)]">
            Approach
          </p>
        </Reveal>
        <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          <Reveal mode="words">Simple process. Serious craft.</Reveal>
        </h2>

        <ApproachSteps />
      </div>
    </section>
  );
}
