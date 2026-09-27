import Link from "next/link";
import countries from "@/data/countries.json";
import countryDetails from "@/data/countryDetails.json";
import EditorialSplit from "@/components/country/EditorialSplit";
import FallbackImage from "@/components/country/FallbackImage";

export async function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }) {
  const { country: countrySlug } = await params;
  const country = countries.find((c) => c.slug === countrySlug);
  const details = countryDetails.find((d) => d.slug === countrySlug);
  if (!country || !details) return {};

  return {
    title: `${details.whyStudy.reasons.length} Reasons to Study in ${country.name} | UNIAD`,
    description: `Cost of living, part-time work, and life after graduation in ${country.name}.`,
  };
}

export default async function WhyStudyPage({ params }) {
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

  const { whyStudy } = details;

  return (
    <main className="bg-[#9DAD98]">
      {/* ================= CONTAINED BANNER =================
         */}
      <section className="px-5 pt-10 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl">
          <BannerImage src={whyStudy.bannerImage} label={`Why Study in ${country.name}`} />
        </div>
      </section>

      {/* ================= PAGE TITLE ================= */}
      <section className="px-5 pb-4 pt-10 text-center lg:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#101820]/60">
          {country.name}
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-2xl font-bold text-[#101820] md:text-4xl lg:text-5xl">
          {whyStudy.reasons.length} Reasons to Study in {country.name}
        </h1>
      
      </section>

      {/* ================= 7 REASONS — alternating layout =================
          */}
      {whyStudy.reasons.map((reason, i) => (
        <EditorialSplit
          key={reason.heading}
          heading={reason.heading}
          headingTag="h3"
          paragraphs={reason.body}
          image={reason.image}
          reverse={i % 2 === 1}
          tone={reason.highlight ? "navy" : "transparent"}
          accent="gold"
        />
      ))}

      {/* ================= BACK ================= */}
      <section className="px-5 py-10 lg:px-8">
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

  return (
    <FallbackImage
      src={src}
      alt={label}
      className="block w-full h-auto"
      placeholderClassName="flex aspect-[21/9] min-h-[220px] w-full items-center justify-center bg-[#101820]"
      placeholderTextClassName="text-xs font-medium uppercase tracking-[0.25em] text-white/40"
      placeholderLabel={`${label} — banner placeholder`}
    />
  );
}