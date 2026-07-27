import type { APIRoute } from "astro";
import { siteMeta } from "@/data/profile";

/**
 * 显式声明 AI 抓取与检索代理。
 *
 * 通配 `User-agent: *` + `Allow: /` 本来就已经允许全部抓取，这里显式列出的作用是：
 *  1. 平台侧策略变化时保持稳定，不依赖通配规则的默认解释；
 *  2. 后续如需按引擎单独放开或收紧，有明确的条目可改；
 *  3. 顺带把 llms.txt / llms-full.txt 的位置写在抓取入口处，便于发现。
 *
 * 分两类：
 *  - 抓取/训练代理：GPTBot、ClaudeBot、Google-Extended、Applebot-Extended、meta-externalagent、Amazonbot、Bytespider
 *  - 实时检索代理（用户提问时才抓当前页）：OAI-SearchBot、ChatGPT-User、Claude-User、Claude-SearchBot、PerplexityBot、Perplexity-User
 */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Googlebot",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "meta-externalagent",
  "Amazonbot",
  "Bytespider",
  "YisouSpider",
  "Baiduspider",
  "Sogou web spider",
  "360Spider"
];

export const GET: APIRoute = () => {
  const blocks = [
    "User-agent: *",
    "Allow: /",
    "",
    ...AI_AGENTS.flatMap((agent) => [`User-agent: ${agent}`, "Allow: /", ""]),
    `Sitemap: ${siteMeta.domain}/sitemap.xml`,
    `# LLM 索引: ${siteMeta.domain}/llms.txt`,
    `# LLM 全文索引: ${siteMeta.domain}/llms-full.txt`,
    ""
  ];
  return new Response(blocks.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
};
