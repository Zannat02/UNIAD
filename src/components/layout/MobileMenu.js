"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Used below the `lg` breakpoint (mobile + tablet, per the requirement that
 * tablets get the same right-side drawer as phones — only true desktop
 * gets the horizontal hover-dropdown navbar).
 */
export default function MobileMenu({ open, onClose, nav }) {
  const [openSection, setOpenSection] = useState(null);

  function toggleSection(key) {
    setOpenSection((current) => (current === key ? null : key));
  }

  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-brand-navy/40 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-full max-w-sm flex-col bg-brand-offwhite shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* top row: close icon only, per requirement — no logo/text inside the drawer */}
        <div className="flex items-center justify-end px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-2 text-brand-navy transition-colors hover:bg-brand-navy/[0.06]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* horizontal divider */}
        <div className="h-px bg-brand-navy/10" />

        {/* scrollable link list */}
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="flex flex-col gap-1">
            {nav.mainLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block rounded-lg px-2 py-3 text-[15px] font-medium text-brand-navy transition-colors hover:bg-brand-navy/[0.05]"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {nav.dropdowns.map((dropdown) => {
              const isOpen = openSection === dropdown.key;
              return (
                <li key={dropdown.key} className="border-t border-brand-navy/10 first:border-t-0">
                  <button
                    type="button"
                    onClick={() => toggleSection(dropdown.key)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between rounded-lg px-2 py-3 text-[15px] font-medium text-brand-navy transition-colors hover:bg-brand-navy/[0.05]"
                  >
                    {dropdown.label}
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
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  <div
                    className={`overflow-hidden transition-[max-height] duration-300 ease-out ${
                      isOpen ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="flex flex-col gap-0.5 py-1 pl-4">
                      {dropdown.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="block rounded-lg px-2 py-2.5 text-sm text-brand-navy/75 transition-colors hover:bg-brand-navy/[0.05] hover:text-brand-navy"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      {dropdown.viewAll && (
                        <li>
                          <Link
                            href={dropdown.viewAll.href}
                            onClick={onClose}
                            className="block rounded-lg px-2 py-2.5 text-sm font-semibold text-brand-navy"
                          >
                            {dropdown.viewAll.label} &rarr;
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </li>
              );
            })}

            {nav.trailingLinks.map((link) => (
              <li key={link.href} className="border-t border-brand-navy/10">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block rounded-lg px-2 py-3 text-[15px] font-medium text-brand-navy transition-colors hover:bg-brand-navy/[0.05]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA pinned at the bottom of the drawer */}
        <div className="border-t border-brand-navy/10 px-5 py-4">
          <Link
            href={nav.cta.href}
            onClick={onClose}
            className="block w-full rounded-full border-2 border-brand-navy px-5 py-3 text-center text-sm font-semibold text-brand-navy"
          >
            {nav.cta.label}
          </Link>
        </div>
      </div>
    </>
  );
}