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