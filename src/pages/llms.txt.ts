import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { profile, siteMeta } from "@/data/profile";
import { sortCases, sortInsights, sortNews, sortPractice } from "@/utils/content";

function absoluteUrl(path: string) {
  return new URL(path, siteMeta.domain).toString();
}

function link(label: string, path: string, description: string) {
  return `- [${label}](${absoluteUrl(path)}): ${description}`;
}

export const GET: APIRoute = async () => {
  const practice = sortPractice(await getCollection("practice"));
  const cases = sortCases(await getCollection("cases"));
  const insights = sortInsights(await getCollection("insights"));
  const news = sortNews(await getCollection("news"));

  const lines = [
    `# ${siteMeta.siteName}`,
    "",
    `> ${profile.name}律师在广州执业，专注婚姻家事与家族财富传承。本站提供个人简介、专业服务、匿名化案例、法律解读、专业活动与联系信息。`,
    "",
    "本站内容用于公开法律信息与律师专业展示，不构成针对具体个案的法律意见。案例已作匿名化处理。",
    "",
    "## 核心页面",
    "",
    link("首页", "/", `${profile.positioning}；含执业信息、专业领域、精选案例、法律解读与常见问题。`),
    link("个人简介", "/about/", "方丽英律师的执业背景、专业能力、社会职务、荣誉奖项与专业活动。"),
    link("专业领域", "/practice/", "婚姻家事诉讼、家事协议与诉前调解、继承与财富传承、涉外家事、企业家家事金融衔接及企业法律顾问服务。"),
    link("精选案例", "/cases/", "经匿名化处理的代表案例与处理要点。"),
    link("法律解读", "/insights/", "婚姻家事、财富安排、人民调解、劳动争议及相关法律研究。"),
    link("动态资讯", "/news/", "方丽英律师的专业活动、荣誉、公益普法与行业交流。"),
    link("联系信息", "/contact/", `电话、邮箱及${profile.firm}广州办公地址。`),
    "",
    "## 专业服务",
    "",
    ...practice.map((item) =>
      link(item.data.title, `/practice/${item.id}/`, item.data.summary)
    ),
    "",
    "## 精选案例",
    "",
    ...cases.map((item) =>
      link(item.data.title, `/cases/${item.id}/`, `${item.data.summary} ${item.data.anonymized}`)
    ),
    "",
    "## 法律解读",
    "",
    ...insights.map((item) =>
      link(
        item.data.title,
        `/insights/${item.id}/`,
        `${item.data.pubDate.toISOString().slice(0, 10)}；${item.data.type}；${item.data.summary}`
      )
    ),
    "",
    "## 动态资讯",
    "",
    ...news.map((item) =>
      link(
        item.data.title,
        `/news/${item.id}/`,
        `${item.data.pubDate.toISOString().slice(0, 10)}；${item.data.category}；${item.data.summary}`
      )
    ),
    "",
    "## Optional",
    "",
    link("XML Sitemap", "/sitemap.xml", "本站全部公开页面的机器可读 URL 索引。"),
    link("Robots", "/robots.txt", "本站公开抓取规则。"),
    ""
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};
