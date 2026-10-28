import Link from "next/link";
import countries from "@/data/countries.json";
import settlingData from "@/data/settling.json";
import FallbackImage from "@/components/country/FallbackImage";

const H2 = "text-2xl font-bold md:text-4xl lg:text-5xl";


const MONTHS =
  "January|February|March|April|May|June|July|August|September|October|November|December";
const HIGHLIGHT = new RegExp(
  `([£$€¥]\\s?\\d(?:[\\d,]*\\d)?(?:\\.\\d+)?|\\b\\d+(?:–\\d+)?\\s(?:years?|months?|days?|weeks?)\\b|\\b[ABC][12]\\b|\\b(?:${MONTHS})\\s\\d{4}\\b|\\b\\d+%)`,
  "g"
);


const CSS = `
  .st-page { --slant: 1.5rem; }
  @media (min-width: 768px) { .st-page { --slant: 3.5rem; } }
  .st-sec { padding-bottom: calc(var(--slant) + 3rem); }
  .st-a, .st-b {
    margin-top: calc(var(--slant) * -1);
    padding-top: calc(var(--slant) + 3rem);
  }
  .st-a { clip-path: polygon(0 var(--slant), 100% 0, 100% 100%, 0 100%); }
  .st-b { clip-path: polygon(0 0, 100% var(--slant), 100% 100%, 0 100%); }

  .st-ghost {
    color: transparent;
    -webkit-text-stroke: 2px var(--ghost, rgba(16, 24, 32, 0.15));
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .st-fill {
        transform-origin: top center;
        animation: stDraw linear both;
        animation-timeline: view();
        animation-range: cover 5% cover 75%;
      }
      .st-step {
        animation: stReveal linear both;
        animation-timeline: view();
        animation-range: entry 0% entry 55%;
      }
    }
  }
  @keyframes stDraw {
    from { transform: scaleY(0); }
    to { transform: scaleY(1); }
  }
  @keyframes stReveal {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export async function generateStaticParams() {
  return settlingData.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }) {
  const { country: countrySlug } = await params;
  const country = countries.find((c) => c.slug === countrySlug);
  if (!country) return {};

  return {
    title: `Settling in ${country.name} After Study | UNIAD`,
    description: `From student visa to permanent residence and citizenship: the route to staying in ${country.name} after your degree.`,
  };
}

export default async function SettlingPage({ params }) {
  const { country: countrySlug } = await params;

  const country = countries.find((c) => c.slug === countrySlug);
  const settling = settlingData.find((c) => c.slug === countrySlug);

  if (!country || !settling) {
    return (
      <div className="px-5 py-24 text-center text-[#101820]">
        <p>We couldn&apos;t find that page.</p>
      </div>
    );
  }

  const photo = (key, fileName) =>
    settling.images?.[key] ?? `/images/countries/${country.slug}/${fileName}.jpg`;

  const { ruleWatch, roadmap, checklist, otherRoutes, faqs, officialLinks } = settling;
  const statusLabel = ruleWatch.status.replace(/-/g, " ");

  return (
    <main className="st-page overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/*  TITLE + INTRO  */}
      <section className="st-sec relative overflow-hidden bg-[#101820] px-5 pt-14 md:pt-20 lg:px-8">
        <Pattern kind="stripes" id="st-title" className="text-white/[0.06]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-24 h-64 w-64 rotate-45 border border-[#C9A227]/30 md:h-80 md:w-80"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 top-36 h-40 w-40 rotate-45 border border-white/10"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#C9A227]">
              {country.name} · Settling
            </p>
            <h1 className="mt-3 text-2xl font-bold text-white md:text-4xl lg:text-5xl">
              Settling in {country.name} After You Graduate
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-white/80 md:text-base lg:text-lg">
              <Highlight text={settling.intro} dark />
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 px-4 py-1.5 text-xs font-medium text-[#C9A227]">
              <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-[#C9A227]" />
              Last checked {settling.lastChecked}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -right-3 top-3 h-full w-full rounded-b-2xl rounded-t-[9rem] border-2 border-[#C9A227]"
            />
            <FallbackImage
              src={photo("intro", "settling-intro")}
              alt={`Living in ${country.name}`}
              className="relative aspect-[3/4] w-full rounded-b-2xl rounded-t-[9rem] object-cover shadow-xl"
              placeholderClassName="relative flex aspect-[3/4] w-full items-center justify-center rounded-b-2xl rounded-t-[9rem] border border-white/20 bg-white/10"
              placeholderTextClassName="text-xs font-medium uppercase tracking-[0.2em] text-white/40"
              placeholderLabel="Living abroad — image placeholder"
            />
          </div>
        </div>
      </section>

      {/*  BIG NUMBERS  */}
      <section className="st-b st-sec relative overflow-hidden bg-[#C9A227] px-5 lg:px-8">
       

        <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-[#101820]/20">
          {settling.stats.map((stat) => (
            <div key={stat.label} className="px-3 text-center lg:px-6">
              <p className="text-2xl font-bold text-[#101820] sm:text-3xl md:text-4xl lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-bold text-[#101820] md:text-base">
                {stat.label}
              </p>
              <p className="mx-auto mt-1 max-w-[16rem] text-xs leading-relaxed text-[#101820]/75 md:text-sm">
                {stat.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/*  RULE WATCH  */}
      <section className="st-a st-sec relative overflow-hidden bg-[#FAF9F4] px-5 lg:px-8">
       
       

        <div className="relative mx-auto max-w-4xl rounded-2xl border-2 border-dashed border-[#C9A227] bg-white/80 p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#101820] text-[#C9A227]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </span>
            <span className="rounded-full bg-[#101820] px-3 py-1 text-xs font-semibold capitalize text-[#C9A227]">
              {statusLabel} · {ruleWatch.asOf}
            </span>
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#101820] md:text-3xl lg:text-4xl">
            {ruleWatch.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#101820]/80 md:text-base lg:text-lg">
            <Highlight text={ruleWatch.text} />
          </p>

          {ruleWatch.link && (
            <ExtLink
              href={ruleWatch.link.url}
              className="mt-6 inline-flex items-center rounded-lg bg-[#C9A227] px-5 py-3 text-sm font-semibold text-[#101820] transition-opacity hover:opacity-90"
            >
              {ruleWatch.link.label}
            </ExtLink>
          )}
        </div>
      </section>

      {/*  ROADMAP  */}
      <section className="st-b st-sec relative overflow-hidden bg-[#E8EBE3] px-5 lg:px-8">
      

        <div className="relative mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#101820]/60">
            The route
          </p>
          <h2 className={`mt-3 text-[#101820] ${H2}`}>{roadmap.title}</h2>
          <p className="mt-4 max-w-2xl text-sm text-[#101820]/75 md:text-base">
            {roadmap.intro}
          </p>

          <ol className="relative ml-3 mt-12 space-y-14 border-l-2 border-dashed border-[#101820]/25 pl-8 md:pl-12">
            {/* gold line that draws itself down the route as you scroll */}
            <span
              aria-hidden="true"
              className="st-fill absolute -left-0.5 top-0 h-full w-0.5 bg-[#C9A227]"
            />

            {roadmap.steps.map((step, i) => (
              <li key={step.title} className="st-step relative">
                <span
                  aria-hidden="true"
                  className="absolute left-[calc(-2.5rem-1px)] top-1.5 h-4 w-4 rotate-45 bg-[#C9A227] ring-4 ring-[#E8EBE3] md:left-[calc(-3.5rem-1px)]"
                />
                <span
                  aria-hidden="true"
                  className="st-ghost pointer-events-none absolute -top-3 right-0 select-none text-6xl font-black md:text-8xl"
                  style={{ "--ghost": "rgba(16, 24, 32, 0.12)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative">
                  <h3 className="text-lg font-bold text-[#101820] md:text-2xl">
                    {step.title}
                  </h3>
                  <span className="mt-2 inline-block rounded-full bg-[#101820] px-3 py-1 text-xs font-semibold text-[#C9A227]">
                    {step.duration}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-[#101820]/80 md:text-base">
                    <Highlight text={step.text} />
                  </p>
                  {step.link && <CheckLink link={step.link} />}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/*CHECKLIST */}
      <section className="st-a st-sec relative overflow-hidden bg-[#FAF9F4] px-5 lg:px-8">
        

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div className="mx-auto w-full max-w-sm lg:max-w-none">
            <div className="-rotate-2 rounded-2xl border-8 border-white bg-white shadow-xl">
              <FallbackImage
                src={photo("checklist", "settling-checklist")}
                alt={`Preparing to settle in ${country.name}`}
                className="aspect-[4/5] w-full rounded-lg object-cover"
                placeholderClassName="flex aspect-[4/5] w-full items-center justify-center rounded-lg bg-[#9DAD98]/40"
                placeholderTextClassName="text-xs font-medium uppercase tracking-[0.2em] text-[#101820]/40"
                placeholderLabel="Preparing to settle — image placeholder"
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#101820]/60">
              Checklist
            </p>
            <h2 className={`mt-3 text-[#101820] ${H2}`}>{checklist.title}</h2>
            <p className="mt-4 text-sm text-[#101820]/75 md:text-base">{checklist.intro}</p>

            <ul className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {checklist.items.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#101820] text-[#C9A227]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#101820] md:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#101820]/75">
                      <Highlight text={item.text} />
                    </p>
                    {item.link && <CheckLink link={item.link} />}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* OTHER ROUTES  */}
      <section className="st-b st-sec relative overflow-hidden bg-[#101820] px-5 lg:px-8">
        
        
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 bottom-16 h-56 w-56 rotate-45 border border-[#C9A227]/25"
        />

        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#C9A227]">
            Alternatives
          </p>
          <h2 className={`mt-3 text-white ${H2}`}>{otherRoutes.title}</h2>
          <p className="mt-4 max-w-2xl text-sm text-white/70 md:text-base">
            {otherRoutes.intro}
          </p>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {otherRoutes.items.map((item, i) => (
              <div key={item.title} className="relative border-t-2 border-[#C9A227]/60 pt-6">
                <span
                  aria-hidden="true"
                  className="st-ghost pointer-events-none absolute -top-2 right-0 select-none text-6xl font-black"
                  style={{ "--ghost": "rgba(201, 162, 39, 0.10)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative text-lg font-bold text-[#C9A227] md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">
                  <Highlight text={item.text} dark />
                </p>
                {item.link && (
                  <ExtLink
                    href={item.link.url}
                    className="mt-4 inline-block text-sm font-semibold text-white underline decoration-[#C9A227] decoration-2 underline-offset-4 transition-colors hover:text-[#C9A227]"
                  >
                    {item.link.label}
                  </ExtLink>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  FAQ  */}
      <section className="st-a st-sec relative overflow-hidden bg-[#F3ECD5] px-5 lg:px-8">
        <Pattern kind="stripes" id="st-faq" className="text-[#101820]/[0.05]" />

        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#101820]/60">
              FAQ
            </p>
            <h2 className={`mt-3 text-[#101820] ${H2}`}>Questions about staying on</h2>
            <p className="mt-4 text-sm text-[#101820]/75 md:text-base">
              Short, honest answers to what students ask about life after graduation.
            </p>
            <div className="mt-8 hidden lg:block">
              <FallbackImage
                src={photo("faq", "settling-faq")}
                alt={`Questions about settling in ${country.name}`}
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
                placeholderClassName="flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-white/50"
                placeholderTextClassName="text-xs font-medium uppercase tracking-[0.2em] text-[#101820]/40"
                placeholderLabel="Questions — image placeholder"
              />
            </div>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <details
                key={faq.id}
                name="settling-faq"
                open={i === 0}
                className="group border-b border-[#101820]/15 py-1"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                  <span className="text-base font-semibold text-[#101820] md:text-lg">
                    {faq.question}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-[#101820] transition-transform duration-200 group-open:rotate-180"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div className="space-y-3 pb-5">
                  {faq.answer.split("\n\n").map((paragraph, pi) => (
                    <p
                      key={pi}
                      className="text-sm leading-relaxed text-[#101820]/80 md:text-base"
                    >
                      <Highlight text={paragraph} />
                    </p>
                  ))}
                  {faq.link && <CheckLink link={faq.link} />}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICIAL LINKS  */}
      <section className="st-b st-sec relative overflow-hidden bg-[#9DAD98] px-5 lg:px-8">
       

        <div className="relative mx-auto max-w-5xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#101820]/70">
            Official sources
          </p>
          <h2 className={`mt-3 text-[#101820] ${H2}`}>{officialLinks.title}</h2>
          <p className="mt-4 max-w-2xl text-sm text-[#101820]/80 md:text-base">
            {officialLinks.intro}
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {officialLinks.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 rounded-xl bg-white/55 px-5 py-4 transition-colors hover:bg-white"
                >
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-[#101820]/55">
                      {link.topic}
                    </span>
                    <span className="mt-0.5 block text-sm font-bold text-[#101820] md:text-base">
                      {link.label}
                    </span>
                  </span>
                  <span aria-hidden="true" className="shrink-0 text-lg text-[#101820]">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/*  BACK + SOURCES  */}
      <section className="st-a relative bg-[#FAF9F4] px-5 pb-14 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center">
          {/* <Link
            href={`/study-in/${country.slug}/courses`}
            aria-label={`Back to ${country.name} courses`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#101820]/15 text-[#101820] transition-colors hover:border-[#101820]/40"
          >
            <span aria-hidden="true">&larr;</span>
          </Link> */}

          <Link
            href={`/study-in/${country.slug}/courses/career-growth`}
            className="w-full rounded-lg bg-[#101820] px-6 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
          >
             &larr; Career Growth in {country.name}
          </Link>
        </div>

        <p className="mx-auto mt-8 max-w-4xl text-xs leading-relaxed text-[#101820]/55">
          Sources:{" "}
          {settling.sources.map((source, i) => (
            <span key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[#C9A227] underline-offset-2 hover:text-[#101820]"
              >
                {source.label}
              </a>
              {i < settling.sources.length - 1 ? " · " : ""}
            </span>
          ))}
          . Last checked: {settling.lastChecked}. Visa rules, fees and dates change, so
          confirm the latest details on the official pages before you decide.
        </p>
      </section>
    </main>
  );
}


function Highlight({ text, dark = false }) {
  const parts = text.split(HIGHLIGHT);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong
        key={i}
        className={
          dark
            ? "font-bold text-[#C9A227]"
            : "rounded bg-[#C9A227]/30 px-1 font-bold text-[#101820] [box-decoration-break:clone]"
        }
      >
        {part}
      </strong>
    ) : (
      part
    )
  );
}

function ExtLink({ href, className, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}


function CheckLink({ link }) {
  return (
    <p className="mt-3 text-sm">
      <span className="text-[#101820]/55">Check it here: </span>
      <ExtLink
        href={link.url}
        className="font-semibold text-[#101820] underline decoration-[#C9A227] decoration-2 underline-offset-4 transition-colors hover:text-[#101820]/70"
      >
        {link.label}
      </ExtLink>
    </p>
  );
}


function Pattern({ kind, id, className }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        {kind === "dots" && (
          <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.6" fill="currentColor" />
          </pattern>
        )}
        {kind === "plus" && (
          <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M20 14v12M14 20h12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </pattern>
        )}
        {kind === "stripes" && (
          <pattern
            id={id}
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="18" stroke="currentColor" strokeWidth="2" />
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}