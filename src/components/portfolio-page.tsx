import { useEffect, useState } from "react";
import { projects } from "../content/projects";
import MediaGallery from "./media-gallery";
import "./blog.css";

export default function PortfolioPage() {
  const initialHash = window.location.hash.slice(1);
  const [projectSlug, setProjectSlug] = useState<string | null>(
    initialHash.startsWith("project/") ? initialHash.replace("project/", "") : null,
  );
  const activeProject = projects.find((project) => project.slug === projectSlug);

  useEffect(() => {
    window.location.hash = projectSlug ? `project/${projectSlug}` : "portfolio";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [projectSlug]);

  if (activeProject) {
    return (
      <article className="content-page article-page">
        <button className="back-link" onClick={() => setProjectSlug(null)}>
          &larr; Back to portfolio
        </button>
        <p className="section-label">{activeProject.category}</p>
        <h1>{activeProject.title}</h1>
        <p className="article-intro">{activeProject.intro}</p>
        <MediaGallery media={activeProject.media} />
        <div className="article-body">
          {activeProject.sections.map((section) => (
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
      <p className="section-label">Selected Work</p>
      <h1>Ideas made <span>visible.</span></h1>
      <p className="page-intro">
        A collection of concepts where bold colour, clear thinking, and
        digital atmosphere meet.
      </p>
      <div className="project-grid">
        {projects.map((project, index) => (
          <button
            className="project-preview"
            key={project.slug}
            onClick={() => setProjectSlug(project.slug)}
          >
            <div
              className={`project-art project-art-${index + 1}`}
              style={{ backgroundImage: `url(${import.meta.env.BASE_URL}website.png)` }}
            />
            <p>{project.category}</p>
            <h2>{project.title}</h2>
            <span>{project.intro}</span>
            <b>Open project &rarr;</b>
          </button>
        ))}
      </div>
    </section>
  );
}
