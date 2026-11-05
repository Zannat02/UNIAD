import Link from "next/link";

export const metadata = {
  title: "Page not found | UNIAD",
};

export default function NotFound() {
  return (
    <section className="bg-[#FAF9F4] px-5 pb-24 pt-20 text-center md:pb-32 lg:px-8 lg:pt-28">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#101820]/60">
          Error 404
        </p>
        <h1 className="mt-3 text-2xl font-bold text-[#101820] md:text-4xl lg:text-5xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#101820]/70 md:text-base lg:text-lg">
          The link may be old, or the page may not be ready yet. Try searching for
          a program, or talk to our team and we will point you in the right direction.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="w-full rounded-lg bg-[#101820] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
          >
            Back to home
          </Link>
          <Link
            href="/book-appointment"
            className="w-full rounded-lg border border-[#101820] px-6 py-3 text-sm font-semibold text-[#101820] transition-colors hover:bg-[#101820] hover:text-white sm:w-auto"
          >
            Book an appointment
          </Link>
        </div>
      </div>
    </section>
  );
}