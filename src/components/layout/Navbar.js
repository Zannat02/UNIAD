"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import nav from "@/data/navigation.json";
import NavDropdown from "./NavDropdown";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // bumping shineKey remounts the shine <span>, which replays its
  // "forwards" keyframe animation every time we cross the scroll threshold
  const [shineKey, setShineKey] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const isScrolled = window.scrollY > 12;
      setScrolled((prevScrolled) => {
        if (isScrolled && !prevScrolled) {
          setShineKey((key) => key + 1);
        }
        return isScrolled;
      });
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // lock background scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-brand-offwhite transition-shadow duration-300 ${
        scrolled ? "shadow-sm shadow-brand-navy/5" : ""
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/uniad_logo.png"
            alt="UNIAD logo"
            width={40}
            height={40}
            priority
            className="h-10 w-10 object-contain"
          />
          <span className="leading-tight">
            <span className="block text-xl font-semibold tracking-tight text-brand-navy">
              UNIAD
            </span>
            <span className="block text-[11px] text-brand-navy/60">
              Your Global Education Partner
            </span>
          </span>
        </Link>

        {/* desktop nav — hidden below lg, this is where hover dropdowns live */}
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 text-[15px] font-medium text-brand-navy/85 transition-colors hover:text-brand-navy"
            >
              {link.label}
            </Link>
          ))}

          {nav.dropdowns.map((dropdown) => (
            <NavDropdown key={dropdown.key} dropdown={dropdown} />
          ))}

          {nav.trailingLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 text-[15px] font-medium text-brand-navy/85 transition-colors hover:text-brand-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* desktop CTA — border only, transparent bg, pure-CSS hover shine sweep */}
        <Link
          href={nav.cta.href}
          className="group relative hidden overflow-hidden rounded-full border-2 border-brand-navy px-5 py-2.5 text-sm font-semibold text-brand-navy lg:inline-flex lg:items-center"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1/2 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-brand-navy/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[250%]"
          />
          <span className="relative z-10">{nav.cta.label}</span>
        </Link>

        {/* hamburger trigger — mobile + tablet only */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="flex items-center justify-center rounded-full p-2 text-brand-navy lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
      </div>

      {/* faint permanent bottom border */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-brand-navy/10" />

      {/* the left-to-right shine, replayed each time the page crosses the scroll threshold */}
      {scrolled && (
        <span
          key={shineKey}
          aria-hidden="true"
          className="nav-shine-line absolute bottom-0 left-0 h-px w-1/3"
        />
      )}

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} nav={nav} />
    </header>
  );
}