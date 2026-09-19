import Link from "next/link";
import countries from "@/data/countries.json";
import countryDetails from "@/data/countryDetails.json";
import universities from "@/data/universities.json";

// Build every country page at build-time (static generation) instead of
// on-demand — faster loads, better SEO, and it's how we've been doing
// every other data-driven page on this site.
export async function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

// Per-page <title>/<meta description>, pulled straight from the data
// instead of being hardcoded — every country page gets its own correct
// SEO metadata automatically.
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

      {/* ================= ABOUT PREVIEW ================= */}
      <PreviewSection
        eyebrow="About"
        title={`About ${country.name}`}
        body={country.shortIntro}
        ctaLabel="Explore More"
        ctaHref={`/study-in/${country.slug}/about`}
      />

      {/* ================= WHY STUDY PREVIEW ================= */}
      <PreviewSection
        eyebrow="Why Study Here"
        title={`Why Study in ${country.name}?`}
        body={details.whyStudy.summary}
        ctaLabel="Learn More"
        ctaHref={`/study-in/${country.slug}/why-study`}
        tone="alt"
      />

      {/* ================= COURSES PREVIEW ================= */}
      <PreviewSection
        eyebrow="Courses & Universities"
        title="Explore Courses"
        body={`${details.courses.guidanceIntro.slice(0, 140)}...`}
        ctaLabel={`See ${universityCount} Universities & Courses`}
        ctaHref={`/study-in/${country.slug}/courses`}
      />
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

function PreviewSection({ eyebrow, title, body, ctaLabel, ctaHref, tone = "default" }) {
  const bg = tone === "alt" ? "bg-[#FAF9F4]" : "bg-white";

  return (
    <section className={`${bg} px-5 py-14 lg:px-8`}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#C9A227]">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-bold text-[#101820] md:text-3xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-[#101820]/70 md:text-base">
          {body}
        </p>
        <Link
          href={ctaHref}
          className="mt-6 inline-flex rounded-lg bg-[#101820] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}