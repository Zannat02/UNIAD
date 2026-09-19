"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SelectDropdown from "@/components/ui/SelectDropdown";

// placeholder options — swap these for real data once it's ready
const SUBJECTS = [
  "Business & Management",
  "Computer Science & IT",
  "Engineering",
  "Health & Medicine",
  "Law",
  "Arts & Design",
];

const DESTINATIONS = [
  "United Kingdom",
  "Canada",
  "Australia",
  "USA",
  "Japan",
  "China",
  "New Zealand",
  "Europe",
];

export default function ProgramSearch() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [destination, setDestination] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (subject) params.set("subject", subject);
    if (destination) params.set("country", destination);
    router.push(`/programs?${params.toString()}`);
  }

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
              onChange={setSubject}
              options={SUBJECTS}
              placeholder="What would you like to study?"
            />

            <SelectDropdown
              value={destination}
              onChange={setDestination}
              options={DESTINATIONS}
              placeholder="Where do you want to study?"
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-[#C9A227] px-10 py-3 text-sm font-semibold text-[#101820] transition-opacity hover:opacity-90 lg:w-auto"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}