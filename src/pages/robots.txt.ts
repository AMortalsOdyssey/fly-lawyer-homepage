import type { APIRoute } from "astro";
import { siteMeta } from "@/data/profile";

export const GET: APIRoute = () => {
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${siteMeta.domain}/sitemap.xml\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
};
