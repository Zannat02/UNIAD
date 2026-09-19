"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A styled stand-in for <select>. Native selects hand icon spacing and
 * open-direction (up vs down) entirely to the browser/OS — this component
 * exists so we can guarantee: (1) proper gap between the text and the
 * chevron icon, and (2) the option list always opens downward, regardless
 * of how much space is left below it on screen.
 */
export default function SelectDropdown({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full lg:w-64">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 rounded-lg border border-[#9DAD98] bg-white px-4 py-3 text-left text-sm text-[#101820] outline-none transition-colors focus:border-[#C9A227]"
      >
        <span className={value ? "text-[#101820]" : "text-[#101820]/50"}>
          {value || placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 text-[#101820]/60 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* option list — anchored to top-full so it is always forced open
          below the trigger, never above it */}
      <div
        role="listbox"
        className={`absolute left-0 top-full z-30 mt-2 w-full overflow-hidden rounded-lg border border-[#9DAD98]/60 bg-white shadow-lg transition-all duration-150 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <ul className="max-h-60 overflow-y-auto py-1">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={value === option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#9DAD98]/15 ${
                  value === option ? "font-semibold text-[#101820]" : "text-[#101820]/80"
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}