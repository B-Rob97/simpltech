"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { CalendlyButton } from "@/components/CalendlyButton";
import { MissionHero } from "@/components/mission/MissionHero";
import {
  LaunchTrajectory,
  MissionPatch,
  OrbitField,
} from "@/components/mission/MissionMarks";
import { ProjectLiveView } from "@/components/ProjectLiveView";
import { projects, services } from "@/lib/projects";
import { carePlan, pricingPackages } from "@/lib/pricing";
import { siteConfig } from "@/lib/site";

const stages = [
  {
    name: "Define the destination.",
    label: "Discovery",
    text: "We pin down who the site is for, what success looks like, and what needs to ship first. A clear brief. A shared direction. No guessing.",
  },
  {
    name: "Make the idea tangible.",
    label: "Design & build",
    text: "Brand-forward layouts, purposeful motion, and a structure that guides visitors to action. From the first prototype to the details that make it yours.",
  },
  {
    name: "Launch. Learn. Evolve.",
    label: "Delivery",
    text: "Production-ready builds with SEO, analytics hooks, and room to grow after launch — on whatever stack fits. You get the keys and a proper handoff.",
  },
];

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return (
    <p className="mc-label">
      <span>{number}</span>
      {children}
      <span className="mc-label-rule" aria-hidden />
    </p>
  );
}

