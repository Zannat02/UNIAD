import Link from "next/link";
import countries from "@/data/countries.json";
import countryDetails from "@/data/countryDetails.json";
import ReadMoreSection from "@/components/ui/ReadMoreSection";

export async function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }) {
  const { country: countrySlug } = await params;
  const country = countries.find((c) => c.slug === countrySlug);
  if (!country) return {};

  return {
    title: `Why Study in ${country.name}? | UNIAD`,
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

  return (
    <main>
      <section className="bg-[#101820] px-5 py-14 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
          {country.name}
        </p>
        <h1 className="mt-3 text-2xl font-bold text-white md:text-4xl">
          Why Study in {country.name}?
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/70 md:text-base">
          {details.whyStudy.summary}
        </p>
      </section>

      <section className="bg-white px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-5">
          {details.whyStudy.sections.map((section) => (
            <ReadMoreSection
              key={section.title}
              title={section.title}
              summary={section.summary}
              body={section.body}
            />
          ))}

          <div className="flex flex-wrap gap-3 pt-4">
            <Link
              href={`/study-in/${country.slug}/courses`}
              className="rounded-lg bg-[#101820] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Explore Courses & Universities
            </Link>
            <Link
              href={`/study-in/${country.slug}/about`}
              className="rounded-lg border border-[#9DAD98] px-6 py-3 text-sm font-semibold text-[#101820] transition-colors hover:border-[#C9A227]"
            >
              About {country.name}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}