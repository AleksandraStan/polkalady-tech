import { Fragment } from "react";
import { articles } from "../content/articles";
import { articlePath, navigateTo, pagePaths } from "../lib/navigation";
import MediaGallery from "./media-gallery";
import "./blog.css";

function renderArticleParagraph(paragraph: string, paragraphIndex: number) {
  const blocks = paragraph
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length === 1 && !blocks[0].startsWith("#")) {
    return <p key={paragraphIndex}>{paragraph}</p>;
  }

  return (
    <Fragment key={paragraphIndex}>
      {blocks.map((block, blockIndex) => {
        if (block.startsWith("### ")) {
          return <h3 key={`${paragraphIndex}-${blockIndex}`}>{block.replace(/^###\s+/, "")}</h3>;
        }

        if (block.startsWith("## ")) {
          return <h2 key={`${paragraphIndex}-${blockIndex}`}>{block.replace(/^##\s+/, "")}</h2>;
        }

        return <p key={`${paragraphIndex}-${blockIndex}`}>{block}</p>;
      })}
    </Fragment>
  );
}

export default function BlogPage({ articleSlug }: { articleSlug?: string }) {
  const activeArticle = articles.find((article) => article.slug === articleSlug);

  if (activeArticle) {
    return (
      <article className={`content-page article-page ${activeArticle.articleClassName ?? ""}`}>
        <button className="back-link" onClick={() => navigateTo(pagePaths.blog)}>
          &larr; Back to journal
        </button>
        <p className="section-label">
          {activeArticle.category} / {activeArticle.readTime} read
        </p>
        <h1>{activeArticle.title}</h1>
        {activeArticle.subtitle && <p className="article-subtitle">{activeArticle.subtitle}</p>}
        <p className="article-date">{activeArticle.published}</p>
        {!activeArticle.hideIntro && <p className="article-intro">{activeArticle.intro}</p>}
        <MediaGallery media={activeArticle.media} />
        <div className="article-body">
          {activeArticle.sections.map((section, sectionIndex) => (
            <section key={`${section.heading}-${sectionIndex}`}>
              {!activeArticle.hideSectionHeadings && <h2>{section.heading}</h2>}
              {section.paragraphs.map(renderArticleParagraph)}
            </section>
          ))}
        </div>
      </article>
    );
  }

  return (
    <section className="content-page">
      <p className="section-label">Journal / 2026</p>
      <h1>Stories from the <span>digital edge.</span></h1>
      <p className="page-intro">
        Notes on design, technology, imagination, and the work of turning
        possibility into something you can experience.
      </p>
      <aside className="page-notice">
        <strong>Work in progress</strong>
        <span>
          This section is still taking shape. The articles are currently being
          edited and refined.
        </span>
      </aside>
      <div className="article-list">
        {articles.map((article) => (
          <a
            className="article-preview"
            href={articlePath(article.slug)}
            key={article.slug}
            onClick={(event) => {
              event.preventDefault();
              navigateTo(articlePath(article.slug));
            }}
          >
            <span>{article.number}</span>
            <div>
              <p>{article.category} / {article.readTime} read</p>
              <h2>
                {article.title}
                {article.statusLabel && <span>{article.statusLabel}</span>}
              </h2>
            </div>
            <b>&rarr;</b>
          </a>
        ))}
      </div>
    </section>
  );
}
