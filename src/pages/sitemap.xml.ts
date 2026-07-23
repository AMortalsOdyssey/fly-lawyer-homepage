import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { siteMeta } from "@/data/profile";
import { CASES_PER_PAGE, INSIGHTS_PER_PAGE, paginate, sortCases, sortInsights, sortNews } from "@/utils/content";

interface SitemapEntry {
  path: string;
  lastmod?: Date;
}

function url(entry: SitemapEntry) {
  const lastmod = entry.lastmod
    ? `<lastmod>${entry.lastmod.toISOString().slice(0, 10)}</lastmod>`
    : "";
  return `<url><loc>${siteMeta.domain}${entry.path}</loc>${lastmod}</url>`;
}

export const GET: APIRoute = async () => {
  const cases = sortCases(await getCollection("cases"));
  const insights = sortInsights(await getCollection("insights"));
  const news = sortNews(await getCollection("news"));
  const practice = await getCollection("practice");
  const casePages = paginate(cases, CASES_PER_PAGE).slice(1);
  const insightPages = paginate(insights, INSIGHTS_PER_PAGE).slice(1);
  const urls: SitemapEntry[] = [
    { path: "/" },
    { path: "/about/" },
    { path: "/practice/" },
    { path: "/cases/" },
    { path: "/news/" },
    { path: "/insights/" },
    { path: "/contact/" },
    ...practice.map((item) => ({ path: `/practice/${item.id}/` })),
    ...cases.map((item) => ({ path: `/cases/${item.id}/` })),
    ...casePages.map((item) => ({ path: `/cases/page/${item.page}/` })),
    ...news.map((item) => ({ path: `/news/${item.id}/`, lastmod: item.data.pubDate })),
    ...insights.map((item) => ({ path: `/insights/${item.id}/`, lastmod: item.data.pubDate })),
    ...insightPages.map((item) => ({ path: `/insights/page/${item.page}/` }))
  ];

  const paths = urls.map((entry) => entry.path);
  if (new Set(paths).size !== paths.length) {
    throw new Error("Sitemap contains duplicate page URLs.");
  }

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url).join("\n")}\n</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};
