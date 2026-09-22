"use client";

import { services } from "@/lib/projects";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeServices() {
  const { theme } = useTheme();
  const accordion = theme.id === "editorial" || theme.id === "warm-craft";
  return <section id="services" className={`design-services services-${theme.id}`}>
    <div className="design-section-heading"><p className="section-kicker">What we do / 02</p><h2>Built for speed,<br />clarity, and growth.</h2><p>From a launch-ready marketing site to a prototype or custom web app. The right platform, thoughtfully built.</p></div>
    <div className="service-collection">{services.map((service, index) => accordion ?
      <details key={service.title} className="service-item" open={index === 0 ? true : undefined}>
        <summary><span className="service-number">0{index + 1}</span><h3>{service.title}</h3><span className="service-toggle" aria-hidden>+</span></summary><p>{service.description}</p>
      </details> :
      <article key={service.title} className="service-item"><span className="service-number">0{index + 1}</span><h3>{service.title}</h3><p>{service.description}</p></article>
    )}</div>
  </section>;
}
