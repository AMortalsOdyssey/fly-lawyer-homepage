<div align="center">

# 方丽英律师个人主页

婚姻家事与家族财富管理律师个人静态站点。

[![Astro](https://img.shields.io/badge/Astro-6.4-ff5d01?style=flat-square)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?style=flat-square)](https://www.typescriptlang.org/)
[![Static Site](https://img.shields.io/badge/Output-static-0f766e?style=flat-square)](https://fangliying.com/)

[访问主页](https://fangliying.com/) ·
[专业领域](https://fangliying.com/practice/) ·
[精选案例](https://fangliying.com/cases/) ·
[动态资讯](https://fangliying.com/news/) ·
[法律解读](https://fangliying.com/insights/) ·
[联系我](https://fangliying.com/contact/)

</div>

---

这个仓库维护 [fangliying.com](https://fangliying.com/) 的页面源码和内容数据。页面围绕方丽英律师的专业履历、业务方向、代表案例、动态资讯和法律解读展开，内容以 Markdown 方式组织，构建后输出为静态文件。

## 主要功能

| 模块 | 页面 | 内容来源 |
| --- | --- | --- |
| 个人主页 | [`/`](https://fangliying.com/) | 履历摘要、专业领域、精选案例、动态资讯、法律解读 |
| 专业领域 | [`/practice/`](https://fangliying.com/practice/) | 婚姻家事诉讼、婚姻家庭非诉、继承、私人客户及财富管理 |
| 精选案例 | [`/cases/`](https://fangliying.com/cases/) | 代表案例 Markdown，支持独立详情页 |
| 动态资讯 | [`/news/`](https://fangliying.com/news/) | 专业活动、荣誉消息、公益普法、行业动态 |
| 法律解读 | [`/insights/`](https://fangliying.com/insights/) | 解读、研究、评论类文章 |
| 联系方式 | [`/contact/`](https://fangliying.com/contact/) | 电话、邮箱、地址和律所信息 |

## 技术栈

| 类型 | 选型 |
| --- | --- |
| 框架 | [Astro](https://astro.build/) |
| 语言 | TypeScript |
| 内容 | Astro Content Collections + Markdown |
| 样式 | 原生 CSS，集中在 [`src/styles/global.css`](src/styles/global.css) |
| 输出 | Static HTML，构建产物在 `dist/` |

## 内容结构

```text
src/
  content/
    practice/   专业领域
    cases/      精选案例
    news/       动态资讯
    insights/   法律解读
  data/
    profile.ts  律师基础信息
  pages/        路由页面
  layouts/      页面布局
  styles/       全站样式
```

当前内容规模：

| 类型 | 数量 |
| --- | ---: |
| 专业领域 | 4 |
| 精选案例 | 3 |
| 动态资讯 | 15 |
| 法律解读 | 3 |

## 本地开发

```bash
npm install
npm run dev
```

常用命令：

```bash
npm run check
npm run build
npm run preview
```

新增内容可以直接在 `src/content/*` 下添加 Markdown 文件；如果需要生成案例、法律解读或专业领域模板，可以使用：

```bash
npm run new:content -- cases divorce-example
npm run new:content -- insights article-example
npm run new:content -- practice practice-example
```

## 维护说明

- 个人履历、社会身份、荣誉奖项维护在 [`src/data/profile.ts`](src/data/profile.ts)。
- 内容集合字段定义维护在 [`src/content.config.ts`](src/content.config.ts)。
- 首页展示顺序由内容的 `featured`、`order`、`pubDate` 等字段控制。
- 站点地图和 robots 文件由 [`src/pages/sitemap.xml.ts`](src/pages/sitemap.xml.ts) 与 [`src/pages/robots.txt.ts`](src/pages/robots.txt.ts) 生成。

## 链接

- 线上站点：[https://fangliying.com](https://fangliying.com/)
- 广东天习律师事务所：[https://tianxils.com](https://tianxils.com/)
