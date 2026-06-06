import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const [, , kind, slug] = process.argv;
const allowed = new Set(["cases", "insights", "practice"]);

if (!allowed.has(kind) || !slug) {
  console.error("Usage: npm run new:content -- <cases|insights|practice> <slug>");
  process.exit(1);
}

const dir = path.join(process.cwd(), "src", "content", kind);
await mkdir(dir, { recursive: true });
const file = path.join(dir, `${slug}.md`);

if (existsSync(file)) {
  console.error(`Already exists: ${file}`);
  process.exit(1);
}

const templates = {
  cases: `---\ntitle: \"新案例标题\"\ncategory: \"婚姻家事\"\nfield: \"婚姻家事与家族财富管理\"\nyear: ${new Date().getFullYear()}\nsummary: \"一句话摘要。\"\nfocus:\n  - \"争议焦点\"\nhandling:\n  - \"处理要点\"\nanonymized: \"案例已作匿名化处理。\"\nfeatured: false\norder: 99\n---\n\n## 案情概述\n\n## 处理要点\n`,
  insights: `---\ntitle: \"新文章标题\"\ntype: \"解读\"\nfield: \"婚姻家事与家族财富管理\"\npubDate: ${new Date().toISOString().slice(0, 10)}\nsummary: \"一句话摘要。\"\nrelatedCases: []\nfeatured: false\n---\n\n## 核心问题\n\n## 实务观察\n`,
  practice: `---\ntitle: \"新专业领域\"\nshortTitle: \"领域简称\"\norder: 99\nsummary: \"一句话摘要。\"\nkeywords:\n  - \"关键词\"\nfeatured: false\n---\n\n## 能力范围\n\n## 代表经验\n\n## 常见问题\n`
};

await writeFile(file, templates[kind], "utf8");
console.log(`Created ${file}`);
