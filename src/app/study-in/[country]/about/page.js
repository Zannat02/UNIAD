import Link from "next/link";
import countries from "@/data/countries.json";
import countryDetails from "@/data/countryDetails.json";

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

  // fullDescription is written with \n\n between paragraphs in the JSON —
  // split it here so each paragraph gets its own <p>, rather than dumping
  // one giant unbroken block of text on the page.
  const paragraphs = details.about.fullDescription.split("\n\n");

  return (
    <main>
      <section className="bg-[#101820] px-5 py-14 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
          {country.name}
        </p>
        <h1 className="mt-3 text-2xl font-bold text-white md:text-4xl">
          About Studying in {country.name}
        </h1>
      </section>

      <section className="bg-white px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-5">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed text-[#101820]/80 md:text-base">
              {paragraph}
            </p>
          ))}

          <div className="flex flex-wrap gap-3 pt-4">
            <Link
              href={`/study-in/${country.slug}/why-study`}
              className="rounded-lg bg-[#101820] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Why Study Here
            </Link>
            <Link
              href={`/study-in/${country.slug}/courses`}
              className="rounded-lg border border-[#9DAD98] px-6 py-3 text-sm font-semibold text-[#101820] transition-colors hover:border-[#C9A227]"
            >
              Explore Courses & Universities
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}