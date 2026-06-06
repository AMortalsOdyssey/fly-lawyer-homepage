import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { siteMeta } from "@/data/profile";
import { CASES_PER_PAGE, INSIGHTS_PER_PAGE, paginate, sortCases, sortInsights } from "@/utils/content";

function url(path: string) {
  return `<url><loc>${siteMeta.domain}${path}</loc></url>`;
}

export const GET: APIRoute = async () => {
  const cases = sortCases(await getCollection("cases"));
  const insights = sortInsights(await getCollection("insights"));
  const practice = await getCollection("practice");
  const casePages = paginate(cases, CASES_PER_PAGE).slice(1);
  const insightPages = paginate(insights, INSIGHTS_PER_PAGE).slice(1);
  const urls = [
    "/",
    "/about/",
    "/practice/",
    "/cases/",
    "/insights/",
    "/contact/",
    ...practice.map((item) => `/practice/${item.id}/`),
    ...cases.map((item) => `/cases/${item.id}/`),
    ...casePages.map((item) => `/cases/page/${item.page}/`),
    ...insights.map((item) => `/insights/${item.id}/`),
    ...insightPages.map((item) => `/insights/page/${item.page}/`)
  ];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url).join("\n")}\n</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};
