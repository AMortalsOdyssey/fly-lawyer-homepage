import type { CollectionEntry } from "astro:content";

export const CASES_PER_PAGE = 10;
export const INSIGHTS_PER_PAGE = 10;

export function sortCases(items: CollectionEntry<"cases">[]) {
  return [...items].sort((a, b) => a.data.order - b.data.order);
}

export function sortInsights(items: CollectionEntry<"insights">[]) {
  return [...items].sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export function sortPractice(items: CollectionEntry<"practice">[]) {
  return [...items].sort((a, b) => a.data.order - b.data.order);
}

export function paginate<T>(items: T[], perPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  return Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    return {
      page,
      totalPages,
      items: items.slice(index * perPage, page * perPage)
    };
  });
}

export function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}
