import { useEffect, useState } from "react";
import { articles } from "../content/articles";
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
                        </button>button>
                        <p className="section-label">
                          {activeArticle.category} / {activeArticle.readTime} read
                        </p>p>
                        <h1>{activeArticle.title}</h1>h1>
                        <p className="article-date">{activeArticle.published}</p>p>
                        <p className="article-intro">{activeArticle.intro}</p>p>
                        <div className="article-body">
                          {activeArticle.sections.map((section) => (
                              <section key={section.heading}>
                                            <h2>{section.heading}</h2>h2>
                                {section.paragraphs.map((paragraph) => (
                                                <p key={paragraph}>{paragraph}</p>p>
                                              ))}
                              </section>section>
                            ))}
                        </div>div>
                </article>article>
              );
  }
  
    return (
          <section className="content-page">
                <p className="section-label">Journal / 2026</p>p>
                <h1>Stories from the <span>digital edge.</span>span></h1>h1>
                <p className="page-intro">
                        Notes on design, technology, imagination, and the work of turning
                        possibility into something you can experience.
                </p>p>
                <div className="article-list">
                  {articles.map((article) => (
                      <button
                                    className="article-preview"
                                    key={article.slug}
                                    onClick={() => setArticleSlug(article.slug)}
                                  >
                                  <span>{article.number}</span>span>
                                  <div>
                                                <p>{article.category} / {article.readTime} read</p>p>
                                                <h2>{article.title}</h2>h2>
                                  </div>div>
                                  <b>&rarr;</b>b>
                      </button>button>
                    ))}
                </div>div>
          </section>section>
        );
}
</article>
