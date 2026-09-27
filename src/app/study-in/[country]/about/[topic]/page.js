import Link from "next/link";
import countries from "@/data/countries.json";
import countryDetails from "@/data/countryDetails.json";


export async function generateStaticParams() {
  return countryDetails.flatMap((d) => {
    const about = d.about?.details;
    if (!about) return [];

    const slugs = [
      ...(about.highlight ? [about.highlight.slug] : []),
      ...about.topics.map((t) => t.slug),
    ];

    return slugs.map((topic) => ({ country: d.slug, topic }));
  });
}

export async function generateMetadata({ params }) {
  const { country: countrySlug, topic: topicSlug } = await params;
  const country = countries.find((c) => c.slug === countrySlug);
  const entry = findTopic(countrySlug, topicSlug);
  if (!country || !entry) return {};

  return {
    title: `${entry.title} in ${country.name} | UNIAD`,
  };
}

function findTopic(countrySlug, topicSlug) {
  const details = countryDetails.find((d) => d.slug === countrySlug);
  const about = details?.about?.details;
  if (!about) return null;

  if (about.highlight?.slug === topicSlug) return about.highlight;
  return about.topics.find((t) => t.slug === topicSlug) ?? null;
}

export default async function AboutTopicPage({ params }) {
  const { country: countrySlug, topic: topicSlug } = await params;

  const country = countries.find((c) => c.slug === countrySlug);
  const entry = findTopic(countrySlug, topicSlug);

  if (!country || !entry) {
    return (
      <div className="px-5 py-24 text-center text-[#101820]">
        <p>We couldn't find that page.</p>
      </div>
    );
  }

  return (
    <main>
      {/* banner reuses the same image as the preview block on the About page */}
      {entry.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <div className="relative h-[32vh] min-h-[220px] w-full overflow-hidden bg-[#101820]">
          <img
            src={entry.image}
            alt={entry.title}
            className="h-full w-full object-cover opacity-70"
          />
        </div>
      ) : (
        <div className="flex h-[32vh] min-h-[220px] w-full items-center justify-center bg-[#101820]">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/40">
            {entry.title} — banner placeholder
          </span>
        </div>
      )}

      <section className="bg-[#101820] px-5 py-10 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
          {country.name}
        </p>
        <h1 className="mt-3 text-2xl font-bold text-white md:text-4xl">{entry.title}</h1>
      </section>

      <section className="bg-white px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-5">
          {/* placeholder until the full detail content is written */}
          <p className="text-sm leading-relaxed text-[#101820]/60 md:text-base">
            Full details on {entry.title.toLowerCase()} in {country.name} are coming
            soon. In the meantime, here's the short overview:
          </p>
          <p className="text-sm leading-relaxed text-[#101820]/80 md:text-base">
            {entry.body.split("\n\n")[0]}
          </p>

          <div className="pt-4">
            <Link
              href={`/study-in/${country.slug}/about`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#101820]/70 transition-colors hover:text-[#101820]"
            >
              <span aria-hidden="true">&larr;</span>
              Back to About {country.name}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}