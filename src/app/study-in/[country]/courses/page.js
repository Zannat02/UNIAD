import Link from "next/link";
import countries from "@/data/countries.json";
import countryDetails from "@/data/countryDetails.json";
import universities from "@/data/universities.json";
import CourseGallery from "@/components/country/CourseGallery";

export async function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }) {
  const { country: countrySlug } = await params;
  const country = countries.find((c) => c.slug === countrySlug);
  if (!country) return {};

  return {
    title: `Top Courses & Universities in ${country.name} | UNIAD`,
    description: `The most popular courses and top-ranked universities in ${country.name}.`,
  };
}

export default async function CoursesPage({ params }) {
  const { country: countrySlug } = await params;

  const country = countries.find((c) => c.slug === countrySlug);
  const details = countryDetails.find((d) => d.slug === countrySlug);
  const countryUniversities = universities
    .filter((u) => u.countrySlug === countrySlug)
    .sort((a, b) => a.rank - b.rank);

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

   
      <section className="bg-[#FAF9F4] px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#C9A227]">
            Admissions
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#101820] md:text-4xl lg:text-5xl">
            Entry Requirements & Intakes
          </h2>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {/* Entry Requirements */}
            <div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-[#C9A227]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
                  <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
                </svg>
                <h3 className="text-lg font-bold text-[#101820]">Entry Requirements</h3>
              </div>

              <dl className="mt-5 space-y-5">
                <div className="border-l-2 border-[#9DAD98] pl-4">
                  <dt className="text-sm font-semibold uppercase tracking-wide text-[#101820]/50">
                    Undergraduate
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[#101820]/80 md:text-base">
                    {details.courses.entryRequirements.undergraduate}
                  </dd>
                </div>
                <div className="border-l-2 border-[#9DAD98] pl-4">
                  <dt className="text-sm font-semibold uppercase tracking-wide text-[#101820]/50">
                    Postgraduate
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[#101820]/80 md:text-base">
                    {details.courses.entryRequirements.postgraduate}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Intakes */}
            <div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-[#C9A227]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <h3 className="text-lg font-bold text-[#101820]">Intakes</h3>
              </div>

              <div className="mt-5 space-y-4">
                {details.courses.intakes.map((intake) => (
                  <div
                    key={intake.name}
                    className="rounded-xl border border-[#101820]/10 bg-white p-5"
                  >
                    <p className="text-sm font-bold text-[#101820]">{intake.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#101820]/75 md:text-base">
                      {intake.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#C9A227]">
            University Guide
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#101820] md:text-4xl lg:text-5xl">
            Top Universities in {country.name}
          </h2>

          <div
            className="no-scrollbar mt-8 overflow-x-auto rounded-2xl border border-[#101820]/10 bg-white"
            style={{ touchAction: "pan-x pan-y" }}
          >
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#101820]/10 text-[11px] uppercase tracking-wide text-[#101820]/50">
                  <th className="w-[220px] px-5 py-4">University</th>
                  <th className="px-5 py-4">Top Courses</th>
                  <th className="w-[180px] px-5 py-4">Tuition Range</th>
                </tr>
              </thead>
              <tbody>
                {countryUniversities.map((uni) => (
                  <tr key={uni.slug} className="border-b border-[#101820]/5 last:border-0">
                    <td className="whitespace-nowrap px-5 py-4 align-top">
                      <a
                        href={uni.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#101820] underline decoration-[#C9A227] decoration-2 underline-offset-4 transition-colors hover:text-[#C9A227]"
                      >
                        {uni.name} ↗
                      </a>
                    </td>
                    <td className="px-5 py-4 align-top text-[#101820]/75">
                      {uni.topCourses.join(", ")}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 align-top font-medium text-[#101820]">
                      {uni.tuitionRange}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-[#101820]/50">
            Tuition is an approximate range for most courses — Medicine, MBA, and a
            few specialist programmes typically cost more. Always confirm the exact
            fee on the university&apos;s own course page.
          </p>
        </div>
      </section>

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

      
      <section className="bg-[#FAF9F4] px-5 py-10 lg:px-8">
       
        <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={`/study-in/${country.slug}`}
            aria-label={`Back to ${country.name} overview`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#101820]/15 text-[#101820] transition-colors hover:border-[#101820]/40"
          >
            <span aria-hidden="true">&larr;</span>
          </Link>

          <div className="flex flex-col gap-3 sm:contents">
            <Link
              href={`/study-in/${country.slug}/courses/career-growth`}
              className="w-full rounded-lg bg-[#101820] px-6 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              International Student Career Growth
            </Link>

            <Link
              href={`/study-in/${country.slug}/courses/settle-after-study`}
              className="w-full rounded-lg border border-[#101820] px-6 py-3 text-center text-sm font-semibold text-[#101820] transition-colors hover:bg-[#101820] hover:text-white sm:w-auto"
            >
              Settling in {country.name} After Study
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}