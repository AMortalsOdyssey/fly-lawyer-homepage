import { profile, siteMeta } from "@/data/profile";

type ArticleType = "Article" | "NewsArticle";
type AuthorType = "Person" | "Organization";

interface SchemaAuthor {
  name: string;
  type?: AuthorType;
}

interface ArticleSchemaInput {
  type: ArticleType;
  path: string;
  title: string;
  description: string;
  authors: SchemaAuthor[];
  datePublished?: Date;
  /** 只有年份可考时用它（案例做过匿名化，不披露具体日期）。Schema.org 接受 YYYY 这种年度精度。 */
  yearPublished?: number;
  section?: string;
  keywords?: string[];
}

function authorSchema(author: SchemaAuthor) {
  if (author.name === profile.name || author.name === `${profile.name}律师`) {
    return { "@id": `${siteMeta.domain}/#person` };
  }

  // 「方丽英律师团队」这类团队署名：原来会生成一个游离的 Person 裸节点，
  // 与站点主实体断链。改成团队组织节点并把本人挂成成员，实体图才连得上。
  if (author.name.includes(profile.name)) {
    return {
      "@type": "Organization",
      name: author.name,
      member: { "@id": `${siteMeta.domain}/#person` },
      parentOrganization: { "@id": `${siteMeta.domain}/#lawfirm` }
    };
  }

  return {
    "@type": author.type ?? "Person",
    name: author.name
  };
}

export function buildArticleSchema(input: ArticleSchemaInput) {
  const url = new URL(input.path, siteMeta.domain).toString();

  return {
    "@type": input.type,
    "@id": `${url}#article`,
    headline: input.title,
    description: input.description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    },
    inLanguage: "zh-CN",
    image: `${siteMeta.domain}/assets/og-cover.jpg`,
    author: input.authors.map(authorSchema),
    publisher: { "@id": `${siteMeta.domain}/#person` },
    ...(input.datePublished
      ? { datePublished: input.datePublished.toISOString() }
      : input.yearPublished
        ? { datePublished: String(input.yearPublished) }
        : {}),
    ...(input.section ? { articleSection: input.section } : {}),
    ...(input.keywords?.length ? { keywords: input.keywords } : {})
  };
}