function MissionWork() {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  return (
    <section id="work" className="mc-work mc-section">
      <SectionLabel number="01">Flight portfolio</SectionLabel>
      <div className="mc-section-title">
        <h2>
          Proof of
          <br />
          <em>possibility.</em>
        </h2>
        <p>
          Real businesses. Real products.
          <br />
          A few things we&apos;ve helped put into the world.
        </p>
      </div>
      <div className="mc-flight-deck">
        <div className="mc-orbit-map" role="group" aria-label="Select a project from the orbital map">
          <OrbitField selected={selected} />
          {projects.map((item, index) => {
            const angle = ((index * 45 - 110) * Math.PI) / 180;
            return (
              <button
                key={item.id}
                className={`mc-orbit-point ${selected === index ? "is-selected" : ""}`}
                style={
                  {
                    "--orbit-x": `${50 + 39 * Math.cos(angle)}%`,
                    "--orbit-y": `${50 + 39 * Math.sin(angle)}%`,
                  } as CSSProperties
                }
                onClick={() => setSelected(index)}
                aria-pressed={selected === index}
                aria-label={`Explore ${item.name}`}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>
        <div className="mc-project-display" aria-live="polite" aria-atomic="true">
          <div className="mc-project-meta">
            <span>Mission {String(selected + 1).padStart(2, "0")}</span>
            <span>{project.tags[0]}</span>
          </div>
          <div className="mc-project-art">
            <ProjectLiveView project={project} eager />
            <span className="mc-project-scan" />
          </div>
          <div className="mc-project-copy" key={project.id}>
            <p className="mc-eyebrow">{project.tags.join(" / ")}</p>
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
            {project.href ? (
              <a className="mc-text-link" href={project.href} target="_blank" rel="noopener noreferrer">
                Visit live project <span aria-hidden>↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <p className="mc-private">{project.privateNote || "Project overview — no public link"}</p>
            )}
          </div>
          <div className="mc-project-controls">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => setSelected((selected + projects.length - 1) % projects.length)}
            >
              ←
            </button>
            <span>
              {String(selected + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => setSelected((selected + 1) % projects.length)}
            >
              →
            </button>
          </div>
        </div>
      </div>
      <div className="mc-project-index" role="group" aria-label="Project index">
        {projects.map((item, index) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.name}
            <span aria-hidden>↗</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function MissionServices() {
  const [selected, setSelected] = useState(0);
  return (
    <section id="services" className="mc-services mc-section">
      <SectionLabel number="02">Studio capabilities</SectionLabel>
      <div className="mc-capabilities">
        <div>
          <h2>
            The right tools.
            <br />
            <em>No excess cargo.</em>
          </h2>
          <p className="mc-intro">
            From your first landing page to the tools that run your business. We choose the stack
            that fits the job.
          </p>
          <div className="mc-service-switches" role="group" aria-label="Explore our services">
            {services.map((service, index) => (
              <button
                type="button"
                key={service.title}
                onClick={() => setSelected(index)}
                aria-pressed={selected === index}
              >
                <span>0{index + 1}</span>
                {service.title}
                <span aria-hidden>{selected === index ? "−" : "+"}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mc-service-panel" aria-live="polite" aria-atomic="true">
          <div className="mc-service-diagram" aria-hidden>
            <span className="mc-diagram-orbit">
              <i />
            </span>
            <span className={`mc-diagram-shape shape-${selected}`} />
            <span className="mc-diagram-caption">Capability / 0{selected + 1}</span>
            <span className="mc-diagram-cross">+</span>
          </div>
          <div key={selected}>
            <p className="mc-eyebrow">Purpose-built / 0{selected + 1}</p>
            <h3>{services[selected].title}</h3>
            <p>{services[selected].description}</p>
            <a className="mc-text-link" href="#contact">
              Let&apos;s talk about it <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionPricing() {
  const [selected, setSelected] = useState(1);
  const pack = pricingPackages[selected];
  return (
    <section id="pricing" className="mc-pricing mc-section">
      <SectionLabel number="05">Choose your launch</SectionLabel>
      <div className="mc-section-title">
        <h2>
          Ambitious work.
          <br />
          <em>Grounded pricing.</em>
        </h2>
        <p>
          Clear scope. No hidden fees.
          <br />
          Choose a starting point. We&apos;ll handle the trajectory.
        </p>
      </div>
      <div className="mc-configurator">
        <div className="mc-package-choices" role="group" aria-label="Choose a website package">
          {pricingPackages.map((item, index) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setSelected(index)}
              aria-pressed={index === selected}
            >
              <span className="mc-package-radio" aria-hidden />
              <span>
                <small>{item.featured ? "Most chosen" : `Package 0${index + 1}`}</small>
                <strong>{item.name}</strong>
                <span>{item.bestFor}</span>
              </span>
              <span className="mc-package-price">
                {item.priceLabel}
                <small>Starting at</small>
              </span>
            </button>
          ))}
        </div>
        <div className="mc-package-manifest" aria-live="polite" aria-atomic="true">
          <div className="mc-manifest-top">
            <p className="mc-eyebrow">Your launch manifest</p>
            <span aria-hidden>↗</span>
          </div>
          <h3>{pack.name}</h3>
          <ul>
            {pack.includes.map((item) => (
              <li key={item}>
                <span aria-hidden>✓</span>
                {item}
              </li>
            ))}
          </ul>
          <CalendlyButton className="mc-button">
            Discuss {pack.name}
            <span aria-hidden>↗</span>
          </CalendlyButton>
        </div>
      </div>
      <details className="mc-care">
        <summary>
          <span>
            After launch / {carePlan.name}
          </span>
          <span>
            {carePlan.priceLabel} {carePlan.period} <span aria-hidden>+</span>
          </span>
        </summary>
        <ul>
          {carePlan.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <CalendlyButton className="mc-text-link">Add Steady Care ↗</CalendlyButton>
      </details>
    </section>
  );
}

export default function MissionControl() {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`mc-page ${paused ? "mc-paused" : ""}`}>
      <MissionHero paused={paused} onPause={() => setPaused(!paused)} />
      <div className="mc-manifesto-strip">
        <span>Less agency theatre.</span>
        <span aria-hidden>✳</span>
        <span>More liftoff.</span>
        <a href="#about">Meet the studio ↗</a>
      </div>
      <MissionWork />
      <MissionServices />
      <section id="approach" className="mc-approach mc-section">
        <SectionLabel number="03">From zero to out there</SectionLabel>
        <div className="mc-process-layout">
          <div>
            <h2>
              A clear path
              <br />
              to <em>liftoff.</em>
            </h2>
            <p className="mc-intro">
              Good work isn&apos;t a mystery. It&apos;s a series of thoughtful decisions, made
              together.
            </p>
            <LaunchTrajectory />
          </div>
          <div className="mc-checklist">
            {stages.map((stage, index) => (
              <details key={stage.name} open={index === 0 ? true : undefined}>
                <summary>
                  <span className="mc-stage-number">0{index + 1}</span>
                  <span>
                    <small>{stage.label}</small>
                    <h3>{stage.name}</h3>
                  </span>
                  <span className="mc-stage-toggle" aria-hidden>+</span>
                </summary>
                <p>{stage.text}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section id="about" className="mc-about mc-section">
        <SectionLabel number="04">Human, at the controls</SectionLabel>
        <div className="mc-about-layout">
          <MissionPatch />
          <div>
            <h2>
              Big ideas.
              <br />
              Small team.
              <br />
              <em>Direct connection.</em>
            </h2>
            <p>
              We&apos;re SimplTech — a Calgary studio that helps founders and growing teams turn
              half-formed ideas into something people can actually see, click, and believe in.
            </p>
            <p>
              We love startups. We love watching someone&apos;s vision go from a napkin sketch to a
              live product. You work with the people doing the work.
            </p>
            <div className="mc-beliefs">
              <span>01 / The right tool</span>
              <span>02 / Honest advice</span>
              <span>03 / Fair pricing</span>
            </div>
          </div>
        </div>
      </section>
      <MissionPricing />
      <section id="contact" className="mc-contact mc-section">
        <div className="mc-contact-stars" aria-hidden />
        <SectionLabel number="06">Your next chapter</SectionLabel>
        <p className="mc-eyebrow">You bring the idea. We bring it to life.</p>
        <h2>
          Let&apos;s make
          <br />
          <em>some space.</em>
          <span aria-hidden>↗</span>
        </h2>
        <div className="mc-contact-bottom">
          <p>
            Tell us what you&apos;re building.
            <br />
            We&apos;ll map the scope, timeline, and next steps.
          </p>
          <CalendlyButton className="mc-button">
            Book a discovery call <span aria-hidden>↗</span>
          </CalendlyButton>
          <a
            className="mc-email"
            href={`mailto:${siteConfig.email}?subject=Project%20inquiry%20-%20SimplTech`}
          >
            {siteConfig.email}
          </a>
        </div>
        <p className="mc-endnote">End of transmission. Beginning of something good.</p>
      </section>
    </div>
  );
}
