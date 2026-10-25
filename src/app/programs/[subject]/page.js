import Link from "next/link";
import countries from "@/data/countries.json";
import subjectCategories from "@/data/subjectCategories.json";
import nav from "@/data/navigation.json";
import FallbackImage from "@/components/country/FallbackImage";
import { sectionsFor } from "@/lib/programs";

export async function generateStaticParams() {
  return subjectCategories.map((c) => ({ subject: c.slug }));
}

export async function generateMetadata({ params }) {
  const { subject: subjectSlug } = await params;
  const category = subjectCategories.find((c) => c.slug === subjectSlug);
  if (!category) return {};

  return {
    title: `Study ${category.label} Abroad | UNIAD`,
    description: category.tagline,
  };
}

export default async function SubjectPage({ params, searchParams }) {
  const { subject: subjectSlug } = await params;
  const query = await searchParams;
  const rawCountry = query?.country;
  const countryParam = Array.isArray(rawCountry) ? rawCountry[0] : rawCountry;

  const category = subjectCategories.find((c) => c.slug === subjectSlug);

  if (!category) {
    return (
      <div className="px-5 py-24 text-center text-[#101820]">
        <p className="text-sm md:text-base lg:text-lg">
          We couldn&apos;t find that subject.
        </p>
        <Link href="/" className="mt-4 inline-block font-semibold underline">
          Back to program search
        </Link>
      </div>
    );
  }

  const allSections = sectionsFor(category);
  const selected = countryParam
    ? allSections.filter((s) => s.country.slug === countryParam)
    : allSections;
  const others = countryParam
    ? allSections.filter((s) => s.country.slug !== countryParam)
    : [];

  // Name of the country the visitor picked, even if we have no data for it yet.
  const pickedCountry = countryParam
    ? countries.find((c) => c.slug === countryParam)
    : null;
  const pickedName = countryParam
    ? pickedCountry?.name ??
      nav.dropdowns
        .find((d) => d.key === "destinations")
        ?.items.find((i) => i.href === `/study-in/${countryParam}`)?.label ??
      countryParam
    : null;

  const universityTotal = allSections.reduce((sum, s) => sum + s.unis.length, 0);
  const filterQuery = countryParam ? `?country=${countryParam}` : "";


  const otherSubjects = subjectCategories.filter(
    (c) => c.slug !== category.slug && sectionsFor(c).length > 0
  );

  const title =
    selected.length > 0 && pickedName
      ? `Study ${category.label} in ${pickedName}`
      : `Study ${category.label} Abroad`;

  return (
    <main className="overflow-x-hidden">
      {/* BANNER */}
      <section className="relative w-full bg-[#101820]">
        <FallbackImage
          src={category.bannerImage ?? `/images/subjects/${category.slug}.jpg`}
          alt={category.label}
          className="block h-auto w-full"
          placeholderClassName="flex aspect-[21/9] min-h-[220px] w-full items-center justify-center bg-[#101820]"
          placeholderTextClassName="text-xs font-medium uppercase tracking-[0.25em] text-white/40"
          placeholderLabel={`${category.label} — banner placeholder`}
        />
        <Wave fill="#9DAD98" />
      </section>

      {/* TITLE */}
      <section className="relative overflow-hidden bg-[#9DAD98] px-5 pb-24 pt-10 md:pb-32 lg:px-8">
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#101820]/70">
            Subject guide
          </p>
          <h1 className="mt-3 text-2xl font-bold text-[#101820] md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#101820]/80 md:text-base lg:text-lg">
            {category.tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            <span className="rounded-full bg-[#101820] px-4 py-1.5 text-[#C9A227]">
              {allSections.length} {allSections.length === 1 ? "country" : "countries"}
            </span>
            <span className="rounded-full bg-[#101820] px-4 py-1.5 text-[#C9A227]">
              {universityTotal} {universityTotal === 1 ? "university" : "universities"}
            </span>
            {countryParam && (
              <Link
                href={`/programs/${category.slug}`}
                className="rounded-full border border-[#101820]/40 px-4 py-1.5 text-[#101820] transition-colors hover:bg-[#101820] hover:text-white"
              >
                Showing {pickedName} · Show all countries
              </Link>
            )}
          </div>
        </div>

        <Wave fill={selected.length > 0 ? "#FAF9F4" : "#F3ECD5"} />
      </section>

      {/* ONE SECTION PER COUNTRY */}
      {selected.map(({ country, courses, unis, totalCourses }, index) => (
        <section
          key={country.slug}
          className={`relative overflow-hidden px-5 pb-20 pt-14 lg:px-8 ${
            index % 2 === 0 ? "bg-[#FAF9F4]" : "bg-[#E8EBE3]"
          }`}
        >
          <div className="relative mx-auto max-w-4xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#101820]/60">
              {country.name}
            </p>
            <h2 className="mt-3 text-xl font-bold text-[#101820] md:text-3xl lg:text-4xl">
              {category.label} in {country.name}
            </h2>

   
            {courses.length > 0 ? (
              <div className="mt-8 space-y-8">
                {courses.map((course) => (
                  <article key={course.rank}>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-bold text-[#101820] md:text-2xl">
                        {course.name}
                      </h3>
                      <span className="rounded-full bg-[#101820] px-3 py-1 text-xs font-semibold text-[#C9A227]">
                        #{course.rank} of {totalCourses} top courses
                      </span>
                    </div>
                    <div className="mt-3 space-y-3">
                      {course.body.split("\n\n").map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-sm leading-relaxed text-[#101820]/80 md:text-base lg:text-lg"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-sm italic text-[#101820]/60 md:text-base lg:text-lg">
                A detailed guide to {category.label} in {country.name} is coming soon.
                Here are the universities known for it.
              </p>
            )}

            {/* universities */}
            {unis.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-bold text-[#101820] md:text-xl">
                  Where to study it
                </h3>
                <ul className="mt-3">
                  {unis.map((uni) => (
                    <li
                      key={uni.slug}
                      className="flex flex-col gap-1 border-b border-[#101820]/10 py-4 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                    >
                      <div>
                        <a
                          href={uni.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#101820] underline decoration-[#C9A227] decoration-2 underline-offset-4 transition-colors hover:text-[#101820]/70"
                        >
                          {uni.name} ↗
                        </a>
                        <p className="mt-1 text-sm text-[#101820]/70">
                          Known for: {uni.matched.join(", ")}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-semibold text-[#101820]">
                        {uni.tuitionRange}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-[#101820]/55">
                  Tuition is an approximate range for most courses. Always confirm the
                  exact fee on the university&apos;s own page.
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/study-in/${country.slug}/courses`}
                className="rounded-lg bg-[#101820] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                All courses in {country.name} &rarr;
              </Link>
              <Link
                href={`/study-in/${country.slug}`}
                className="rounded-lg border border-[#101820] px-5 py-3 text-sm font-semibold text-[#101820] transition-colors hover:bg-[#101820] hover:text-white"
              >
                Study in {country.name}
              </Link>
            </div>
          </div>
        </section>
      ))}

    
      {countryParam && selected.length === 0 && (
        <section className="relative overflow-hidden bg-[#FAF9F4] px-5 pb-20 pt-14 lg:px-8">
          <Dots tone="rgba(16,24,32,0.08)" />
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-xl font-bold text-[#101820] md:text-3xl lg:text-4xl">
              {pickedCountry
                ? `We haven't listed ${category.label} programmes in ${pickedName} yet`
                : `Information for ${pickedName} is coming soon`}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#101820]/75 md:text-base lg:text-lg">
              {pickedCountry
                ? "We are adding more every month. You can look at all the courses we do have for this country."
                : "We are still collecting details for this destination. In the meantime, you can see where else this subject is available."}
            </p>
            {pickedCountry && (
              <Link
                href={`/study-in/${pickedCountry.slug}/courses`}
                className="mt-6 inline-block rounded-lg bg-[#101820] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                See courses in {pickedName} &rarr;
              </Link>
            )}
          </div>
        </section>
      )}

     
      {others.length > 0 && (
        <section className="bg-[#E8EBE3] px-5 py-12 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl font-bold text-[#101820] md:text-3xl lg:text-4xl">
              {category.label} in other countries
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {others.map((s) => (
                <Link
                  key={s.country.slug}
                  href={`/programs/${category.slug}?country=${s.country.slug}`}
                  className="rounded-full border border-[#101820] px-5 py-2 text-sm font-semibold text-[#101820] transition-colors hover:bg-[#101820] hover:text-white"
                >
                  {s.country.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    
      <section className="bg-[#F3ECD5] px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {otherSubjects.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-[#101820] md:text-3xl lg:text-4xl">
                Explore other subjects
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {otherSubjects.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/programs/${c.slug}${filterQuery}`}
                    className="rounded-full border border-[#101820] px-5 py-2 text-sm font-semibold text-[#101820] transition-colors hover:bg-[#101820] hover:text-white"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </>
          )}

          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#101820] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90"
          >
            <span aria-hidden="true" className="text-base text-[#C9A227]">
              &larr;
            </span>
            Back to program search
          </Link>
        </div>
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


function Dots({ tone }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(${tone} 1.5px, transparent 1.5px)`,
        backgroundSize: "22px 22px",
      }}
    />
  );
}