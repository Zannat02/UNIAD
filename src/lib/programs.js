import countries from "@/data/countries.json";
import countryDetails from "@/data/countryDetails.json";
import universities from "@/data/universities.json";
import subjectCategories from "@/data/subjectCategories.json";

export function matchesCategory(text, category) {
  const lower = text.toLowerCase();
  return category.keywords.some((keyword) => lower.includes(keyword));
}

// One entry per country that actually has something for this subject.
export function sectionsFor(category) {
  return countries
    .map((country) => {
      const detail = countryDetails.find((d) => d.slug === country.slug);
      const topCourses = detail?.courses?.topCourses ?? [];
      const courses = topCourses.filter((c) => matchesCategory(c.name, category));
      const unis = universities
        .filter((u) => u.countrySlug === country.slug)
        .sort((a, b) => a.rank - b.rank)
        .map((u) => ({
          ...u,
          matched: u.topCourses.filter((t) => matchesCategory(t, category)),
        }))
        .filter((u) => u.matched.length > 0);

      return { country, courses, unis, totalCourses: topCourses.length };
    })
    .filter((section) => section.courses.length > 0 || section.unis.length > 0);
}

// Small summary for the search form:
// { subjects: { "law": ["uk"], ... }, countriesWithData: ["uk"] }
export function getAvailability() {
  const subjects = {};
  const withData = new Set();

  for (const category of subjectCategories) {
    const slugs = sectionsFor(category).map((s) => s.country.slug);
    subjects[category.slug] = slugs;
    slugs.forEach((slug) => withData.add(slug));
  }

  return { subjects, countriesWithData: [...withData] };
}