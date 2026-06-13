import { articles } from "../content/articles";
import { articlePath, navigateTo, pagePaths } from "../lib/navigation";
import MediaGallery from "./media-gallery";
import "./blog.css";

export default function BlogPage({ articleSlug }: { articleSlug?: string }) {
  const activeArticle = articles.find((article) => article.slug === articleSlug);
  const featuredArticle = articles.find((article) => article.slug === "does-space-precede-movement");

  if (activeArticle) {
    return (
      <article className="content-page article-page">
        <button className="back-link" onClick={() => navigateTo(pagePaths.blog)}>
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
      <aside className="page-notice">
        <strong>Work in progress</strong>
        <span>
          This section is still taking shape. The articles are currently being
          edited and refined.
        </span>
      </aside>
      {featuredArticle && (
        <a
          className="blog-feature"
          href={articlePath(featuredArticle.slug)}
          onClick={(event) => {
            event.preventDefault();
            navigateTo(articlePath(featuredArticle.slug));
          }}
        >
          <span>Featured research note</span>
          <h2>{featuredArticle.title}</h2>
          <p>
            Hagerstrand, individual space-time flows, and how movement makes
            space readable like an experience.
          </p>
          <b>Open article &rarr;</b>
        </a>
      )}
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
              <h2>{article.title}</h2>
            </div>
            <b>&rarr;</b>
          </a>
        ))}
      </div>
    </section>
  );
}
