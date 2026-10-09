"use client";

import { useState } from "react";


 
export default function FaqAccordion({ faqs, defaultOpenId }) {
  const [openId, setOpenId] = useState(defaultOpenId ?? null);

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        const buttonId = `faq-button-${faq.id}`;
        const panelId = `faq-panel-${faq.id}`;
        const paragraphs = faq.answer.split("\n\n");

        return (
          <div
            key={faq.id}
            className={`rounded-xl border transition-colors duration-200 ${
              isOpen
                ? "border-[#C9A227]/60 bg-white shadow-sm"
                : "border-[#101820]/10 bg-[#FAF9F4]"
            }`}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left sm:px-6 sm:py-5"
              >
                <span className="text-base font-semibold text-[#101820] md:text-lg">
                  {faq.question}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={`mt-1 shrink-0 text-[#C9A227] transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-3 px-4 pb-5 sm:px-6 sm:pb-6">
                  {paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-sm leading-relaxed text-[#101820]/75 md:text-base"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}