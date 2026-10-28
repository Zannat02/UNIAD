import Link from "next/link";
import FallbackImage from "@/components/country/FallbackImage";


const DESTINATIONS = [
  { slug: "uk", name: "United Kingdom", flag: "gb", landmark: "Big Ben, London" },
  { slug: "canada", name: "Canada", flag: "ca", landmark: "CN Tower, Toronto" },
  { slug: "australia", name: "Australia", flag: "au", landmark: "Sydney Opera House" },
  { slug: "usa", name: "USA", flag: "us", landmark: "Statue of Liberty, New York" },
  { slug: "japan", name: "Japan", flag: "jp", landmark: "Tokyo Tower" },
];


export default function PopularDestinations() {
  return (
    <section className="relative overflow-hidden bg-[#E8EBE3] px-5 py-16 lg:px-8 lg:py-20">
     
     

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#101820]/60">
            Study abroad
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#101820] md:text-4xl lg:text-5xl">
            Popular Destinations
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#101820]/70 md:text-base lg:text-lg">
            The countries students choose most. Pick one to explore courses,
            universities and life there.
          </p>
        </div>

        <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-5 pb-3 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0">
          {DESTINATIONS.map((place) => (
            <Link
              key={place.slug}
              href={`/study-in/${place.slug}`}
              aria-label={`Study in ${place.name}`}
              className="group block w-[72%] shrink-0 snap-start sm:w-[46%] md:w-[32%] lg:w-auto"
            >
              {/* photo, with the flag sitting half on and half off its bottom-left edge */}
              <div className="relative">
                <div className="overflow-hidden rounded-2xl shadow-md">
                  <FallbackImage
                    src={`/images/destinations/${place.slug}.jpg`}
                    alt={`${place.landmark}, ${place.name}`}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholderClassName="flex aspect-[4/5] w-full items-center justify-center bg-gradient-to-br from-[#9DAD98]/60 via-[#C9A227]/20 to-white/40"
                    placeholderTextClassName="text-xs font-medium uppercase tracking-[0.2em] text-[#101820]/45"
                    placeholderLabel={`${place.landmark} — image placeholder`}
                  />
                </div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://flagcdn.com/w160/${place.flag}.png`}
                  alt=""
                  width="48"
                  height="48"
                  className="absolute -bottom-6 left-4 h-12 w-12 rounded-full object-cover shadow-md ring-4 ring-[#E8EBE3]"
                />
              </div>

              {/* country name, beside the flag and below the photo */}
              <p className="pb-2 pl-[4.75rem] pt-1 text-base font-bold text-[#101820] transition-colors group-hover:text-[#101820]/70 md:text-lg">
                {place.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}