import Link from "next/link";
import countries from "@/data/countries.json";
import careerGrowth from "@/data/careerGrowth.json";
import FallbackImage from "@/components/country/FallbackImage";

// Palette (solid hex on purpose, so each wave divider can match the colour
// of the section that comes next without opacity maths).
const NAVY = "#101820";
const GOLD = "#C9A227";
const SAGE = "#9DAD98";
const SAGE_PALE = "#E8EBE3";
const GOLD_PALE = "#F3ECD5";
const OFFWHITE = "#FAF9F4";

const H2 = "text-2xl font-bold md:text-4xl lg:text-5xl";

export async function generateStaticParams() {
  return careerGrowth.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }) {
  const { country: countrySlug } = await params;
  const country = countries.find((c) => c.slug === countrySlug);
  if (!country) return {};

  return {
    title: `Career Growth for International Students in ${country.name} | UNIAD`,
    description: `Graduate salaries, work experience and post-study work options in ${country.name}.`,
  };
}

export default async function CareerGrowthPage({ params }) {
  const { country: countrySlug } = await params;

  const country = countries.find((c) => c.slug === countrySlug);
  const career = careerGrowth.find((c) => c.slug === countrySlug);

  if (!country || !career) {
    return (
      <div className="px-5 py-24 text-center text-[#101820]">
        <p>We couldn&apos;t find that page.</p>
      </div>
    );
  }

  // Section photos: use a path from the data if one is given, otherwise a
  // per-country convention. Until real files exist, FallbackImage shows a
  // tidy placeholder instead of a broken image.
  const photo = (key, fileName) =>
    career.images?.[key] ?? `/images/countries/${country.slug}/${fileName}.jpg`;

  const maxSalary = Math.max(...career.salaryChart.items.map((i) => i.salary));
  const formatMoney = (n) =>
    `${career.salaryChart.currency}${n.toLocaleString("en-GB")}`;

  return (
    <main className="overflow-x-hidden">
     
      <style>{`
        .cg-bar { transform-origin: left center; }
        @supports (animation-timeline: view()) {
          .cg-bar {
            animation: cgBarGrow linear both;
            animation-timeline: view();
            animation-range: entry 10% cover 35%;
          }
        }
        @keyframes cgBarGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>

     
      <section className="relative w-full bg-[#101820]">
        <FallbackImage
          src={career.bannerImage}
          alt={`Career growth in ${country.name}`}
          className="block h-auto w-full"
          placeholderClassName="flex aspect-[21/9] min-h-[220px] w-full items-center justify-center bg-[#101820]"
          placeholderTextClassName="text-xs font-medium uppercase tracking-[0.25em] text-white/40"
          placeholderLabel={`Career growth in ${country.name} — banner placeholder`}
        />
        <Wave fill={SAGE} />
      </section>

      {/*  TITLE + INTRO (sage)  */}
      <section className="relative overflow-hidden bg-[#9DAD98] px-5 pb-24 pt-10 md:pb-32 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-white/20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 bottom-24 h-72 w-72 rounded-full border-2 border-white/30"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#101820]/70">
              {country.name} · Career Growth
            </p>
            <h1 className="mt-3 text-2xl font-bold text-[#101820] md:text-4xl lg:text-5xl">
              Career Growth for International Students in {country.name}
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-[#101820]/80 md:text-base lg:text-lg">
              {career.intro}
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 h-full w-full rounded-3xl bg-[#C9A227] md:-bottom-4 md:-right-4"
            />
            <FallbackImage
              src={photo("intro", "career-growth-intro")}
              alt={`Graduates in ${country.name}`}
              className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
              placeholderClassName="relative flex aspect-[4/3] w-full items-center justify-center rounded-3xl border border-white/40 bg-white/40"
              placeholderTextClassName="text-xs font-medium uppercase tracking-[0.2em] text-[#101820]/50"
              placeholderLabel="Graduates — image placeholder"
            />
          </div>
        </div>

        <Wave fill={NAVY} />
      </section>

      {/* BIG NUMBERS  */}
      <section className="relative overflow-hidden bg-[#101820] px-5 pb-24 pt-14 md:pb-32 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10 md:h-80 md:w-80"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-[#C9A227]/30 md:h-52 md:w-52"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#C9A227]/10"
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {career.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-[#C9A227] sm:text-3xl md:text-4xl lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-white md:text-base">
                {stat.label}
              </p>
              <p className="mx-auto mt-1 max-w-[16rem] text-xs leading-relaxed text-white/60 md:text-sm">
                {stat.note}
              </p>
            </div>
          ))}
        </div>

        <Wave fill={GOLD} />
      </section>

      {/* SALARY BARS  */}
      <section className="relative overflow-hidden bg-[#C9A227] px-5 pb-24 pt-14 md:pb-32 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-white/15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-33 lg:-right-16 top-10 h-48 w-48 rounded-full border-2 border-[#101820]/15"
        />

        <div className="relative mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#101820]/70">
            Salaries
          </p>
          <h2 className={`mt-3 text-[#101820] ${H2}`}>{career.salaryChart.title}</h2>
          <p className="mt-4 text-sm text-[#101820]/80 md:text-base">
            {career.salaryChart.caption}
          </p>

          <ul className="mt-10 space-y-4">
            {career.salaryChart.items.map((item) => {
              const pct = Math.round((item.salary / maxSalary) * 100);
              return (
                <li
                  key={item.subject}
                  className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4"
                >
                  <span className="text-sm font-medium text-[#101820] sm:w-64 sm:shrink-0 md:text-base">
                    {item.subject}
                  </span>
                  <div className="flex flex-1 items-center gap-3">
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/40 md:h-4">
                      <div
                        className="cg-bar h-full rounded-full bg-[#101820]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-20 shrink-0 text-right text-sm font-bold text-[#101820] md:text-base">
                      {formatMoney(item.salary)}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 space-y-1 text-xs leading-relaxed text-[#101820]/75 md:text-sm">
            {career.salaryChart.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
            <p className="font-medium">Source: {career.salaryChart.source}</p>
          </div>
        </div>

        <Wave fill={SAGE_PALE} />
      </section>

    
      <section className="relative overflow-hidden bg-[#E8EBE3] px-5 pb-24 pt-14 md:pb-32 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#9DAD98]/30"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-3 -top-3 h-full w-full rounded-3xl border-2 border-[#C9A227] md:-left-4 md:-top-4"
            />
            <FallbackImage
              src={photo("experience", "career-growth-experience")}
              alt={`Work experience in ${country.name}`}
              className="relative aspect-[4/5] w-full rounded-3xl object-cover shadow-lg"
              placeholderClassName="relative flex aspect-[4/5] w-full items-center justify-center rounded-3xl border border-[#101820]/10 bg-[#9DAD98]/40"
              placeholderTextClassName="text-xs font-medium uppercase tracking-[0.2em] text-[#101820]/40"
              placeholderLabel="Work experience — image placeholder"
            />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#101820]/60">
              Work experience
            </p>
            <h2 className={`mt-3 text-[#101820] ${H2}`}>{career.workExperience.title}</h2>
            <p className="mt-4 text-sm text-[#101820]/75 md:text-base">
              {career.workExperience.intro}
            </p>

            <ol className="mt-8 space-y-6">
              {career.workExperience.items.map((item, i) => (
                <li key={item.title} className="flex gap-4 border-t border-[#101820]/10 pt-6">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C9A227] text-sm font-bold text-[#101820]">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[#101820] md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#101820]/75 md:text-base">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <Wave fill={OFFWHITE} />
      </section>

      {/* JOURNEY TIMELINE  */}
      <section className="relative overflow-hidden bg-[#FAF9F4] px-5 pb-24 pt-14 md:pb-32 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#C9A227]/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute  -right-73  md:-right-43 bottom-32 h-80 w-80 rounded-full border border-[#9DAD98]/50"
        />

        <div className="relative mx-auto max-w-4xl">
          <h2 className={`text-center text-[#101820] ${H2}`}>{career.journey.title}</h2>

          <ol className="relative mt-12">
         
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-4 top-0 w-px bg-[#C9A227]/50 md:left-1/2"
            />
            {career.journey.steps.map((step, i) => {
              const onLeft = i % 2 === 0;
              return (
                <li
                  key={step.title}
                  className={`relative pb-10 pl-12 last:pb-0 md:w-1/2 ${
                    onLeft ? "md:pl-0 md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#C9A227] text-sm font-bold text-[#101820] ring-4 ring-[#FAF9F4] ${
                      onLeft
                        ? "md:left-auto md:right-0 md:translate-x-1/2"
                        : "md:-translate-x-1/2"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-bold text-[#101820] md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#101820]/75 md:text-base">
                    {step.text}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        <Wave fill={NAVY} />
      </section>

  
      <section className="relative overflow-hidden bg-[#101820] px-5 pb-24 pt-14 md:pb-32 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full border border-[#C9A227]/30"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-[#C9A227]/10"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A227] text-[#101820]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <polyline points="12 7 12 12 15 14" />
            </svg>
          </span>
          <h2 className="mt-5 text-xl font-bold text-[#C9A227] md:text-3xl lg:text-4xl">
            {career.keyTip.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/80 md:text-base lg:text-lg">
            {career.keyTip.text}
          </p>
        </div>

        <Wave fill={GOLD_PALE} />
      </section>

      {/* JOB SEARCH (pale gold, image right) */}
      <section className="relative overflow-hidden bg-[#F3ECD5] px-5 pb-24 pt-14 md:pb-32 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 bottom-24 h-64 w-64 rounded-full bg-[#9DAD98]/25"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-1">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#101820]/60">
              Finding a job
            </p>
            <h2 className={`mt-3 text-[#101820] ${H2}`}>{career.jobSearch.title}</h2>

            <ul className="mt-8 space-y-5">
              {career.jobSearch.tips.map((tip) => (
                <li key={tip.title} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#101820] text-[#C9A227]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#101820] md:text-lg">
                      {tip.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#101820]/75 md:text-base">
                      {tip.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:order-2">
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 h-full w-full rounded-3xl bg-[#9DAD98] md:-bottom-4 md:-left-4"
            />
            <FallbackImage
              src={photo("jobSearch", "career-growth-jobs")}
              alt={`Finding a job in ${country.name}`}
              className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
              placeholderClassName="relative flex aspect-[4/3] w-full items-center justify-center rounded-3xl border border-[#101820]/10 bg-white/60"
              placeholderTextClassName="text-xs font-medium uppercase tracking-[0.2em] text-[#101820]/40"
              placeholderLabel="Job search — image placeholder"
            />
          </div>
        </div>

        <Wave fill={OFFWHITE} />
      </section>

     
      <section className="bg-[#FAF9F4] px-5 pb-14 pt-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center">
          {/* <Link
            href={`/study-in/${country.slug}/courses`}
            aria-label={`Back to ${country.name} courses`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#101820]/15 text-[#101820] transition-colors hover:border-[#101820]/40"
          >
            <span aria-hidden="true">&larr;</span>
          </Link> */}

          <Link
            href={`/study-in/${country.slug}/courses/settle-after-study`}
            className="w-full rounded-lg bg-[#101820] px-6 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
          >
            Settling in {country.name} After Study &rarr;
          </Link>
        </div>

        <p className="mx-auto mt-8 max-w-4xl text-xs leading-relaxed text-[#101820]/50">
          Sources: {career.sources.join(" · ")}. Last checked: {career.lastChecked}.
          Visa rules, fees and salary figures change, so confirm the latest details
          on the official government and university websites before you decide.
        </p>
      </section>
    </main>
  );
}

function Wave({ fill }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 block h-10 w-full md:h-16"
    >
      <path d="M0 40C240 80 480 0 720 32S1200 72 1440 24V80H0Z" fill={fill} />
    </svg>
  );
}