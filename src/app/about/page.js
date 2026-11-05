import Link from "next/link";
import EditorialSplit from "../../components/country/EditorialSplit";
import DestinationsMarquee from "../../components/about/DestinationsMarquee";

export const metadata = {
  title: "About Us | UNIAD",
  description:
    "UNIAD helps students choose the right country, course and university with clear information and no false promises.",
};

const story = [
  "Choosing where to study abroad is one of the biggest decisions a student and their family will make. Yet the information available is often scattered, outdated, or written to sell rather than to help.",
  "UNIAD was started to change that. We bring country guides, course information, costs and requirements together in one place, so students can understand their options before they decide.",
  "We believe a good decision starts with honest information. That is why we tell students what is possible, what is difficult, and what we cannot promise.",
];

const values = [
  {
    title: "Honesty",
    text: "We say what is true, even when it is not what you hoped to hear.",
  },
  {
    title: "Transparency",
    text: "Costs, requirements and limits are explained openly, before you commit.",
  },
  {
    title: "Student first",
    text: "Every recommendation is based on what suits the student, not what is easiest for us.",
  },
];

const weDo = [
  "Explain countries, courses and costs in plain language.",
  "Help you shortlist options that match your goals and budget.",
  "Support you with application preparation and documents.",
  "Tell you clearly about risks and requirements.",
];

const weDont = [
  "Guarantee admission or a visa.",
  "Control university or embassy decisions. Those are made by the universities and embassies alone.",
  "Promise jobs or immigration outcomes.",
  "Hide fees or push you toward a choice that doesn't fit you.",
];

const eyebrowLight =
  "text-xs font-medium uppercase tracking-[0.2em] text-[#8C6220]";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-0.5 h-5 w-5 shrink-0 text-[#6E7F68]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8.5" />
      <path d="M6.5 10.5l2.5 2.5 4.5-5" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-0.5 h-5 w-5 shrink-0 text-[#8C6220]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8.5" />
      <path d="M7.5 7.5l5 5M12.5 7.5l-5 5" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="bg-[#101820] px-5 py-16 text-center lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#C9A227]">
            About UNIAD
          </p>
          <h1 className="mt-4 text-3xl font-bold text-white md:text-5xl">
            Honest guidance for your study-abroad journey
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-white/70 md:text-base lg:text-lg">
            UNIAD helps students choose the right country, course and
            university, with clear information and no false promises.
          </p>
        </div>
      </section>

      {/* 2. Our Story */}
      <EditorialSplit
        eyebrow="Our Story"
        heading="Why we started UNIAD"
        paragraphs={story}
        image="/images/about/story.jpg"
        tone="white"
        accent="gold"
      />

      {/* 3. Mission / Vision / Values */}
      <section className="bg-[#FAF9F4] px-5 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className={eyebrowLight}>Our Purpose</p>
            <h2 className="mt-3 text-2xl font-bold text-[#101820] md:text-4xl lg:text-5xl">
              What guides us
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <article className="rounded-xl border border-[#101820]/10 bg-white p-6">
              <span className="block h-1 w-10 rounded-full bg-[#C9A227]" />
              <h3 className="mt-4 text-lg font-bold text-[#101820] md:text-xl">
                Mission
              </h3>
              <p className="mt-3 text-sm text-[#101820]/75 md:text-base">
                To help students make confident study-abroad decisions by giving
                them clear, accurate and honest guidance at every step.
              </p>
            </article>

            <article className="rounded-xl border border-[#101820]/10 bg-white p-6">
              <span className="block h-1 w-10 rounded-full bg-[#C9A227]" />
              <h3 className="mt-4 text-lg font-bold text-[#101820] md:text-xl">
                Vision
              </h3>
              <p className="mt-3 text-sm text-[#101820]/75 md:text-base">
                A world where every student, wherever they come from, can find
                the right international education path without confusion or
                false promises.
              </p>
            </article>

            <article className="rounded-xl border border-[#101820]/10 bg-white p-6 md:col-span-2 lg:col-span-1">
              <span className="block h-1 w-10 rounded-full bg-[#C9A227]" />
              <h3 className="mt-4 text-lg font-bold text-[#101820] md:text-xl">
                Values
              </h3>
              <ul className="mt-3 space-y-3">
                {values.map((v) => (
                  <li key={v.title} className="text-sm md:text-base">
                    <span className="font-semibold text-[#101820]">
                      {v.title}:
                    </span>{" "}
                    <span className="text-[#101820]/75">{v.text}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* 4. Our Promise */}
      <section className="bg-[#E8EBE3] px-5 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className={eyebrowLight}>Our Promise</p>
            <h2 className="mt-3 text-2xl font-bold text-[#101820] md:text-4xl lg:text-5xl">
              What we do, and what we don&apos;t
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:gap-6">
            <div className="rounded-xl border border-[#101820]/10 bg-white p-6">
              <h3 className="text-lg font-bold text-[#101820] md:text-xl">
                We do
              </h3>
              <ul className="mt-4 space-y-3">
                {weDo.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckIcon />
                    <span className="text-sm text-[#101820]/80 md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#101820]/10 bg-white p-6">
              <h3 className="text-lg font-bold text-[#101820] md:text-xl">
                We don&apos;t
              </h3>
              <ul className="mt-4 space-y-3">
                {weDont.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CrossIcon />
                    <span className="text-sm text-[#101820]/80 md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Destinations (marquee) */}
      <section className="bg-[#F3ECD5] py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <p className={eyebrowLight}>Destinations</p>
          <h2 className="mt-3 text-2xl font-bold text-[#101820] md:text-4xl lg:text-5xl">
            Where you can study
          </h2>
          <p className="mt-4 text-sm text-[#101820]/75 md:text-base lg:text-lg">
            Explore the countries we guide students to. Select a country to
            read its full guide.
          </p>
        </div>

        <div className="mt-10">
          <DestinationsMarquee />
        </div>
      </section>

      {/* 6. CTA band */}
      <section className="bg-[#101820] px-5 pb-20 pt-14 text-center md:pb-28 lg:px-8 lg:pt-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-white md:text-4xl lg:text-5xl">
            Ready to plan your study-abroad journey?
          </h2>
          <p className="mt-4 text-sm text-white/70 md:text-base lg:text-lg">
            Talk to our team about your goals, budget and options. We will give
            you honest advice.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/book-appointment"
              className="rounded-lg bg-[#C9A227] px-10 py-3 text-sm font-semibold text-[#101820] hover:opacity-90"
            >
              Book an Appointment
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white/40 px-10 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-[#101820]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}