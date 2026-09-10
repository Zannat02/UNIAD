"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function useCinematicTimeline() {
  const heroRef = useRef(null);

  // Video refs
  const scene1Ref = useRef(null); // campus
  const scene2Ref = useRef(null); // hallway
  const scene3Ref = useRef(null); // studying & graduation

  // Shared wipe elements
  const lineRef = useRef(null);
  const blocksRef = useRef([]);

  // Panel 1 (scene1 -> scene2): icon-only, no text
  const panel1Ref = useRef(null);
  const iconRef = useRef(null);
  const iconLabelRef = useRef(null);

  // Panel 2 (scene2 -> scene3): text-style panel, encouraging copy
  const panel2Ref = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // Panel 3 (scene3 -> scene1): distinct diagonal-accent design
  const panel3Ref = useRef(null);
  const badge3Ref = useRef(null);
  const title3Ref = useRef(null);
  const subtitle3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scene1 = scene1Ref.current;
      const scene2 = scene2Ref.current;
      const scene3 = scene3Ref.current;

      const line = lineRef.current;
      const blocks = blocksRef.current;

      const panel1 = panel1Ref.current;
      const icon = iconRef.current;
      const iconLabel = iconLabelRef.current;

      const panel2 = panel2Ref.current;
      const eyebrow = eyebrowRef.current;
      const title = titleRef.current;
      const subtitle = subtitleRef.current;

      const panel3 = panel3Ref.current;
      const badge3 = badge3Ref.current;
      const title3 = title3Ref.current;
      const subtitle3 = subtitle3Ref.current;

      // ---------------- Initial state ----------------
      // (CSS already hides these via scale-x-0 before JS runs;
      // this just keeps GSAP's internal state in sync)
      gsap.set(scene1, { opacity: 1 });
      gsap.set(scene2, { opacity: 0 });
      gsap.set(scene3, { opacity: 0 });

      gsap.set(line, { scaleX: 0, transformOrigin: "right center" });
      gsap.set(blocks, { scaleX: 0, transformOrigin: "right center" });

      gsap.set([panel1, panel2, panel3], {
        scaleX: 0,
        transformOrigin: "right center",
      });

      gsap.set([icon, iconLabel], { opacity: 0, y: 25, scale: 0.6 });
      gsap.set([eyebrow, title, subtitle], { opacity: 0, y: 25 });
      gsap.set([badge3, title3, subtitle3], { opacity: 0, y: 20 });

      scene1.play();

      const master = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.5,
      });

      /* =========================================================
         SCENE 1 (campus.mp4)
      ========================================================= */
      master.to({}, { duration: 5.5 });

      /* ---------------------------------------------------------
         TRANSITION 1 : scene1 -> scene2  (icon-only panel, no text)
      --------------------------------------------------------- */
      master.to(line, { scaleX: 1, duration: 0.45, ease: "power3.inOut" });

      master.to(
        blocks,
        { scaleX: 1, duration: 0.7, stagger: 0.08, ease: "power3.inOut" },
        "-=0.15"
      );

      master.to(
        panel1,
        { scaleX: 1, duration: 0.5, ease: "power3.inOut" },
        "-=0.3"
      );

      master.to(
        [icon, iconLabel],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.35"
      );

      master.to({}, { duration: 0.8 });

      master.call(() => {
        scene1.pause();
        scene2.currentTime = 0;
        scene2.play();
        gsap.set(scene1, { opacity: 0 });
        gsap.set(scene2, { opacity: 1 });
      });

      master.to([icon, iconLabel], {
        opacity: 0,
        y: -20,
        duration: 0.3,
        stagger: 0.04,
        ease: "power2.in",
      });

      master.to(panel1, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.6,
        ease: "power3.inOut",
      });

      master.to(
        blocks,
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.inOut",
        },
        "-=0.45"
      );

      master.to(
        line,
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.4,
          ease: "power3.inOut",
        },
        "-=0.35"
      );

      /* =========================================================
         SCENE 2 (hallway.mp4)
      ========================================================= */
      master.to({}, { duration: 5.5 });

      /* ---------------------------------------------------------
         TRANSITION 2 : scene2 -> scene3 (encouraging text panel)
      --------------------------------------------------------- */
      master.to(line, {
        scaleX: 1,
        transformOrigin: "left center",
        duration: 0.45,
        ease: "power3.inOut",
      });

      master.to(
        blocks,
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.inOut",
        },
        "-=0.15"
      );

      master.to(
        panel2,
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.5,
          ease: "power3.inOut",
        },
        "-=0.3"
      );

      master.to(
        [eyebrow, title, subtitle],
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" },
        "-=0.35"
      );

      master.to({}, { duration: 0.8 });

      master.call(() => {
        scene2.pause();
        scene3.currentTime = 0;
        scene3.play();
        gsap.set(scene2, { opacity: 0 });
        gsap.set(scene3, { opacity: 1 });
      });

      master.to([eyebrow, title, subtitle], {
        opacity: 0,
        y: -20,
        duration: 0.3,
        stagger: 0.04,
        ease: "power2.in",
      });

      master.to(panel2, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.6,
        ease: "power3.inOut",
      });

      master.to(
        blocks,
        {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.inOut",
        },
        "-=0.45"
      );

      master.to(
        line,
        {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.4,
          ease: "power3.inOut",
        },
        "-=0.35"
      );

      /* =========================================================
         SCENE 3 (studying and graduation.mp4)
      ========================================================= */
      master.to({}, { duration: 5.5 });

      /* ---------------------------------------------------------
         TRANSITION 3 : scene3 -> scene1 (diagonal-accent panel)
      --------------------------------------------------------- */
      master.to(line, {
        scaleX: 1,
        transformOrigin: "right center",
        duration: 0.45,
        ease: "power3.inOut",
      });

      master.to(
        blocks,
        {
          scaleX: 1,
          transformOrigin: "right center",
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.inOut",
        },
        "-=0.15"
      );

      master.to(
        panel3,
        {
          scaleX: 1,
          transformOrigin: "right center",
          duration: 0.5,
          ease: "power3.inOut",
        },
        "-=0.3"
      );

      master.to(
        [badge3, title3, subtitle3],
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" },
        "-=0.35"
      );

      master.to({}, { duration: 0.8 });

      master.call(() => {
        scene3.pause();
        scene1.currentTime = 0;
        scene1.play();
        gsap.set(scene3, { opacity: 0 });
        gsap.set(scene1, { opacity: 1 });
      });

      master.to([badge3, title3, subtitle3], {
        opacity: 0,
        y: -20,
        duration: 0.3,
        stagger: 0.04,
        ease: "power2.in",
      });

      master.to(panel3, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.6,
        ease: "power3.inOut",
      });

      master.to(
        blocks,
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.inOut",
        },
        "-=0.45"
      );

      master.to(
        line,
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.4,
          ease: "power3.inOut",
        },
        "-=0.35"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return {
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
  };
}