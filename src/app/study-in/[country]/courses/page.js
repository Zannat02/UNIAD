import Link from "next/link";
import countries from "@/data/countries.json";
import countryDetails from "@/data/countryDetails.json";
import universities from "@/data/universities.json";
import programs from "@/data/programs.json";
import CourseGallery from "@/components/country/CourseGallery";

export async function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }) {
  const { country: countrySlug } = await params;
  const country = countries.find((c) => c.slug === countrySlug);
  if (!country) return {};

  return {
    title: `Compare Universities in ${country.name} | UNIAD`,
    description: `Compare top universities in ${country.name} by career outcomes, value for money, and courses.`,
  };
}

const LABEL_COLOR = {
  Strong: "text-[#1E4F49]",
  Good: "text-[#101820]",
  Moderate: "text-[#8C6220]",
};

export default async function CoursesPage({ params }) {
  const { country: countrySlug } = await params;

  const country = countries.find((c) => c.slug === countrySlug);
  const details = countryDetails.find((d) => d.slug === countrySlug);
  const countryUniversities = universities
    .filter((u) => u.countrySlug === countrySlug)
    .sort((a, b) => a.tierRank - b.tierRank);

  const topFive = countryUniversities.filter((u) => u.tier === "top-5");
  const nextFive = countryUniversities.filter((u) => u.tier === "next-5");

  if (!country || !details) {
    return (
      <div className="px-5 py-24 text-center text-[#101820]">
        <p>We couldn&apos;t find that country page.</p>
      </div>
    );
  }

  return (
    <main>
      <CourseGallery label={country.name} />

      {/* ================= TOP 10 COURSES =================
          Country-wide overview, not tied to a single university — pulled
          from details.courses.topCourses, which is per-country data (UK's
          list won't be the same as Canada's, Australia's, etc). */}
      <section className="bg-white px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#C9A227]">
            Course Guide
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#101820] md:text-4xl lg:text-5xl">
            Top 10 Courses in {country.name}
          </h2>
          <p className="mt-4 text-sm text-[#101820]/70 md:text-base">
            The most in-demand subjects among international students, based on
            application volume — a useful starting point if you're still deciding
            what to study.
          </p>

          <div className="mt-8">
            {details.courses.topCourses.map((course) => (
              <div
                key={course.rank}
                className="flex gap-5 border-b border-[#101820]/10 py-6 first:pt-0 last:border-0"
              >
                <span className="shrink-0 text-3xl font-bold text-[#C9A227] md:text-4xl">
                  {course.rank}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#101820] md:text-xl">
                    {course.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#101820]/75 md:text-base">
                    {course.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GUIDANCE SECTION ================= */}
      <section className="bg-[#FAF9F4] px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#C9A227]">
            Choosing a Course
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#101820] md:text-3xl">
            How to find the right course for you
          </h2>
          <p className="mt-4 text-sm text-[#101820]/75 md:text-base">
            {details.courses.guidanceIntro}
          </p>
          <ul className="mt-6 space-y-3">
            {details.courses.guidanceQuestions.map((q, i) => (
              <li key={i} className="flex gap-3 text-sm text-[#101820]/80 md:text-base">
                <span className="mt-0.5 shrink-0 text-[#C9A227]">•</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= QUICK COMPARISON TABLE — kept as-is for now ================= */}
      <section className="bg-white px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#C9A227]">
            At a Glance
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#101820] md:text-3xl">
            Quick comparison
          </h2>

          <div className="mt-6 overflow-x-auto rounded-xl border border-[#101820]/10 bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#101820]/10 text-[11px] uppercase tracking-wide text-[#101820]/50">
                  <th className="px-4 py-3">University</th>
                  <th className="px-4 py-3">Career Growth</th>
                  <th className="px-4 py-3">Value for Money</th>
                  <th className="px-4 py-3">Settlement Chance</th>
                </tr>
              </thead>
              <tbody>
                {countryUniversities.map((uni) => (
                  <tr key={uni.slug} className="border-b border-[#101820]/5 last:border-0">
                    <td className="px-4 py-3 font-medium text-[#101820]">{uni.name}</td>
                    <td className={`px-4 py-3 font-medium ${LABEL_COLOR[uni.comparisonHighlights.careerGrowth]}`}>
                      {uni.comparisonHighlights.careerGrowth}
                    </td>
                    <td className={`px-4 py-3 font-medium ${LABEL_COLOR[uni.comparisonHighlights.valueForMoney]}`}>
                      {uni.comparisonHighlights.valueForMoney}
                    </td>
                    <td className={`px-4 py-3 font-medium ${LABEL_COLOR[uni.comparisonHighlights.settlementChance]}`}>
                      {uni.comparisonHighlights.settlementChance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-[#101820]/50">
            Based on general institutional reputation — pending verification against
            HESA Graduate Outcomes and Discover Uni before publishing live.
          </p>
        </div>
      </section>

      {/* ================= TOP 5 ================= */}
      <TierSection title="Top 5 Universities" universities={topFive} tone="alt" />

      {/* ================= NEXT 5 ================= */}
      <TierSection title="Next 5 Universities" universities={nextFive} />
    </main>
  );
}

function TierSection({ title, universities: list, tone = "default" }) {
  const bg = tone === "alt" ? "bg-[#FAF9F4]" : "bg-white";
  if (list.length === 0) return null;

  return (
    <section className={`${bg} px-5 py-14 lg:px-8`}>
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-[#101820] md:text-3xl">{title}</h2>
        <div className="mt-8 space-y-6">
          {list.map((uni) => (
            <UniversityCard key={uni.slug} university={uni} />
          ))}
        </div>
      </div>
    </section>
  );
}

function UniversityCard({ university }) {
  const uniPrograms = programs.filter((p) => p.universitySlug === university.slug);
  const { careerGrowth, valueForMoney, settlementChance, tagline } =
    university.comparisonHighlights;

  return (
    <div className="rounded-xl border border-[#101820]/10 bg-white p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <h3 className="text-lg font-bold text-[#101820]">{university.name}</h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#C9A227]">
            {university.ranking}
          </p>
          <p className="mt-2 text-sm text-[#101820]/70">{tagline}</p>
        </div>

        <a
          href={university.website}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg bg-[#101820] px-5 py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Visit University Website ↗
        </a>
      </div>

      {/* comparison label chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Chip label="Career Growth" value={careerGrowth} />
        <Chip label="Value for Money" value={valueForMoney} />
        <Chip label="Settlement Chance" value={settlementChance} />
      </div>

      {uniPrograms.length > 0 && (
        <div className="mt-5 border-t border-[#101820]/10 pt-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[#101820]/50">
            Featured Programs
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {uniPrograms.map((program) => (
              <div
                key={program.id}
                className="rounded-lg border border-[#9DAD98]/50 bg-[#FAF9F4] p-4"
              >
                <p className="text-sm font-semibold text-[#101820]">
                  {program.programName}
                </p>
                <p className="mt-1 text-xs text-[#101820]/60">
                  {program.subject} · {program.level} · {program.duration}
                </p>
                <p className="mt-2 text-sm font-medium text-[#101820]">
                  {program.tuitionFee}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({ label, value }) {
  return (
    <span
      className={`rounded-full border border-[#101820]/10 px-3 py-1 text-xs font-medium ${LABEL_COLOR[value]}`}
    >
      {label}: {value}
    </span>
  );
}