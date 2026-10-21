import Link from "next/link";
import countries from "@/data/countries.json";
import countryDetails from "@/data/countryDetails.json";
import universities from "@/data/universities.json";
import EditorialSplit from "@/components/country/EditorialSplit";

export async function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }) {
  const { country: countrySlug } = await params;
  const country = countries.find((c) => c.slug === countrySlug);
  if (!country) return {};

  return {
    title: `Study in ${country.name} | UNIAD`,
    description: country.shortIntro,
  };
}

export default async function CountryPage({ params }) {
  const { country: countrySlug } = await params;

  const country = countries.find((c) => c.slug === countrySlug);
  const details = countryDetails.find((d) => d.slug === countrySlug);
  const universityCount = universities.filter(
    (u) => u.countrySlug === countrySlug
  ).length;

  const previewCourses = (details?.courses?.topCourses ?? []).slice(0, 3);
  const remainingCourses = Math.max(
    (details?.courses?.topCourses?.length ?? 0) - previewCourses.length,
    0
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
      {/* ================= HERO (placeholder for now) =================
          This will later become the GSAP scroll-driven video-to-frame
          section once real footage is ready. For now it's a simple,
          honest placeholder so the rest of the page can be built and
          reviewed without waiting on that asset. */}
      <section className="flex h-[60vh] min-h-[380px] w-full items-center justify-center bg-[#101820]">
        <div className="px-5 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
            Study Abroad
          </p>
          <h1 className="mt-4 text-3xl font-bold text-white md:text-5xl">
            Study in {country.name}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70 md:text-base">
            {country.shortIntro}
          </p>
        </div>
      </section>

      {/* ================= QUICK FACTS STRIP ================= */}
      <section className="border-b border-[#101820]/10 bg-white px-5 py-6">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 text-center sm:grid-cols-4">
          <QuickFact label="Avg. Living Cost" value={country.quickFacts.avgLivingCost} />
          <QuickFact label="Avg. Tuition" value={country.quickFacts.avgTuition} />
          <QuickFact label="Post-Study Visa" value={country.quickFacts.postStudyVisa} />
          <QuickFact label="Language" value={country.quickFacts.language} />
        </div>
      </section>

      {/* ================= ABOUT PREVIEW (editorial: image + text) =================
          Replaces the old card-style PreviewSection for About specifically —
          left image, right heading + 5-6 line paragraph + Read More CTA,
          per the new magazine-style direction. Why Study / Courses previews
          below are untouched for now, will get the same treatment next. */}
      <EditorialSplit
        eyebrow="About"
        heading={details.about.preview.heading}
        paragraphs={details.about.preview.paragraph}
        image={details.about.preview.image}
        tone="white"
        accent="sage"
        cta={{ label: "Read More", href: `/study-in/${country.slug}/about` }}
      />

      {/* ================= WHY STUDY PREVIEW (editorial: text + click-to-play video) =================
          bg is the solid brand sage (#9DAD98) per the new direction — text
          left, video thumbnail right, click opens the YouTube video in a
          lightbox modal without leaving the page. */}
      <EditorialSplit
        eyebrow="Why Study Here"
        heading={`Why Study in ${country.name}?`}
        paragraphs={details.whyStudy.summary}
        video={details.whyStudy.video}
        tone="sage-solid"
        accent="navy"
        reverse
        cta={{ label: "Learn More", href: `/study-in/${country.slug}/why-study` }}
      />

      {/* ================= COURSES PREVIEW (top 3 + see more) =================
          Shows a taste of the real course data (first 3 of the country's
          top courses) instead of a plain text card. "See More" leads to the
          full courses page. Pale gold so it reads differently from the sage
          section above and sits well against the dark footer below. */}
      <section className="bg-[#F3ECD5] px-5 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ol className="space-y-4">
            {previewCourses.map((course) => (
              <li
                key={course.rank}
                className="flex items-start gap-4 border-b border-[#101820]/10 pb-4 last:border-0 last:pb-0"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#101820] text-base font-bold text-[#C9A227]">
                  {course.rank}
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#101820] md:text-lg">
                    {course.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-[#101820]/70">
                    {firstSentence(course.body)}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8C6220]">
              Courses & Universities
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[#101820] md:text-3xl">
              Explore Top Courses in {country.name}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#101820]/75 md:text-base">
              The most popular subjects among international students
              {remainingCourses > 0 ? `, plus ${remainingCourses} more in the full list` : ""}.
              See what each of the {universityCount} top universities is known for, and
              what it costs to study there.
            </p>
            <Link
              href={`/study-in/${country.slug}/courses`}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#101820] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              See More
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function QuickFact({ label, value }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-[#101820]/50">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[#101820]">{value}</p>
    </div>
  );
}

// First sentence of a longer paragraph, used for the short course teasers.
function firstSentence(text) {
  const match = text.match(/^.*?[.!?](\s|$)/);
  return match ? match[0].trim() : text;
}