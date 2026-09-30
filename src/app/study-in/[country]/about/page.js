import Link from "next/link";
import countries from "@/data/countries.json";
import countryDetails from "@/data/countryDetails.json";
import EditorialSplit from "@/components/country/EditorialSplit";

export async function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }) {
  const { country: countrySlug } = await params;
  const country = countries.find((c) => c.slug === countrySlug);
  if (!country) return {};

  return {
    title: `About Studying in ${country.name} | UNIAD`,
    description: country.shortIntro,
  };
}

export default async function AboutPage({ params }) {
  const { country: countrySlug } = await params;

  const country = countries.find((c) => c.slug === countrySlug);
  const details = countryDetails.find((d) => d.slug === countrySlug);

  if (!country || !details) {
    return (
      <div className="px-5 py-24 text-center text-[#101820]">
        <p>We couldn't find that country page.</p>
      </div>
    );
  }

  const { details: about } = details.about;
  const basePath = `/study-in/${country.slug}/about`;

  return (
    <main>
      {/*  BANNER  */}
      <BannerImage src={about.bannerImage} label={`About ${country.name}`} />

      <section className="bg-[#101820] px-5 py-10 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
          {country.name}
        </p>
        <h1 className="mt-3 text-2xl font-bold text-white md:text-4xl">
          About Studying in {country.name}
        </h1>
      </section>

      {/*  INTRO PARAGRAPH  */}
      <section className="bg-white px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm leading-relaxed text-[#101820]/80 md:text-base">
            {about.introParagraph}
          </p>
        </div>
      </section>

      {/*  HIGHLIGHT  */}
      {about.highlight && (
        <EditorialSplit
          heading={about.highlight.title}
          paragraphs={about.highlight.body}
          image={about.highlight.image}
          tone="sage"
          accent="sage"
          reverse
          cta={{
            label: about.highlight.ctaLabel,
            href: `${basePath}/${about.highlight.ctaHref}`,
          }}
        />
      )}

      {/*  TOPICS  */}
      {about.topics.map((topic, i) => (
        <EditorialSplit
          key={topic.slug}
          heading={topic.title}
          headingHref={`${basePath}/${topic.slug}`}
          paragraphs={topic.body}
          image={topic.image}
          tone={i % 2 === 0 ? "offwhite" : "white"}
          accent="gold"
          reverse={i % 2 === 1}
        />
      ))}

      {/*  BACK  */}
      <section className="bg-white px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <Link
            href={`/study-in/${country.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#101820]/70 transition-colors hover:text-[#101820]"
          >
            <span aria-hidden="true">&larr;</span>
            Back to {country.name} overview
          </Link>
        </div>
      </section>
    </main>
  );
}

function BannerImage({ src, label }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <div className="relative h-[32vh] min-h-[220px] w-full overflow-hidden bg-[#101820]">
        <img src={src} alt={label} className="h-full w-full object-cover opacity-70" />
      </div>
    );
  }
  return (
    <div className="flex h-[32vh] min-h-[220px] w-full items-center justify-center bg-[#101820]">
      <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/40">
        {label} — banner placeholder
      </span>
    </div>
  );
}