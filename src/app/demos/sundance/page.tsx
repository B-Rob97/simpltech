import Image from "next/image";
import {
  SundanceDemoNote,
  SundanceHeader,
} from "@/components/sundance/SundanceHeader";
import { SundanceLogo } from "@/components/sundance/SundanceLogo";
import {
  sundance,
  sundanceRates,
  sundanceReviews,
  sundanceServices,
} from "@/lib/sundance";

const heroImage =
  "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=2000&q=80";
const roomImage =
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80";
const handsImage =
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80";

const highlights = [
  "Licensed & registered therapists",
  "Insurance direct billing",
  "Same-day appointments",
  "Two Calgary locations",
] as const;

export default function SundanceDemoPage() {
  return (
    <div id="top" className="sundance-grain">
      <div className="sticky top-0 z-40">
        <SundanceDemoNote />
        <SundanceHeader />
      </div>

      <main>
        <section className="relative min-h-[88vh] overflow-hidden">
          <Image
            src={heroImage}
            alt="Massage therapy in a calm, warmly lit treatment room"
            fill
            priority
            className="object-cover object-[center_20%]"
            sizes="100vw"
          />
          <div className="sundance-hero-overlay absolute inset-0" />
          <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 lg:justify-center lg:pb-24">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--sun-bright)]">
              Massage · Acupuncture · Physiotherapy · Osteopathy
            </p>
            <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-sundance-display)] text-5xl font-semibold leading-[0.95] text-[color:var(--cream)] sm:text-7xl">
              Come back
              <br />
              to your body.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--cream)]/85 sm:text-lg">
              Two quiet Calgary clinics. Registered therapists. Care that
              actually lasts past the appointment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {sundance.locations.map((location) => (
                <a
                  key={location.id}
                  href={location.bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[color:var(--sun)] px-6 py-3 text-sm font-semibold text-[color:var(--ink)] transition-transform hover:-translate-y-0.5"
                >
                  Book {location.name}
                </a>
              ))}
              <a
                href={sundance.phoneHref}
                className="inline-flex items-center justify-center px-2 py-3 text-sm font-medium text-[color:var(--cream)] underline decoration-[color:var(--sun)] underline-offset-4"
              >
                or call {sundance.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        <section className="border-y border-[color:var(--sand-deep)] bg-[color:var(--sand)]">
          <ul className="mx-auto grid max-w-6xl gap-4 px-5 py-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
            {highlights.map((item) => (
              <li
                key={item}
                className="text-sm font-medium tracking-wide text-[color:var(--sage-deep)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="services" className="mx-auto max-w-6xl scroll-mt-36 px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--sage)]">
              Care
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-sundance-display)] text-4xl font-semibold text-[color:var(--ink)] sm:text-5xl">
              The work, without the clutter.
            </h2>
            <p className="mt-4 text-[color:var(--ink-soft)]">
              Min’s Sun Dance is a wellness clinic first — massage, acupuncture,
              physiotherapy, osteopathy, and laser — adjusted to how you want to
              feel when you walk out.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {sundanceServices.map((service, index) => (
              <article
                key={service.title}
                className={`rounded-3xl border border-[color:var(--sand-deep)] bg-white/70 p-7 ${
                  index === 0 ? "md:col-span-2 md:grid md:grid-cols-[1.2fr_0.8fr] md:gap-8" : ""
                }`}
              >
                <div>
                  <h3 className="font-[family-name:var(--font-sundance-display)] text-3xl font-semibold text-[color:var(--ink)]">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[color:var(--ink-soft)]">
                    {service.body}
                  </p>
                  <a
                    href={service.bookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex text-sm font-semibold text-[color:var(--sage)] underline decoration-[color:var(--sun)] underline-offset-4"
                  >
                    Book now
                  </a>
                </div>
                {index === 0 ? (
                  <div className="relative mt-6 min-h-48 overflow-hidden rounded-2xl md:mt-0">
                    <Image
                      src={handsImage}
                      alt="Hands providing therapeutic massage"
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 320px, 100vw"
                    />
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[color:var(--sage-deep)] text-[color:var(--cream)]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2">
            <div className="relative min-h-[22rem] overflow-hidden rounded-3xl">
              <Image
                src={roomImage}
                alt="Warm spa setting with towels and soft light"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--sun-bright)]">
                Why people stay
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-sundance-display)] text-4xl font-semibold sm:text-5xl">
                Clinical care, in a room that feels like a pause.
              </h2>
              <p className="mt-5 leading-relaxed text-[color:var(--cream)]/80">
                Massage, traditional Thai work, osteopathy, physiotherapy, and
                acupuncture can all improve circulation and help muscles recover
                — done by registered, licensed therapists, and eligible for
                direct billing.
              </p>
              <ul className="mt-8 space-y-3 text-sm">
                <li>Pressure and techniques adjusted to your comfort</li>
                <li>Help for back and neck pain, headaches, sciatica, and sport recovery</li>
                <li>Integrated care when one modality isn’t enough on its own</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="rates" className="mx-auto max-w-6xl scroll-mt-36 px-5 py-20 sm:px-8 sm:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--sage)]">
                Massage rates
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-sundance-display)] text-4xl font-semibold sm:text-5xl">
                Clear prices. Book the time that works.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-[color:var(--ink-soft)]">
              Massage rates as listed in online booking. Acupuncture, laser, and
              osteopathy are scheduled the same way.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {sundanceRates.map((group) => (
              <article
                key={group.name}
                className="rounded-3xl border border-[color:var(--sand-deep)] bg-white/70 p-6"
              >
                <h3 className="font-[family-name:var(--font-sundance-display)] text-2xl font-semibold">
                  {group.name}
                </h3>
                {"note" in group && group.note ? (
                  <p className="mt-1 text-xs uppercase tracking-wider text-[color:var(--ink-soft)]">
                    {group.note}
                  </p>
                ) : null}
                <ul className="mt-5 divide-y divide-[color:var(--sand-deep)]">
                  {group.items.map((item) => (
                    <li
                      key={`${group.name}-${item.duration}`}
                      className="flex items-baseline justify-between py-3"
                    >
                      <span className="text-[color:var(--ink-soft)]">{item.duration}</span>
                      <span className="font-semibold">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[color:var(--sand-deep)] bg-[color:var(--sand)]">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-20 sm:px-8 lg:grid-cols-3">
            {sundanceReviews.map((review) => (
              <blockquote key={review.quote} className="max-w-md">
                <p className="font-[family-name:var(--font-sundance-display)] text-2xl leading-snug text-[color:var(--ink)]">
                  “{review.quote}”
                </p>
                <footer className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
                  {review.source}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="locations" className="mx-auto max-w-6xl scroll-mt-36 px-5 py-20 sm:px-8 sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--sage)]">
            Two clinics
          </p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-sundance-display)] text-4xl font-semibold sm:text-5xl">
            Beltline and Sun Valley — book the room that’s closest to you.
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {sundance.locations.map((location) => (
              <article
                key={location.id}
                className="flex min-h-[22rem] flex-col justify-between rounded-3xl bg-[color:var(--sage-deep)] p-8 text-[color:var(--cream)]"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--sun-bright)]">
                    {location.neighborhood}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-sundance-display)] text-4xl">
                    {location.name}
                  </h3>
                  <p className="mt-4 text-[color:var(--cream)]/80">
                    {location.address}
                    <br />
                    {location.city}
                  </p>
                  <p className="mt-3 text-sm text-[color:var(--sun-bright)]">
                    {location.note}
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={location.bookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[color:var(--sun)] px-5 py-2.5 text-sm font-semibold text-[color:var(--ink)]"
                  >
                    Book this location
                  </a>
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[color:var(--cream)]/25 px-5 py-2.5 text-sm font-medium"
                  >
                    Directions
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="visit"
          className="scroll-mt-36 border-t border-[color:var(--sand-deep)] bg-[color:var(--cream)]"
        >
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--sage)]">
                Visit
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-sundance-display)] text-4xl font-semibold sm:text-5xl">
                Book online, or call and we’ll sort it.
              </h2>
              <p className="mt-5 max-w-lg text-[color:var(--ink-soft)]">
                The best way to schedule is still online. If you have a
                question, want a particular therapist, or you’re looking to join
                the team, call or text.
              </p>
              <a
                href={sundance.phoneHref}
                className="mt-8 inline-block font-[family-name:var(--font-sundance-display)] text-4xl font-semibold text-[color:var(--ink)] sm:text-5xl"
              >
                {sundance.phoneDisplay}
              </a>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={sundance.bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[color:var(--sage)] px-6 py-3 text-sm font-semibold text-[color:var(--cream)]"
                >
                  Open online booking
                </a>
                <a
                  href={sundance.smsHref}
                  className="rounded-full border border-[color:var(--sand-deep)] px-6 py-3 text-sm font-semibold"
                >
                  Text the clinic
                </a>
              </div>
            </div>
            <aside className="rounded-3xl border border-[color:var(--sand-deep)] bg-white/70 p-8">
              <h3 className="font-[family-name:var(--font-sundance-display)] text-2xl font-semibold">
                We’re hiring
              </h3>
              <p className="mt-3 text-[color:var(--ink-soft)]">
                Registered and licensed therapists and practitioners — if you
                want to talk about joining, call or text the same number.
              </p>
              <p className="mt-6 text-sm text-[color:var(--ink-soft)]">
                Acupuncture with Dr. Jonathan Yu, accredited by the College of
                Acupuncturists of Alberta.
              </p>
            </aside>
          </div>
        </section>
      </main>

      <footer className="border-t border-[color:var(--sand-deep)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-3">
            <SundanceLogo className="h-8 w-8" />
            <p className="text-sm text-[color:var(--ink-soft)]">
              {sundance.legalName} · Calgary
            </p>
          </div>
          <p className="text-sm text-[color:var(--ink-soft)]">
            Concept by SimplTech. Not the live clinic site.
          </p>
        </div>
      </footer>
    </div>
  );
}
