import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { profile, siteMeta } from "@/data/profile";
import { sortCases, sortInsights, sortNews, sortPractice } from "@/utils/content";

/**
 * llms-full.txt：站点全文索引。
 *
 * llms.txt 给的是「有哪些页面、各自讲什么」；llms-full.txt 直接给全文，
 * 让检索方一次拿到可用的正文，而不必逐页抓取再拼装。
 *
 * 每个条目保留标题、规范链接、日期与分类，正文用原始 Markdown（已含小标题与列表结构）。
 */
function absoluteUrl(path: string) {
  return new URL(path, siteMeta.domain).toString();
}

function formatDate(date?: Date) {
  return date ? date.toISOString().slice(0, 10) : "";
}

function section(title: string, url: string, meta: string[], body: string) {
  const head = [`## ${title}`, "", `来源：${url}`];
  const metaLine = meta.filter(Boolean).join(" · ");
  if (metaLine) head.push(`信息：${metaLine}`);
  return [...head, "", body.trim(), ""].join("\n");
}

export const GET: APIRoute = async () => {
  const practice = sortPractice(await getCollection("practice"));
  const cases = sortCases(await getCollection("cases"));
  const insights = sortInsights(await getCollection("insights"));
  const news = sortNews(await getCollection("news"));

  const parts: string[] = [
    `# ${siteMeta.siteName} · 全文索引`,
    "",
    `> ${profile.name}律师，${profile.title}，执业城市${profile.city}，定位：${profile.positioning}。`,
    `> 本文件是 ${siteMeta.domain} 的全文索引，包含专业服务、匿名化案例、法律解读与专业活动的完整正文。`,
    "",
    "使用边界：本站内容为公开法律信息与律师专业展示，不构成针对具体个案的法律意见；案例均已作匿名化处理。",
    "",
    "## 律师基本信息",
    "",
    `- 姓名：${profile.name}`,
    `- 执业机构：${profile.firm}`,
    `- 职务：${profile.roles.join("；")}`,
    `- 执业城市：${profile.city}`,
    `- 办公地址：${profile.address}`,
    `- 邮箱：${profile.email}`,
    `- 电话：${profile.phone}`,
    `- 律所官网个人页：${profile.officialProfileUrl}`,
    `- 个人主页：${siteMeta.domain}/`,
    "",
    `- 简介：${profile.intro}`,
    "",
    "# 专业服务",
    ""
  ];

  for (const item of practice) {
    parts.push(
      section(item.data.title, absoluteUrl(`/practice/${item.id}/`), [item.data.summary], item.body ?? "")
    );
  }

  parts.push("# 精选案例", "");
  for (const item of cases) {
    parts.push(
      section(
        item.data.title,
        absoluteUrl(`/cases/${item.id}/`),
        [item.data.category, item.data.summary],
        item.body ?? ""
      )
    );
  }

  parts.push("# 法律解读", "");
  for (const item of insights) {
    parts.push(
      section(
        item.data.title,
        absoluteUrl(`/insights/${item.id}/`),
        [formatDate(item.data.pubDate), item.data.category, item.data.summary],
        item.body ?? ""
      )
    );
  }

  parts.push("# 动态资讯", "");
  for (const item of news) {
    parts.push(
      section(
        item.data.title,
        absoluteUrl(`/news/${item.id}/`),
        [formatDate(item.data.pubDate), item.data.category ?? "", item.data.summary],
        item.body ?? ""
      )
    );
  }

  return new Response(parts.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
};
