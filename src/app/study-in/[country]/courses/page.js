import Link from "next/link";
import countries from "@/data/countries.json";
import countryDetails from "@/data/countryDetails.json";
import universities from "@/data/universities.json";
import programs from "@/data/programs.json";

export async function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }) {
  const { country: countrySlug } = await params;
  const country = countries.find((c) => c.slug === countrySlug);
  if (!country) return {};

  return {
    title: `Courses & Universities in ${country.name} | UNIAD`,
    description: `Explore universities and courses in ${country.name}, plus guidance on choosing the right one for you.`,
  };
}

export default async function CoursesPage({ params }) {
  const { country: countrySlug } = await params;

  const country = countries.find((c) => c.slug === countrySlug);
  const details = countryDetails.find((d) => d.slug === countrySlug);
  const countryUniversities = universities.filter(
    (u) => u.countrySlug === countrySlug
  );

  if (!country || !details) {
    return (
      <div className="px-5 py-24 text-center text-[#101820]">
        <p>We couldn't find that country page.</p>
      </div>
    );
  }

  return (
    <main>
      {/* ================= PAGE HEADER ================= */}
      <section className="bg-[#101820] px-5 py-14 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
          {country.name}
        </p>
        <h1 className="mt-3 text-2xl font-bold text-white md:text-4xl">
          Courses & Universities
        </h1>
      </section>

      {/* ================= GUIDANCE SECTION ================= */}
      <section className="bg-white px-5 py-14 lg:px-8">
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

          {details.courses.externalResources?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {details.courses.externalResources.map((resource) => (
                <a
                  key={resource.url}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-[#9DAD98] px-4 py-2 text-sm font-medium text-[#101820] transition-colors hover:border-[#C9A227]"
                >
                  {resource.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= UNIVERSITY LIST ================= */}
      <section className="bg-[#FAF9F4] px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#C9A227]">
            Featured Universities
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#101820] md:text-3xl">
            {countryUniversities.length} universities in {country.name}
          </h2>

          <div className="mt-8 space-y-6">
            {countryUniversities.map((uni) => (
              <UniversityCard key={uni.slug} university={uni} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function UniversityCard({ university }) {
  const uniPrograms = programs.filter((p) => p.universitySlug === university.slug);

  return (
    <div className="rounded-xl border border-[#101820]/10 bg-white p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <h3 className="text-lg font-bold text-[#101820]">{university.name}</h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#C9A227]">
            {university.ranking}
          </p>
          <p className="mt-2 text-sm text-[#101820]/70">{university.shortDescription}</p>
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