import { useEffect, useState } from "react";
import { articles } from "../content/articles";
import MediaGallery from "./media-gallery";
import "./blog.css";

export default function BlogPage() {
  const initialHash = window.location.hash.slice(1);
  const [articleSlug, setArticleSlug] = useState<string | null>(
    initialHash.startsWith("article/") ? initialHash.replace("article/", "") : null,
  );
  const activeArticle = articles.find((article) => article.slug === articleSlug);

  useEffect(() => {
    window.location.hash = articleSlug ? `article/${articleSlug}` : "blog";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [articleSlug]);

  if (activeArticle) {
    return (
      <article className="content-page article-page">
        <button className="back-link" onClick={() => setArticleSlug(null)}>
          &larr; Back to journal
        </button>
        <p className="section-label">
          {activeArticle.category} / {activeArticle.readTime} read
        </p>
        <h1>{activeArticle.title}</h1>
        <p className="article-date">{activeArticle.published}</p>
        <p className="article-intro">{activeArticle.intro}</p>
        <MediaGallery media={activeArticle.media} />
        <div className="article-body">
          {activeArticle.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
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
      <div className="article-list">
        {articles.map((article) => (
          <button
            className="article-preview"
            key={article.slug}
            onClick={() => setArticleSlug(article.slug)}
          >
            <span>{article.number}</span>
            <div>
              <p>{article.category} / {article.readTime} read</p>
              <h2>{article.title}</h2>
            </div>
            <b>&rarr;</b>
          </button>
        ))}
      </div>
    </section>
  );
}
