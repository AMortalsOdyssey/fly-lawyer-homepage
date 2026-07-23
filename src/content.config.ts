import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const practice = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/practice" }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    order: z.number(),
    summary: z.string(),
    keywords: z.array(z.string()),
    featured: z.boolean().default(false)
  })
});

const cases = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/cases" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    field: z.string(),
    year: z.number().optional(),
    authors: z.array(z.string()).default(["方丽英律师团队"]),
    summary: z.string(),
    focus: z.array(z.string()),
    handling: z.array(z.string()),
    anonymized: z.string(),
    featured: z.boolean().default(false),
    order: z.number(),
    sourceUrl: z.url().optional()
  })
});

const insights = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/insights" }),
  schema: z.object({
    title: z.string(),
    type: z.enum(["解读", "研究", "评论"]),
    field: z.string(),
    pubDate: z.coerce.date(),
    authors: z.array(z.string()).default(["方丽英律师"]),
    summary: z.string(),
    relatedCases: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    sourceUrl: z.url().optional()
  })
});

const news = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    pubDate: z.coerce.date(),
    editor: z.string().default("方丽英律师个人主页"),
    summary: z.string(),
    featured: z.boolean().default(false),
    sourceUrl: z.url().optional()
  })
});

export const collections = { practice, cases, insights, news };
