"use client";

import useCinematicTimeline from "./useCinematicTimeline";

export default function CinematicHero() {
  const {
    heroRef,
    scene1Ref,
    scene2Ref,
    scene3Ref,
    lineRef,
    blocksRef,
    panel1Ref,
    iconRef,
    iconLabelRef,
    panel2Ref,
    eyebrowRef,
    titleRef,
    subtitleRef,
    panel3Ref,
    badge3Ref,
    title3Ref,
    subtitle3Ref,
  } = useCinematicTimeline();

  return (
    <section
      ref={heroRef}
      className="relative h-[calc(100vh-72px)] min-h-[600px] w-full overflow-hidden bg-black"
    >
      {/* ================= VIDEO LAYER ================= */}

      <video
        ref={scene1Ref}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/campus.mp4"
        muted
        playsInline
        preload="auto"
      />

      <video
        ref={scene2Ref}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hallway.mp4"
        muted
        playsInline
        preload="auto"
      />

      <video
        ref={scene3Ref}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/studying-and-graduation.mp4"
        muted
        playsInline
        preload="auto"
      />

      {/* Dark cinematic overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/10" />

      {/* ================= TRANSITION LAYER ================= */}
      {/* scale-x-0 + origin-right below = hidden by default via CSS,
          so nothing flashes before JS/GSAP takes over on load/reload */}

      <div
        ref={lineRef}
        className="pointer-events-none absolute left-0 top-1/2 z-30 h-[2px] w-full origin-right scale-x-0 bg-white"
      />

      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            ref={(el) => {
              blocksRef.current[item] = el;
            }}
            className="h-1/4 w-full origin-right scale-x-0 bg-white"
          />
        ))}
      </div>

      {/* ============ PANEL 1 : icon-only (scene1 -> scene2) ============ */}
      <div
        ref={panel1Ref}
        className="pointer-events-none absolute left-0 top-0 z-40 flex h-full w-full origin-right scale-x-0 items-center justify-center bg-[#9DAD98]"
      >
        <div className="flex flex-col items-center text-center text-black">
          <svg
            ref={iconRef}
            className="mb-4 h-14 w-14 md:h-20 md:w-20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="currentColor" />
            <path
              d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"
              fill="currentColor"
            />
          </svg>
          <p
            ref={iconLabelRef}
            className="text-xs font-medium uppercase tracking-[0.35em] sm:text-sm"
          >
            New Destination
          </p>
        </div>
      </div>

      {/* ============ PANEL 2 : encouraging text (scene2 -> scene3) ============ */}
      <div
        ref={panel2Ref}
        className="pointer-events-none absolute left-0 top-0 z-40 flex h-full w-full origin-right scale-x-0 items-center justify-center bg-[#9DAD98]"
      >
        <div className="overflow-hidden text-center text-black">
          <p
            ref={eyebrowRef}
            className="mb-3 text-xs font-medium uppercase tracking-[0.35em]"
          >
            Study Abroad
          </p>
          <h1
            ref={titleRef}
            className="text-2xl font-semibold tracking-tight md:text-5xl"
          >
            Take The Next Step Today
          </h1>
          <p
            ref={subtitleRef}
            className="mx-auto mt-4 max-w-md text-sm tracking-wide text-black/60 sm:text-base"
          >
            Don&apos;t wait to chase your dream — apply now and start your
            journey abroad.
          </p>
        </div>
      </div>

      {/* ============ PANEL 3 : diagonal-accent design (scene3 -> scene1) ============ */}
      <div
        ref={panel3Ref}
        className="pointer-events-none absolute left-0 top-0 z-40 h-full w-full origin-right scale-x-0 overflow-hidden bg-[#101820]"
      >
        <div className="absolute -right-16 top-0 h-full w-2/3 -skew-x-12 bg-[#C9A227]/90 sm:-right-24 sm:w-1/2 md:w-1/3" />

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center text-white sm:px-10">
          <span
            ref={badge3Ref}
            className="mb-4 inline-block rounded-full border border-white/40 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.3em] sm:text-xs"
          >
            Your Journey
          </span>
          <h1
            ref={title3Ref}
            className="max-w-xl text-3xl font-bold uppercase leading-tight tracking-tight md:text-6xl"
          >
            Graduate. Anywhere.
          </h1>
          <p
            ref={subtitle3Ref}
            className="mt-4 max-w-md text-sm tracking-wide text-white/70 sm:text-base"
          >
            From your first application to graduation day — we&apos;re with
            you at every step.
          </p>
        </div>
      </div>
    </section>
  );
}