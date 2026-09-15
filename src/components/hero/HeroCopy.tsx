import { CalendlyButton } from "@/components/CalendlyButton";

type HeroCopyProps = {
  className?: string;
  headingClassName?: string;
  bodyClassName?: string;
};

export function HeroCopy({
  className,
  headingClassName = "text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl",
  bodyClassName = "mt-4 text-base leading-relaxed text-foreground/70 sm:text-lg",
}: HeroCopyProps) {
  return (
    <div className={className}>
      <h1 className={headingClassName}>
        Websites and web apps that make startups look inevitable.
      </h1>
      <p className={bodyClassName}>
        We build fast, sharp digital products for startups and SMBs — from first
        landing page to the tools that run the business.
      </p>
    </div>
  );
}

type HeroActionsProps = {
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
};

export function HeroActions({
  className = "mt-8 flex flex-wrap items-center gap-3 sm:mt-10",
  primaryClassName = "rounded-[var(--radius-button)] bg-[color:var(--volt)] px-6 py-3 text-sm font-semibold text-[color:var(--accent-ink)] transition-transform hover:-translate-y-0.5",
  secondaryClassName = "rounded-[var(--radius-button)] border-[length:var(--border-width)] border-foreground/20 bg-foreground/5 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40 hover:bg-foreground/10",
}: HeroActionsProps) {
  return (
    <div className={className}>
      <CalendlyButton className={primaryClassName}>
        Book a discovery call
      </CalendlyButton>
      <a href="#work" className={secondaryClassName}>
        See selected work
      </a>
    </div>
  );
}
