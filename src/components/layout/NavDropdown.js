"use client";

import { useRef, useState } from "react";
import Link from "next/link";



export default function NavDropdown({ dropdown }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  function handleEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 py-2 text-[15px] font-medium text-brand-navy/85 transition-colors hover:text-brand-navy"
      >
        {dropdown.label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`mt-px transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        className={`absolute left-1/2 top-full z-40 w-64 -translate-x-1/2 transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-xl border border-brand-navy/10 bg-brand-offwhite shadow-lg shadow-brand-navy/10">
          <ul className="">
            {dropdown.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-4 py-2.5 text-sm text-brand-navy/80 transition-colors hover:bg-brand-navy/[0.05] hover:text-brand-navy"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {dropdown.viewAll && (
            <>
              <div className="h-px bg-brand-navy/10" />
              <Link
                href={dropdown.viewAll.href}
                className="block px-4 py-2.5 text-sm font-medium text-brand-navy transition-colors hover:bg-brand-navy/[0.05]"
              >
                {dropdown.viewAll.label} &rarr;
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}