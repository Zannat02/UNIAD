"use client";

import { useState } from "react";

/**
 * Shows `summary` by default. Clicking the button reveals `body` (the full
 * text) with a smooth height transition, and the button flips to "Show Less".
 * Deliberately takes summary/body as two separate props rather than one
 * long string we'd slice — see the earlier data-structure discussion: the
 * summary is hand-written to read well on its own, not a truncated cut.
 */
export default function ReadMoreSection({ title, summary, body }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-[#101820]/10 bg-white p-6">
      <h3 className="text-lg font-bold text-[#101820]">{title}</h3>
      <p className="mt-2 text-sm text-[#101820]/75 md:text-base">{summary}</p>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          open ? "mt-3 max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm leading-relaxed text-[#101820]/75 md:text-base">{body}</p>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#C9A227]"
      >
        {open ? "Show Less" : "Learn More"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>
  );
}