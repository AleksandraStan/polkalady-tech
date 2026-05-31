import { useEffect, useState } from "react";
import { projects } from "../content/projects";
import MediaGallery from "./media-gallery";
import MessinaExperience from "./messina-experience";
import "./blog.css";

export default function PortfolioPage() {
  const initialHash = window.location.hash.slice(1);
  const [projectSlug, setProjectSlug] = useState<string | null>(
    initialHash.startsWith("project/") ? initialHash.replace("project/", "") : null,
  );
  const activeProject = projects.find((project) => project.slug === projectSlug);

  useEffect(() => {
    const syncProjectToHash = () => {
      const hash = window.location.hash.slice(1);
      setProjectSlug(hash.startsWith("project/") ? hash.replace("project/", "") : null);
    };
    window.addEventListener("hashchange", syncProjectToHash);
    return () => window.removeEventListener("hashchange", syncProjectToHash);
  }, []);

  useEffect(() => {
    window.location.hash = projectSlug ? `project/${projectSlug}` : "portfolio";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [projectSlug]);

  if (activeProject) {
    if (activeProject.slug === "beyond-ordinary") {
      return <MessinaExperience />;
    }

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
        A collection of projects.
      </p>
      <div className="project-grid">
        {projects.map((project, index) => (
          <button
            className="project-preview"
            key={project.slug}
            onClick={() => setProjectSlug(project.slug)}
          >
            <div
              className={`project-art project-art-${index + 1}${project.slug === "beyond-ordinary" ? " project-art-messina" : ""}`}
              style={{
                backgroundImage: project.slug === "beyond-ordinary"
                  ? "none"
                  : `url(${import.meta.env.BASE_URL}website.png)`,
              }}
            >
              {project.slug === "beyond-ordinary" && (
                <video autoPlay loop muted playsInline src={`${import.meta.env.BASE_URL}messina/departure.mp4`} />
              )}
            </div>
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
