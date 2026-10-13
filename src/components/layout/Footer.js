import Link from "next/link";
import Image from "next/image";
import nav from "@/data/navigation.json";

/**
 * Dark footer with a wavy top edge. The wave is painted in the footer's own
 * colour and is transparent above the curve, so whatever section sits above
 * the footer shows through and blends into it — no matter which page.
 *
 * Link columns come straight from navigation.json, so when a destination or
 * service is added to the navbar it shows up here too.
 */
export default function Footer() {
  const destinations = nav.dropdowns.find((d) => d.key === "destinations");
  const services = nav.dropdowns.find((d) => d.key === "services");
  const resources = nav.dropdowns.find((d) => d.key === "resources");

  const company = [...nav.mainLinks, ...nav.trailingLinks];

  const columns = [
    { title: "Destinations", links: destinations?.items ?? [] },
    { title: "Our Services", links: services?.items ?? [] },
    { title: "Resources", links: resources?.items ?? [] },
    { title: "Company", links: company },
  ];

  return (
    <footer className="mt-16 text-white/70">
      {/* wavy top edge */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="-mb-px block h-10 w-full md:h-16"
      >
        <path d="M0 40C240 80 480 0 720 32S1200 72 1440 24V80H0Z" fill="#101820" />
      </svg>

      <div className="bg-[#101820] px-5 pb-8 pt-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:grid-cols-12">
            {/* brand */}
            <div className="col-span-2 md:col-span-4 lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <Image
                  src="/images/uniad_logo.png"
                  alt="UNIAD logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <span className="leading-tight">
                  <span className="block text-xl font-semibold tracking-tight text-white">
                    UNIAD
                  </span>
                  <span className="block text-[11px] text-white/60">
                    Your Global Education Partner
                  </span>
                </span>
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
                Honest, step-by-step guidance for students who want to study abroad
                — from choosing a country and course to applying and settling in.
              </p>

              <Link
                href={nav.cta.href}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C9A227] px-6 py-3 text-sm font-semibold text-[#101820] transition-opacity hover:opacity-90"
              >
                {nav.cta.label}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            {/* link columns */}
            {columns.map((column) => (
              <nav
                key={column.title}
                aria-label={column.title}
                className="col-span-1 lg:col-span-2"
              >
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227]">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* bottom bar */}
          <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} UNIAD. All rights reserved.</p>
            <p>Information on this site is a guide. Always confirm details with official sources.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}