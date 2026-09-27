import Link from "next/link";
import VideoThumbnail from "./VideoThumbnail";
import FallbackImage from "./FallbackImage";

function mediaGradient(accent) {
  return accent === "gold"
    ? "from-[#C9A227]/25 via-[#C9A227]/10 to-transparent"
    : "from-[#9DAD98]/35 via-[#9DAD98]/15 to-transparent";
}

/**
 * The core "magazine style" building block: media (image OR video) on one
 * side, text on the other, alternating direction as you go down the page.
 *
 * - reverse:      true = media on the right, text on the left (default: media left)
 * - tone:         "offwhite" | "sage" (light tint) | "sage-solid" (full #9DAD98)
 *                 | "white" | "navy" (dark highlight, white text) | "transparent"
 * - accent:       "sage" | "gold" | "navy" — placeholder tint + eyebrow color
 * - video:        { youtubeId, thumbnail } — click-to-play YouTube thumbnail
 *                 instead of the image placeholder
 * - headingTag:   heading level when there's no headingHref (default "h2")
 */
export default function EditorialSplit({
  eyebrow,
  heading,
  paragraphs,
  image,
  video,
  reverse = false,
  tone = "offwhite",
  accent = "sage",
  cta,
  headingHref,
  headingTag = "h2",
}) {
  const isDark = tone === "navy";

  const bgClass =
    tone === "navy"
      ? "bg-[#101820]"
      : tone === "transparent"
      ? ""
      : tone === "sage-solid"
      ? "bg-[#9DAD98]"
      : tone === "sage"
      ? "bg-[#9DAD98]/12"
      : tone === "white"
      ? "bg-white"
      : "bg-[#FAF9F4]";

  const eyebrowClass = isDark
    ? "text-white/60"
    : tone === "sage-solid"
    ? "text-[#101820]/70"
    : accent === "gold"
    ? "text-[#C9A227]"
    : accent === "navy"
    ? "text-[#101820]/60"
    : "text-[#6E7F68]";

  const headingClass = isDark ? "text-white" : "text-[#101820]";
  const paragraphClass = isDark ? "text-white/80" : "text-[#101820]/75";

  const paragraphList = Array.isArray(paragraphs)
    ? paragraphs
    : paragraphs.split("\n\n");

  const HeadingTag = headingHref ? Link : headingTag;
  const headingProps = headingHref ? { href: headingHref } : {};

  return (
    <section className={`${bgClass} px-5 py-14 lg:px-8 lg:py-20`}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={reverse ? "lg:order-2" : "lg:order-1"}>
          {video ? (
            <VideoThumbnail youtubeId={video.youtubeId} thumbnail={video.thumbnail} label={heading} />
          ) : (
            <FallbackImage
              src={image}
              alt={heading}
              className="aspect-[4/3] w-full rounded-2xl object-cover"
              placeholderClassName={`flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-[#101820]/10 bg-gradient-to-br ${mediaGradient(
                accent
              )}`}
              placeholderTextClassName="text-xs font-medium uppercase tracking-[0.2em] text-[#101820]/40"
              placeholderLabel={`${heading} — image placeholder`}
            />
          )}
        </div>

        <div className={reverse ? "lg:order-1" : "lg:order-2"}>
          {eyebrow && (
            <p className={`text-xs font-medium uppercase tracking-[0.2em] ${eyebrowClass}`}>
              {eyebrow}
            </p>
          )}

          <HeadingTag
            {...headingProps}
            className={`mt-3 block text-2xl font-bold md:text-3xl ${headingClass} ${
              headingHref ? "transition-colors hover:opacity-70" : ""
            }`}
          >
            {heading}
          </HeadingTag>

          <div className="mt-4 space-y-4">
            {paragraphList.map((p, i) => (
              <p key={i} className={`text-sm leading-relaxed md:text-base ${paragraphClass}`}>
                {p}
              </p>
            ))}
          </div>

          {cta && (
            <Link
              href={cta.href}
              className={`mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 ${
                isDark ? "bg-white text-[#101820]" : "bg-[#101820] text-white"
              }`}
            >
              {cta.label}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}