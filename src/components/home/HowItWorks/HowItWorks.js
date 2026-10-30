import Link from "next/link";

// Change this to the real appointment page of the site.
const APPOINTMENT_HREF = "/book-appointment";

const STEPS = [
  {
    title: "Explore Countries & Subjects",
    text: "Browse destination guides and subject pages to compare courses, universities, costs and life abroad.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </>
    ),
  },
  {
    title: "Book an Appointment",
    text: "Speak directly with our advisers. Share your goals and budget and leave with a clear plan.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
  },
  {
    title: "Apply with Confidence",
    text: "Admission support: shortlist the right universities, prepare your documents and send strong applications.",
    icon: (
      <>
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
        <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
      </>
    ),
  },
  {
    title: "Get Your Visa",
    text: "Step-by-step guidance on your visa documents, funds and application, from start to finish.",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Fly & Settle In",
    text: "Pre-departure and health guidance, plus advice on student halls and private housing, so you land ready.",
    icon: (
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    ),
  },
  {
    title: "Build Your Career",
    text: "Career guidance for work while you study, placements, and your options to stay after graduation.",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>
    ),
  },
];

const CSS = `
  .hw-ring { animation: hwPulse 2.8s ease-out infinite; animation-delay: var(--d, 0s); }
  .hw-icon { animation: hwFloat 3.2s ease-in-out infinite; animation-delay: var(--d, 0s); }
  @keyframes hwPulse {
    0% { transform: scale(1); opacity: 0.55; }
    70%, 100% { transform: scale(1.65); opacity: 0; }
  }
  @keyframes hwFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .hw-ring, .hw-icon { animation: none; }
  }
`;

export default function HowItWorks() {
  return (
    <section className="bg-white px-5 py-16 lg:px-8 lg:py-24">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#8C6220]">
            Our process
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#101820] md:text-4xl lg:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#101820]/70 md:text-base lg:text-lg">
            From your first question to your first job, in six simple steps.
          </p>
        </div>

        <ol className="mx-auto mt-14 max-w-xl lg:grid lg:max-w-none lg:grid-cols-6">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="group relative flex gap-4 pb-10 last:pb-0 lg:block lg:pb-0 lg:text-center"
            >
              {/* connector to the next step: dashed hairline with a small arrow tip */}
              {i < STEPS.length - 1 && (
                <>
                  {/* desktop: horizontal, between this icon and the next */}
                  <span
                    aria-hidden="true"
                    className="absolute left-[calc(50%+2.5rem)] right-[calc(-50%+2.5rem)] top-[72px] hidden h-0 border-t border-dashed border-[#101820]/20 lg:block"
                  >
                    <span className="absolute -right-px -top-[4px] h-2 w-2 rotate-45 border-r border-t border-[#101820]/30" />
                  </span>

                  {/* mobile and tablet: vertical, below this icon */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-2 left-9 top-[4.5rem] w-0 border-l border-dashed border-[#101820]/20 lg:hidden"
                  >
                    <span className="absolute -bottom-[4px] -left-[4.5px] h-2 w-2 rotate-45 border-b border-r border-[#101820]/30" />
                  </span>
                </>
              )}

              {/* icon column */}
              <div className="flex w-[4.5rem] shrink-0 justify-center lg:h-36 lg:w-full lg:items-center">
                <div className="relative h-16 w-16" style={{ "--d": `${i * 0.4}s` }}>
                  <span
                    aria-hidden="true"
                    className="hw-ring absolute inset-0 rounded-full bg-[#C9A227]/40"
                  />
                  <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#C9A227] bg-white text-[#101820] shadow-md transition-colors duration-300 group-hover:bg-[#C9A227]">
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="hw-icon"
                    >
                      {step.icon}
                    </svg>
                  </span>
                  <span className="absolute -right-1 -top-1 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-[#101820] text-xs font-bold text-[#C9A227]">
                    {i + 1}
                  </span>
                </div>
              </div>

              {/* text */}
              <div className="pt-1 lg:px-2 lg:pt-3">
                <h3 className="text-base font-bold text-[#101820] md:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#101820]/70 md:text-base lg:text-sm">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 text-center lg:mt-16">
          <p className="mb-4 text-sm text-[#101820]/70 md:text-base lg:text-lg">
            Have questions? Talk to our team directly.
          </p>
          <Link
            href={APPOINTMENT_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-[#101820] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90"
          >
            Book an Appointment
            <span aria-hidden="true" className="text-[#C9A227]">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}