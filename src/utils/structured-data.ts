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
  section?: string;
  keywords?: string[];
}

function authorSchema(author: SchemaAuthor) {
  if (author.name === profile.name || author.name === `${profile.name}律师`) {
    return { "@id": `${siteMeta.domain}/#person` };
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
    ...(input.datePublished ? { datePublished: input.datePublished.toISOString() } : {}),
    ...(input.section ? { articleSection: input.section } : {}),
    ...(input.keywords?.length ? { keywords: input.keywords } : {})
  };
}
