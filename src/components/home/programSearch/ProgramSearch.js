"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SelectDropdown from "@/components/ui/SelectDropdown";
import subjectCategories from "@/data/subjectCategories.json";
import nav from "@/data/navigation.json";

const DESTINATION_ITEMS =
  nav.dropdowns.find((d) => d.key === "destinations")?.items ?? [];

// "/study-in/canada" -> "canada"
const slugOf = (item) => item.href.replace("/study-in/", "");
const SOON = " (coming soon)";

export default function ProgramSearch({ availability }) {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [destination, setDestination] = useState("");
  const [hint, setHint] = useState("");

  
  const readyRef = useRef(false);
  function markReady() {

    setTimeout(() => {
      readyRef.current = true;
    }, 0);
  }

  const subjectsByCountry = availability?.subjects ?? {};
  const withData = availability?.countriesWithData ?? [];

  const hasData = (item) => withData.includes(slugOf(item));
  const placeLabel = (item) => (hasData(item) ? item.label : item.label + SOON);
  const destinationOptions = DESTINATION_ITEMS.map(placeLabel);

  const place = DESTINATION_ITEMS.find((i) => placeLabel(i) === destination);
  const category = subjectCategories.find((c) => c.label === subject);

  const subjectInCountry = (cat, item) =>
    subjectsByCountry[cat.slug]?.includes(slugOf(item));


  const subjectOptions = subjectCategories
    .filter((c) => !place || !hasData(place) || subjectInCountry(c, place))
    .map((c) => c.label);

  function handleSubject(v) {
    setSubject(v);
    setHint("");
    markReady();
  }

  function handleDestination(label) {
    setDestination(label);
    setHint("");
    markReady();

    
    const item = DESTINATION_ITEMS.find((i) => placeLabel(i) === label);
    if (item && category && hasData(item) && !subjectInCountry(category, item)) {
      setSubject("");
    }
  }

  function runSearch() {
    if (category) {
      // subject (+ optional country) -> subject page
      const query = place ? `?country=${slugOf(place)}` : "";
      router.push(`/programs/${category.slug}${query}`);
    } else if (place) {
      // only a destination picked -> that country's courses page
      router.push(`/study-in/${slugOf(place)}/courses`);
    } else {
      setHint("Pick a subject or a destination to search.");
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    runSearch();
  }

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key !== "Enter") {
        if (!["Shift", "Control", "Alt", "Meta"].includes(e.key)) {
          readyRef.current = false;
        }
        return;
      }
      if (!readyRef.current || (!subject && !destination)) return;

      e.preventDefault(); // stops the focused dropdown button from reopening
      readyRef.current = false;
      runSearch();
    }

    function onPointerDown() {
      readyRef.current = false;
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  });

  return (
    <section className="bg-[#FAF9F4] px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-[#101820] md:text-4xl lg:text-5xl">
          Find Your Perfect Program
        </h2>
        <p className="mt-3 text-sm text-[#101820]/70 md:text-base lg:text-lg">
          Search by subject and destination to start narrowing down your options.
        </p>

        <form onSubmit={handleSearch} className="mt-8">
          <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-stretch lg:justify-center">
            <SelectDropdown
              value={subject}
              onChange={handleSubject}
              options={subjectOptions}
              placeholder="What would you like to study?"
            />

            <SelectDropdown
              value={destination}
              onChange={handleDestination}
              options={destinationOptions}
              placeholder="Where do you want to study?"
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-[#C9A227] px-10 py-3 text-sm font-semibold text-[#101820] transition-opacity hover:opacity-90 lg:w-auto"
            >
              Search
            </button>
          </div>

          {hint && (
            <p role="alert" className="mt-3 text-sm text-[#101820]/70">
              {hint}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}