"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

// available: true = ওই দেশের page আছে (link হবে)। নতুন দেশের data যোগ হলে true করে দিন।
const COUNTRIES = [
  { slug: "uk", name: "United Kingdom", code: "gb", available: true },
  { slug: "canada", name: "Canada", code: "ca", available: true },
  { slug: "australia", name: "Australia", code: "au", available: false },
  { slug: "usa", name: "United States", code: "us", available: false },
  { slug: "japan", name: "Japan", code: "jp", available: false },
  { slug: "china", name: "China", code: "cn", available: false },
  { slug: "new-zealand", name: "New Zealand", code: "nz", available: false },
  { slug: "germany", name: "Germany", code: "de", available: false },
];

const GROUPS = 4; // একই list ৪ বার; প্রথমটা আসল, বাকিগুলো শুধু loop-এর জন্য
const SPEED = 60; // px per second

const chipBase =
  "flex items-center gap-2 whitespace-nowrap rounded-full border border-[#101820]/10 bg-white px-4 py-2 text-sm font-semibold text-[#101820] shadow-sm md:px-5 md:py-2.5";

export default function DestinationsMarquee() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const getDuration = () => track.scrollWidth / GROUPS / SPEED;

      const tween = gsap.to(track, {
        xPercent: -100 / GROUPS,
        duration: getDuration(),
        ease: "none",
        repeat: -1,
      });
      tweenRef.current = tween;

      const onResize = () => tween.duration(getDuration());
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        tweenRef.current = null;
      };
    });

    return () => mm.revert();
  }, []);

  const pause = () => tweenRef.current?.pause();
  const play = () => tweenRef.current?.play();

  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-reduce:[mask-image:none]"
      onMouseEnter={pause}
      onMouseLeave={play}
      onFocus={pause}
      onBlur={play}
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform motion-reduce:w-auto motion-reduce:justify-center"
      >
        {Array.from({ length: GROUPS }).map((_, g) => {
          const copy = g > 0;
          return (
            <ul
              key={g}
              aria-hidden={copy ? "true" : undefined}
              className={`flex shrink-0 gap-3 pr-3 md:gap-4 md:pr-4 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0 ${
                copy ? "motion-reduce:hidden" : ""
              }`}
            >
              {COUNTRIES.map((c) => {
                const content = (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://flagcdn.com/w40/${c.code}.png`}
                      srcSet={`https://flagcdn.com/w80/${c.code}.png 2x`}
                      width={24}
                      height={18}
                      alt=""
                      className="h-[18px] w-6 rounded-[2px] object-cover"
                    />
                    <span>{c.name}</span>
                  </>
                );

                return (
                  <li key={c.slug}>
                    {c.available ? (
                      <Link
                        href={`/study-in/${c.slug}`}
                        tabIndex={copy ? -1 : undefined}
                        className={`${chipBase} transition-colors duration-200 hover:border-[#101820]`}
                      >
                        {content}
                      </Link>
                    ) : (
                      <span className={chipBase}>{content}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
}